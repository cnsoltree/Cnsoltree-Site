# 项目开发进度

## DC MCB 按三种结构选型（2026-11-06）

- `/dc-mcb` 从按 1P–4P 展示旧产品改为 DZ47 4.5kA、C65 6kA、L7 10kA 三种结构选型，更新首屏、SEO 标题/描述、三张系列卡、对比表、FAQ 及询价要求。卡片链接至本页询价区，未将旧产品图片或详情指定为某种结构；首屏保留极数示意图。
- 分断能力采用用户本轮提供的数值，不添加截图中的市场虚标/质量评价。未修改旧 MCB 产品详情记录；三种结构的专用图片、电压/电流/极数及详情对应关系待补齐。
- 同步 `scripts/verify.mjs` 的 DC 系列验收：检查三张卡片及每行型号与分断能力对应；保留 AC 极数入口检查。
- Astro check：0 errors、0 warnings、2 个现有 hints；Node 22 Astro 构建通过。未做浏览器视觉验收，未提交或部署。
- 站内回归通过：265 页面、81 产品、19 文章，三类型号与分断能力对应检查通过，无本地断链或缺失资源。

## 2P 首图换为配色总览（2026-11-06）

- 原图保存为 `std-40-pv-600v-color-range.png`（1254×1254），同步 Astro/公开目录；600V 产品封面、图库首图与落地页卡片/Schema 图片更新，补充 Alt。独立橙色配色、8 款配色与后五张展示图保留。
- 原始尺寸、文件一致性、产品/分类/落地页引用、两款专项与图库切换回归、diff 检查通过；后台图片索引同步。未构建、提交或部署。

## 3P 配色总览首图新版（2026-11-06）

- 按用户随后上传的新图替换 `std-40-pv-1000v-color-range.png`，原图为 1000×1000；同步 Astro/公开目录，原封面与落地页引用保持有效。
- 两份文件一致、原始尺寸与本地产品页引用检查通过，diff 检查通过。未构建、提交或部署。

## 3P 首图换为配色总览（2026-11-06）

- 新原图保存为 `std-40-pv-1000v-color-range.png`（1254×1254），同步 Astro 与公开上传目录；1000V 封面、图库第一张及落地页卡片/Schema 图片改用该图，更新 Alt。原橙色单品图继续作为配色选项，后四张展示图不变。
- 原图尺寸、两份文件一致性、封面/图库顺序与落地页引用、8 款独立配色及图库切换回归通过，diff 检查通过；后台图片索引同步。重启 4400 预览后，两款 DC 专项回归及产品/分类/落地页新图引用核验通过。未重新构建、提交或部署。

## 清理旧 DC SPD 产品记录（2026-11-06）

- 用户表示旧链接无保留价值，希望网站重新起步。本地删除 SPD-DC-1P/2P/3P/4P-White 四款草稿记录及对应西语文件，移除 8 条旧 Orange 到 White 的重定向，保留图片资产避免影响共用引用。
- scripts/verify-dc-spd-range.mjs 通过：只发布 STD-40-PV 600V 2P / 1000V 3P，两款入口与结构化数据正常；diff 检查通过。未改云端后台快照，未重新构建、提交或部署，线上仍为 4a1f72b。

## SPD 更新已上线（2026-11-05）

- 提交 `4a1f72b4d3714951b1d3e35937c76e2a1b162f1a` 已推送 GitHub main；现有 Vercel 项目生产部署 `dpl_EVKKkdwVSCui8biAz2mB16HghQGo` 状态 READY。
- 正式域名 `https://www.elesoltree.com` 验收通过：DC Surge Protector 两款左图右文卡片、600V/1000V 详情、各 8 款配色、1000V 新图库及技术图纸响应 200，3P 首列宽度与 Meta 正确。
- 验收脚本：工作区 artifacts/verify-spd-production.mjs 及项目 scripts/verify-dc-spd-range.mjs。发布后记录仅更新本地任务文档，不影响已上线版本。

## SPD 更新发布前验收（2026-11-05）

- 用户明确要求上传服务器更新网站。现有 Vercel 项目 `cnsoltree-site-pnst`，生产分支 main；本地与远端起点一致（b3207ea）。
- Node 22.23.4 构建通过，Astro check 182 文件零错误/警告（2 hints）；完整 verify:deploy 通过，265 页 / 81 产品 / 19 文章、5588 图片引用、联系表单及 Vercel/在线后台离线运行回归通过；产品管理、图库、分类与后台回归通过。
- 修正 verify.mjs 的过时断言：旧简介的通用开头也出现在已批准的 Application 中，删除全页禁用该短语的误报检查，保留完整简介与 Application 逐段匹配检查。
- 发布日志：release-spd-check.log、release-spd-build.log、release-spd-verify.log、release-spd-admin.log。生产部署及线上验收待完成。

## Product Range 改为紧凑横排（2026-11-05）

- 两款卡片由双列大图改为每行一款，桌面左侧图片宽 224–288px、右侧介绍与链接；参数在大屏分两列，缩小内边距与卡片前间距。窄屏保留上下布局，图片高 256px，完整显示产品。
- 本地实际页面确认两行横排、左右区域及移除大正方形图区；两款产品入口/Schema 回归、格式与 diff 检查通过。未重新构建、未部署。

## 3P 主图后追加四张展示图（2026-11-05）

- 用户四张原图同步至 Astro 与公开上传目录，1000V 产品 images 第 2–5 张依次为 surge-protection、terminal-guide、plug-in-modules、mov-comparison，补齐逐图 Alt；橙色首图和 8 款配色保留。
- 图片顺序、Alt、响应 200、配色按钮及现有图库切换回归通过，后台图片索引与 diff 检查通过。未重新构建、未部署。

## 1000V 3P 独立选型文案优化（2026-11-05）

- 重写 shortDescription、description、Application 和 Meta Description（151 字符）；围绕 Type 2 1000V 3P、20kA/40kA、插拔式 MOV、54mm 宽度、PV 汇流箱及逆变器 DC 侧展开。600V 2P 文案不变。
- 补齐 Specifications、Remote Signal Contact、Installation and Dimensions、Wiring Diagram、Dimensions、Drawing 六个说明区块，分别解释选型参数、远程触点确认、安装准备及图纸用途；明确 1500V 为独立系列对比参数，不扩展本款 1000V 额定值，不将示意图中的 SPD 数量作为所有项目的固定要求。
- 参数、图片、表格、8 款配色及布局保持现状；未新增认证或性能承诺。远程触点旧表中 30V AC/DC 标注差异仍待厂家资料确认，本次未改参数。
- 本地页面七个模块逐段文案、独立简介与 Meta、原图归属、配色和规格列核验通过；两款 DC 专项回归、Prettier 及 diff 检查通过。未重新构建、未部署。

## 1000V 3P Wiring Diagram 更新（2026-11-05）

- 用户原图保存为 `std-40-pv-3p-wiring-diagram.png`（1318×534），同步 Astro/公开上传目录，替换 1000V 产品 Wiring Diagram 并更新 Alt。
- 本地模块引用、图片响应 200、原始比例及 diff 检查通过；后台图片索引已同步。未重新构建、未部署。

## 3P 规格表首列缩窄并居中（2026-11-05）

- 按最新截图，1000V 产品 Specifications 首列桌面宽度从 46% 改为 26%，六行参数名称统一居中、不换行；窄屏保留足够标签空间。
- 本地实际页面确认六个首列单元格宽度及居中、不换行样式，格式与 diff 检查通过。未重新构建、未部署。

## 1000V 产品单独 3P Dimensions（2026-11-05）

- 用户原图保存为 `std-40-pv-3p-dimensions.png`（1344×540），同步 Astro/公开上传目录；1000V 产品 Dimensions 替换为该侧视与 3P 正视尺寸图，更新 Alt。
- 本地 Dimensions 模块图片引用、响应 200 与原图比例检查通过；后台图片索引已同步，diff 检查通过。未重新构建、未部署。

## 1000V 产品单独 3P Drawing（2026-11-05）

- 用户上传原图保存为 `std-40-pv-3p-drawing.png`（1164×412），同步 Astro/公开上传目录，替换 1000V 产品 Drawing 图片并更新 Alt。
- 本地 Drawing 图片归属、响应 200 与原始比例检查通过；后台图片索引已同步，diff 检查通过。未重新构建、未部署。

## 3P 规格表删除 2P 信息（2026-11-05）

- 1000V 产品 Specifications 删除 600V、800V、12/24V 定制 2P 三列，只保留 1000V / 1500V 两列，保留对应 Up 3.8 / 5.4。表名改为 `STD-40-PV Surge protector 3P`。
- 仅本产品的 Specifications 首列加宽（桌面 46%、窄屏 56%）并保持参数名一行显示，其余表格布局不变。本地实际页面逐格、首列样式及无 2P 信息核验通过；600V 规格表、Drawing 和合并安装表既有回归、格式及 diff 检查通过。未重新构建、未部署。

## 1000V 3P 最新主图与定制配色（2026-11-05）

- 橙色封面及图库首图使用本次第一张原图，沿用文件地址同步分类卡片及 DC Surge Protector 产品卡；新增后七张原图到 Astro 与公开上传目录。8 款配色按上传顺序为橙、橙灰、黑绿、白灰、全白、红灰、白绿、橙绿，沿用现有颜色图片按钮及主图切换逻辑。
- 原图均为 1254×1254，未改图上标签；600V 产品不变。颜色切换/缩略图/箭头及 85 份历史图库回归通过；本地产品页确认 8 个配色按钮、顺序、图片响应与原图尺寸，DC 两款专项回归及 diff 检查通过。后台图片索引已同步，未重新构建、未部署。

## DC SPD 列表放大主图（2026-11-05）

- ProductCard 中 DC SPD 图片区域由固定 192px 高改为正方形，内边距从 16px 缩为 8px；其他产品保持原尺寸。DC Surge Protector 两款卡片同步采用正方形展示区并缩小内边距，使用 object-contain 完整展示原图。
- 本地响应核验两款分类卡片与落地页大图布局、原 AC 卡片尺寸；两款产品专项回归、格式及 diff 检查通过。未重新构建、未部署。

## 1000V 3P 产品更换主图（2026-11-05）

- 用户原图保存为 `std-40-pv-1000v-orange.png`，同步 Astro 资源及公开图片目录；1000V 产品封面、图库第一张、Alt 与 DC Surge Protector 卡片及对应 Schema 图片同步更新，替换之前的系列示意图。
- 原图保持 1000×1000；本地产品页与落地页确认使用新图、无旧示意图引用，新图响应 200；两款产品专项回归、后台图片索引同步及 diff 检查通过。未重新构建、未部署。

## DC SPD 聚焦两款 Type 2 主力型号（2026-11-05）

- `dc-surge-protector.astro` 仅推荐 STD-40-PV 600V 2P / 1000V 3P，双列产品卡分别说明配置、模块维护和详情页资料；两款均链接现有详情页。首页标题、SEO、两行选型表与 Product 结构化数据同步，不再推荐 STO 或其他电压/极数组合。保护类型说明保留为选型背景，不作为供应型号展示。
- 旧 SPD-DC-1P/2P/3P/4P-White 设为 `published: false`，从产品目录和相关推荐撤下，原资料保留。600V / 1000V 详情内容及 AC SPD 不变；1000V 继续使用既有系列示意图，待专用成品图替换。
- `npm.cmd run check` 通过（181 文件，0 errors / 0 warnings，2 个既有 hints）；新增可重复执行的 `node scripts/verify-dc-spd-range.mjs`，验证仅两款发布、两张卡片、详情页 200、Schema 名称/URL/极数准确，本地 4400 服务通过。格式及 diff 检查通过。未提交、未部署。
- 分类回归 `node scripts/verify-taxonomy.mjs` 通过。使用工作区 Node 22.23.4 执行构建，静态页面与 749 张图片处理完成；Vercel 函数打包仍在等待，完整构建暂未确认通过。全站 `verify.mjs` 因构建尚未生成 `.vercel/output/config.json` 未完成。构建日志：`.dc-spd-build.log`。

- 七模块调整验证：Astro check 180 文件、0 errors / 0 warnings（2 个既有 hints）；本地核验七个模块及导航顺序、Application 三段原文、11 行参数且不重复输出；既有 AC SPD 默认参数区保留。diff 检查通过。本次未重新构建、未提交或部署。

- 2026-11-04：STD-40-PV 600V 详情改为用户指定的七个模块与同序页内导航。Application 原文分三段显示；Specifications 复用现有参数表，不重复显示 Main Specification；Remote Signal Contact、Installation and Dimensions、Wiring Diagram、Dimensions、Drawing 仅显示标题，等待真实资料。共用详情支持在配置的 specifications 模块位置输出参数表，其他产品保留默认参数区。段落校验允许空字符串用于待补资料标题，不允许非字符串内容；未部署。

- 2026-11-04：按最新上传从左到右的顺序，将雷电防护、模块更换、部位标注、产品优势、MOV 对比图加入 STD-40-PV 600V 的 images 第 2–6 张；全橙色首图和现有配色保留。复制用户原图到上传目录与 Astro 资源目录，补齐 Alt、更新后台图片索引。图库切换及 84 份历史图库兼容检查通过，diff 检查通过；未重新构建、未部署。

- 2026-11-04：按用户截图移除 STD-40-PV 600V 的旧斜角参考图引用，将全橙色正面图设置为 image、images 首图，并移到 colorVariants 第一项，Alt 同步。原图片文件保留供其他页面使用；未部署。

- 2026-11-04：按用户最新要求，将 `Housing: Pluggable Design` 恢复至 STD-40-PV 600V 特点列表，位于 Protective Elements 与 Compliance 之间；未部署。

- 2026-11-04：按用户要求移除 STD-40-PV 600V 特点列表中的 `Housing: Pluggable Design`；JSON 解析与 diff 检查通过，未部署。

## 产品定制说明与颜色切换（2026-11-04）

- 已将用户提供的 8 张配色原图复制到 public/images/uploads 与 src/assets/uploads，按黑绿、白绿、橙绿、全白、红灰、白灰、橙灰、全橙顺序配置 STD-40-PV 600V 的 colorVariants，补充对应 Alt。默认主图保留；选色仍为 48px 小图且隐藏可见名称。更新后台媒体索引；图库切换回归、历史图库兼容、源数据校验与 diff 检查通过；本地详情 HTTP 200、输出 8 个选色按钮、8 张图片均可访问。本次图片更新未重新构建或部署。

- 按用户截图收紧定制区：去掉可见的 Color: Orange 与缩略图下方颜色名；图片选项改为 48×48px 小方块，保留无障碍名称与原有切图行为；缩小标签、容器内边距、选色行与 CTA 间距，减少右侧高度。详情页 HTTP 200、紧凑尺寸及名称隐藏输出核验、Prettier 与 diff 检查通过；本次纯样式调整未重新构建、未部署。

- 产品详情增加可选 customizationOptions 与 colorVariants，特点下方显示定制服务标签和颜色缩略图；STD-40-PV 600V 先启用三项服务及现有橙色图。其他产品未配置时不显示新模块。
- 复用现有图库，将颜色图片合并进大图列表，颜色、原缩略图、左右箭头保持同步；重复初始化不会绑定多次事件。后台可上传颜色图、填写名称与 Alt；本地内容校验、云端图片检查、公开发布字段同步支持新增数据。
- 主图切换回归覆盖选色、缩略图、箭头循环、重复初始化与旧图库；84 份历史图库兼容通过。Astro check 0 errors / 0 warnings（2 个既有 hints）；云端内容及发布离线回归通过；本地详情 HTTP 200，新模块及按钮输出正确。Node 22 构建通过。
- 其他颜色图待用户提供。未做浏览器视觉验收，未提交、推送或部署。
- 构建后站内回归通过（272 路由、84 产品、19 文章，无断链），5766 个本地图片引用核验通过；格式与 git diff --check 通过。

## 产品详情共用公司侧栏（2026-11-04）

