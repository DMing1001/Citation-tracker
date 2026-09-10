const BASE='https://www.hec.usace.army.mil/confluence/rasdocs';
const docContent={
      'overview':{
        title:'🌊 HEC-RAS 软件详细介绍',
        link:BASE+'/rasum/latest/introduction-to-hec-ras',
        html:`<h4>软件定位</h4>
<p>HEC-RAS（Hydrologic Engineering Center's River Analysis System）由美国陆军工程兵团（USACE）水文工程中心开发，是全球使用最广泛的河流水力学分析系统之一。它是 HEC "Next Generation"（NexGen）水文工程软件系列的核心组件，同系列还包括 HEC-HMS（降雨径流）、HEC-ResSim（水库调度）、HEC-FDA/FIA（洪水损失评估）等。</p>
<h4>四大核心分析模块</h4>
<ul>
<li><strong>一维恒定流水面线计算</strong> — 基于一维能量方程的标准步推法（Standard Step Method），支持亚临界流、超临界流和混合流态。能量损失由摩擦（Manning 方程）和收缩/扩张（系数 × 速度头变化）评估。动量方程用于急变流（水跃、桥梁水力学、汇流口）场景。可计算包含桥梁、涵洞、堰、闸门等水工建筑物的复杂河网。支持多工况（Multiple Plan）、多水面线（Multiple Profile）、多桥/涵洞方案对比。</li>
<li><strong>一维/二维非恒定流模拟</strong> — 求解完整圣维南方程组（1D）和浅水方程（2D）。一维非恒定流支持亚临界、超临界和混合流态。二维基于有限体积法离散，使用 Roe 近似黎曼解计算界面通量，支持干湿界面自动处理。可进行一维与二维耦合建模（Storage Area Connection / Lateral Structure）。特殊功能包括：溃坝分析（Dam Break）、堤防漫顶与溃决（Levee Overtopping & Breaching）、泵站（Pumping Stations）、船闸运行、有压管道系统、自动率定、用户自定义规则。</li>
<li><strong>泥沙输移与河床演变</strong> — 支持一维和二维移动河床计算（Quasi-Unsteady / Fully Unsteady）。按粒径分组计算输沙能力，模拟长期冲淤趋势、水库淤积、航道维护疏浚、洪水最大冲刷深度等。支持的输沙公式包括：Engelund-Hansen、Meyer-Peter Müller、Yang、Parker 等。6.7 版新增弯道二次流对泥沙横向输移的影响（经 Koch & Folkstra 1980 验证）和 2D Bridge Scour 桥梁冲刷分析。</li>
<li><strong>水温与水质模拟</strong> — 一维河道水温分析和有限水质组分（藻类、溶解氧、CBOD、氮磷等）的迁移转化模拟。</li>
</ul>
<h4>软件界面与数据管理</h4>
<p>HEC-RAS 采用图形用户界面（GUI），提供文件管理、数据编辑、计算执行、结果可视化（图表、动画、淹没图）、报告生成等功能。用户界面设计注重易用性和效率，支持在线帮助。</p>
<p>内置 RAS Mapper GIS 系统（6.0 起成为地理空间数据管理的统一入口），支持地形数据管理（DEM/TIN 导入、多层地形叠加）、二维网格编辑（Breaklines/Breakpoints）、结果空间可视化（水深/流速/水位/淹没范围）、地图导出（Shapefile/GeoTIFF/图片）。</p>
<p>数据存储使用平面文件（ASCII/二进制）、HEC-DSS 和 HDF5 格式。用户只需输入项目文件名，系统自动创建和管理所有相关文件。</p>
<h4>HEC-RAS 文档体系</h4>
<ul>
<li><strong>User's Manual（用户手册）</strong> — 软件使用指南，从安装到各个分析模块的详细操作（共 14 章 + 4 个附录）</li>
<li><strong>2D User's Manual（二维用户手册）</strong> — 二维建模完整工作流，含 RAS Mapper 网格生成和淹没图</li>
<li><strong>HEC-RAS Mapper Manual</strong> — 坐标系建立、地形模型开发、几何数据提取、结果可视化</li>
<li><strong>Sediment Transport User's Manual</strong> — 1D/2D 泥沙建模、SIAM、BSTEM 岸坡稳定性</li>
<li><strong>Hydraulic Reference Manual（水力学参考手册）</strong> — 理论公式、参数估计方法、建模指南</li>
<li><strong>Applications Guide（应用指南）</strong> — 一系列工程实例演示</li>
</ul>
<h4>系统要求</h4>
<ul>
<li>64 位 Windows 操作系统（7/8/8.1/10/11），必须安装最新系统补丁</li>
<li>Intel I5 或更高处理器（二维建模推荐多核 CPU，6.7 版自动区分 P-core/E-core）</li>
<li>最低 8GB 内存（推荐 16GB+，大型二维模型可能需要 32GB+）</li>
<li>10GB 以上可用磁盘空间</li>
<li>6.7 版支持通过 WSL 在 Windows 上运行 Linux 计算引擎</li>
</ul>
<div class="tip-box"><p>💡 提示：新版本可与旧版本并行安装，完全兼容旧项目文件。首次安装后建议从官网下载示例项目进行练习。6.7 版新增多方案运行（Run Multiple Plans），可自动测试不同处理器数量的运行效率。</p></div>`
      },
      'user-manual':{
        title:'📘 一维用户手册 — 详细操作步骤',
        link:BASE+'/rasum/latest',
        html:`<h4>一、软件安装</h4>
<ol class="step-list">
<li>从 HEC 官网下载 HEC-RAS 安装包（HEC-RAS_Version_Setup.exe）</li>
<li>以管理员身份运行安装程序，选择安装目录</li>
<li>按屏幕提示完成安装，可选择创建桌面快捷方式</li>
<li>安装完成后，程序文件位于 C:\\Program Files\\HEC\\HEC-RAS\\RAS.EXE</li>
</ol>
<div class="warn-box"><p>⚠️ 不能直接复制文件运行，必须使用安装程序注册 DLL 等系统组件。6.0+ 版本仅支持 64 位 Windows。</p></div>
<h4>二、创建项目与几何数据</h4>
<ol class="step-list">
<li>打开 HEC-RAS，选择 <strong>File → New Project</strong>，输入项目名称和保存路径（项目名自动作为文件名前缀）</li>
<li>进入 <strong>Edit → Geometric Data</strong>，打开几何数据编辑器</li>
<li>使用 <strong>Reach Tools</strong> 从上游到下游绘制河道中心线（River Reach）。每条河流可包含多条河段</li>
<li>在每个断面位置输入河道横断面数据（Station-Elevation），可从外部文件批量导入</li>
<li>设定 Manning 糙率系数（n 值），可分区域设定主槽和滩地（Main Channel n / Left/Right Overbank n）</li>
<li>设定断面间距（Contraction/Expansion Coefficients），通常收缩 0.1、扩张 0.3</li>
<li>如需添加水工建筑物，在对应断面位置插入 Bridge/Culvert/Inline Structure：
  <ul>
  <li>桥梁：输入桥台、桥墩、梁底高程等参数，选择水力计算方法（能量法/动量法/General 法）</li>
  <li>涵洞：选择管型（圆管/箱涵/拱形等），输入尺寸和坡度</li>
  <li>堰/闸门：设定堰顶高程、闸门尺寸和运行规则</li>
  </ul>
</li>
</ol>
<h4>三、恒定流计算</h4>
<ol class="step-list">
<li>选择 <strong>Edit → Steady Flow Data</strong>，打开流量数据编辑器</li>
<li>设定计算工况数量（Number of Profiles），可对比不同流量下的水面线</li>
<li>在每个河段上游输入流量值，流量沿河段保持不变，除非指定流量变化点</li>
<li>设定边界条件：上游设流量（Known Flow），下游设水位（Known WS）或正常水深（Normal Depth）</li>
<li>选择 <strong>Run → Steady Flow Analysis</strong>，点击 <strong>Compute</strong> 执行计算</li>
<li>检查收敛情况：查看诊断信息中的 Error/Warning，重点关注断面间距和流量合理性</li>
</ol>
<div class="tip-box"><p>💡 使用 Compute → Multiple Profiles 可进行多工况计算，对比不同流量下的水面线变化。桥梁分析可选择 Multiple Bridge Openings 自动尝试不同桥孔方案。</p></div>
<h4>四、非恒定流计算</h4>
<ol class="step-list">
<li>选择 <strong>Edit → Unsteady Flow Data</strong>，设定流量过程线（时间-流量对）和下游水位过程线</li>
<li>设定初始条件：可从恒定流计算结果导入（推荐），或手动设定初始流量/水位</li>
<li>选择计算参数：时间步长（建议满足 CFL 条件）、θ 加权因子（0.6~1.0）、迭代次数</li>
<li>设定 Storage Area（蓄水区）和 Lateral Structure（侧向结构物）用于模拟水库和分洪</li>
<li>如需溃坝分析，在 Dam Breach 编辑器中设定溃口形状（梯形/矩形）、溃决时间、溃决模式（瞬间/渐进）</li>
<li>设定用户自定义规则（User-Defined Rules）控制闸门、泵站的自动运行</li>
<li>执行计算：Run → Unsteady Flow Analysis</li>
</ol>
<h4>五、结果查看</h4>
<ul>
<li><strong>View → Water Surface Profiles</strong> — 水面线剖面图（对比不同工况）</li>
<li><strong>View → Cross Section</strong> — 断面图（含水面线、能量线、流速分布）</li>
<li><strong>View → Rating Curves</strong> — 水位-流量关系曲线</li>
<li><strong>View → Table Output</strong> — 详细的数值输出表格（可自定义列）</li>
<li><strong>View → Stage/Flow Hydrographs</strong> — 非恒定流过程线（水位/流量随时间变化）</li>
<li><strong>RAS Mapper</strong> — 淹没范围空间可视化，支持动画回放洪水演进过程</li>
<li>所有图形和表格可导出到打印机、剪贴板或通过 HEC-DSS 传递给其他软件</li>
</ul>
<h4>六、用户手册完整章节</h4>
<ul>
<li>Chapter 1-2：HEC-RAS 介绍与安装</li>
<li>Chapter 3-4：项目管理、文件类型（Project/Plan/Geometry/Steady/Unsteady/Sediment/Water Quality）</li>
<li>Chapter 5：几何数据输入与编辑（断面、河段、建筑物）</li>
<li>Chapter 6-7：恒定流和非恒定流水力分析</li>
<li>Chapter 8：图形和表格输出查看</li>
<li>Chapter 9：洪泛区侵占分析（Floodway Encroachment）</li>
<li>Chapter 10：故障排除（Trouble Shooting）— 最常见 Error/Warning 解读</li>
<li>Chapter 11：桥梁冲刷计算（Bridge Scour）</li>
<li>Chapter 12：河道整治（Channel Modifications）</li>
<li>Chapter 13：水力设计函数（稳定河道设计、抛石粒径计算等）</li>
<li>Chapter 14：非恒定流高级主题（混合流态、溃坝、堤防、泵站、船闸、自定义规则）</li>
</ul>`
      },
      '2d-manual':{
        title:'📗 二维用户手册 — 详细操作步骤',
        link:BASE+'/rasdocs/r2dum/latest',
        html:`<h4>二维建模核心概念</h4>
<p>二维建模将计算区域划分为三角形/四边形网格（Mesh），在每个网格单元上求解二维浅水方程，得到水深和流速的空间分布。适用于洪水漫滩、溃坝、城市内涝等需要考虑水流横向扩散的场景。计算方程可选：
<ul>
<li><strong>Shallow Water Equations (SWE)</strong> — 完整浅水方程，精度高但计算量大</li>
<li><strong>Diffusion Wave</strong> — 扩散波近似（忽略对流项），速度快但精度略低</li>
</ul>
</p>
<h4>一、创建二维计算区域</h4>
<ol class="step-list">
<li>在 <strong>Geometric Data</strong> 编辑器中，选择 <strong>2D Flow Area</strong> 工具</li>
<li>绘制二维区域边界多边形，边界应远离关注区域以避免边界效应</li>
<li>在 <strong>RAS Mapper</strong> 中导入地形数据（DEM），作为二维计算的底床高程</li>
<li>如需蓄水区（Storage Area），在 Geometric Data 中创建并与二维区域连接</li>
</ol>
<h4>二、网格生成与细化（核心步骤）</h4>
<ol class="step-list">
<li>设定基础网格尺寸（Base Cell Size），应不小于 DEM 分辨率的 2~3 倍</li>
<li>沿河道中心线添加 <strong>Breaklines</strong>，自动加密网格以精确捕捉河道形态</li>
<li>沿堤防线添加 Breaklines，确保堤防不被网格"淹没"（网格单元可能跨越堤顶）</li>
<li>在桥梁/涵洞等关键位置添加 <strong>Breakpoints</strong>，控制局部网格密度</li>
<li>在道路/建筑等地物处添加 Breaklines，提高模型对地物的分辨率</li>
<li>生成网格后检查质量：避免出现过小（< Base Size / 4）或畸形（Aspect Ratio 过大）的网格单元</li>
<li>6.7 版新增：网格质量可视化工具可高亮显示问题单元</li>
</ol>
<div class="tip-box"><p>💡 网格质量直接影响计算稳定性和精度。建议先用粗网格验证模型合理性，再逐步加密网格（从 Base Size 的 2 倍开始逐步缩小）。</p></div>
<h4>三、边界条件与计算</h4>
<ul>
<li><strong>外部边界</strong>：上游设流量过程线（Flow Hydrograph），下游设水位过程线（Stage Hydrograph）或正常水深（Normal Depth / Rating Curve）</li>
<li><strong>内边界</strong>：可设置侧向入流（Lateral Inflow）、源汇项（Source/Sink）等</li>
<li><strong>SA/2D Connection</strong>：Storage Area 与 2D Flow Area 之间的连接，支持堰、闸门、泵站等结构物</li>
<li><strong>Lateral Structure</strong>：连接主河道（1D）与二维漫滩区域，支持堰/涵洞/闸门</li>
<li>设定计算时间步长，必须满足 CFL 稳定性条件（建议从较大步长开始，根据收敛情况调整）</li>
<li>6.7 版新增：Numerical Reproducibility 选项（三级：默认/严格/最严格），平衡精度与并行计算效率</li>
<li>6.7 版新增：Run Multiple Plans 功能，自动测试不同处理器数量的运行效率</li>
</ul>
<h4>四、一维/二维耦合建模</h4>
<p>在 "河道用 1D、漫滩用 2D" 的耦合模式中，一维河道通过以下方式与二维漫滩区域连接：</p>
<ul>
<li><strong>Storage Area Connection</strong>：连接蓄水区与 2D 区域，支持堰/溢洪道</li>
<li><strong>Lateral Structure</strong>：沿河道侧向连接二维区域，支持堰/涵洞/闸门</li>
<li>6.7 版新增：涵洞出流可向 2D 区域引入动量（需手动开启 Use Momentum 选项），更准确模拟涵洞射流效应</li>
</ul>
<h4>五、结果可视化</h4>
<ul>
<li><strong>Water Surface</strong> — 水面高程渲染</li>
<li><strong>Depth</strong> — 水深分布图</li>
<li><strong>Velocity</strong> — 流速矢量/大小渲染</li>
<li><strong>Inundation</strong> — 淹没范围图（可叠加航空影像底图）</li>
<li><strong>Reference Lines</strong> — 设置参考线输出平均流速、最大流速、水力深度、流量、面积、水面宽、摩擦坡度等断面统计量</li>
<li>支持动画回放，直观展示洪水演进过程</li>
<li>结果可导出为 Shapefile、GeoTIFF 等格式</li>
</ul>
<div class="warn-box"><p>⚠️ 二维模型计算量大，建议：(1) 先用粗网格验证模型合理性；(2) 使用多核 CPU 加速；(3) 6.7 版自动使用 P-core（性能核）而非 E-core（效率核）。</p></div>`
      },
      'mapper':{
        title:'🗺️ RAS Mapper — 详细操作说明',
        link:BASE+'/rasdocs/rmum/latest',
        html:`<h4>RAS Mapper 概述</h4>
<p>RAS Mapper 是 HEC-RAS 内置的 GIS 系统，从 6.0 版本起成为管理所有地理空间数据的统一入口。它替代了旧版本中分散的 GIS 功能，提供了地形管理、网格编辑、结果可视化、地图输出等一体化功能。</p>
<h4>一、地形数据管理</h4>
<ol class="step-list">
<li>在 RAS Mapper 中右键 <strong>Terrain</strong> → <strong>Add New Terrain</strong></li>
<li>导入 DEM 栅格文件（支持 GeoTIFF、ASCII Grid 等格式）</li>
<li>可叠加多层地形（如河道实测断面 + 区域 DEM），系统自动选择最精细数据</li>
<li>使用 <strong>Terrain Modification</strong> 功能修筑堤防、修改桥台地形、进行填挖方</li>
</ol>
<h4>二、二维网格编辑</h4>
<ul>
<li>在地图上直接绘制二维区域边界</li>
<li>使用 Breaklines 工具沿地物细化网格</li>
<li>实时预览网格效果，调整参数后即时更新</li>
</ul>
<h4>三、结果可视化</h4>
<ul>
<li><strong>Water Surface</strong> — 水面高程渲染</li>
<li><strong>Depth</strong> — 水深分布图</li>
<li><strong>Velocity</strong> — 流速矢量/大小渲染</li>
<li><strong>Inundation</strong> — 淹没范围图</li>
<li><strong>Reference Lines</strong> — 设置参考线输出平均流速、水力深度等断面统计量</li>
<li>支持动画回放，直观展示洪水演进过程</li>
</ul>
<h4>四、地图输出</h4>
<p>可将结果导出为图片、Shapefile、GeoTIFF 等格式，用于报告制作和 GIS 分析。支持自定义图例、比例尺、指北针等地图元素。</p>`
      },
      'hydraulic-ref':{
        title:'📐 水力学参考手册 — 理论公式详解',
        link:BASE+'/rasdocs/ras1dtechref/latest',
        html:`<h4>一维恒定流 — 能量方程</h4>
<p>HEC-RAS 一维恒定流基于一维能量方程（步推法 Standard Step Method）：</p>
<p style="text-align:center;font-family:monospace;color:var(--c-text-bright);padding:12px;background:rgba(0,0,0,0.2);border-radius:8px;margin:12px 0;">WS₂ + V₂²/2g = WS₁ + V₁²/2g + hₑ</p>
<p>其中 WS 为水面高程，V 为平均流速，g 为重力加速度，hₑ 为两断面间的能量损失（摩擦损失 + 收缩/扩张损失）。</p>
<p>摩擦损失由 Manning 方程评估：Sf = (nV)² / (Rh^(4/3))，其中 n 为 Manning 糙率系数，Rh 为水力半径。收缩/扩张损失由系数乘以速度头变化来评估。</p>
<p>动量方程用于急变流场景：混合流态计算（水跃）、桥梁水力学、汇流口水面线。</p>
<h4>一维非恒定流 — 圣维南方程组</h4>
<ul>
<li><strong>连续性方程</strong>：∂A/∂t + ∂Q/∂x = 0（A 为过水面积，Q 为流量）</li>
<li><strong>动量方程</strong>：∂Q/∂t + ∂(Q²/A)/∂x + gA∂h/∂x = gA(S₀ - Sf)</li>
<li>使用 Preissmann 窄缝法处理干湿交替问题</li>
<li>隐式差分格式求解，无条件稳定（亚临界流）</li>
<li>θ 加权因子控制隐式程度（0.5 = Crank-Nicolson，1.0 = 全隐式）</li>
</ul>
<h4>二维浅水方程</h4>
<ul>
<li>基于有限体积法（Finite Volume Method）离散计算域</li>
<li>使用 Roe 近似黎曼解（Roe's Approximate Riemann Solver）计算单元界面通量</li>
<li>支持干湿界面处理，自动识别淹没/暴露单元</li>
<li>可选扩散波近似（Diffusion Wave）：忽略对流项和压力梯度中的时间导数项，计算速度更快</li>
<li>6.7 版新增弯道二次流效应：平衡方法（快 40%）和非平衡方法（更精确）</li>
</ul>
<h4>桥梁/涵洞水力学</h4>
<ul>
<li><strong>能量法</strong>：在桥断面处建立能量平衡，考虑桥台收缩/扩张、桥墩阻水、梁底壅水等</li>
<li><strong>动量法</strong>：适用于急流、混合流态，基于动量守恒方程求解</li>
<li><strong>General 方法（6.7 推荐）</strong>：自动选择能量法或动量法，替代旧的 Prismatic (Legacy) 方法</li>
<li>6.7 版新增：2D 桥梁压力流与越顶流方法，分别求解桥孔内和桥面上的二维方程</li>
</ul>
<h4>水工建筑物</h4>
<ul>
<li><strong>堰</strong>：宽顶堰/侧堰方程，可选能量坡度或水面坡度作为水头</li>
<li><strong>闸门</strong>：支持 Radial Gate、Sluice Gate、Overflow Gate，可设 Rules/Time Series/Elevation 控制</li>
<li><strong>溢洪道</strong>：标准溢洪道和非常溢洪道方程</li>
<li><strong>泵站</strong>：定义泵的启动/停止水位和抽水流量</li>
<li><strong>侧向结构物</strong>：连接主河道与蓄洪区/分洪道，综合使用堰/涵洞/闸门方程</li>
</ul>`
      },
      'sed1d':{
        title:'🏖️ 一维泥沙输移 — 详细建模步骤',
        link:BASE+'/rasdocs/rassed1d',
        html:`<h4>泥沙建模流程</h4>
<ol class="step-list">
<li><strong>定义泥沙级配</strong>：在 Sediment Data 编辑器中设定粒径分组（如 0.1mm, 0.5mm, 2mm, 8mm），每个分组设定权重百分比</li>
<li><strong>初始化床沙</strong>：设定初始床沙组成，可分多层（Surface Layer + Substrate Layers）</li>
<li><strong>选择输沙公式</strong>：根据河床组成选择合适的公式
  <ul>
  <li><strong>Engelund-Hansen</strong> — 适用于沙质河床，全沙输移</li>
  <li><strong>Meyer-Peter Müller</strong> — 适用于卵石河床，推移质</li>
  <li><strong>Yang</strong> — 基于流功率的公式，适用范围广</li>
  <li><strong>Parker</strong> — 仅适用于卵石河床</li>
  </ul>
</li>
<li><strong>设定计算参数</strong>：包括形态加速因子（MAF）、水流计算时间步长、泥沙计算时间步长</li>
<li><strong>执行计算</strong>：Run → Sediment Transport Analysis</li>
<li><strong>结果分析</strong>：查看河床高程变化、冲淤量、输沙率过程线等</li>
</ol>
<h4>BSTEM 岸坡稳定性</h4>
<p>Bank Stability Toe Erosion Model 用于评估岸坡稳定性，考虑：</p>
<ul>
<li>趾部冲刷速率（基于流速和土体特性）</li>
<li>岸坡崩塌机制（Planar Failure / Mass Failure）</li>
<li>植被根系对岸坡的加固作用</li>
</ul>`
      },
      'sed2d':{
        title:'🌊 二维泥沙输移 — 详细说明',
        link:BASE+'/rasdocs/h2sd',
        html:`<h4>二维泥沙模型特点</h4>
<p>二维泥沙输移模型在一维模型基础上增加了河道横向的冲淤分布模拟能力。</p>
<h4>主要功能</h4>
<ul>
<li><strong>横向冲淤分布</strong>：模拟弯道凹岸冲刷、凸岸淤积的三维效应</li>
<li><strong>弯道二次流</strong>（6.7 新增）：基于 Koch & Folkstra (1980) 方法，模拟弯道螺旋流对泥沙横向输移的影响</li>
<li><strong>2D Bridge Scour</strong>（6.7 新增）：二维桥梁冲刷分析，可导出至 FHWA Hydraulic Toolbox</li>
<li><strong>形态加速因子</strong>：自动/手动设定，加速长期演变模拟</li>
</ul>
<h4>建模要点</h4>
<ul>
<li>二维网格应足够精细以捕捉横向冲淤梯度</li>
<li>弯道处需加密网格以准确模拟二次流效应</li>
<li>建议先运行水动力计算验证流场合理性，再叠加泥沙计算</li>
</ul>`
      },
      'mud':{
        title:'🏔️ 泥石流建模 — 详细说明',
        link:BASE+'/rasdocs/rasmuddebris',
        html:`<h4>泥石流模型概述</h4>
<p>HEC-RAS 的泥石流模块使用非牛顿流体模型模拟粘性泥石流的运动。</p>
<h4>支持的流变模型</h4>
<ul>
<li><strong>Bingham 模型</strong>：最常用，需设定屈服应力（Yield Stress）和塑性粘度（Plastic Viscosity）</li>
<li><strong>Herschel-Bulkley 模型</strong>：更通用，增加幂律指数参数</li>
</ul>
<h4>应用场景</h4>
<ul>
<li>山区沟道泥石流运动模拟</li>
<li>大坝溃决后的泥石流演进</li>
<li>变浓度泥石流：清水与泥石流交汇（6.7 Beta 1 新增指南）</li>
<li>支流泥石流入汇干流清水的耦合场景</li>
</ul>
<h4>建模步骤</h4>
<ol class="step-list">
<li>建立二维计算区域，网格应沿沟道加密</li>
<li>设定非牛顿流体参数（屈服应力、塑性粘度）</li>
<li>上游边界设泥石流流量和浓度过程线</li>
<li>执行计算，查看堆积范围、厚度和流速</li>
</ol>`
      },
      'tutorial-terrain':{
        title:'🛠️ 地形处理教程 — 详细步骤',
        link:BASE+'/rasdocs/hgt/latest/tutorials/terrain',
        html:`<h4>地形数据来源</h4>
<ul>
<li><strong>DEM 栅格</strong>：LiDAR、SRTM、ASTER 等来源的数字高程模型</li>
<li><strong>实测断面</strong>：河道测量横断面数据</li>
<li><strong>CAD 数据</strong>：工程设计地形图（通过 ArcGIS Pro 转换为 DEM）</li>
</ul>
<h4>操作步骤</h4>
<ol class="step-list">
<li>在 <strong>RAS Mapper</strong> 中导入 DEM 栅格文件</li>
<li>检查地形数据质量：是否存在空值（NoData）、异常高程值</li>
<li>如需叠加河道实测断面，创建多层地形（优先使用实测数据）</li>
<li>使用 <strong>Terrain Modification</strong> 工具修筑堤防：沿堤防线绘制切割线，设定堤顶高程</li>
<li>修改桥台区域地形，确保桥台与地形贴合</li>
<li>进行填挖方模拟时，绘制修改区域并设定目标高程</li>
</ol>
<div class="tip-box"><p>💡 建议保留原始 DEM 作为底层，所有修改在上层进行，便于后期调整和版本对比。</p></div>`
      },
      'tutorial-1dsteady':{
        title:'📘 一维恒定流教程 — 详细步骤',
        link:BASE+'/rasdocs/hgt/latest/tutorials/1d-steady-flow',
        html:`<h4>完整工作流程</h4>
<ol class="step-list">
<li><strong>导入几何数据</strong>：在 RAS Mapper 中导入地形，或手动编辑断面数据</li>
<li><strong>绘制河段</strong>：使用 Reach 工具从上游到下游绘制河道中心线</li>
<li><strong>编辑断面</strong>：在每个断面位置输入 Station-Elevation 数据，设定 Manning n 值</li>
<li><strong>添加建筑物</strong>：在桥梁位置插入 Bridge/Culvert 断面，输入几何参数</li>
<li><strong>输入流量</strong>：在 Steady Flow Data 编辑器中设定流量值</li>
<li><strong>设定边界</strong>：上游流量 + 下游水位（或正常水深）</li>
<li><strong>执行计算</strong>：Run → Steady Flow Analysis → Compute</li>
<li><strong>查看结果</strong>：水面线图、断面图、流量-水位关系曲线</li>
</ol>
<h4>子教程列表</h4>
<ul>
<li>Developing 1D Geometric Data with RAS Mapper</li>
<li>Steady Flow Modeling with HEC-RAS</li>
<li>Bridge Development（桥梁几何数据建立）</li>
<li>Bridge Analysis（桥梁水力分析）</li>
<li>Culvert Analysis（涵洞水力分析）</li>
<li>Calibration of a Steady Flow Hydraulics Model（模型率定）</li>
<li>Troubleshooting with HEC-RAS（故障排除）</li>
<li>Floodway Workshop（洪泛区分析）</li>
</ul>`
      },
      'tutorial-1dunsteady':{
        title:'📗 一维非恒定流教程 — 详细步骤',
        link:BASE+'/rasdocs/hgt/latest/tutorials/1d-unsteady-flow',
        html:`<h4>非恒定流 vs 恒定流</h4>
<p>恒定流假设流量不随时间变化，非恒定流则模拟流量随时间变化的过程（如洪水过程线），求解完整的圣维南方程组。</p>
<h4>关键步骤</h4>
<ol class="step-list">
<li><strong>准备几何数据</strong>：同一维恒定流，但需更仔细地处理断面间距和糙率</li>
<li><strong>设定边界条件</strong>：上游输入流量过程线（时间-流量对），下游输入水位过程线或 Rating Curve</li>
<li><strong>设定初始条件</strong>：可从恒定流计算结果导入，或手动设定初始流量/水位</li>
<li><strong>选择计算参数</strong>：时间步长（建议满足 CFL 条件）、θ 加权因子（通常 0.6~1.0）</li>
<li><strong>执行计算</strong>：Run → Unsteady Flow Analysis</li>
<li><strong>结果分析</strong>：过程线（水位/流量随时间变化）、动画回放、最大淹没范围</li>
</ol>
<h4>进阶功能</h4>
<ul>
<li><strong>Storage Area</strong>：模拟水库、蓄水区的调蓄作用</li>
<li><strong>Lateral Structure</strong>：连接主河道与蓄洪区/分洪道</li>
<li><strong>Dam Breach</strong>：设定溃口形状、溃决时间、溃决模式</li>
<li><strong>User-Defined Rules</strong>：自定义闸门、泵站的运行规则</li>
</ul>`
      },
      'tutorial-2d':{
        title:'📙 二维非恒定流教程 — 13 个子教程详解',
        link:BASE+'/rasdocs/hgt/latest/tutorials/2d-unsteady-flow',
        html:`<h4>子教程完整列表</h4>
<ol class="step-list">
<li><strong>Mesh Generation and Refinement</strong> — 网格生成与细化。学习如何创建二维网格，使用 Breaklines 和 Breakpoints 控制网格质量</li>
<li><strong>Creating a Simple 2D Model</strong> — 创建简单二维模型。从导入地形到查看结果的完整流程</li>
<li><strong>Land Cover and Manning's n Data</strong> — 土地覆盖与曼宁系数。从 GIS 土地利用数据自动生成空间分布糙率</li>
<li><strong>2D Model Development and Refinement</strong> — 二维模型开发与优化。如何调整网格、修改参数、验证结果</li>
<li><strong>Storage Area and 2D Connections</strong> — 蓄水区与二维连接。学习堰、溢洪道与二维区域的耦合方法</li>
<li><strong>Combined 1D/2D Modeling</strong> — 一维与二维耦合建模。河道用 1D、漫滩用 2D 的典型工程应用</li>
<li><strong>Dam Breach Analysis with 2D Areas</strong> — 二维溃坝分析。含简单几何、堤防细化、敏感性分析等子教程</li>
<li><strong>Simplified 2D Bridge Modeling</strong> — 简化二维桥梁建模。使用 2D 区域模拟桥梁对水流的影响</li>
<li><strong>2D Rules</strong> — 二维规则控制。闸门、泵站在二维模型中的自动运行</li>
<li><strong>Flow Hydrograph Optimization</strong> — 流量过程线优化。自动率定上游边界流量</li>
<li><strong>Floodway Encroachment Analysis (2D)</strong> — 二维洪泛区侵占分析</li>
<li><strong>Floodway Encroachment using Zones</strong> — 使用分区进行洪泛区侵占分析</li>
<li><strong>Troubleshooting a 2D Model</strong> — 二维模型故障排除。常见错误诊断与修复方法</li>
</ol>
<div class="tip-box"><p>💡 建议从 Tutorial 01 → 02 → 03 顺序学习，这是二维建模的核心三步。Tutorial 07 溃坝分析是工程中最常用的功能之一。</p></div>`
      },
      'tutorial-sediment':{
        title:'🏖️ 泥沙输移教程 — 详细步骤',
        link:BASE+'/rasdocs/hgt/latest/tutorials/1d-sediment-transport',
        html:`<h4>一维泥沙教程</h4>
<ol class="step-list">
<li>准备一维水动力模型（恒定流或非恒定流）</li>
<li>在 Sediment Data 中定义泥沙级配和床沙组成</li>
<li>选择输沙能力公式并设定参数</li>
<li>设定形态加速因子（MAF）以加速长期演变</li>
<li>执行泥沙计算，查看河床高程变化</li>
<li>使用 BSTEM 模块评估岸坡稳定性</li>
</ol>
<h4>二维泥沙教程</h4>
<ol class="step-list">
<li>在二维水动力模型基础上叠加泥沙计算</li>
<li>配置二维泥沙参数（与一维类似但增加横向分布）</li>
<li>利用形态加速因子加速计算</li>
<li>6.7 新增：2D Bridge Scour 桥梁冲刷分析</li>
</ol>`
      },
      'tutorial-pipe':{
        title:'🔧 管道网络教程 — 详细说明',
        link:BASE+'/rasdocs/hgt/latest/tutorials/pipe-networks',
        html:`<h4>管道网络功能概述</h4>
<p>HEC-RAS 的管道网络模块（Pipe Networks）用于模拟城市雨水管网、排水系统中的管道流。支持与二维地表模型耦合，模拟地表径流进入管道、管道溢流回到地表的过程。</p>
<h4>支持的管道类型</h4>
<ul>
<li>圆形管道（Circular）</li>
<li>矩形管道（Rectangular / Box）</li>
<li>拱形管道（Arch）</li>
<li>椭圆形管道（Elliptical）</li>
<li>半圆形管道（Semi-Circular）</li>
<li>ConSpan（大跨度拱形）</li>
</ul>
<h4>6.7 新增功能</h4>
<ul>
<li><strong>Side Inlet</strong> — 侧向进水口，模拟路缘进水口</li>
<li><strong>Top Inlet</strong> — 顶部进水口（替代 Drop Inlets）</li>
<li><strong>Surcharge Only</strong> — 模拟有盖检修孔（Manhole）</li>
<li><strong>Sluice Gate</strong> — 管道闸门，支持 Rules/Time Series/Elevation 控制</li>
<li><strong>Speed Draw</strong> — 快速绘制模式，自动在端点放置节点</li>
<li><strong>管道剖面图</strong> — 显示流量、流速、临界深度沿管道的分布</li>
</ul>`
      },
      'release':{
        title:'📋 版本更新详细说明',
        link:BASE+'/rasdocs/rasrn/latest',
        html:`<h4>HEC-RAS 6.7 Beta 5（2025.10.31）</h4>
<p>主要修复 Beta 4 中的 Bug，新增/改进功能：</p>
<ul>
<li><strong>🔧 管道网络增强</strong> — Side Inlets（侧向进水口，模拟路缘进水口/蓄水池溢流）、Top Inlets（替代 Drop Inlets，可定义一次附加到多个节点）、Surcharge Only（模拟有盖检修孔 Manhole）、管道闸门 Sluice Gate（支持 Rules/Time Series/Elevation 控制）、涵洞进水口改进（使用入口控制条件计算入流，改进埋管堰流计算）</li>
<li><strong>🐧 Linux 支持 (WSL)</strong> — 通过 WSL 运行 Linux 计算引擎，用于云端蒙特卡洛模拟。WSL 进程启动开销使单次模拟比原生 Windows 更慢，但适合批量自动化运行</li>
<li><strong>📊 数值可重现性</strong> — 三级选项：默认（最快，合理容差）、严格、最严格（运行成本递增）</li>
<li><strong>⚡ 多方案运行</strong> — 自动测试不同处理器数量的运行效率，结果汇总为单表</li>
<li><strong>🌊 堰方程能量坡度选项</strong> — SA/2D Connections 的堰方程可选 Energy Grade（能量坡度）或 Water Surface（水面）作为水头，之前仅 Lateral Structure 支持</li>
<li><strong>🌉 2D 桥梁冲刷导出 (Beta)</strong> — 新增 FHWA Hydraulic Toolbox 所需的输出变量，自动导出工具，附详细使用文档</li>
<li><strong>📈 绘图改进</strong> — 水位/流量过程线绘图器大幅改版，按节点类型分组显示，集成表格快速切换。支持 Boundary Conditions、Reference Lines、2D Faces 等</li>
<li><strong>🌀 二次流效应</strong> — 2D 泥沙弯道二次流（经 Koch & Folkstra 1980 实验验证），模拟凹岸冲刷/凸岸淤积。悬浮泥沙扩散通量和推移质偏移效应</li>
<li><strong>🔄 地理参考涵洞动量</strong> — SWE 中包含涵洞出流动量（需手动开启 Use Momentum 选项），更准确模拟涵洞射流和掺混效应</li>
</ul>
<h4>HEC-RAS 6.7 Beta 4</h4>
<ul>
<li><strong>CPU 亲和性</strong> — 自动区分 P-core（性能核）/ E-core（效率核），计算仅用 P-core，避免效率核拖慢速度</li>
<li><strong>二次流 (Beta)</strong> — 弯道螺旋流模拟（平衡/非平衡方法，参考 Delft3D-FLOW），经 Steffler 1984 水槽实验验证</li>
<li><strong>结构物剖面图</strong> — 剖面中显示水工建筑物（低弦高程 vs 水面线）</li>
<li><strong>时间序列绘图</strong> — 过程线集成表格快速切换，2D Connections 可直接从列表选择</li>
<li><strong>USGS 数据下载</strong> — 支持按数据集过滤，解决 USGS NED 服务器不稳定问题</li>
</ul>
<h4>HEC-RAS 6.7 Beta 2/3</h4>
<ul>
<li><strong>2D 桥梁</strong> — 压力流与越顶流新方法，分别求解桥孔内和桥面上的二维方程</li>
<li><strong>1D 桥梁动量法</strong> — General 方法（推荐）替代 Prismatic (Legacy)，改善上下游断面差异大时的水力表精度</li>
<li><strong>RAS Mapper</strong> — 菜单重组：右键 Plan → Plot Results Profile / Show Results Table；Results 和 Mapping Results 分离</li>
<li><strong>参考线变量</strong> — 新增平均/最大流速、水力深度、流量、面积、水面宽、摩擦坡度（桥梁冲刷计算用）</li>
</ul>
<h4>HEC-RAS 6.7 Beta 1</h4>
<ul>
<li><strong>管道新管型</strong> — 拱形（Arch）、低矮拱形（Low Profile Arch）、高拱形（High Profile Arch）、椭圆形（水平/垂直）、半圆形（Semi-Circular）、ConSpan</li>
<li><strong>管道剖面</strong> — 显示流量、流速、临界深度沿管道的分布</li>
<li><strong>Speed Draw</strong> — 快速绘制模式，自动在端点放置节点</li>
<li><strong>形态加速因子自动化</strong> — 自动压缩流量时间序列（反比于加速因子），替代手动压缩</li>
<li><strong>BSTEM 更新</strong> — 修复多层算法 Bug，新增 BSTEM 教程</li>
<li><strong>变浓度泥石流指南</strong> — 多种复杂度方法的详细指南（Concentration Only Routing、Hindered Settling 等）</li>
</ul>`
      },
      'known':{
        title:'⚠️ 已知问题与技术支持',
        link:BASE+'/rasdocs/raski/latest',
        html:`<h4>已知问题</h4>
<p>HEC-RAS 维护了一个已知问题列表，记录当前版本中已发现但尚未修复的问题。遇到软件异常时请先查阅此列表。</p>
<h4>如何报告问题</h4>
<ol class="step-list">
<li>访问 HEC-RAS Bug Report 页面或发送邮件至 <strong>ras@usace.army.mil</strong></li>
<li>描述清楚：操作步骤、预期结果、实际结果</li>
<li>注明 HEC-RAS 版本号</li>
<li>如可能，附上复现问题所需的项目文件</li>
</ol>
<div class="warn-box"><p>⚠️ HEC 对非 USACE 用户不提供电话/邮件技术支持，但鼓励报告软件问题。回复通常包含问题确认和修复计划。</p></div>
<h4>常用排错方法</h4>
<ul>
<li>查看计算日志中的 Error/Warning 信息</li>
<li>检查断面数据是否有交叉或异常值</li>
<li>检查边界条件是否完整（每个河段都需要上下游边界）</li>
<li>非恒定流检查 CFL 条件，尝试减小时间步长</li>
<li>二维模型检查网格质量，避免过小或畸形单元</li>
</ul>`
      }
};
