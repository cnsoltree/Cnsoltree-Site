// ST 系列光伏直流汇流箱选型规则。页面和 scripts/verify-combiner-selector.mjs 共用。
// ponytail: 系数按用户要求暂用简化规则（低温 1.2 / 熔丝 1.5 / 断路器 1.25），后续可改为温度系数算法。
export const K = { vocCold: 1.2, fuse: 1.5, breaker: 1.25, busbarAmp: 63 };
export const GRADES = [500, 1000, 1500];
export const SPD_V = { 500: 600, 1000: 1000, 1500: 1500 };
export const FUSES = [10, 12, 15, 16, 20, 25, 30, 32];
export const BREAKERS = [
  16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630,
];

// [路数, 外形尺寸, 包装尺寸, 净重 kg, 毛重 kg]
export const MODELS = [
  [2, '400×400×180', '420×420×200', 10, 13],
  [3, '400×400×180', '420×420×200', 11, 14],
  [4, '440×400×180', '460×420×200', 12, 15],
  [5, '500×400×180', '520×420×200', 14, 16],
  [6, '500×400×180', '520×420×200', 15, 17],
  [7, '500×400×180', '520×420×200', 16, 17],
  [8, '600×460×180', '620×480×200', 18, 21],
  [10, '700×460×180', '720×480×200', 23, 25],
  [12, '750×460×180', '770×480×200', 25, 27],
  [14, '750×560×200', '770×580×220', 28, 30],
  [16, '800×560×200', '820×580×220', 36, 39],
  [18, '800×560×200', '820×580×220', 38, 40],
  [20, '800×600×200', '820×620×220', 40, 42],
  [22, '800×700×200', '820×720×220', 42, 44],
  [24, '800×700×200', '820×720×220', 44, 46],
  [26, '800×700×250', '820×720×270', 46, 48],
  [30, '800×700×250', '820×720×270', 48, 51],
  [32, '900×700×250', '920×720×270', 50, 53],
  [36, '900×700×250', '920×720×270', 52, 55],
];

export const modelName = (inputs) => `ST-${inputs}-1`;
const pick = (list, x) => list.find((v) => v >= x - 1e-9);
export const r1 = (x) => Math.round(x * 10) / 10;

/** 按组件参数推算低温极限开路电压和建议电压等级 */
/**
 * 由组件 Voc 温度系数（%/°C，规格书数值，正负号均可）和当地最低气温（°C）算低温系数。
 * 两项都空返回默认 K.vocCold；只填一项或超出范围返回 NaN。
 */
export function coldFactor(beta, tmin) {
  const empty = (x) => x === '' || x == null;
  if (empty(beta) && empty(tmin)) return K.vocCold;
  const b = Math.abs(Number(beta)),
    t = Number(tmin);
  if (empty(beta) || empty(tmin) || !(b >= 0.1 && b <= 0.6) || !(t >= -60 && t <= 40)) return NaN;
  return Math.max(1, 1 + (b / 100) * (25 - t));
}

/**
 * 低温系数取值优先级：温度系数 + 最低气温（自动）> 手填低温系数 > 默认 K.vocCold。
 * 返回 { factor, source }，source 为 auto / manual / default；输入无效时 factor 为 NaN。
 */
export function resolveFactor(beta, tmin, manual) {
  if (String(beta ?? '').trim() || String(tmin ?? '').trim())
    return { factor: coldFactor(beta, tmin), source: 'auto' };
  const m = String(manual ?? '').trim();
  if (m) return { factor: Number(m) >= 1 && Number(m) <= 1.5 ? Number(m) : NaN, source: 'manual' };
  return { factor: K.vocCold, source: 'default' };
}

// 低温系数默认 K.vocCold
export function estimateVoltage(voc, perString, factor = K.vocCold) {
  if (!(voc > 0 && perString > 0 && factor >= 1 && factor <= 1.5)) return null;
  const vmax = voc * perString * factor;
  return { vmax, factor, grade: pick(GRADES, vmax) ?? null };
}

/**
 * @param {{ v: number, isc: number, n: number, imax?: number, vmax?: number|null, fuseK?: number, breakerK?: number }} input
 */