- 新增 CompanyIntro.astro，在 ProductDetail 参数与详情区域右侧共用：1024px 及以上宽 300px，1280px 及以上 320px；顶部偏移 7rem 吸顶，受详情区底部约束。短视口为卡片预留内部滚动，窄屏移至详情之后，相关推荐之前。
- 复用与用户附件一致的 src/assets/factory.jpg，保留用户提供的 Shawn 介绍、98.9% 满意度和 shawn@cnsoltree.com 邮箱；图片使用现有优化组件，邮箱复用 CONTACT 配置。添加 ui-company-intro.json 西语译文，英文与西语产品页均使用共用卡片。
- 参数表保留各产品原参数，行标题改为 th scope=row，表格容器支持横向滚动，避免侧栏挤压造成整页溢出。保留三个详情锚点。
- Astro check：179 文件、0 errors / 0 warnings / 2 个既有 hints；Node 22 构建成功；verify PASS（272 路由、84 产品、19 文章，无断链），5765 图片引用检查通过。i18n-status 仅有既存未译 STD 产品和两个既存表单 UI 字符串；新卡片无缺失译文。git diff --check 通过。
- 无头 Chrome 检查未能完成 CDP 连接并超时，未宣称通过浏览器吸顶/尺寸视觉验收；预留验证脚本 ../artifacts/verify-product-company-intro.mjs。未提交、推送或部署。

## STD-40-PV 详情区块与 DC 分类试版（2026-11-04）

- 按用户要求将标题下三段正文替换为指定 DIN rail 安装单句，移除原图片电压说明正文。
- 根因：AC SPD 无 type，原共享分类匹配会包含 DC；Catalog 又将无 type 分类 key 作为通用成员，绕过主题筛选。共享匹配排除 AC SPD 主题下的 DC 产品，通用分类 key 改为 `:*`，保留无主题分类回退。详情分类名、面包屑链接及相关推荐沿用同一主题规则，STD 显示 DC Surge Protector。
- 新增产品可选 detailSections（纯文本标题/正文、唯一锚点），接入产品读取校验及后台发布字段允许列表。仅本款启用三项导航：Main Specification 展示现有参数，Installation Instructions 与 Wiring Diagram & Installation 保留待补充正文；不编造接线图或安装参数。导航原生锚点、继承平滑滚动与减少动态偏好、区块预留顶部导航偏移。
- Astro check 178 文件：0 errors / 0 warnings / 2 个既有 hints；分类回归通过。本地详情 HTTP 200，三个导航与目标、DC 相关推荐核验通过。新增锚点校验、AC/DC 分类、列表成员标记及详情输出回归。最终 Node 22 构建成功，无缺失译文日志；verify PASS（272 路由、84 产品、19 文章，无断链），5598 图片引用检查通过；git diff --check 通过。分类名称复用现有 taxonomy 译名。未提交、推送或部署。

## STD-40-PV 600V 产品页（2026-11-04）

- 新增 `src/content/products/STD-40-PV-600V.json`，使用用户指定标题，合并重复简介，保留七项特点并整理 11 行参数、SEO 元数据、DC 分类与 New 标记。未补写极数、Up、电压适用范围或证书。
- 复用现有产品详情、图库、参数和询价组件；DC 落地页 STD 卡片和结构化数据链接到新页，将与本次资料冲突的一体封装说明改为可插拔设计，并调整系列区导读。
- 主图暂用既有 STD 系列图片，其标签为 1000V；详情和 alt 明确说明为系列外观参考，600V 图片待用户补充。未使用参考截图中的其他品牌图片。
- Astro check：178 文件、0 errors、0 warnings、2 个既有 hints；git diff --check 通过。Node 22 构建通过；verify PASS（272 路由、84 产品、19 文章，无断链）；5610 图片引用与新页标题、特点及图片说明检查通过。修复 verify 对未翻译产品 hreflang 的误判：只检查 head 的 link 标签，避免把语言切换器回落西语首页的普通链接误判为译文页面。未提交、推送或部署。

## AC MCB 地址迁移为 /ac-mcb（2026-11-04）

- 按用户要求将 AC 页从 `src/pages/mcb.astro` 移至 `src/pages/ac-mcb.astro`；页面 path、自指 canonical、面包屑 URL 统一改为 `/ac-mcb`。
- 更新 landingPages 导航/资源中心入口和 DC 页的 AC 链接；sitemap 从注册表收录新路径、排除旧路径。共用 `src/lib/redirects.mjs` 加入 `/mcb` → `/ac-mcb`，沿用既有 301 机制。同步两个相关文案稿中的当前路径。
- 扩展站内检查：新 AC/DC 路径、互链和导航、旧地址未进入 sitemap、构建配置中旧地址 301 目标正确。Node 22 构建成功，verify PASS（271 路由、83 产品、19 文章，无断链）；格式与 diff 检查通过。
- 本地原 Astro CLI 进程在配置热重载后仍缓存旧 redirects 模块；读取进程命令行确认仅 PID 31980 属于本项目 4400 服务后停止该进程，以 Node 22 隐藏启动同项目、同端口、仅监听 127.0.0.1 的预览。未终止其他 Node 服务。已实际核验 `/mcb` HTTP 301 Location=/ac-mcb；新页、首页、DC 页及 AC 资源主题页 HTTP 200、链接正确；sitemap 仅含新地址。
- 构建日志 `../artifacts/ac-mcb-route-build.log`，本地预览日志 `../artifacts/ac-mcb-dev.{stdout,stderr}.log`。未提交、推送或部署。

## AC / DC MCB 落地页拆分（2026-11-04）

- 保留 `/mcb` 作为 AC 落地页，更新标题、description、H1、面包屑、首屏图片与应用内容；只展示 4 款 AC 产品，保留用户确认的 STA-63/STB-63/STC-63 对比数据与原 URL，增加 DC 页入口。
- 新增 `src/pages/dc-mcb.astro`：独立 DC 首屏、4 款产品卡、直接读取现有产品 specs 的参数表、三步选型、PV/DC/电池项目评估场景、OEM、分组 FAQ 和询盘。DC 记录当前均列 500V DC、6kA，不从极数推导新电压，也未套用 AC 系列、SPD 的认证/MOQ/交期。新文案说明保存为 `../SEO-Articles/_landing-pages/dc-mcb-copy.md`。
- `landing-pages.ts` 分别归入 Circuit Protection / AC MCB 与 Solar PV Components / DC Circuit Breaker，两项均启用英文导航入口；资源中心自动关联。sitemap 与 verify 路由统一从 landingPages 读取，收录新页。已有西语导航仍按真实页面存在情况回落至原分类入口；本轮未新增翻译或改写产品与分类数据。
- 在现有 `scripts/verify.mjs` 增加 AC/DC 产品范围隔离、4 款产品链接、互链、canonical、sitemap、6 条 FAQ、DC 参数数据来源及导航配置检查。
- 验证：Node 22 Astro check 178 文件 0 errors / 0 warnings / 2 个既有 hints；构建成功（沿用既有 bundle size 提示）；verify PASS（271 路由、83 产品、19 文章，无断链），5593 张本地图片引用检查通过。两落地页与两资源主题页 HTTP 200，首页导航和 sitemap 入口正确，DC 表格按型号与源数据逐项一致。
- 保留本轮开始前已有的 TASK/PROGRESS 修改以及已提交的 DC SPD SEO/GEO 改动。未做浏览器桌面/手机视觉验收，未提交、推送或部署。构建日志：`../artifacts/mcb-split-build.log`。

## DC 落地页询盘表单 Subject 调整（2026-11-04）

- DC 页移除红框内 Company / Your Country 与 Inquiry Type，替换为全宽 Subject * 输入框（最多 200 字符），保留姓名、电话、邮箱和留言。共用 ContactForm 新增默认不启用的 showSubject 与默认启用的 showCompany 开关，其他调用页面配置保持不变。
- Subject 接入输入校验、邮件标题和询盘记录，邮件正文沿用既有 HTML 转义；未填 Subject 的旧页面继续使用原邮件标题。不改变数据库结构，不发送测试邮件。
- 扩展现有离线 contact runtime 回归：主题类型/长度/空值/换行校验、邮件标题、HTML 转义、数据库记录、多语言前缀及旧标题兼容全部通过。DC、Contact、MCB、西语 Contact 页面均 200，字段输出核验通过。
- Astro 检查 177 文件 0 errors / 0 warnings / 2 个既有 hints；Prettier、diff 检查通过。文案稿第 11 节已同步。未做浏览器视觉或实际提交复核，未构建、提交或部署。

## DC 落地页 OEM 模块布局与内容扩充（2026-11-04）

- 标题与导读独立置顶，主体左侧保留现有完整产品图并增加品牌呈现说明，右侧先突出 100 pcs/model 与 7 days 两项信息，四项定制内容使用两列排列；手机纵向显示。
- 配色、Logo/标签、包装及产品配置说明补充客户需提供的参考色、Logo、型号命名、包装数量和电气需求。底部增加“提供需求—确认规格与设计—确认订单和排期”三步流程，以及跳转询盘的 Request OEM Pricing 入口。
- 保留既有 7 天交期信息，注明最终交期由配置、设计与数量确定，并在具体报价中确认；未增加免费样品、额外认证或固定回复时间承诺。文案稿第 9 节同步更新。
- 本地页面 200，2 项订货信息、4 项定制内容、3 步流程与询盘入口完整，模板输出、Prettier 和 diff 检查通过。未做浏览器视觉复核，未重新全站构建、提交或部署。

## DC 落地页 STO 图片替换（2026-11-04）

- 按用户两图对照，将 STO-40-PV 卡片中的旧白色产品宣传图替换为本次提供的白底座、橙色插拔模块 PNG，保存为 `src/assets/uploads/sto-40-pv-product.png`。复用现有 Img 组件，完整显示，布局与文案不变。
- 页面和优化图片响应 200，图片路径与卡片位置核验通过；未构建、提交或部署。新图标签实际为 STA-40 / 385V AC，已保留用户指定原图，此处 DC 版本图片待后续确认替换。

## DC 落地页 FAQ 布局与问答优化（2026-11-04）

- FAQ 改用页面统一 container 左右边界，增加导读；按 Selection & installation（6 题）和 Maintenance & ordering（4 题）分组，桌面两栏、手机单列。继续使用原生 details/summary，首题默认展开，提供右侧加减号和键盘焦点样式；底部增加跳转询盘的入口。
- 原 8 题调整为 10 题，新增询价资料和预接线汇流箱问答；按官方通用技术资料修正电压档位、Type 1/2、安装位置、极数和雷击后维护的绝对表述。未添加认证或性能承诺，OEM 交付日期由具体报价确认。
- 分组数据为唯一来源，平铺后生成 FAQPage；已核验 10 条页面问题和答案与结构化数据逐项一致、默认仅展开一题、询盘链接存在，并与文案稿第 10 节同步。顺带将三步选型区及文案稿同一 Pole count 表述改为按电路和接地方案确认，消除与 FAQ 的矛盾。
- 技术来源：DEHN 屋顶光伏指南、安装维护 FAQ、Ucpv 术语说明及 Phoenix Contact 光伏电路示例，具体链接记录在文案稿。
- 本地页面 200，Astro 检查 177 文件 0 errors / 0 warnings / 2 个既有 hints，Prettier 和 diff 检查通过。未做浏览器视觉和实际点击复核，未构建、提交或部署。

## DC 落地页应用场景布局与内容扩充（2026-11-04）

- 原左右长列表改为统一全宽标题和导读，下面为 5 个应用场景卡片及 1 个汇流箱入口；桌面三列、平板两列、手机一列。各场景补充使用位置、维护/布局考虑和 Selection focus，汇流箱入口使用深绿色背景。
- 底部独立为四项 Installation planning checklist，涵盖连接布局、导线与端子、后备保护、检查与更换；以选定型号说明和安装人员确认作为实施依据。
- 根据 Phoenix Contact 官方屋顶光伏保护指南及光伏防雷/浪涌手册核对通用选型原则，移除应用与极数/电压的固定绑定，尤其不再写“双 MPPT 固定 4P”；混合逆变器场景明确只描述光伏输入侧。未增加 Soltree 产品性能或认证承诺。
- 同步更新 `../SEO-Articles/_landing-pages/dc-surge-protector-copy.md` 第 8 节及参考来源。应用模块本地页面 200、5 场景 + 1 入口、5 个选型提示、4 项清单核验通过；汇流箱分类页 200，Prettier 和 diff 检查通过。未做浏览器视觉复核，未构建、提交或部署。
- Astro 检查 177 个文件：0 errors / 0 warnings / 2 个既有 hints；文案稿第 8 节完整性检查通过。

## DC 落地页测试与认证模块优化（2026-11-04）

- 主标题独立置顶，下方采用 2:3 两栏：左侧浅灰认证信息面板，突出 CE/TÜV/CB，并用分隔线组织标准和 CE 说明；右侧四项测试使用有序列表，统一行距和分隔线。
- 测试要求独立放在底部浅绿说明条；手机纵向排列，原有认证、标准、测试文案全部保留，证书图片仍待提供。
- 本地页面 200、修改前后可见文字一致、四项测试与独立要求完整；Prettier 和 diff 检查通过。未做浏览器视觉复核，未构建、提交或部署。

## DC 落地页系列图片与排列（2026-11-04）

- 按最新两图对照，将刚替换的 STD-40-PV 全橙色图片再次替换为用户本次提供的绿底座与橙色模块原图（1400×1400），沿用 std-40-pv-product.png 路径和原布局。原图已检查，页面和优化图片均返回 200；未构建、提交或部署。

- 按用户指定将原左侧 STD-40-PV 图片替换为新上传的橙色产品图，原文件保存为 `src/assets/uploads/std-40-pv-product.png`，复用 Img 优化并完整显示。
- 系列卡片改为每行一个，STD-40-PV 在上、STO-40-PV 在下；桌面保留左图右文，手机上下排列，原有文案与询价入口保留。
- 本地页面及优化图片 200，卡片数量、排列顺序、文案一致性与 diff 检查通过。未做浏览器视觉复核，未构建、提交或部署。

## DC 落地页材料对比表优化（2026-11-04）

- 固定组件列为 176px，并为优选材料、替代材料分别分配 28% / 23% 列宽，说明列占剩余空间；组件名称居中且不拆行，长文本保持左对齐，所有单元格垂直居中。
- 优选材料列增加浅绿色背景与深绿色文字；保留全部原文，手机继续使用表格内横向滚动。
- 本地页面 200、四列五行材料完整、修改前后文案一致，Prettier 和 diff 检查通过。未做浏览器视觉复核，未构建、提交或部署。

## DC 落地页三步选型区排版（2026-11-04）

- 在 DC SPD Selection Table 标题和表格之间增加英文导读，介绍极数、Ucpv、Up 和放电电流对比，衔接下方三步指南；使用全宽正文与既有字号、行距。本地页面输出与 diff 检查通过；未构建、提交或部署。

- Step 2 类型表调整列宽：前三列固定为 160/160/112px，说明列使用剩余宽度；前三列居中且不拆行，说明左对齐，所有单元格垂直居中。保留 Type 2 高亮和手机横向滚动。本地输出及格式核验通过；未做浏览器视觉复核，未构建、提交或部署。

- 三个步骤左侧编号和标题统一添加 lg:self-center，在桌面分栏时相对各自右侧内容垂直居中。手机保持上下排列。本地页面输出与 diff 检查通过；未做浏览器视觉复核，未构建、提交或部署。

- 按用户要求删除选型表下方 “1P and 4P configurations are available in the same voltage classes. Other voltages on request.” 说明及其段落。本地页面确认该句不再输出，diff 检查通过；未构建、提交或部署。

- 按用户截图将上方 DC SPD Selection Table 表头和单元格文字统一水平居中；保留原有数据与横向滚动。本地页面输出、diff 检查通过，未做浏览器视觉复核，未构建、提交或部署。

- 将选型指南标题从手机 30px / 桌面 36px 调至 24px / 30px，限宽并平衡换行。
- 原先左侧 Step 1、右侧 Step 2/3 的不对称排版改为三个独立步骤行；桌面共用 18rem 标题列与右侧内容列，手机上下排列，使用细分隔线统一层次。
- 选型表格保留横向滚动，并约束所在网格列以防撑出页面；原有参数、说明及警示文案全部保留。
- 本地页面 200，修改前后选型区可见文字一致，三步布局与表格滚动容器检查通过；Prettier、git diff --check 通过。未做浏览器视觉复核，未重新构建、提交或部署。

