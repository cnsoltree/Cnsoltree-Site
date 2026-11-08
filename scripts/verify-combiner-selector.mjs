import assert from 'node:assert/strict';
import {
  select,
  estimateVoltage,
  modelName,
  coldFactor,
  resolveFactor,
} from '../src/lib/combiner-selector.mjs';

// 示例：1000V，14A，4 路
let o = select({ v: 1000, isc: 14, n: 4 });
assert.equal(modelName(o.model[0]), 'ST-4-1');
assert.equal(o.fuseAmp, 25); // 21A → 25A
assert.equal(o.breakerAmp, 80); // 70A → 80A
assert.equal(o.spd, 'PV T2 DC1000V · Imax 40kA');
assert.equal(o.wire, 'PV 软线 + 冷压端子');

// 9 路向上取 10 路型号，并有预留提示；SPD 固定 T2，附 T1+T2 提示
o = select({ v: 1500, isc: 14, n: 9 });
assert.equal(o.model[0], 10);
assert.equal(o.spd, 'PV T2 DC1500V · Imax 40kA');
assert(o.notes.some(([, t]) => t.includes('T1+T2')));
assert.equal(o.wire, '镀锡铜排');
assert(o.notes.some(([, t]) => t.includes('预留 1 路')));

// 36 路大电流需塑壳断路器提示；37 路无型号
o = select({ v: 1000, isc: 14, n: 36 });
assert.equal(o.breakerAmp, 630);
assert(o.notes.some(([c]) => c === 'warn'));
assert.equal(select({ v: 1000, isc: 14, n: 37 }).model, null);

// 500V 档 SPD 为 DC600V；推算电压超等级标红
assert.match(select({ v: 500, isc: 10, n: 2 }).spd, /DC600V/);
const e = estimateVoltage(49.5, 16); // 950.4V
assert.equal(e.grade, 1000);
assert(select({ v: 500, isc: 10, n: 2, vmax: e.vmax }).notes[0][0] === 'bad');
assert.equal(estimateVoltage(49.5, 30).grade, null);

console.log('combiner selector OK');

// 低温系数可自填，越界返回 null
assert.equal(Math.round(estimateVoltage(49.5, 18, 1.09).vmax), 971);
assert.equal(estimateVoltage(49.5, 18, 1.09).grade, 1000);
assert.equal(estimateVoltage(49.5, 18).grade, 1500);
assert.equal(estimateVoltage(49.5, 18, 0.9), null);
// 温度系数 + 最低气温自动算系数
assert.equal(coldFactor('', ''), 1.2);
assert.equal(Math.round(coldFactor('-0.27', '-10') * 1000), 1095);
assert.equal(coldFactor('0.27', '-10'), coldFactor('-0.27', '-10'));
assert(Number.isNaN(coldFactor('-0.27', '')));
assert(Number.isNaN(coldFactor('-2.7', '-10')));
assert.equal(coldFactor('-0.27', '30'), 1);
assert.equal(estimateVoltage(49.5, 18, NaN), null);
// 优先级：自动 > 手填 > 默认
assert.deepEqual(resolveFactor('', '', ''), { factor: 1.2, source: 'default' });
assert.deepEqual(resolveFactor('', '', '1.1'), { factor: 1.1, source: 'manual' });
assert.equal(resolveFactor('-0.27', '-10', '1.1').source, 'auto');
assert(Number.isNaN(resolveFactor('', '', '2').factor));
console.log('factor OK');

// 熔丝/断路器系数可改，不限下限
o = select({ v: 1000, isc: 13.9, n: 4, fuseK: 1.2, breakerK: 1.2 });
assert.equal(o.fuseAmp, 20);
assert.equal(o.breakerAmp, 80);
assert.equal(select({ v: 1000, isc: 13.9, n: 4 }).fuseAmp, 25);
assert(select({ v: 1000, isc: 13.9, n: 4, fuseK: 0 }).notes.some(([c]) => c === 'bad'));
console.log('coef OK');