// 熔丝、断路器系数可由用户修改，不设下限（只要求 > 0），默认 K.fuse / K.breaker
export function select({
  v,
  isc,
  n,
  imax = 40,
  vmax = null,
  fuseK = K.fuse,
  breakerK = K.breaker,
}) {
  const notes = [];
  /** @type {Record<string, any>} */
  const out = { v, isc, n, notes, model: null };
  if (vmax && vmax > v)
    notes.push([
      'bad',
      `低温极限电压约 ${r1(vmax)}V，超过所选 ${v}V 等级，有击穿风险。请提高电压等级或减少每串块数。`,
    ]);
  if (!(fuseK > 0) || !(breakerK > 0)) {
    notes.push(['bad', '熔丝系数和断路器系数需填写大于 0 的数字。']);
    return out;
  }
  if (!(isc > 0) || !(n >= 1) || !Number.isInteger(n)) {
    notes.push(['bad', '请填写有效的短路电流和路数（路数为整数）。']);
    return out;
  }

  out.model = MODELS.find((m) => m[0] >= n) ?? null;
  if (!out.model)
    notes.push(['bad', `${n} 路超过单台最大 36 路，建议分成多台汇流箱，或联系我们定制。`]);
  else if (out.model[0] > n)
    notes.push(['', `选用 ${out.model[0]} 进 1 出，预留 ${out.model[0] - n} 路可扩容。`]);

  const fuseNeed = isc * fuseK;
  out.fuseAmp = pick(FUSES, fuseNeed) ?? null;
  out.fuseWhy = `${isc}A × ${fuseK}（熔丝系数）= ${r1(fuseNeed)}A`;
  out.fuse = out.fuseAmp ? `${out.fuseAmp}A gPV 光伏熔丝 × ${n}` : '超出常规熔丝规格';
  if (!out.fuseAmp) notes.push(['bad', '单串电流超出 32A 常规光伏熔丝范围，请联系我们确认方案。']);
  if (n <= 2) notes.push(['', '1–2 路并联一般可不装支路熔丝，可按需选配。']);

  out.total = isc * n;
  const brkNeed = out.total * breakerK;
  out.breakerAmp = pick(BREAKERS, brkNeed) ?? null;
  out.breakerWhy = `${isc}A × ${n} 路 × ${breakerK}（断路器系数）= ${r1(brkNeed)}A`;
  out.breaker = out.breakerAmp ? `${out.breakerAmp}A 直流断路器 DC${v}V` : '超出 630A';
  if (!out.breakerAmp)
    notes.push(['bad', `总电流约 ${r1(out.total)}A，超出常规断路器范围，建议分箱。`]);
  else if (out.breakerAmp >= 250)
    notes.push(['warn', `${out.breakerAmp}A 需用塑壳断路器，请联系我们确认箱体安装空间。`]);

  out.spd = `PV T2 DC${SPD_V[v]}V · Imax ${imax}kA`;
  out.spdWhy = `按 ${v}V 等级匹配`;
  notes.push(['warn', '建筑有外部防雷（避雷针 / 避雷带）时需改用 T1+T2。']);
  notes.push(['warn', 'SPD 必须用光伏直流专用型，交流 SPD 不能用于直流侧。']);

  out.wire = out.total >= K.busbarAmp ? '镀锡铜排' : 'PV 软线 + 冷压端子';
  return out;
}

export function summaryText(o) {
  const m = o.model;
  return [
    `推荐型号：${m ? `${modelName(m[0])}（${m[0]}进1出，外形 ${m[1]}mm）` : '需分箱 / 定制'}`,
    `系统电压：DC ${o.v}V`,
    `输入参数：单串 Isc ${o.isc}A × ${o.n} 路`,
    `支路熔断器：${o.fuse ?? '—'}`,
    `总直流断路器：${o.breaker ?? '—'}`,
    `防雷 SPD：${o.spd ?? '—'}`,
    `箱内接线：${o.wire ?? '—'}`,
    '箱体材质：冷轧钢板喷塑',
  ].join('\n');
}