## DC 落地页工作原理区排版调整（2026-11-04）

- 三步流程上方间距统一为 mt-6（24px），与流程下方说明块的间距一致，桌面和手机使用相同间距。本地页面输出与 diff 检查通过；未做浏览器视觉复核，未构建、提交或部署。

- 最新调整：简介移出标题的 max-w-2xl 容器，以模块全宽显示为一个完整段落，自然换行；标题保持原有左对齐和宽度。本地页面输出核验通过，未做浏览器视觉复核，未构建、提交或部署。

- 按最新截图将顶部 How it works 标题与简介改为左对齐，宽度统一为下方 Product range 的 `max-w-2xl`，文字间距与字号沿用产品区样式。本地页面输出核验通过，未做浏览器视觉复核，未构建、提交或部署。

- 底部说明块继续微调：桌面左侧标题垂直居中，右侧正文移除 `max-w-3xl`，铺满剩余列宽。本地页面输出核验通过；未做浏览器视觉复核，未构建、提交或部署。

- 后续按用户截图移除工作原理区额外的 `max-w-6xl` 限制，流程与底部说明复用页面 `container` 宽度，与下方产品模块左右对齐。保留标题与简介的阅读宽度。本地页面输出和 diff 核验通过；未做浏览器视觉复核，未重新构建、提交或部署。

- 移除标题单独占左列的布局，改为居中标题与限宽简介，下方三步流程横向铺开，中间浪涌步骤使用浅绿色背景；手机纵向排列。
- “Why PV systems need it” 独立为底部说明块；正文由 18px 调至 16px，统一段落间距，保留原有全部可见文案。
- 本地页面 200、修改前后可见文字一致、三步流程完整、Prettier 和 diff 检查通过；Astro 检查 177 个文件，0 errors / 0 warnings / 2 个既有 hints。未做浏览器视觉验收，未构建、提交或部署。

## DC 落地页首屏合照替换（2026-11-04）

- 将首屏右侧两张产品卡片替换为用户指定的八款 DC SPD 完整合照，原文件保存在 `src/assets/uploads/dc-surge-protector-range.png`，复用 Img 组件优化输出。
- 图片按原始 3:2 比例自适应宽度，不裁切；保留上方 DC SPD range / Type 2 与下方认证说明。
- 本地页面及优化图片响应核验通过；未做浏览器视觉验收，未构建、提交或部署。

## DC 落地页首屏标题字号微调（2026-11-04）

- 按用户截图缩小首屏 H1：桌面 60px → 54px，手机 36px → 34px；保持文案、字重及行高不变。
- 源码与本地页面输出核验通过；未做浏览器视觉验收，未构建、提交或部署。

## DC 浪涌保护器落地页（2026-11-04）

- 新增 `src/pages/dc-surge-protector.astro`（英文），版式沿用 `/mcb`，文案按已定稿的 `../SEO-Articles/_landing-pages/dc-surge-protector-copy.md`。共 11 个模块，带 FAQPage 和 BreadcrumbList 结构化数据。
- 已加入 `src/lib/landing-pages.ts`（solar-pv-components / dc-surge-protector），也加进了 sitemap。
- 验证：astro check 0 errors / 0 warnings；本地 dev 下 /dc-surge-protector 返回 200，各模块、FAQ schema、sitemap 和资源中心入口都检查过。
- 遗留：产品图暂用旧的 SPD-DC 产品图；证书图片、新产品页链接待补；没有做浏览器视觉验收；没有构建、提交或部署。

## SPD 产品 Up 参数修正（2026-11-03）

- 12 款 SPD 产品（英文 `src/content/products/SPD-*.json` 和西语 `src/i18n/es/products/SPD-*.json`）的 Up 已按知识库统一：DC 1P/2P 1000V 从 3.6kV 改为 3.8kV；DC 3P/4P 原先是乱码 “– .0kV”，改为 3.8kV (1000VDC) / 5.0kV (1500VDC)；AC 1P–4P 原先是乱码 “– .0/.5kV”，改为 1.8kV。参数表、简介、正文、卖点和 meta 描述都已修改。
- 修改前的备份在仓库外 `../artifacts/spd-up-fix-backup-202611032313/`。JSON 校验通过，并已执行 `i18n-status --stamp`，西语 87/87 为最新。
- 未运行构建，未推送云端内容（content:push），未提交，也未部署。云端工作区里还是旧值，执行 content:pull 前要先推送，否则会被覆盖回旧值。

## 全部本地改动正式上线（2026-10-30，America/Los_Angeles）

- 功能提交 60efb6876100bd18a389864c32a3ec917c15248c 已推送 main，包含西班牙语站、独立 AI 设置、SEO 文章规划、运营计划以及内容同步工具；保留原有公开内容。Vercel Production dpl_4dFgHuxVrrbrjU67auh7XjNmm5g5 已 READY。
- 用户完成 Supabase 建表，实际 soltree_ai_settings 表读取 200、发布前为 0 行。Production 专用 AI_SETTINGS_ENCRYPTION_KEY 已配置并核验，未打印或提交密钥。线上 Key/模型需用户在新后台设置，本地配置未自动上传。
- 正式域名 www.elesoltree.com 只读验收 17 项通过：首页、西语首页/列表/产品详情/博客/关于/联系及 sitemap；登录后的设置、SEO 规划、运营计划页面；分类、产品、文章、内容索引、AI 设置和 SEO 规划 API 全部 200。西语 lang、自指 canonical 和英文 hreflang 断言通过，接口 no-store 通过；独立验证会话已退出。
- 本轮未改写云端产品或文章，未执行真实 AI 生成或付费调用；未做浏览器视觉交互验收。发布前 Node 22 代码检查、构建、完整 verify:deploy、AI/规划、后台全套及内容同步回归通过。发布后文档记录保留在本地，线上运行功能对应上述提交。

## 本地修改发布准备（2026-10-30，America/Los_Angeles）

- 用户已确认 Supabase 迁移执行成功；实际 soltree_ai_settings 表读取返回 200、0 行，Production 加密密钥再次核验通过且保留原值。发布前重新 fetch，准备提交并发布全部已验证改动。

- 后续：用户确认全部上线并完成 Vercel 设备登录，已核验原正式项目访问恢复。仅为 Production 创建并回读核验 AI_SETTINGS_ENCRYPTION_KEY，值未打印或写入代码。完整 verify:online-admin 和 verify:content-sync 补充通过，线上只读验收脚本已准备在仓库外 artifacts/elesoltree-check-full-release.mjs。
- 已向用户提供原 Supabase 项目 SQL Editor 及已有迁移文件，等待执行结果；现有业务数据权限无法执行 DDL。尚未提交、推送或部署。

- 用户请求发布另一工具修改的网站，已确认当前项目为 Astro-elesoltree，目标为原有 Vercel 项目及正式域名。获取 origin/main 后与当前 HEAD 一致，未提交、推送、部署或改写云端内容。
- 使用 Node 22.23.4：代码检查 0 errors / 0 warnings / 2 hints；构建、完整 verify:deploy（含仓库外隔离的真实生产函数）、AI 设置及 SEO 文章规划回归均通过。产物验证覆盖 276 路由、87 产品、19 文章和 5823 图片引用；西语译文状态正常。
- 原 Vercel 凭据返回 403，使用已有中文电脑名兼容补丁启动官方设备登录，等待用户完成授权。线上 AI 设置表只读查询返回 404 / PGRST205，需要应用 supabase/migrations/202610290001_ai_settings.sql，并配置 Production 的 AI_SETTINGS_ENCRYPTION_KEY。尚未修改线上配置或数据库。
- 检查日志在仓库外 artifacts/soltree-upload-{check,build,verify}.log。后续恢复平台访问、补齐依赖后发布，并核验正式站和受保护后台接口。

## 多语言架构与西班牙语样板（2026-10-29，进行中）

- 新增 `src/i18n/`：语言列表与路径/翻译工具（index.ts）、译文指纹（source-hash.mjs）、西语界面文案 ui.json、分类 taxonomy.json、87 个产品译文 products/*.json、术语表 GLOSSARY.md。英文仍是根路径，西语为 `/es/`；产品 URL 不翻译，只有存在译文的产品生成西语页面。
- 新增 `src/pages/[lang]/` 路由（首页、产品列表、分类、产品详情、联系页）；首页与联系页内容移入 HomePage/ContactPage 组件供两种语言共用。导航新增语言切换器（LanguageSwitcher）。
- BaseLayout/BaseHead：`<html lang/dir>`、og:locale、hreflang 只列出真实存在的语言版本并加 x-default；sitemap 增加西语页面。Catalog 客户端筛选的标题/说明改为读取当前语言译文。
- 询盘表单附带 `language` 字段，邮件标题对非英文询盘加语言标记；西语界面错误提示用通用文案，选项值保持英文方便销售阅读。
- 新增 `scripts/i18n-status.mjs`（缺失/过期/结构不一致检查，`--stamp` 标记为最新）；`scripts/verify.mjs` 增加西语页面 lang、canonical、双向 hreflang、sitemap 及未翻译产品不生成页面的检查。
- 已验证：类型检查 0 errors；仅含 1 个产品译文时的构建通过，英文 153 页可见文字与改动前基线完全一致，西语页 head 标签正确，构建日志无缺失译文提示。
- 已验证（全量 87 个产品译文）：`i18n-status` 结构检查通过并已打指纹（exit 0）；代码检查 0 errors / 0 warnings / 1 个既有 hint；构建通过且无缺失译文提示；`npm run verify` PASS（251 页，含 98 个西语页面的 lang/canonical/双向 hreflang/sitemap 检查）；英文 153 页可见文字与基线一致。未做真实浏览器视觉验收。
- 已知问题：部分英文源数据含乱码（如 SPD 的 “ – .0kV”、ATS 的 “ – .05s”、STQ 的 “ – .9kW”），译文按原样保留，需在英文后台修正后重新翻译对应字段。
- 第二批（博客与静态页）：新增 `src/i18n/es/articles/*.json`（19 篇）、`ui-about/ui-legal/ui-aerosol/ui-blog.json`、`ARTICLES.md`（文章翻译规则）；`getBlogPosts(lang)` 合并文章译文；新增 `[lang]/blog`、`blog/[slug]`、`blog/category/[group]`、`about`、`privacy`、`terms`、`solutions/aerosol-fire-extinguisher` 路由，页面内容移入 AboutPage/PrivacyPage/TermsPage/AerosolSolutionPage 组件；文章内站内链接自动指向西语版本；FAQ 结构化数据识别“Preguntas frecuentes”。`i18n-status` 增加文章结构检查（标题层级、图片、链接、标签数）。
- 已验证（第二批）：`i18n-status` 19/19 篇结构一致并已打指纹；代码检查 0 errors / 0 warnings；构建通过且无缺失译文提示；`npm run verify` PASS（278 页，其中西语 130 页）；英文 153 页可见文字与基线一致。未做真实浏览器视觉验收。
- 修复（2026-10-30）：“test” 分类早已在后台回收站，但 `src/lib/taxonomy.ts` 的 allProductGroups/allArticleGroups 未排除回收站分类，仍生成 `/blog/category/test`、`/resources/category/test`（含西语）；已在源头过滤（后台自身已过滤，不受影响）。重定向表移到 `src/lib/redirects.mjs`，astro.config 与 `localizeLinks` 共用，西语文章里的 `/products/din-rail-aerosol-fire-extinguisher` 现直接指向 `/es/products/Aerosol-DIN-Rail`；英文 301 跳转保留。验证：代码检查 0 errors，构建通过，verify PASS（276 页），英文除 2 个 test 分类页被移除外其余 151 页可见文字与基线一致。
- 下一步：用户本地浏览 `/es/` 确认样板；之后再做后台翻译状态管理和其他语言。

## 主题生成后保存格式报错已恢复（2026-10-29）

- 用户反馈生成主题后出现「提交格式不正确」。实际本地 Node SEO 中间件仍驻留旧版字段白名单，不认识 importAiCandidates/topics；页面经 Vite 已更新，配置热重载没有刷新原生模块缓存。无写入探针复现旧服务 400，修复后同一旧 revision 探针返回预期 409。
- 用 Astro 自身 dev stop 停止本项目服务，再以正常网络权限、仅监听 127.0.0.1 隐藏启动 Node 22 服务，确认 capabilities.aiPlanningImport 为 true，规划读取接口 200。原失败批次没有保存，未通过真实请求重新生成或写入测试主题。
- 保存服务增加 AI 候选导入能力标记，生成接口在调用模型前检查本地服务能力；版本过旧时提示重启，避免付费生成后才发现保存协议不兼容。增加能力标记回归断言；主题规划、原 SEO 后端回归通过。

## 独立 SEO文章规划与运营计划（2026-10-29）

- 用户限定本轮只做主题规划，并明确新增独立「SEO文章规划」模块，认可的主题再加入「运营计划」。新增 /admin/seo-planning 菜单/页面，运营计划从空页改为已确认主题列表，支持待安排、进行中、已完成。
- 复用 AI 设置中保存的 Key/默认模型，通过 Responses 结构化输出生成每批 1–10 个候选；按分类、语言、受众、目标和方向，使用匹配的已发布产品摘要与已有标题。校验字段长度、分类范围和重复标题，拒绝截断、无效 JSON 或结构错误；不执行实时搜索、不提供搜索量或排名数据，不引入知识库或配图。
- 候选自动保存历史批次，用户单项/勾选批量加入才创建运营事项；已加入项不可重复加入。复用既有私有 SEO 工作区、批次/事项格式及持久 CAS，不新增规划数据表，不创建或修改文章、不触发发布。
- 新 API /api/admin/seo-planning 与设置 API 共用管理员认证/本地隔离和服务端凭据入口。开发环境复用原 Node SEO 中间件及写队列，避免 Vite 对 sanitizer 的 CommonJS 模块加载错误；云端继续使用现有工作区服务。
- 新增 verify:topic-planning，验证模拟 AI 生成、分类与结果校验、历史保存、明确加入、重复/过期/并发拒绝、事项状态及无文章写入。原 SEO 后端、AI 设置、导航和登录返回回归通过；Node 22 检查 0 errors / 0 warnings / 1 个既有 hint，格式/diff、构建及产物隐私检查通过。
- 真实 Vercel Node 22 函数离线回归覆盖认证、生成候选→加入计划→更新进度、重复加入和过期生成请求不再次调用模型，并确认产品/文章/发布状态不受影响；所有网络均为离线模拟。本地两个页面及规划/设置读取接口 200，当前未添加测试主题到真实历史。
- 未执行真实付费生成、未改写云端内容、未提交或部署，未做真实浏览器视觉验收。上线仍需先完成上一轮 AI 设置的独立迁移与加密密钥配置；规划本身复用已存在的私有工作区。

## 本地 AI 设置连接失败已恢复（2026-10-29）

- 用户反馈获取模型列表提示连接失败。定位原 Astro 进程由受限网络环境启动，Node 出站请求触发 EACCES；正常网络进程访问 OpenAI 可收到 HTTP 响应。
- 仅停止已核对的本项目 4323 Astro 进程，使用 Node 22 在正常网络权限下隐藏启动同一本地服务，仍仅监听 127.0.0.1。未修改业务代码或网络代理设置。
- 通过后台 /api/admin/ai-settings 使用用户提供的 Key 执行 models 操作，返回 200 和 73 个文字模型；只输出模型数与部分名称，不记录密钥。未执行文字生成、未保存真实 Key 或默认模型、未修改线上配置。

## 后台 AI 设置（2026-10-29）

- 新增设置菜单、/admin/settings 页面及 /api/admin/ai-settings 接口；支持填写/更换 OpenAI Key、动态获取可访问文字模型、选择默认模型、短请求测试、保存和删除。测试及获取模型均不自动保存，不预选模型；翻译及 SEO 具体功能尚未开发。
- 固定调用 OpenAI 官方 /v1/models 与 /v1/responses，测试使用 store:false，最多 512 输出 token。API 上游错误不回显原文，防止密钥片段泄露；密钥不存入浏览器 Storage，保存后仅返回末四位掩码，空输入保留已保存 Key。
- 密钥及模型使用 AES-256-GCM 加密。本地文件与加密密钥位于仓库外 ../Astro-elesoltree-private，并禁止 Vite 直接读取该目录；线上独立私有表 soltree_ai_settings，使用服务端 AI_SETTINGS_ENCRYPTION_KEY，保持与文章、同步、发布内容隔离。独立 revision 和条件更新防止并发覆盖。
- 新增数据库迁移 202610290001_ai_settings.sql、环境变量模板与使用说明；线上认证复用管理员登录、同源和 JSON 校验。生产中本地模式标记不能绕过认证。
- verify:ai-settings 离线验证加密持久化、掩码、空 Key 保留、更换/删除、调研草稿不保存、上游失败脱敏、密文篡改和云端 CAS；导航、登录返回检查通过。Node 22 代码检查 0 errors / 0 warnings / 1 个既有 hint，构建、真实 Vercel 函数离线回归及产物隐私检查通过；函数回归覆盖 AI 匿名访问拒绝、保存/读取/删除、过期版本及跨站写入。
- 本地 /admin/settings 和读取 API 返回 200，跨站修改及私有密钥文件下载返回 403。未保存聊天中的真实 API Key，未发起付费请求、未改写线上数据或应用迁移、未提交或部署；未做真实浏览器视觉验收。线上启用前需应用该迁移并配置固定加密密钥。

## 移除 SEO 助手、知识库，新增运营计划（2026-10-29）

- 移除两项菜单、页面组件及专用 JS/CSS，取消旧页面路由注册和登录返回路径许可；不清理历史私有记录或底层存储兼容逻辑。
- 数据看板下方新增日历图标的运营计划，路径 /admin/operations；复用后台布局，暂显示“暂无运营计划”，尚无新增、编辑功能。
- 更新共享路由、页面切换、登录返回和实际函数回归。导航切换、前进/后退、编辑草稿保留和旧 URL 拒绝检查通过；Node 22 代码检查 0 errors / 0 warnings / 1 个既有 hint，构建及真实 Vercel 函数离线回归通过。
- 本地运营计划返回 200，UTF-8 文案及图标检查正常，HTML 不含旧模块。未做浏览器视觉验收、未改写云端内容、未提交或部署；保留其他未提交改动。

更新日期：2026-10-29（America/Los_Angeles）

## 当前基线与证据范围

- 项目：`Astro-elesoltree`，Soltree 电气独立站；正式域名 `https://www.elesoltree.com`。
- 本轮检查起点：Git 分支 `main`，HEAD `425ae21`；工作区及暂存区均无改动。
- 本地 `origin/main` 跟踪引用与 HEAD 一致。本轮未执行 fetch，不能据此保证远端没有后续更新。
- 本轮以源码、`package.json`、配置、Git 历史及此前同一会话的验证结果整理状态；未重新登录外部平台或修改线上数据。
- 此前 `425ae21` 已在原 Vercel 项目发布并通过正式域名浏览器验证。本轮文档修改仅在本地，不能算作新的发布。

## 代码结构

| 路径                                             | 当前用途                                                                    |
| ------------------------------------------------ | --------------------------------------------------------------------------- |
| `src/pages/`                                     | 首页、产品、分类、Blog、Resources、公司及联系页面；后台页面与 API           |
| `src/components/`、`src/layouts/`                | 公共页面组件、文章归档、卡片与布局                                          |
| `src/admin/`                                     | 中文管理界面、编辑器、分组、知识库、SEO 助手、GSC 看板、发布状态与导航      |
| `src/content/products/`、`src/content/articles/` | 公开产品与文章 JSON；读取时过滤草稿和回收站内容                             |
| `src/content/settings/taxonomy.json`             | 产品、文章与知识库共用分类资料；保留产品/文章显示与排序字段                 |
| `src/lib/`                                       | 内容读取、分类匹配、SEO 规则、认证、云端工作区、媒体、发布和 GSC 服务端逻辑 |
| `scripts/`                                       | 本地内容服务、资源准备、备份和模块验证脚本                                  |
| `supabase/migrations/`                           | 线上内容工作区及版本备份的数据库迁移                                        |
| `public/`、`src/assets/`                         | 公开静态资源与 Astro 图片处理资源                                           |
| `astro.config.mjs`、`vercel.json`                | Astro、Tailwind、动态后台路由及 Vercel 构建配置                             |

技术栈：Astro 7.4.2、Tailwind CSS 4、TypeScript/JavaScript、Prettier、Decap CMS；Vercel Node 22，Supabase 提供后台认证及私有内容存储。具体版本以锁文件为准。

## 已完成的功能

### 网站与内容

- 已从旧 Next.js 站迁移至 Astro，沿用原 Git 仓库、Vercel 项目及域名；保留原产品和文章链接，并提供相关历史地址重定向。
- 已有首页、产品列表/详情、分类、Blog 列表/详情、公司介绍、联系、隐私与条款等页面。
- 具有绿色品牌导航、产品下拉菜单、Company 菜单、图片展示、FAQ 和 WhatsApp 联系入口。
- 已实现页面标题与描述、canonical、结构化数据、sitemap、robots 和 RSS。
- 本轮读取本地公开内容：87 个产品 JSON、19 篇文章 JSON，均为已发布且未删除状态；共 7 个未删除一级分组、14 个未删除二级分类。分组为可维护数据，不应在后续代码中写死数量。
- Resources 提供产品关键词落地页归集；当前登记 1 个商业落地页，页面继续由代码维护。
- 联系表单已有服务端邮件与可选数据库存储逻辑；本轮未测试真实邮件或询盘写入。它与已移除的后台询盘统计是不同功能。

### 内容后台与分类

- 已有受保护的线上后台登录、中文产品/文章管理、编辑、图片上传、预览与回收站相关操作。
- 本地模式保存本机文件并生成备份；线上模式保存私有云端工作区，使用版本校验避免并发覆盖。
- 保存与网站发布分开；明确发布后，将可公开内容提交原仓库并跟踪构建状态。知识库、规划资料和未发布内容不进入公开快照。
- 后台使用清晰路径，如 `/admin/products`、`/admin/articles`、`/admin/groups`、`/admin/knowledge`、`/admin/analytics`、`/admin/seo`，兼容旧入口。
- 分组管理已合并成一个列表：产品、文章、知识库共用名称与分类，显示产品数和文章数；产品/文章显示开关分别保留，界面排序操作同步两者顺序。
- Blog 前台只展示一级分组，二级分类保留用于后台文章归档、知识库及 SEO 规划。
- 发布按钮已固定在页头；已移除“保存与发布”下拉框，以状态文字显示构建及完成结果。

### 知识库、SEO 与 GSC

- 知识库为独立菜单，支持分类资料维护及 TXT、Markdown、CSV 文本导入；暂不提取 PDF 内容。
- SEO 助手已有按分类生成候选主题、确认主题、写作任务/简报及基础内容诊断的代码。基础检查不等同于真实流量或索引诊断。
- 已有可选外部联网调研适配器，需要单独配置服务端 API 与模型；本轮未核对其线上启用或付费调用情况，不能视为已经启用。
- GSC 搜索看板已接通：点击、展示、CTR、平均排名、每日趋势、国家、设备、页面和关键词；支持日期筛选、明细及手动刷新。
- GSC 读取已确认的网页搜索数据，按太平洋日期展示，缺失日期不补成零；有短时实例缓存，明细最多展示各维度前 1,000 条并标记截断。
- 已按用户要求移除“访问与询盘”看板入口及占位内容；GA 与相关统计接入暂不安排。

## 当前未完成与待核实事项

- 当前没有尚在实现中的已授权功能任务；红色发布提示已正式部署，文章两级分类控件已本地完成、尚未部署。
- 尚未完成 GSC 与单篇文章的自动关联诊断、低流量原因评估、自动改稿建议或自动文章发布。
- GSC 暂无后台定时同步任务和独立历史归档；当前为打开页面、切换日期或手动刷新时加载。
- 搜索表现记录不能直接证明页面未被收录；独立索引检查未接入。
- 旧说明文档仍有迁移期及数据源未接入时期的描述，需要后续校对；当前实现以相应源码为准。本轮未扩大修改原说明文档。
- 此前本地验证发现：后台文件监听生成新备份时，可能晚于构建排除清单生成，导致私有文件检查失败；单独重建曾通过。后续应处理时序问题，不得跳过私有文件检查后部署。
- README 记载了历史缺图及依赖审计遗留事项；本轮未重新逐图核验或执行依赖审计，后续处理前应重查，不能声称已全部修复。

## 验证与发布记录

以下为此前任务的实际记录，不是本轮重新执行的结果：

| 版本/阶段            | 已有证据                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| `566da07`、`afc7311` | GSC 服务端只读读取、实际搜索指标、日期筛选、趋势及明细；正式域名浏览器验证通过                     |
| `bdae645`            | 看板只保留 GSC，旧浏览器保存的访问/询盘选项不再恢复；正式验证通过                                  |
| `5069a77`            | 页头发布按钮可见、确认窗口可打开并取消，桌面与手机检查通过                                         |
| `702bbab`            | 用户通过后台发布了分类数据，后续界面修改已保留该更新                                               |
| `425ae21`            | 共用分组列表、双计数、独立显示开关、同步排序和无下拉发布状态；分类/UI/构建检查及正式浏览器验证通过 |

后续按实际改动选择检查，不需要每次全量运行：

- 文档：只核对相关文件、格式及 Git diff。
- 类型/页面：`npm run check`。
- 分类：`npm run verify:taxonomy`；后台：`npm run verify:online-admin`。
- GSC：`npm run verify:analytics`；SEO：`npm run verify:seo`。
- 准备部署时：`npm run build`，再按需要运行 `npm run verify:deploy` 和真实运行时/浏览器检查。
- 使用项目指定的 Node 22；Windows 下可用 `npm.cmd`。构建会生成文件，不应当作只读检查。
- 提交、推送与发布必须符合当次用户授权；记录结果时写明是本地验证、预览还是正式上线。

## 本轮完成记录：开发管理机制

- 日期：2026-10-29（America/Los_Angeles）。
- 新建：`TASK.md`、`PROGRESS.md`。
- 修改：仅在 `AGENTS.md` 末尾追加新对话读取任务/进度、完成后更新记录等规则，原有内容保留。
- 验证：读取代码结构、配置、内容数量及 Git 历史；核对原规则保留和最终变更范围；检查新文档格式。
- 本轮未修改网站功能代码、未删除文件、未执行构建或业务测试、未自动提交/推送/发布。
- 下一步：用户确认新的开发目标后，先更新 `TASK.md` 的范围与验收条件，再实施；完成后更新本文件。

## 本轮完成记录：内容列表发布提示

- 日期：2026-10-29（America/Los_Angeles）。
- 修改 `src/admin/product-table.js`：产品、文章列表共用的线上提示改为「任何修改，点击顶部“发布到网站”后更新正式网站。」。
- 修改 `src/admin/theme.css`：仅线上模式的该提示使用红色 `#dc2626`；本地提示保留原样。
- 验证：`git diff --check`、`node scripts/verify-online-admin-ui.mjs`、两个源码文件的 Prettier 检查通过。本次环境默认 Node 为 25.2.1，未进行 Node 22 构建或浏览器视觉验收。
- 未更改保存、删除、发布逻辑；未提交、推送或上线。线上界面需要部署代码后才会显示新提示。

## 本轮完成记录：发布提示正式部署

- 日期：2026-10-29（America/Los_Angeles）；用户明确授权「部署一下」。
- 仅提交两个界面文件：`src/admin/product-table.js`、`src/admin/theme.css`；提交 `b45616b3e745b2a1f2a0507cceb1e5a9fda473e3` 已推送 main。原有管理文档改动保留在本地。
- Node 22.23.4：`npm run check`（0 errors，1 个既有 hint）、`npm run build`、`npm run verify:deploy`、后台 UI/导航和 `verify-online-admin-runtime.mjs` 均通过；私有文件部署检查通过。
- 生产依赖审计：0 critical、5 high，与 README 已记录的上游遗留一致；本轮未修改依赖。
- Vercel Production：`dpl_87Z4XqpDVh4Rf58MQTrXE5mN7UBh`，状态 Ready，正式域名 `https://www.elesoltree.com` 已绑定该部署。
- 线上只读核验：产品和文章管理均返回 200，HTML 包含线上红色提示样式，实际引用的后台 JS 包含新文案；首页返回 200。创建并退出独立验证登录，无内容写入；未做浏览器视觉验收。
- 独立核验脚本：工作区 `artifacts/elesoltree-check-publish-reminder.mjs`。后续用户刷新后台即可看到新提示。

## 本轮完成记录：文章分类两级选择

- 日期：2026-10-29（America/Los_Angeles）。
- `src/admin/config.ts`：文章分类标签改为「文章分类」，保留 optional 配置由编辑器显示「（可选）」；本地及云端 taxonomy 均生成一级分组、二级分类选项，过滤删除项，未归组的有效分类仍可选择。
- 新增 `src/admin/article-category.js` 并在 `src/admin/main.js` 注册：两个原生下拉框联动；已有分类回显，切换一级清空二级，可清空保存草稿。主分组只用于筛选选项，仍保存原有 `relatedCategorySlug`；共用二级分类保留现有多分组归集规则。产品子类型维持原有独立字段，不迁移已有数据。
- `src/admin/theme.css`：两级控件样式、键盘焦点和窄屏自动换行布局。
- `scripts/verify-online-admin-ui.mjs` 增加联动交互检查：回显、分组筛选/切换、共享分类、清空、旧分类保留、禁用状态、隐藏云端分类、删除分组与未归组分类。
- Node 22.23.4：`npm run check` 通过（0 errors，1 个既有 hint），`npm run verify:online-admin` 全部通过；新增边界用例后 UI 脚本复验通过，Git diff 与修改文件格式检查通过。
- 未做浏览器视觉验收或生产构建；未提交、推送或部署本轮改动，线上仍为 `b45616b`。

## 本轮完成记录：恢复本地后台菜单访问

- 日期：2026-10-29（America/Los_Angeles）。
- 用户反馈本地 `/admin/groups` 404；实际复现 `/admin` 200，而分组和新建文章 404。
- 检查确认 4323 运行的是本项目此前启动的 Astro 开发进程（PID 31816）。通过 Astro 自带 `dev stop` 停止该进程，以 Node 22.23.4 在相同目录和端口重启（PID 35048）；8081 内容代理保留。
- 重启后 `/admin`、分组、产品、文章、新建文章、知识库、SEO、搜索看板 8 个入口均返回 200，且包含后台页面标识。说明当前源码路由正常，旧进程未使用当前路由状态。
- 本次不需要修改路由或启动代码；未改内容、未提交或部署线上。忽略的启动日志：`admin-dev-restart.log` 和 `admin-dev-restart-error.log`。

## 本轮完成记录：Markdown 编辑区滚动与字段重叠修复

- 日期：2026-10-29（America/Los_Angeles）。
- 根因：后台样式 `[class*='EditorContainer']` 同时匹配 Decap 外层 `EditorContainer` 和内部 `RawEditorContainer`，使 Markdown 内部容器也被固定定位、赋予整页宽高，挡住滚动并与后续封面、网址等字段叠加。
- `src/admin/theme.css`：统一将外层编辑器选择器收紧为 `[class*='-EditorContainer']`，适配现有 Emotion 类名边界；全部 10 处外层布局、工具栏及移动端规则同步调整，避免仅覆盖单个症状。
- `scripts/verify-online-admin-ui.mjs`：使用已安装的 PostCSS、css-select 和 domhandler 对嵌套容器进行回归检查，确认外层仍匹配固定布局而内部 Markdown 不匹配。旧样式下实际失败，修复后通过，无新增依赖。
- Node 22.23.4 `npm run check`（0 errors，1 个既有 hint）、`npm run verify:online-admin` 全部通过，格式与 Git diff 检查通过。本地 `/admin/articles/new` 返回 200，已包含收紧后的选择器且不再包含旧选择器。
- 浏览器工具此前因无法确认当前网址停止操作，本轮依据用户截图、依赖源码和选择器回归验证；未声称完成真实滚动视觉验收。
- 用户新增的 taxonomy 修改和此前文章两级分类代码均保留；未保存或更改用户草稿，未提交、推送或部署线上。

## 本轮完成记录：文章编辑页标题说明同行

- 日期：2026-10-29（America/Los_Angeles）。
- 仅修改 `src/admin/theme.css`：标题和说明使用同行布局，取消说明上方外边距；只在标题未 hidden 时启用 flex，避免其他后台页面误显示标题。
- 桌面编辑面板顶部从 header + 102px 改为 + 78px，高度同步增加 24px，底部位置不变。800px 及以下说明换行，恢复原有顶部和高度以防重叠；新建和编辑文章共用。
- Node 22.23.4：Prettier、后台 UI/Markdown 布局回归及 Git diff 检查通过；本地新建文章页返回 200，已提供新标题及编辑区样式。未做浏览器视觉验收。
- 保留已有分类、滚动修复和用户 taxonomy 修改；未更改草稿、未提交或部署线上。

## 本轮完成记录：完整富文本与封面上传前移

- 日期：2026-10-29（America/Los_Angeles）；用户明确选择完整富文本（字体、字号、颜色、对齐、表格等）。
- 新增依赖 `jodit@4.18.12`、`sanitize-html@2.18.1`，锁文件同步；编辑器和样式随项目自托管，不加载第三方在线编辑器服务。原 Decap Markdown 控件不支持这些完整排版能力，因此接入独立富文本控件。
- `src/admin/rich-article-editor.js`、`src/admin/main.js`、`src/pages/admin.astro`：注册富文本正文控件及样式，提供撤销/重做、段落与 H2–H4、字体/字号、粗斜体/下划线/删除线、文字/背景色、对齐、列表/缩进、图片、链接、表格、分隔线、符号、清除格式、HTML 源码及全屏。正文图片复用 Decap 媒体库和原上传路径；直接文件拖拽上传未启用。
- 保留 `content` 字符串字段：原 Markdown 打开时转换为可视内容，但不触发自动保存改写；用户实际修改正文后才写入富文本标记和 HTML。源码模式改为 HTML。清空正文时回传空字符串，保持发布前必填校验。
- `src/admin/config.ts`、`src/admin/theme.css`：封面上传移到标题之后、正文之前，SEO 分区移至文章网址字段；富文本编辑区域、表格和全屏样式同步适配。已有文章分类和布局改动保留。
- `src/lib/article-format.mjs`、`src/lib/rich-article.mjs`、`src/lib/markdown.ts`、`src/components/ArticleDetail.astro`、`src/lib/seo-diagnostics.mjs`：新增格式识别、HTML 安全标签/样式白名单、目录锚点、FAQ/SEO 文本提取及排除 HTML 标签的阅读时长计数；旧 Markdown 继续使用原渲染路径。
- 新增 `npm run verify:rich-article`：19 篇原文章 HTML/目录不变；富文本字号颜色对齐、表格合并格、图片路径、JSON 往返、目录/FAQ、安全过滤、SEO、无打开即改写、回显、插图、清空和销毁生命周期验证通过。后台 UI 脚本增加上传字段顺序断言。
- Node 22.23.4：代码检查通过（0 errors；初次检查含既有 await hint 和一个随后修正的未使用参数 hint）、构建、`verify:online-admin`、SEO 诊断、`verify:deploy` 及离线实际 Vercel 函数运行检查通过。最终清空正文保护补充后富文本回归再次通过。
- 本地新建文章页及编辑器模块、配置模块均返回 200，页面已包含富文本样式；生产依赖审计仍为 0 critical、5 high，新增两个依赖未被列入漏洞项。
- 未完成真实浏览器工具栏/滚动视觉验收（浏览器控制工具此前无法确认当前网址）；未保存用户草稿、未修改文章数据，用户 taxonomy 改动保留；未提交、推送或部署线上。

## 本轮完成记录：Markdown 模式与文件导入并存

- 日期：2026-10-29（America/Los_Angeles）；用户明确要求保留 Markdown 编辑和 `.md` 导入两者。
- `src/admin/rich-article-editor.js` 新增「富文本 / Markdown / 导入 .md 文件」入口，保留完整富文本工具栏；切换但不编辑不改写原内容，隐藏富文本编辑器的 change 事件不覆盖 Markdown。
- 新增 `src/admin/article-markdown.mjs`，复用已安装 HTML/Markdown 转换库，无新增依赖；普通内容转 Markdown，字体颜色/对齐/合并表格/图片尺寸等特殊排版保留为 HTML 块。富文本切回时恢复排版。
- 导入支持 `.md`、`.markdown`、UTF-8（含 BOM），统一换行、限制 2 MB，拒绝编码异常；非空正文显示替换/取消选项。只更新 content，不修改标题、封面和网址；不自动上传文档中的本机图片。
- `src/lib/article-format.mjs` 和 `src/lib/markdown.ts`：区分新编辑 Markdown 与既有内容，新导入/编辑内容渲染经过富文本同一安全过滤；旧 Markdown 路径保留。FAQ 支持新 Markdown 内混合 HTML 排版；SEO 诊断补充 HTML 标题层级识别。
- 样式/字段提示更新；测试补充模式切换、导入覆盖保护、格式保留、扩展名/大小/编码异常、安全渲染和隐藏编辑器防覆盖。19 篇旧文渲染一致，相关回归与后台检查通过。
- Node 22.23.4 代码检查（0 errors，1 个既有 hint）、构建及 SEO 诊断检查通过；本地新建文章和两个编辑器模块均返回 200。未做真实浏览器点击验收，未保存用户草稿或部署线上。

## 本轮完成记录：封面方形虚线上传框

- 日期：2026-10-29（America/Los_Angeles）。
- 仅修改 `src/admin/theme.css`：文章封面原生图片控件的空态按钮改为 180px 方形浅灰虚线框、圆角及居中图片加号图标；已选图片预览改为同尺寸，保留原更换/移除按钮和媒体库逻辑。
- 通过图片字段及文章编辑器选择器限定范围，产品图片和正文插图不受影响；保留原按钮文字供辅助技术读取，键盘焦点仍沿用现有样式。不改变封面必填条件或字段顺序。
- Node 22.23.4：Prettier、后台 UI 验证和 Git diff 检查通过；本地新建文章页返回 200 并提供新上传框与图标样式。未做浏览器视觉验收。
- 未保存或修改文章/分类数据，未提交、推送或部署线上。

## 后续调整：缩小封面上传框

- 用户反馈原框过大，`src/admin/theme.css` 将文章封面上传框与预览从 180×180 调为 100×100，图标显示为 32×32；保留方形虚线样式及原操作。
- 格式、Git diff 检查通过，本地页面返回 200 并提供新尺寸样式；未提交或部署线上。

## 后续调整：Markdown 默认高度

- 用户要求 Markdown 输入区域默认与富文本一样高；`src/admin/theme.css` 在原 `min-height` 外显式设置 `height: 440px`，避免默认 textarea 行数和通用输入框样式使空编辑区过矮，保留垂直拖动。
- 格式与 Git diff 检查通过，本地页面返回新样式；未保存草稿、未部署线上。

## 后续调整：封面缩为 50×50

- 按用户指定，`src/admin/theme.css` 将封面空态和预览从 100×100 调为 50×50，图标改为 24×24；保持原生媒体库、更换和移除操作。
- 格式及 Git diff 检查通过；未提交或部署线上。

## 本轮完成记录：SEO 字段命名与 Focus Keyword

- 日期：2026-10-29（America/Los_Angeles）。
- `src/admin/config.ts`：共用 SEO 字段显示为 Meta Title、Meta Description，保留可选和标题/简介回退规则；文章网址显示为「文章网址（URL Slug）」。文章新增可选「Focus Keyword（核心关键词）」及用途说明。
- `src/admin/main.js`、`src/lib/data.ts`：保存时去首尾空白，接受缺省/空文本；校验文本类型及最大 200 字符，不强制旧文章补填，不新增评分或关键词密度功能。
- `src/lib/admin-publish.mjs` 与 `src/pages/api/admin/publish.ts`：文章公开快照移除 focusKeyword，云端原记录保留。字段不映射到 metaKeywords，不进入网页标签或公开 Git；其他未支持私有字段仍被原公开快照校验拒绝。
- 测试补充字段标签/可选性、云端保存保留、异常类型/长度以及公开导出剔除/原记录不变。Node 22.23.4 `verify:online-admin`、代码检查（0 errors，1 个既有 hint）、格式和 diff 检查通过；本地文章页/配置模块返回 200。未做浏览器视觉验收或本轮生产构建。
- 用户分类和此前编辑器改动保留；未保存用户文章、未提交、推送或部署线上。

## 后续调整：SEO 字段顺序与英文大小写

- `src/admin/config.ts` 将 Focus Keyword 移到文章网址正上方，「URL Slug」改为「Url Slug」，其他英文标签保持每词首字母大写。
- `src/admin/theme.css` 的 SEO 分区标题移至 Focus Keyword 前，保持字段归组一致；使用说明与标签检查同步更新。
- 格式、后台 UI 和 Git diff 检查通过；未修改用户内容或部署线上。

## 本地运行检查：2026-10-29

- 用户要求运行本地服务器。检查发现 4323 网站已运行，8081 内容代理未运行；使用 Node 22 启动 `scripts/admin.mjs`（PID 48884），复用现有网站并恢复代理与自动备份监听。
- 验证后台首页、新建文章、文章列表接口和代理只读 info 请求均返回 200；未提交或部署线上。

## 后续修复：字段标签强制全大写

- 用户截图显示配置已使用首字母大写，但界面仍全大写；根因为 Decap 原生 FieldLabel 的 `text-transform: uppercase`。
- `src/admin/theme.css` 对共用 FieldLabel 设置 `text-transform: none`，修复文章/产品等编辑字段标签的统一根因，按配置原文显示。
- 格式、Git diff 检查通过，本地文章页返回 200 且包含覆盖规则；未保存内容或部署线上。

## 本轮完成记录：时间与最后修改双栏

- 日期：2026-10-29（America/Los_Angeles）。
- `src/admin/article-dates.js` 新增原生 datetime-local 控件；「时间」可选日期时分且为必填，新文章首次挂载默认当前时间，旧日期保持不变；转换按 America/Los_Angeles，校验无效日期及夏令时跳过的分钟，保存 ISO 时间。
- `src/admin/config.ts`、`src/admin/main.js`：原发布日期控件换为「时间」，最后修改保留系统保存时记录且只读，展示为日期时分；相关校验提示同步。
- `src/admin/theme.css`：日期字段桌面双栏，其余文章字段保持整行，800px 以下日期恢复各占一行；最后修改使用浅灰只读样式。
- Node 22.23.4 代码检查通过（0 errors，1 个既有 hint）；后台 UI 脚本新增日期/时区转换、冬夏令时、无效输入及旧值不改写检查并通过。格式、Git diff 检查通过，本地新建文章返回 200 并提供双栏样式。
- 未做真实浏览器视觉验收，未保存用户文章或部署线上。

## 后续调整：已选封面操作横排

- 根因为封面整个控件容器限制为 50px，导致更换/移除按钮文字挤成多行；`src/admin/theme.css` 在已选图片状态解除外层宽度限制。
- 缩略图保持 50×50，缩略图及操作区 flex 横排、居中对齐；更换和移除按钮自适应文字宽度并禁止文字折行，窄屏可整组换行。
- 格式及 Git diff 检查通过，本地文章页返回 200 并提供横排样式；未修改媒体选择逻辑或用户内容，未部署线上。

## 本轮完成记录：取消文章简介，摘要复用 Meta Description，标签块输入

- 日期：2026-10-29（America/Los_Angeles）。用户后续改为要求 Blog 列表使用 Meta Description，覆盖此前首段优先的提议。
- `src/admin/config.ts` 移除 excerpt 输入；`src/admin/main.js` 及 `src/lib/data.ts` 移除发布所需 excerpt 校验，历史 JSON 不做删除或迁移。
- 新增 `src/lib/article-excerpt.mjs` 共用摘要函数：优先取非空 Meta Description，缺省时提取 Markdown/富文本正文的首个可读段落；忽略标题、纯图片、代码/表格等，首段兜底最多 220 字符。加载后的 excerpt 作为兼容性派生值供 Blog 卡片、RSS、网页描述和结构化数据使用，不再读取旧的手填简介。
- 后台预览、文章管理摘要及 SEO 诊断/规划与快照调用同一函数；Meta Description 提示和使用说明同步更新。
- 新增 `src/admin/article-tags.js`：单行输入，回车/失焦添加、灰色标签块、× 删除，忽略大小写重复项及空值，中文输入法选词回车不提交；仍以原 tags 数组保存。`src/admin/theme.css` 增加相应样式。
- 测试覆盖 Meta Description 优先、Markdown/HTML 首段提取、纯图片/代码跳过、标签增删/去重/输入法、无简介发布校验；Node 22.23.4 代码检查（0 errors，1 个既有 hint）、后台、富文本、SEO 回归、构建、格式及 diff 检查通过。
- 从生成的 Blog HTML 实际核对 19 张卡片，摘要均匹配 Meta Description 或正文首段；本地新建文章/标签模块返回 200。未做真实浏览器交互验收。
- 未修改用户文章/分类数据，未提交、推送或部署线上。

## 后续调整：文章产品子类型入口和默认作者

- 按用户要求，`src/admin/config.ts` 将文章 relatedProductTypes 控件设为 hidden，编辑界面不再显示产品子类型，但保留旧文章已有值及分类兼容逻辑；产品编辑器的产品子类型不变。
- 新建文章作者默认值改为 `Soltree Engineering Team`，已有作者不批量覆盖，仍可手动修改。
- 格式、后台 UI 和 Git diff 检查通过，本地配置模块返回 200 且包含新默认值；未保存用户文章、未提交或部署线上。

## 后续调整：文章管理标题说明同行

- `src/admin/theme.css` 将文章列表「管理文章内容、分类与发布状态。」与「文章管理」标题同行，基线对齐、间距 16px，窄屏自动换行，说明上方外边距归零。
- 仅作用于 `#studio-articles`；格式及 diff 检查通过，本地文章列表返回 200 并提供新样式。未保存内容或部署线上。

## 后续调整：产品管理标题说明同行

- 将既有文章管理标题同行样式复用到 `#studio-products`，产品管理说明移到标题右侧；其他后台模块不变，窄屏仍自动换行。
- 格式、Git diff 检查通过，本地产品管理返回 200 并提供共用样式；未修改内容或部署线上。

## 本轮完成记录：产品时间补录

- 日期：2026-10-29（America/Los_Angeles）。用户要求列表缺失的创建/更新时间补为今天。
- 备份：`.content-backups/2026-10-29T14-19-48-009Z`；检查本地 87 个产品均缺少两个时间字段后，只补入 createdAt / updatedAt 为 `2026-10-29T14:19:47.978Z`（太平洋时间 2026-10-29 07:19）。这是用户指定的补录时间，不代表历史真实创建时间。
- 写入后逐个对比确认其他字段未变；本地产品列表接口返回 200，87 条记录均包含两个时间字段，Git diff 检查通过。
- 已有其他未提交修改保留；未修改云端私有工作区、未提交或部署线上。用户刷新本地列表可查看。

## 本轮完成记录：产品分类两级联动与子类型隐藏

- 日期：2026-10-29（America/Los_Angeles）。
- `src/admin/config.ts`：产品主分类复用文章现有一级分组/二级分类控件，保持可选、已有分类回显、切换一级清空二级和草稿清空能力；本地使用产品 taxonomy，云端初始化后使用最新产品分组配置。
- 产品 productTypes 改为 hidden，保留已有值；额外产品分类保持原有多选。共用 categoryGroups 生成器，不新增重复控件；删除已无调用的子类型选择配置及选项构建，提示文字同步去掉手选子类型要求。
- 后台 UI 验证补充产品分类控件、可选性、隐藏子类型及新云端分类刷新检查并通过；Node 22.23.4 代码检查（0 errors，1 个既有 hint）、格式及 diff 检查通过，本地新建产品与配置模块返回 200。
- 未改写产品/文章数据，保留此前时间补录；未做浏览器视觉验收、未提交或部署线上。

## 后续调整：关闭同步滚动并隐藏按钮

- `src/pages/admin.astro` 在 CMS 初始化前将原生 `cms.scroll-sync-enabled` 首选项设为 false，覆盖此前开启状态；`src/admin/theme.css` 隐藏中英文同步滚动按钮，保留预览开关。
- 不改第三方依赖或左右编辑/预览内容，刷新后使用独立滚动。格式、后台 UI 和 Git diff 检查通过，本地产品编辑页返回 200 并包含关闭设置及隐藏样式。
- 未保存用户内容、未提交或部署线上。

## 本轮完成记录：产品图集卡片与逐图 Alt（最多 8 张）

- 日期：2026-10-29（America/Los_Angeles）。用户先提出 6 张，在获知 52 个产品已有超过 6 张图片后明确改为最多 8 张；检查现有最大 8 张，不裁剪或删除历史图片。
- 新增 `src/admin/product-gallery.js` 并注册：缩略图卡片、批量媒体库选择、拖拽/箭头排序、主图标记、移除、预览、逐图 Alt 编辑；限额一次选多超出时拒绝本次添加并提示，不静默截断。新图通过既有媒体库上传，不直接改存储实现。
- `src/admin/config.ts` 合并原单封面/完整图集/独立说明入口；image 和 imageAlts 保留隐藏，images 使用卡片控件。编辑中图片与 Alt 作为一项移动，保存前转换为原 image、images:string[]、imageAlts:string[] 格式，首图同步封面；保留空 Alt 占位，修正原字符串列表过滤会使空说明被压缩、导致错位的问题。
- `src/lib/data.ts`、`src/lib/admin-validation.ts` 和保存钩子限制最多 8 张；前台 ProductImageGallery 空 Alt 使用产品名回退；ProductCard 在封面确为图集首图时使用首图 Alt，避免历史封面与图集不同导致说明错配。
- 新增 `npm run verify:product-gallery`，验证 87 个现有图集不被修改、Alt 对齐、移图后主图/说明同步、批量去重、8 张限制、删除和清空；后台 UI 增加统一控件配置断言，云端验证新增 9 张拒绝检查。
- Node 22.23.4 图片图集、后台、产品/文章 API、代码检查（0 errors，1 个既有 hint）与构建通过；本地产品编辑页及卡片模块返回 200。构建后追加的卡片 Alt 安全回退已完成格式检查。未做真实浏览器点击/拖拽验收。
- 使用说明同步；未改写产品图片数据、未实际上传/删除用户文件、未提交或部署线上。

- 补充验证：npm run verify:deploy 通过，152 页面、87 产品、19 文章及 2950 个图片引用检查通过；仅校验构建产物，未部署。

## 产品编辑区加宽（2026-10-29）

- 产品新建/编辑路由增加 product 编辑标记；表单解除 Decap 默认 800px 最大宽度，桌面左右留白 62px（对应文章外边距 32px + 内边距 30px），窄屏 36px。嵌套表单不重复增加留白。
- 仅调整编辑区布局；格式、后台 UI、导航和 Git diff 检查通过。未保存产品内容、未部署，未做真实浏览器视觉验收。

## 产品图片卡片简化（2026-10-29）

- 移除左右排序按钮及对应样式，保留拖拽排序；提示文案同步。预览改为居中淡色眼睛 SVG，无文字底框。
- 删除按钮缩为 18px 圆形，默认隐藏；图片悬停或键盘焦点进入后出现。无悬停能力的触屏保留可操作入口。
- 图集回归增加实际拖拽处理、无箭头与 SVG 预览断言并通过，87 个既有产品保留；格式和 diff 检查通过。未部署，未做真实浏览器视觉验收。

产品网址字段改名（2026-10-29）：产品网址 ID 改为网址后缀（Url Slug），仅调整显示名称。格式与 diff 检查通过，尚未部署。

网址大小写调整（2026-10-29）：按用户最新要求，产品及文章网址标签统一使用 URL Slug，仅 URL 全大写。格式及 diff 检查通过，尚未部署。

## 产品补充分类两级选择（2026-10-29）

- 复用现有一级分组/二级分类控件，新增补充分类包装：选完二级自动加入下方列表，可继续选择、去重及逐项移除，历史不可选分类也保留可见。
- 模块移至产品字段末尾；原 additionalCategorySlugs 字符串数组存储及主分类逻辑保持原样，云端初始化同步最新两级配置。
- 后台 UI 回归覆盖底部位置、旧值保留、重复选择、切换分组不清空已选项、移除及云端配置；修正此前 URL 大写文案的旧断言。未改写产品数据，尚未部署，未做真实浏览器交互验收。

## 产品 SEO 字段前移（2026-10-29）

- 产品 Meta Title、Meta Description 移至网址后缀（URL Slug）紧下方，保持原可选配置及保存字段；文章顺序不变，补充分类仍在末尾。
- 格式、后台 UI 及 diff 检查通过；未改写内容、尚未部署。

## SEO 字符数提示（2026-10-29）

- 产品和文章网址、Meta Title、Meta Description 的输入框下方增加建议长度及建议上限，明确只是写作参考而非 Google 硬性规定；保留留空回退和网址保存后锁定的提醒。
- 仅修改提示文字，不新增输入限制；格式和后台 UI 检查通过，未部署。

## 全部本地改动发布准备（2026-10-29）

- 用户明确授权上传全部本地未发布修改，范围包括编辑器、图片图集、两级分类、SEO/摘要/标签/时间字段、产品数据与使用说明。
- 代码检查 0 errors / 0 warnings / 1 个既有 hint；完整后台、富文本、图集及产品 API 回归通过。导航测试同步产品编辑标记的新值。
- 已获取远端内容提交 2cb0605，接下来保留并合并远端文章更新，分类删除时间保留本地较新值。尚未完成上线。

## 全部本地修改正式上线（2026-10-29）

- 本地功能/内容提交 a33a13a，保留远端文章更新并合并为 5b029e22ad3217c68d506d086bd04dd850049014，已推送 main。唯一冲突为测试分组删除时间，保留本地较新时间；未覆盖远端文章修改。
- 最终合并版本构建及 verify:deploy 通过：152 页面、87 产品、19 文章、2950 图片引用；真实 Node 22 Vercel 函数离线回归通过。此前代码、后台、富文本、图集及产品 API 检查通过。
- Vercel Production dpl_BngKrHAxfXxbLWyALnqX1NXEqc1k 已 Ready，正式域名 www.elesoltree.com 已实际返回该部署资源。
- 独立登录会话只读核验：产品编辑页、文章新建页 200，最新 JS 含产品图集、补充分类和 URL Slug 新标签；首页、Blog、ADD 产品详情页均 200。未写入云端内容，验证会话退出；未做真实浏览器视觉/拖拽验收。
- 发布状态/核验辅助脚本保存在仓库外 artifacts，凭据未提交。本条记录随文档提交同步，功能及内容保持上述已验证版本。

## 线上后台初始化故障排查（2026-10-29）

- 用户报告后台无法读取云端分类。线上只读复现 taxonomy/products/content-index 500 空响应；Vercel 日志确认 sanitize-html 2.18.1 经 CommonJS require 加载 htmlparser2 12 的 ESM 时触发 ERR_REQUIRE_ESM，影响云端内容及发布接口模块初始化。数据读取前即失败，未改写云端内容。
- 原有本地 Node 22 默认支持 require(ESM)，未复现 Vercel require hook 限制。使用 --no-experimental-require-module 在旧构建产物上明确复现 500；先前发布核验只覆盖页面与资源，遗漏了真实线上分类接口。
- Vite SSR 显式打包 sanitizer 与直接依赖，兼顾 ESM 解析器和嵌套 escape-string-regexp 版本解析。独立 SSR 打包加载及脚本过滤断言通过；运行时回归补充未登录/登录的分类接口，发布检查强制运行禁用 require(ESM) 的完整后台函数测试。
- 正在执行最终构建/部署检查，随后部署并在线只读验证；不降级依赖、不改写云端分类或产品数据。

- 最终验证通过：代码检查 0 errors / 0 warnings / 1 个既有 hint；富文本回归、构建、完整 verify:deploy（含禁用 require(ESM) 的实际函数与云端分类初始化检查）通过。准备推送修复并核验线上。

- 首次修复提交 316d871 部署 Ready，但线上复测仍 500；新日志为 Cannot find module picocolors，表明 Vercel 未追踪到转换后 CommonJS 的间接依赖。未将 Ready 等同恢复。
- 强化运行时检查：将函数产物完整复制到系统临时隔离目录运行，禁用 require(ESM)，彻底避免从仓库父目录 node_modules 回退。原产物在隔离测试中稳定失败，重现遗漏依赖；临时目录经路径边界核对后清理。
- 打包范围扩大到 sanitizer 的完整 16 个依赖包（包含嵌套解析器/CSS 工具的依赖），保持原版本与 HTML 安全策略，正在最终隔离回归。

- 完整依赖树打包后的隔离运行时检查通过。一次本地构建因构建期间新增备份导致私有文件检查失败，已停止该产物发布；重新构建并确认全部 verify:deploy 通过（含私有文件扫描与隔离函数运行时），准备第二次部署并在线复测。

## 后台初始化故障已恢复（2026-10-29）

- 最终修复提交 907ec36ebdadb9132c5a9db6ad0a0e8fac381ac3 已推送；Vercel Production dpl_9ZP1XBPRXKrps8UCsu2ceLUEwVkd 为 Ready。
- 正式域名 www.elesoltree.com 使用独立登录会话只读验证：/__cms/taxonomy、/__cms/products、/__cms/articles、/__cms/content-index 全部 200 且返回正常 JSON，原初始化错误已恢复；验证会话已退出。
- 已将禁用 require(ESM)、复制至仓库外隔离目录及分类初始化的回归纳入 verify:deploy，避免宿主 node_modules 掩盖产物缺依赖。未改写云端内容，未做真实浏览器视觉交互验收。

## 批量双向内容同步（2026-10-29）

- 用户接受“整批同步、整批优化、统一发布”流程。新增 content:pull / content:push，默认只预览，--apply 才执行。复用 cloudProxy、线上内容验证和 Supabase CAS，20 篇文章一次保存，保留原发布/网址/回收站状态，不触发网站发布。
- 私有工作目录为仓库外 ../Astro-elesoltree-content，包含 src/content/products、articles、只读 taxonomy、云端上传图片、state.json 共同版本与备份，目录 .gitignore 忽略全部。Soltree.code-workspace 可同时打开网站代码与私有内容。
- 先按云端来源 Git blob、GitHub 最新公开快照、云端草稿做三方字段比较，再比较上次同步基线/本地编辑/云端最新。不同字段可合并，正文及数组整体冲突时停止；无法找回共同版本时不猜测。回写前核对 Git 最新快照和本地文件，云端整批保存使用原 revision 做一次 CAS。同步并核对公开来源 manifest，避免已有 Git 内容改动导致下次后台发布 409。
- 新增 verify:content-sync：20 篇单次提交、默认预览无写入、草稿/内部字段/发布状态保留、同字段冲突、校验失败整批不保存、云端 CAS 竞争、Git 漂移、本地编辑竞争、分类只读及直接删文件拒绝均通过。复用媒体读取校验，符号链接与越界路径拒绝。
- 实际执行首次 pull --apply：云端 revision 19，87 产品、19 文章、1 分类，107 JSON；当前无私有云端上传图片。云端与 Git 来源有历史差异但可无冲突合并。随后 push 仅预览通过整批后台校验，未保存云端、未改变正式网站；既有公开 Git 内容改动将于以后实际回写时一起校准。
- 代码检查 0 errors / 0 warnings，初次含既有 main.js 及两处同步 await hint；后两处已用异步快照签名修正。格式与 diff 检查通过。文档补充命令与私有同步区说明；工具无需新增线上接口，未部署本轮改动。

## 内容优化工作流约定

- 用户确认：今后要求优化内容时默认拉取最新云端内容、批量优化并整批回写云端，无需再次要求回写；正式网站仍由用户最后点击顶部发布。有冲突或需要内容决策时停止确认。此约定不代表本轮 UI 调整需要修改文章或发布网站。

## 数据看板点击量标注（2026-10-29）

- 原图表已有 SVG title 悬停日期和值；新增非零点击数的 HTML 小字标签，按同一坐标比例定位在数据点上方，零值不标注。使用 HTML 避免 SVG 非等比拉伸使文字变形，标签忽略指针并隐藏重复无障碍朗读；原圆点键盘访问及悬停提示保留。
- 只在点击量指标显示数量，切换指标时沿用原图表行为；说明文案同步。不改变统计接口、日期缺口或 GSC 数据口径。
- verify:analytics（模型/导航/GSC）、格式及 diff 检查通过；未做真实浏览器视觉验收，尚未部署。已有同步工具及私有内容副本保留，未回写云端内容。

## 点击量标注正式部署（2026-10-29）

- 用户授权“部署吧”。仅提交 analytics-dashboard.js/css 两个界面文件，提交 c8fa4f4e9579660a82a8f9447cf5ed48839db370 已推送 main；内容同步工具、文档等其他本地改动保留。
- 代码检查 0 errors / 0 warnings / 1 个既有 hint，统计/导航/GSC 回归、构建与完整 verify:deploy（含仓库外隔离的实际后台函数）通过，152 页面及 2950 图片引用检查正常。
- Vercel Production dpl_CDv2oCsoWZDyDe6mAcfpqtuh1Nsd Ready。正式域名 /admin/analytics 返回 200，HTML 包含 analytics-point-label 样式，实际加载 BM5o6TnY.js 含新数值标注与说明。
- 独立登录会话只读核验 /api/admin/analytics：connected，近 7 天返回 6 条日记录，未补零；验证后退出会话。未写入云端内容、未修改私有同步副本，未做真实浏览器视觉验收。

## MCB 专题落地页（2026-10-31，America/Los_Angeles）

- 新增英文 `/mcb`：深绿品牌首屏、MCB 原理介绍、AC/DC 共 8 款产品、实时读取现有产品数据的参数对比、选型步骤、应用、OEM、6 条 FAQ 和复用现有接口的询盘表单。
- 复用 BaseLayout、Img 和 ContactForm；落地页注册到资源中心 Circuit Protection / MCB，加入 sitemap 和页面链接回归。只生成英文页面，未添加不存在的西语版本或 hreflang。
- Node 22 Astro check 0 errors / 0 warnings（2 个既有 hints），完整构建成功；verify PASS：277 页、87 产品、19 文章，站内链接/资源与结构化数据检查通过。未发送真实询盘。
- 浏览器检查脚本位于仓库外 `artifacts/verify-mcb-page.mjs`；Chrome 调试端口无法连接，已停止检查，未声称桌面/手机视觉验收通过。本地开发预览另行启动供用户查看。
- 未提交、推送或部署；开始前 TASK.md / PROGRESS.md 已有改动，原记录保留。正式网站仍使用现有线上版本。

### 首屏参考文案调整

- 按用户提供的第二张图，首屏改为 Miniature Circuit Breakers (MCB)，原样采用 VOB3-63 / VOB3-63H / VOE3-63 选型说明、四个带图标卖点及两个 CTA；移除原宣传标语、副标题和底部三项标签。其余区块和现有产品记录未修改。
- 格式与 diff 检查通过；本地 Astro 开发服务 `/mcb` 返回 200，响应包含新选型文案。独立编译检查因项目未安装 @astrojs/compiler 而未执行，未新增依赖；未重新执行完整构建或浏览器视觉验收，未提交或部署。参考图型号/参数为用户指定文案，下方参数表仍来自现有 AC/DC 产品资料。

### 三系列参数对比区

- 按用户截图重做 `#selection`：左侧标题/右侧说明、浅灰首列、三型号列、产品占位图、红色入口文字和经济型分断能力补充说明；逐项使用用户参考文案。左到右型号为 STA-63 / STB-63 / STC-63（Economy / Standard / High breaking），首屏型号同步，移除原对比表与其下三步说明。
- 表头产品图片共用现有 MCB-AC-1P-01.jpg，后续可替换。未提供系列详情或 PDF 文件，相关入口保留参考图文案并设为不可点击占位，未链接到不相符产品或伪造文件。
- Prettier、git diff --check 通过；本地 `/mcb` 200，确认三个新型号均存在、VOB3/VOE3 旧型号已移除。未执行完整重建或浏览器视觉验收，未提交、推送、部署。

### Circuit Protection 菜单名称

- 按用户截图，将共用 taxonomy 中的三项名称改为 AC MCB / AC MCCB / AC Surge Protector，桌面与移动导航及共用分类名称自动沿用。保留原 slug、type、链接和产品筛选规则；未改动其他条目或西语翻译。
- verify-taxonomy 回归、git diff --check 通过；本地首页 200 且含三项新名称。未提交、回写云端或部署。

### Solar PV Components 上移

- 按截图箭头，将产品菜单分组顺序调整为 Circuit Protection → Solar PV Components → Switching & Isolation；仅交换 taxonomy 的 products.order，桌面和移动产品菜单及共用产品分类顺序自动沿用，文章分组顺序保持原值。
- verify-taxonomy 和 git diff --check 通过，本地首页返回 200 并核验 Solar PV Components 在 Switching & Isolation 之前。未提交、回写云端或部署。

## DC 落地页 SEO / GEO 优化（2026-11-04）

- 改动：`src/pages/dc-surge-protector.astro` 新增两条 Product JSON-LD（manufacturer 指向站点 Organization @id）、OG 图换为 dc-surge-protector-range 横图、description 缩短；Step 1 示例改为"exceeds the 1000V class"；FAQ"What Ucpv do I need for a 1000V system?"和"Type 1 or Type 2 for solar?"先给直接结论。文案稿 `SEO-Articles/_landing-pages/dc-surge-protector-copy.md` 同步。
- 验证：本地 /dc-surge-protector 200，JSON-LD 5 段全部可解析，OG 图 200 image/jpeg，Astro check 0 errors / 0 warnings（2 个既有 hints）。未做完整构建、Rich Results 测试、浏览器视觉验收；未提交或部署。
- 遗留：选型表只有 2P/3P 行，与 1P–4P 表述不一致；STO 图片标签为 STA-40 / 385V AC；系列未链接到现有 SPD-DC-* 产品页；BaseHead 全站 og:image 尺寸写死 1200×630。

## DC 落地页证书图片位（2026-11-04）

- 测试与认证模块底部新增 CE / TÜV / CB 三栏证书位（3:4 竖版），数据在页面顶部 `certificates` 数组；填入 `/images/uploads/<文件名>`（文件放 src/assets/uploads/）即显示图片。空位仅本地开发显示虚线占位，生产构建自动隐藏。
- 验证：本地页面渲染 Certificates 标题与 3 个占位；未构建、提交或部署。CB 说明文案（IECEE CB Scheme）为新增，待用户确认。

## 产品菜单 DC Surge Protector 指向落地页（2026-11-04）

- `landing-pages.ts` 新增可选 `nav` 标记（仅 DC SPD 开启）；Navbar 桌面/移动菜单中匹配的条目改链 /dc-surge-protector，仅在该语言有落地页时生效（西语保持原分类链接）。MCB、Aerosol 未开启。
- 落地页 Product range 区新增 "Browse all DC SPD models" 链到 DC SPD 分类列表，保留到产品页的入口。
- 验证：英文首页与落地页菜单链接为 /dc-surge-protector，西语首页仍为分类链接，分类页 200，Astro check 0 errors / 0 warnings（2 个既有 hints）。未构建、提交或部署。

## DC 落地页询盘区联系方式（2026-11-04）

- 询盘区左栏用邮箱 / 电话 / WhatsApp 三项（读 SITE 常量，均可点击，WhatsApp 新窗口打开 wa.me）替换 "View all contact options" 链接；左栏与表单在桌面端上下居中。
- 验证：本地页面输出 mailto、tel、wa.me 链接及居中样式，旧链接已移除；未做浏览器视觉复核，未构建、提交或部署。

## DC SPD 橙色重复产品下架（2026-11-04）

- SPD-DC-1P/2P/3P/4P-Orange 四个英文产品记录设为 `published: false`（文件与西语译文、图片保留，可在后台恢复）；`redirects.mjs` 新增英文与西语共 8 条 301，橙色页跳到同极数白色页。保留 SPD-DC-1P/2P/3P/4P-White 四个产品，内容和图片由用户逐步优化。
- 验证：本地 DC SPD 分类英/西语列表仅剩 4 个白色产品，sitemap 不含橙色页，落地页 200。新增跳转需重启 dev 服务后生效（旧跳转 301 正常，配置可正常加载），本地未实测新 301；未构建、未推送云端内容（content:push）、未提交或部署。线上橙色页目前仍 200。

## DC 落地页及橙色 SPD 合并正式上线（2026-11-04）

- 提交 706acfc 推送 main（含 /dc-surge-protector、/mcb、询盘 Subject、AC/DC SPD 数据、taxonomy 菜单、导航落地页链接、8 条橙色 301）；TASK.md / PROGRESS.md 未提交。Vercel 自动部署 dpl_EaHeSJgRXfQdTyiskoEMSkfZoDVR。
- 发布前 Node 22.23.4：astro check 0 errors / 0 warnings / 2 hints，构建成功，verify:deploy 全部 PASS（269 页、83 产品、19 文章，5589 图片引用，14 条 301）。日志在 ../artifacts/dcsp-release-*.log。
- 线上验收：8 条橙色页 301 到对应白色页（英/西），首页、落地页、/mcb、产品页、分类页、sitemap、联系页 200；落地页 5 段 JSON-LD（含 2 个 Product），OG 图 200 image/jpeg，联系方式链接与 Subject 字段在线，证书空位不输出；首页菜单指向落地页；sitemap 无橙色页；分类页仅 4 个白色产品。
- 未执行 content:push --apply（预览涉及大量无关产品，风险大）。遗留问题：公开仓库约定只保存 published=true 记录，4 个橙色文件以 published:false 留在 git，导致 content-sync 预览报"草稿和回收站内容不得写入公开仓库"；云端后台里橙色仍为已发布，后台再次发布可能把它们重新加回列表（URL 仍会被 301 拦截）。待用户确认处理方式。

## 橙色 SPD 后台下架与仓库清理（2026-11-04）

- 云端后台：仅改 4 条 SPD-DC-*-Orange 记录为 published:false，sourceManifest 对应项设为 null（与后台下架结果一致）；revision 19→20，写入前完整备份在 ../artifacts/cloud-workspace-backup-2026-11-04T15-45-21-097Z.json，脚本 ../artifacts/scripts/unpublish-orange-spd.mjs。
- 仓库：提交 3f54eb2 只删除 4 个英文橙色产品文件并推送 main（西语译文保留，i18n-status 83/83 正常）；新部署 dpl_Aweyue657MkxaAQoAuaZzgbZDdiG 已上线，橙色 301 与落地页/白色产品页正常。未单独构建（删除的是已被过滤的未发布记录，产物不变）。工作区内他人未上线改动（mcb.astro 删除、landing-pages/redirects/verify.mjs、/dc-mcb）未提交。
- content:push 预览已无冲突（84 个文件，其中内容差异只有本次上线的 8 个 SPD 产品，其余为时间戳），但 --apply 被权限拦截，未执行。云端 sourceManifest 仍落后 Git，后台发布会提示"请先同步"，需用户执行 `npm run content:push -- --apply`。

## 工作方式调整：暂停云端后台（2026-11-04）

- 用户将 MCB 拆为 /ac-mcb 与 /dc-mcb（/mcb 301 到 /ac-mcb，sitemap 改为读取 landingPages，菜单两项均指向落地页）；本地两页 200、/mcb 301。用户改动尚未提交或部署。
- 用户决定短期内产品、文章、页面全部在本地 VS Code 修改并通过 git 推送上线，暂停使用云端后台；不再执行 content:push / content:pull。云端停留在 revision 20（sourceManifest 落后 Git），后台发布会被"请先同步"拦截，不会覆盖本地内容。恢复使用后台前先执行一次 `npm run content:push -- --apply`。
- 下架产品的做法：删除 src/content/products 里的 JSON（公开仓库只放 published:true），并在 redirects.mjs 加 301。

## AC / DC MCB 落地页拆分上线（2026-11-04）

- 提交 b3207ea 推送 main：新增 /ac-mcb、/dc-mcb，/mcb 301 到 /ac-mcb，菜单两项指向落地页，sitemap 读取 landingPages。TASK.md / PROGRESS.md 未提交。
- 发布前 Node 22：astro check 0 errors / 0 warnings / 2 hints，构建成功，verify:deploy 全部 PASS（271 页、83 产品、19 文章、5593 图片引用）。
- 线上验收：/ac-mcb、/dc-mcb、/dc-surge-protector、首页、sitemap 200；/mcb 与橙色 SPD 页 301；首页菜单含三个落地页链接；sitemap 含 /ac-mcb、/dc-mcb，不含 /mcb。未做浏览器视觉验收。
## DC SPD 详情模块复核与本地预览（2026-11-04）

- 复核现有修改，无需再改业务代码。`/products/STD-40-PV-600V` 返回 200，7 个详情模块锚点按用户要求排列，Application 三段原文均存在，Specifications 参数表正常输出；另外 5 个模块仅有标题，等待内容资料。
- 启动检查发现本项目已有 Astro 开发服务（4400），复用现有服务；`/dc-surge-protector` 同样返回 200。未做浏览器视觉验收，未提交或部署。

## STD-40-PV Specifications 对比表（2026-11-04）

- Specifications 使用用户提供的 6 行、5 档电压对比数据，标题 STD-40-PV Surge protector；保留最后一列空 Pole 和 Up 5.4，统一 Imax / μs 排版。仅该产品配置新表，其余产品继续使用原参数表。
- 详情区支持可选结构化表格及数据校验，窄屏可横向滚动。新增 `scripts/verify-product-detail-table.mjs`，本地 4400 页面返回 200，逐单元格核验通过；未部署。
- Astro check：181 文件，0 errors / 0 warnings / 2 个既有 hints；格式与 git diff --check 通过。未做浏览器视觉验收或完整构建。

## Specifications 表格微调（2026-11-04）

- 按用户标注将表格标题居中；12/24 列 Pole 改为 `2P（Customized）`，Up 从 `2` 改为 `2.0`。本地表格逐单元格检查通过，未部署。

## Drawing 原图（2026-11-04）

- 原样保存用户上传的 1318×990 PNG 为 `src/assets/uploads/std-40-pv-drawing.png`，通过产品详情可选图片字段放在 Drawing 标题下，补充 Alt，保持完整比例、随正文缩放。
- 本地产品页和图片响应核验、表格回归通过；未部署。

## Dimensions 原图（2026-11-05）

- 用户上传的 1298×558 PNG 原样保存为 `src/assets/uploads/std-40-pv-dimensions.png`，复用详情图片显示在 Dimensions 标题下，补充 Alt，保留完整比例。
- 本地产品页与尺寸图均返回 200，图片宽高为 1298×558；未部署。

## Wiring Diagram 原图（2026-11-05）

- 用户上传的接线 PNG 原样保存为 `src/assets/uploads/std-40-pv-wiring-diagram.png`，复用详情图片显示在 Wiring Diagram 标题下，补充 Alt，保持完整比例。
- 本地产品页和接线图加载核验通过，未部署。

## Remote Signal Contact 文字表格（2026-11-05）

- 从用户截图提取三行、两组数据，复用详情表格配置，未使用图片。统一字符空格，保留原图 30V 行左侧 DC、右侧 AC 的标注差异，未自行更改电气参数。
- 本地实际页面逐单元格核验通过，无图片；未部署。

## Installation and Dimensions 文字表格（2026-11-05）

- 用户截图提取为 17 行、两组参数的文字表格，复用详情表格配置。保留所有数值，规范 mm²、N·m、温度及范围符号；原图合并项在两数据列分别展示。
- 本地产品页逐单元格检查通过，无图片；未部署。

## 详情表格取消横向滚动（2026-11-05）

- 自定义详情表格使用 `table-fixed`、100% 宽度，移除单元格禁止换行，长文字可断行，窄屏减小左右内边距；共用 Specifications、Remote Signal Contact、Installation and Dimensions 同步生效。
- 本地页面输出确认固定布局及换行样式，原表格数据回归通过；未做浏览器视觉验收，未部署。

## 安装参数表合并单元格（2026-11-05）

- 详情表格支持带 rowSpan / colSpan 的文字单元格，保留原字符串表兼容。Installation and Dimensions 改为参考图的四列：Wiring capacity、Torque、Protection class、Size 纵向合并；普通参数名称跨前两列；安装环境和安装方式内容跨后两列。
- 添加该区块专用绿色前两行、灰白交替行、紧凑内边距和网格线；继续固定宽度、自动换行。
- 本地实际响应逐项核验参数与跨度，并验证所有 17 行完整占据四列、无重叠；原 Specifications 和 Drawing 回归通过。Astro check 181 文件 0 errors / 0 warnings / 2 个既有 hints，git diff --check 通过。未做浏览器视觉验收或部署。

## 安装表字符损坏修复（2026-11-05）

- 用户截图暴露实际编码问题：此前合并表格时经 PowerShell 管道传递的脚本含 Unicode 字符，写入 JSON 后已变为字面量问号；旧逐格检查只比较同一数据源，未发现源数据损坏。使用补丁直接恢复 mm²、N·m、≤2000、°C、×，范围采用用户要求的 `~`。
- 回归增加独立的正确字符断言，禁止安装表实际 HTML 出现问号或替换字符；本地实际响应检查通过，同时保留原表格、图片和合并布局检查。未部署。

## 安装表文字居中（2026-11-05）

- 在安装表专用单元格样式中设置 text-align:center，参数名称、纵向分组与子项统一水平居中，继续垂直居中。
- 本地页面样式输出和既有表格回归通过；未部署。

## 新增 STD-40-PV 1000V 产品（2026-11-05）

- 新建 `src/content/products/STD-40-PV-1000V.json`，使用用户指定标题，单独 ID/slug，简介、DC System Voltage、SEO 更新为 1000V；保留已完成的系列参数表、合并安装表和三张技术图。600V 产品不变。
- 图库暂用现有 1000V 系列示意图 `std-40-pv-product.png`（图上为 ST-40Z，非专用 STD-40-PV 1000V 成品图），不复制 600V 图片和配色，后续待专用图片替换。
- 本地新详情页、图片、DC 分类页均返回 200；新页标题、简介、7 个模块及分类入口核验通过。未新增翻译，未提交或部署。

## 1000V 产品追加接线场景图（2026-11-05）

- 用户原图保存为 `src/assets/uploads/std-40-pv-combiner-installation.png`（1645×956）。1000V 页 Wiring Diagram 原图后追加该图；图上 600V 标注原样保留，Alt 明确为 600V 安装示例。
- 详情区支持附加图片列表，复用现有 Img 组件及本地图片校验。本地新页 Wiring Diagram 精确输出两图且顺序正确，图片均返回 200，追加图比例正确；格式与 diff 检查通过。未部署。

## 汇流箱示意图产品归属更正（2026-11-05）

- 按用户澄清将附加汇流箱示意图从 1000V 产品移至 600V 产品 Wiring Diagram 原图下方，共用原文件。
- 本地 600V 页核验为两图且顺序正确，1000V 页恢复为一图；未部署。

## 替换 600V 接线场景图（2026-11-05）

- 用户最新原图保存为 `std-40-pv-combiner-installation-v2.png`，替换 600V 产品 Wiring Diagram 第二张图。保留第一张图，1000V 产品不变。
- 本地新图片响应、图序及实际比例核验通过，未部署。

## 600V 规格表仅保留 2P（2026-11-05）

- 删除 600V 产品 Specifications 中 3P 对应的 1000V、1500V 整列及各行参数；保留 600V、800V、12/24V（Customized）三列。标题改为 `STD-40-PV Surge protector 2P`，1000V 产品不变。
- 本地实际页面参数表及原合并布局、图片回归通过；未部署。

## 600V 产品 2P 尺寸图（2026-11-05）

- Dimensions 替换为用户原图 `std-40-pv-2p-dimensions.png`，仅侧视图与 2P 正视图，更新 Alt；1000V 产品不变。
- 本地页面图片地址、原始比例及图片响应核验通过；未部署。

## 600V 产品 2P Drawing（2026-11-05）

- Drawing 使用用户最新原图 `std-40-pv-2p-drawing.png`，更新 Alt，保留原图比例；1000V 产品不变。
- 本地 Drawing 图片地址、比例与图片响应检查通过；未部署。

## 安装表移除绿色背景（2026-11-05）

- Installation and Dimensions 前两行绿色背景改为白色，移除白字覆盖，沿用深色单元格文字。居中、合并结构及参数不变，共用样式同时作用于 600V / 1000V 页。
- 本地样式响应核验通过；未部署。

## 移除 600V 远程信号模块（2026-11-05）

- 按用户要求删除 600V 产品的 Remote Signal Contact 独立详情模块，页内导航随配置自动移除。安装参数表中原有的远程触点扭矩条目保持原值，1000V 产品不变。
- 本地响应确认模块锚点与导航入口均不存在，其余详情及表格回归通过；未部署。

## 600V 产品图表说明文案（2026-11-05）

- Specifications 增加 2P 电压选项和参数含义说明；Wiring Diagram 解释 MCB、熔断器、接地及汇流箱示例。安装参数、尺寸、Drawing 各加一句用途说明，关键词自然融入，不添加未经支持的性能或排名承诺。
- Application 原文不变，Remote Signal Contact 保持删除；仅修改 600V 产品。实际页面五处文字、导航及原表格/图片回归核验通过；未部署。

## Application 按极数及电压区分（2026-11-05）

- 用户明确 600V 页针对常规 2P，1000V 页针对 3P。两款 Application 分别突出 Type 2、极数、电压、PV 安装位置与对应接线图，保留并联连接、长线两端布置及 MOV/热脱扣/失效指示信息。
- 不按极数推断未经确认的内部保护拓扑或性能优劣。仅改两款 Application；本地两页独立文案及三段结构核验通过，未部署。

## 产品标题增加极数（2026-11-05）

- 按用户原文更新 600V / 1000V 产品名称，分别加入 2P / 3P；SEO 标题同步，产品 ID 与 URL 保持不变。
- 本地两页 H1、SEO title 逐项核验通过；未部署。

## DC MCB 首屏文字排版精简（2026-11-06）

- 按用户截图反馈调整 `src/pages/dc-mcb.astro` 左侧：标题改为 DC Miniature / Circuit Breakers 两段并略缩字号，简介缩为两句；原四组说明改为由现有 dcSeries 数据生成的 DZ47 / C65 / L7 三列系列及分断能力。
- 询价改为紧凑主按钮，系列对比改为文字链接，减少首屏视觉重量；保留右侧图片及页面其余选型内容。
- Node 22 Astro check：182 文件，0 errors / 0 warnings / 2 个既有 hints；Prettier 和 git diff --check 通过。浏览器连接不可用，本地 4400 服务未运行，未做浏览器视觉验收；未提交、未部署。

## DC MCB 询价联系方式与垂直居中（2026-11-06）

- 参照 dc-surge-protector 的联系方式列表及图标，DC MCB 询价区使用 CONTACT 共用配置输出邮箱、电话、WhatsApp 直链，替换原 View all contact options 链接。
- 左侧增加 self-center，文字保持左对齐，相对右侧表单垂直居中；窄屏沿用上下排列。
- 本地 http://127.0.0.1:4400/dc-mcb 返回 200，实际 HTML 中三种联系方式、居中样式与原表单均验证通过；Prettier、git diff --check 通过。未做浏览器视觉验收，未提交或部署。

## DC MCB FAQ 与选型咨询模块（2026-11-06）

- 在 Before you specify 问答区底部参照 SPD 页面新增浅绿咨询条，提示提供 DC 电压、电流、接线图和数量，按钮跳至 #inquiry。
- FAQ 分参数与型号选型、应用接线与采购两组共 10 问：定义、系列区别、分断能力、电流、极数、AC/DC、PV、电池、隔离、OEM；每条先直接回答，再交代适用条件，不添加未经确认的型号电压或电流参数。
- FAQPage 继续从可见问答同源生成。参考 Google AI features 网站指南与 Schneider Electric DC 选型 FAQ（https://developers.google.com/search/docs/appearance/ai-features；https://www.se.com/eg/en/faqs/FA409615/），不承诺 AI 引用或排名效果。
- 本地 4400 页面返回 200，10 条可见问题及完整答案与 JSON-LD 逐项一致，咨询条和询价锚点核验通过；Prettier、git diff --check 通过。未做浏览器视觉验收，未提交或部署。

## 启动本地开发服务（2026-11-06）

- 使用本地 Node 22，执行管理资源同步并在后台启动 Astro dev，监听 127.0.0.1:4400。
- /dc-surge-protector 实测返回 HTTP 200，服务持续监听文件变化；未部署。

## PV Combiner Box 定制与项目落地页（2026-11-06）

- 新增 src/pages/pv-combiner-box.astro：项目定制首屏、六项定制维度、四类客户项目、三款现有产品参考、四步对接流程、八条 FAQ 与项目询价区。沿用现有产品素材，不新增未经核实的认证、MOQ、交期或项目案例承诺。
- landing-pages.ts 登记页面并接入产品导航和资源目录；英文页面不生成不存在的西语版本。ContactForm 增加可选默认主题和消息提示，当前页复用现有 /api/contact 提交接口，图纸通过邮箱发送。
- 新增 scripts/verify-pv-combiner-page.mjs，验证 HTTP 200、导航和锚点、表单、canonical、八条可见 FAQ 与 JSON-LD 一致性及 10 个产品/图片引用。Astro check：183 文件，0 errors / 0 warnings / 2 个既有 hints；页面专项核验通过。
- 浏览器访问宿主不可用，未做视觉验收；未发送真实询盘，未提交或部署。
- Node 22 生产构建通过（含 Vercel 函数打包）；本次修改文件 Prettier 与 git diff --check 通过。构建存在大体积 chunk 提示，不影响构建完成。

## 重新运行本地服务（2026-11-06）

- 使用现有 Node 22 运行管理资源同步，并在后台启动 Astro dev（127.0.0.1:4400）。
- /dc-surge-protector 实测返回 HTTP 200；日志位于 artifacts/elesoltree-dev.stdout.log 和 artifacts/elesoltree-dev.stderr.log（工作区根目录下）。未部署。

## DC MCB 首屏下方快速选型（2026-11-06）

- 参照用户截图在 banner 后、页内导航前加入深色选型区，桌面两栏、手机上下排列，显示 Economy / Choose DZ47Z-63 与 Standard / Choose STZ-63。
- 首屏 Compare series 改为跳至新选型区，页内导航增加入口；两款按钮均链接现有询价区，未添加未经确认的型号参数。
- 本地 /dc-mcb HTTP 200、两个型号及区块顺序验证通过；Prettier 与 git diff --check 通过。未做浏览器视觉验收，未部署。
- Astro check 完成：184 文件，0 errors / 0 warnings / 2 个既有 hints。

## DC MCB 选型区浅色与紧凑排版（2026-11-06）

- 按用户反馈将快速选型区改为浅灰绿底、深色文字；缩小标题、区块上下内边距、分隔线及按钮间距，保留桌面双栏和移动端堆叠。
- 两款新增 4.5kA / 6kA 标签；根据用户提供的参数重写文案，分别强调 Economy B/C/D-curve DC distribution / 4.5kA，以及 Standard B/C/D trip-curve options / 6kA。不添加未提供的电流或电压范围。
- Prettier、git diff --check、本地 HTTP 200 与新区域文案及浅色样式输出核验通过；未做浏览器视觉验收，未部署。

## DC MCB 页内导航上移（2026-11-06）

- 按截图箭头将页内导航整体移至首屏 banner 后、快速选型区前，保留链接及样式。
- Prettier、git diff --check 与本地 HTTP 200、HTML 区块顺序核验通过；未部署。

## DC MCB 价格与规格定位（2026-11-06）

- 根据用户确认的左款价格更低，在 DZ47Z-63 说明下增加 Lower price · Budget-friendly；STZ-63 增加 Higher specification · 6kA，以已提供的分断能力表达升级定位。
- 保持紧凑间距，未编造具体价格或质量测试结论。Prettier、git diff --check、本地 HTTP 200 及两行文案核验通过；未部署。

## STZ-63 DC 系列产品（2026-11-06）

- 新增 src/content/products/STZ-63-DC.json，published=true，Circuit Breaker 分类及 MCB/DC 类型；标题按用户提供原文 STZ-63 DC MCP 6kA 1P 2P 3P 4P 500V 1000V。
- 复用 SPD 的 ProductDetail 模板，包含图库、Application、Specifications 参数表、Selection & Wiring 和 Ordering Information；仅采用用户已提供的 6kA、极数、电压选项及 B/C/D 曲线，不推断各极数与电压映射。
- 暂用现有 DC MCB 四种极数主图，尚待用户提供 STZ-63 专用素材；Standard 选型入口已链接详情页。
- 本地产品详情、Circuit Breaker 分类与 DC MCB 页面均 HTTP 200，产品标题/链接、四个详情模块与四张图库素材核验通过；Prettier 与 git diff --check 通过。未做浏览器视觉验收，未提交或线上部署。

## 中文光伏汇流箱选型页（2026-11-08）

- 新增 src/pages/pv-combiner-box-selector.astro：首屏、选型计算器（电压等级 + 可折叠 Voc 推算、单串 Isc、路数、外部防雷、SPD Imax）、ST 系列规格表（推荐行高亮）、冷轧钢板喷塑箱体、名词解释、注意事项、询价区（复用 ContactForm，点“按此方案获取报价”把结果带入留言）、免责声明。
- 选型规则放在 src/lib/combiner-selector.mjs：低温电压 ×1.2、熔丝 ×1.5、总断路器 ×1.25，按标准规格向上取；路数向上匹配最近型号，>36 路提示分箱；SPD 500/1000/1500V → DC600/1000/1500V，有外部防雷用 T1+T2；总电流 ≥63A 提示铜排，断路器 ≥250A 提示塑壳断路器。
- 新增 scripts/verify-combiner-selector.mjs 逻辑自检，通过。Astro check：187 文件，0 errors / 0 warnings / 2 个既有 hints。本地 dev（127.0.0.1:4400）页面 HTTP 200，noindex，19 行规格表、询价主题输出正常。
- 页面 noindex、未加入导航和 sitemap（中文页放在英文站内，待用户决定是否公开）。ContactForm 标签仍为英文（按 URL 语言取 en）。ST-5-1 包装尺寸按 520×420×200 填写，待用户核对。未做浏览器视觉验收，未提交或部署。

- 2026-11-08 追加：按用户要求删除选型页询价区（表单、联系方式）和“按此方案获取报价”按钮，保留“复制选型结果”。页面 HTTP 200，已无 /api/contact 表单。
- 2026-11-08 追加：选型页首屏背景换为用户提供的光伏阵列+汇流箱图（src/assets/pv-combiner-box-field-hero.png，astro:assets 输出多尺寸），上盖 55% 黑色遮罩。页面 HTTP 200、图片输出正常；未做浏览器视觉验收。
- 2026-11-08 追加：删除选型页首屏右侧白色产品图卡片，首屏只保留文字，背景图完整露出。页面 HTTP 200。
- 2026-11-08 追加：选型区推荐型号字号由 4xl 缩为 2xl、结果行间距收紧；桌面端左右两栏等高（底部对齐），移除结果卡 sticky。页面 HTTP 200。
- 2026-11-08 追加：按用户确认（主要客户为 T2）删除“建筑是否装有外部防雷”选项，SPD 固定推荐 PV T2，结果区固定提示“建筑有外部防雷（避雷针 / 避雷带）时需改用 T1+T2”。逻辑自检、Astro check（0 errors）与页面 HTTP 200 通过。
- 2026-11-08 追加：删除 SPD Imax 选项，固定 40kA；修复左栏等高拉伸导致行和按钮被撑高（表单加 content-start）。逻辑自检、Astro check、HTTP 200 通过。
- 2026-11-08 追加：按用户澄清恢复“SPD 最大通流 Imax”一栏，仅保留 40kA（标配）选项，去掉 60kA。页面 HTTP 200。
- 2026-11-08 追加：规格表小标题改为“ST 系列冷轧钢板配电箱规格”。
- 2026-11-08 追加：规格表改为等宽六列（table-fixed）、表头与内容全部居中。
- 2026-11-08 追加：规格表下方增加“箱体规格可根据客户需求定制和更换。”
- 2026-11-08 追加：为给后期英文 SEO 页让出网址，中文选型页从 /pv-combiner-box-selector 移到 /cn/steel-combiner-box-selector（文件 src/pages/cn/steel-combiner-box-selector.astro），仍 noindex。新地址 HTTP 200，旧地址 404。规划：英文按材质分两页（钢制 / 塑料）互链，共用 src/lib/combiner-selector.mjs。
- 2026-11-08 追加：电压推算增加“低温系数（选填）”，留空按 1.2，可填 1.0–1.5，附温度系数×最低气温的计算说明；estimateVoltage 增加 factor 参数，自检新增 4 条断言。逻辑自检、Astro check、HTTP 200 通过。
- 2026-11-08 追加：低温系数框换成“Voc 温度系数（%/°C）”和“当地最低气温（°C）”两个选填框；都空按 1.2，都填按 1 + |β| ×（25 − Tmin）自动计算（新增 coldFactor），只填一项或越界给提示；说明温度系数需查光伏组件规格书。自检新增 7 条断言；逻辑自检、Astro check、HTTP 200 通过。
- 2026-11-08 追加：恢复“低温系数”框：默认 1.2，可手填（1.0–1.5）；填了 Voc 温度系数和最低气温时自动计算并填入（只读），清空后恢复手填值。新增 resolveFactor（自动 > 手填 > 默认），自检新增 4 条断言。
- 2026-11-08 追加：结果区算式标注系数名称，如“14A × 1.5（熔丝系数）= 21A”“14A × 4 路 × 1.25（断路器系数）= 70A”。
- 2026-11-08 追加：首屏小标题改为“ST 系列 · 金属光伏直流汇流箱”，H1 改为“金属光伏汇流箱选型”，与后期塑料箱页区分。
- 2026-11-08 追加：低温系数标签改为“低温系数（默认 1.2，可按地区修改）”。
- 2026-11-08 追加：推算区三个选填标签的括号说明改为小号浅灰字，避免低温系数标签换行。
- 2026-11-08 追加：单串 Isc 默认值由 14 改为 13.9（恢复示例参数同样回到 13.9）。
- 2026-11-08 追加：表单新增“熔丝系数”（默认 1.5）和“断路器系数”（默认 1.25）两个可改输入框，不设下限（仅要求 > 0），附 IEC 1.5 / NEC 1.56、以组件规格书为准的说明；select 增加 fuseK / breakerK 参数，自检新增 4 条断言。逻辑自检、Astro check、HTTP 200 通过。
- 2026-11-08 追加：更正熔丝系数说明——系数由标准决定（IEC ≥1.5 / NEC 1.56），组件规格书无此项；规格书需核对“最大串联熔丝额定值”。
- 2026-11-08 追加：断路器系数说明改为“IEC 62548 至少 1.25，美标 NEC 1.56，箱内高温按断路器降容曲线加大”。
- 2026-11-08 追加：熔丝/断路器系数两个框收进折叠区“按标准调整熔丝 / 断路器系数”，样式同电压推算折叠；标题后显示当前系数，改动后显示“已修改”。收起时仍按框内数值计算。Astro check、HTTP 200 通过。

## 选型页加入 Resources 并发布（2026-11-08）

- landing-pages.ts 新增 noindex 字段；中文选型页登记到 solar-pv-components / pv-combiner-box，Resources 可见；sitemap 过滤 noindex 页面。本地 /resources 含链接、/sitemap.xml 不含。
- Astro check 0 errors；选型逻辑自检通过；npm run build 完成（本机实际 Node v25.2.1，未切换到 Node 22；Vercel 按 engines 22.x 构建）。
- 按用户要求将工作区全部改动（不含 artifacts/combiner-box-selector.html 原型）提交并推送 main，触发 Vercel 部署；线上结果见下一条记录。
