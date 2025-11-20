// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ArrowLeft, Filter, Search, X, ChevronLeft, ChevronRight, BookOpen, Download, CheckCircle, Leaf, Globe, Microscope, Activity, Camera, Zap } from 'lucide-react'; // @ts-ignore;
import { useToast } from '@/components/ui';
import { LogoHeader } from '@/components/LogoHeader';
import { TabBar } from '@/components/TabBar';
export default function Products(props) {
  const {
    $w } =
  props;
  const {
    toast } =
  useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleTabChange = (tabId) => {
    if (tabId === 'products') {
      setActiveTab(tabId);
    } else {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {} });

    }
  };
  // 页面加载时检查URL参数，设置默认分类
  // 页面加载时检查URL参数，设置默认分类
  useEffect(() => {const categoryParam = $w.page.dataset.params.category;
    console.log('页面加载，分类参数:', categoryParam);
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);
  const categories = [{
    id: 'all',
    name: '全部产品',
    icon: '🔬' },
  {
    id: 'photosynthesis-gas',
    name: '光合-气体交换',
    icon: '🌿' },
  {
    id: 'photosynthesis-fluorescence',
    name: '光合-叶绿素荧光',
    icon: '✨' },
  {
    id: 'phenotype',
    name: '植物表型',
    icon: '📊' },
  {
    id: 'environment',
    name: '环境监测',
    icon: '🌡️' }];

  const products = {
    'photosynthesis-gas': [{
      id: 'capts',
      name: '标准版植物冠层光合气体交换测量系统 CAPTS',
      category: '光合-气体交换',
      description: '用于盆栽或大田植物冠层（群体）光合作用、呼吸作用和蒸腾作用的全天侯连续、自动化测量系统。该系统实现了田间小区植物光合作用的全天候（除极端天气外）、自动化的原位监测，适用于植物光合作用研究、植物生理学、作物栽培与种质资源等研究领域。',
      features: ['全天候、自动化连续测量', '单个小区测量仅需1-3分钟', '配置专业数据分析软件', '高精度环境因子同步监测', '良好的防雨水性能', '配置远程监控模块'],
      specifications: {
        '主机供电': '220VAC，4.55A',
        '主机总功率': '1600W（16箱体）',
        '测量参数': 'CO2摩尔浓度、H2O摩尔浓度、光合有效辐射PAR、温度、相对湿度、气压等',
        '工作方式': '全自动模式，驱动测量箱并自动记录测量数据',
        '数据分析': '一键式分析软件',
        '顶盖透明度': '>95%',
        '箱体透光板透射率': '>85%',
        '测量箱气密性': '2×10⁻⁴s⁻¹',
        '测量箱尺寸': '1m×1m×1.2m/1.5m（L×W×H）',
        'CO2测量原理': 'IRGA红外吸收原理',
        'CO2准确度': '<1%测量范围',
        'CO2线性度': '>99%',
        'CO2范围': '0~1000 ppm（0~0.1%）',
        'CO2测量精度': '0.1 ppm',
        '气压测量范围': '15~115 kPa',
        '气压测量准确度': '±1.5%',
        '光量子传感器灵敏度': '0.2 mV/μmol m⁻²s⁻¹',
        '测量光波长范围': '410nm~655nm',
        '湿度测量范围': '0~100%RH',
        '湿度测量准确度': '±1.5%（0-40℃，0-90%RH）',
        '温度测量范围': '-40~80℃',
        '温度检测精度': '±0.2℃（0-40℃）' },

      images: ['https://images.unsplash.com/photo-1593115048165-9dc1b9d0c6ab?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'],
      applications: ['大田作物原位测量', '水田（水稻）测量', '旱田环境测量', '植物光合作用研究', '植物生理学研究', '作物栽培与种质资源研究'],
      researchBackground: '叶片光合是单叶尺度的光合作用，一般研究植物上层成熟叶、最新完全展开叶，选择不同植物的相同叶位的叶片进行测量和对照分析，而忽略其它叶片的差异以及叶面积和株型结构的差异。冠层光合速率是单位土地面积上的全部光合组织器官在单位时间内固定的CO2速率。冠层光合是植物地上部分全部组织器官的光合作用，是光合组织器官在冠层空间结构及微气候环境条件下进行的实际光合速率的总和，受叶片光合能力和冠层3D结构的影响。冠层光合研究单位土地面积上的群体尺度光合作用，冠层光合与植物的生物量和产量更加直接相关。植物地上部分称为冠层，冠层光合作用是植物在群体尺度上的光合作用，是叶、鞘和穗等组织和器官在特定空间结构及微气候条件下进行的光合作用总和，能够表征植物群体的光合能力。提高冠层光合作用效率是增加植物碳汇能力、提高生物量及提高粮食产量潜力的重要途径。',
      literature: [{
        authors: 'Song, Qingfeng & Xiao, Han & Xiao, Xianglin & Zhu, Xinguang',
        title: 'A new canopy photosynthesis and transpiration measurement system (CAPTS) for canopy gas exchange research',
        journal: 'Agricultural and Forest Meteorology',
        year: '2016',
        volume: '217',
        pages: '101-107' },
      {
        authors: 'Song Q, Zhu XG',
        title: 'Measuring Canopy Gas Exchange Using CAnopy Photosynthesis and Transpiration Systems (CAPTS)',
        journal: 'Methods Mol Biol',
        year: '2018',
        volume: '1770',
        pages: '69-81' },
      {
        authors: 'Min Jia, Roberto Colombo, Micol Rossini, Marco Celesti, Jie Zhu, Sergio Cogliati, Tao Cheng, Yongchao Tian, Yan Zhu, Weixing Cao, Xia Yao',
        title: 'Estimation of leaf nitrogen content and photosynthetic nitrogen use efficiency in wheat using sun-induced chlorophyll fluorescence at the leaf and canopy scales',
        journal: 'European Journal of Agronomy',
        year: '2021',
        volume: '122',
        pages: '126192' },
      {
        authors: 'Song Q, Van Rie J, Den Boer B, Galle A, Zhao H, Chang T, He Z, Zhu XG',
        title: 'Diurnal and Seasonal Variations of Photosynthetic Energy Conversion Efficiency of Field Grown Wheat',
        journal: 'Front Plant Sci',
        year: '2022',
        volume: '13',
        pages: '817654' },
      {
        authors: 'Linxiong Mao, Qingfeng Song, Ming Li, Xinyu Liu, Zai Shi, Faming Chen, Gen-yun Chen, Huiqiong Zheng, Xin-Guang Zhu',
        title: 'Decreasing photosystem antenna size by inhibiting chlorophyll synthesis: A double-edged sword for photosynthetic efficiency',
        journal: 'Crop and Environment',
        year: '2023',
        volume: '2',
        issue: '1',
        pages: '46-58' },
      {
        authors: 'Yixian Cheng, Feng Xiao, Dunyou Huang, Ying Yang, Wangda Cheng, Shichao Jin, Ganghua Li, Yanfeng Ding, Matthew J. Paul, Zhenghui Liu',
        title: 'High canopy photosynthesis before anthesis explains the outstanding yield performance of rice cultivars with ideal plant architecture',
        journal: 'Field Crops Research',
        year: '2024',
        volume: '306',
        pages: '109223' },
      {
        authors: 'Shuyuan He, Xiuni Li, Menggen Chen, Xiangyao Xu, Wenjing Zhang, Huiling Chi, Panxia Shao, Fenda Tang, Tao Gong, Ming Guo',
        title: 'Excellent Canopy Structure in Soybeans Can Improve Their Photosynthetic Performance and Increase Yield',
        journal: 'Agriculture',
        year: '2024',
        volume: '14',
        issue: '10',
        pages: '1783' }] },

    {
      id: 'p-chamber',
      name: '植物非叶光合作用测量仪 P-Chamber',
      category: '光合-气体交换',
      description: '植物非叶光合作用测量仪P-Chamber是专门用于测量植物非叶组织（如茎、果实、花、根等）光合作用和呼吸作用的精密仪器。该系统采用高精度气体分析技术和智能控制算法，能够准确测量非叶器官的CO2交换速率、蒸腾速率等关键生理参数，为植物生理学研究、作物育种和农业生产提供重要的数据支撑。',
      features: ['非叶组织专用测量', '高精度气体分析', '便携式一体化设计', '多参数同步测量', '智能温湿度控制', '无线数据传输', '长时间连续监测', '可视化数据分析'],
      specifications: {
        '测量原理': '开放式气体交换法',
        '测量范围': 'CO2: 0-2000 ppm, H2O: 0-40000 ppm',
        '测量精度': 'CO2: ±0.5 ppm, H2O: ±0.1%',
        '响应时间': '<10秒',
        '流速控制': '0-2000 mL/min 可调',
        '腔室体积': '0.5-5L 可定制',
        '温度控制范围': '5-45°C',
        '温度控制精度': '±0.1°C',
        '湿度控制范围': '30-90% RH',
        '湿度控制精度': '±2% RH',
        '光照强度': '0-2000 μmol m⁻²s⁻¹',
        '光照均匀性': '>95%',
        '数据采集频率': '1-10 Hz 可调',
        '存储容量': '32GB 内置存储',
        '电池续航': '连续工作8小时',
        '充电时间': '3小时快充',
        '通信接口': 'WiFi、蓝牙、USB',
        '显示屏': '7英寸彩色触摸屏',
        '防护等级': 'IP54',
        '工作温度': '-10°C to 50°C',
        '重量': '3.5kg',
        '尺寸': '350×280×180mm (L×W×H)' },

      images: ['https://images.unsplash.com/photo-1581092795360-fd1ca04f0958?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'],
      applications: ['茎干光合作用研究', '果实光合与呼吸测定', '花朵光合生理研究', '根系呼吸作用测量', '非叶器官光合贡献评估', '作物品种筛选', '植物逆境生理研究', '精准农业管理'],
      researchBackground: '传统植物光合作用研究主要关注叶片，但越来越多的研究表明，植物的非叶组织（茎、果实、花、根等）在植物整体碳平衡中发挥着重要作用。特别是在某些作物中，茎干和果实的光合贡献可能占总光合作用的10-30%。然而，由于非叶组织的形态多样性和测量技术限制，这些重要器官的光合功能长期被忽视。P-Chamber植物非叶光合作用测量仪的问世，填补了这一技术空白，为全面理解植物光合生理机制提供了强有力的工具支撑。',
      technicalHighlights: ['采用开放式气体交换技术，避免密闭式测量的局限性', '配备高精度红外CO2分析仪和湿度传感器，确保数据准确性', '智能温湿度控制系统，模拟自然环境条件', '可调节光照系统，支持不同光强下的光合响应曲线测定', '模块化腔室设计，适应不同形态和尺寸的非叶组织', '实时数据显示和分析功能，支持现场快速决策'] },
    {
      id: 'c-ghg',
      name: '土壤碳通量动态监测系统 C-GHG',
      category: '光合-气体交换',
      description: '土壤碳通量动态监测系统C-GHG是专为土壤和植物冠层温室气体通量长期、连续、自动化监测而设计的高精度测量系统。该系统集成了高精度CH4/N2O/CO/CO2温室气体分析模块、多路智能控制系统和全自动碳通量长期测量室，能够实现多点位、长时间的温室气体通量动态监测，为碳循环研究、生态环境监测和"双碳"目标实现提供关键技术支撑。',
      features: ['多点位同步监测', '高精度温室气体分析', '全自动长期连续运行', '智能循环控制', '远程数据管理', '恶劣环境适应性', '可扩展模块化设计', '实时数据分析'],
      specifications: {
        '系统架构': '分布式多通道测量系统',
        '支持测量箱数量': '2-48个可配置',
        '测量气体种类': 'CH4、N2O、CO、CO2、H2O',
        'CH4测量范围': '0-10 ppm',
        'CH4测量精度': '±0.5 ppb (1秒平均)',
        'CH4测量技术': '光反馈-腔增强吸收光谱技术',
        'N2O测量范围': '0-500 ppb',
        'N2O测量精度': '±0.4 ppb (1秒平均)',
        'N2O测量技术': '光反馈-腔增强吸收光谱技术',
        'CO2测量范围': '0-2000 ppm',
        'CO2测量精度': '±3.5 ppm (1秒平均)',
        'CO测量范围': '0-100 ppm',
        'CO测量精度': '±0.5 ppb',
        'H2O测量范围': '0-40000 ppm',
        'H2O测量精度': '±45 ppm (1秒平均)',
        '测量频率': '1 Hz (每秒1次)',
        '响应时间': 'T90 < 2秒 (N2O)',
        '主机供电': '220VAC ±10%, 50/60Hz',
        '主机功率': '1000W (满负荷)',
        '数据存储': '1TB SSD + 云存储',
        '通信方式': '4G/5G、以太网、卫星通信',
        '防护等级': 'IP67 (测量箱), IP55 (控制箱)',
        '工作温度': '-30°C to 60°C',
        '工作湿度': '0-100% RH (无凝结)',
        '测量箱材质': '不锈钢 + 高透光PC板',
        '测量箱尺寸': '1×1×1.2m (标准), 可定制',
        '顶盖透光率': '>95% (400-700nm)',
        '侧面透光率': '>85% (400-700nm)',
        '箱体气密性': '<2×10⁻⁴ s⁻¹',
        '开闭机制': '电动推杆自动控制',
        '循环控制': '4循环智能开闭模式',
        '单次测量时间': '3-5分钟/箱',
        '系统响应延迟': '<30秒',
        '校准周期': '自动校准，每月1次',
        '维护间隔': '6个月 (常规维护)',
        '软件平台': 'Web端 + 移动端 + 桌面端',
        '数据格式': 'CSV、Excel、NetCDF',
        '报警功能': '异常数据自动报警',
        '远程控制': '支持远程参数设置和系统重启' },

      images: ['https://images.unsplash.com/photo-1593115048165-9dc1b9d0c6ab?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'],
      applications: ['土壤碳通量长期监测', '农田生态系统碳循环研究', '森林土壤温室气体排放监测', '湿地甲烷排放动态研究', '草地生态系统碳平衡评估', '城市绿地碳汇功能评估', '气候变化影响研究', '碳减排效果评估', '生态环境修复监测', '精准农业碳管理'],
      researchBackground: '在全球应对变暖、"双碳"目标成为多国共识的背景下，土壤作为陆地生态系统最大碳库，其碳通量（CO₂、CH₄等温室气体排放/吸收）是碳循环关键环节，亟需精准监测以支撑碳核算与减排策略制定；但过往人工采样、静态箱法等传统技术存在耗时久、覆盖范围小、数据连续性差的问题，难以捕捉碳通量的昼夜波动、季节变化等动态特征，无法满足精细化研究需求。随着生态环境研究向"高频、实时、多参数"发展，自动化、高精度监测设备的需求日益迫切，C-GHG土壤碳通量动态监测系统由此应运而生，填补了土壤碳通量动态连续监测的技术空白。',
      technicalHighlights: ['采用光反馈-腔增强吸收光谱技术，实现ppb级超高测量精度', '多通道智能循环控制，支持48个测量箱同时运行', '四循环开闭模式，大幅提高测量效率', '全自动长期运行，无需人工干预', '恶劣环境适应性设计，支持-30°C到60°C工作温度', '云端数据管理平台，支持实时数据查看和分析', '智能报警系统，异常情况及时通知', '模块化设计，可根据需求灵活扩展'] }],

    'photosynthesis-fluorescence': [{
      id: 'fdm-m',
      name: '叶绿素荧光成像系统 FDM-M系列',
      category: '光合-叶绿素荧光',
      description: 'FDM-M系列是由一个测量箱体、一台主机、一个显示屏组成的台式测量系统，该系列包括FDM-M1定焦版、FDM-M2变焦版、FDM-M3多光谱版三个型号。FDM-M系列的测量面积为15cm*20cm，搭载可变焦相机最大成像面积为23*23cm，适用于微藻、叶片及拟南芥、烟草、番茄等小型盆栽植物的测量。通过检测植物叶片叶绿素荧光信号，直观呈现光合生理状态，为植物生理生态、农业科研等提供量化分析工具。',
      features: ['高分辨率500万像素成像', '成像范围15*20cm，变焦版最大23*23cm', '可选配自动变焦镜头', '自定义框选区域分析', '自动去除暗背景功能', '图像与数据本地自动存储', '支持FLC、SL等自动测量曲线', '可选配多光谱荧光成像', '提供API接口支持集成开发', '实时显示15种以上荧光参数'],
      specifications: {
        '产品型号': 'FDM-M1定焦版、FDM-M2变焦版、FDM-M3多光谱版',
        '图像分辨率': '≥500万像素',
        '标准成像范围': '≥15cm*20cm',
        '变焦最大成像面积': '23*23cm（FDM-M2/FDM-M3）',
        '激发光源': '450nm蓝光',
        '叶片吸光度测量光源': '红光、远红光',
        '光强均匀度变异': '<5% (目标范围内)',
        '激发光标准光强': '0.5 umol m⁻²s⁻¹（可调节）',
        '饱和脉冲SP最大光强': '4200 umol m⁻²s⁻¹（可调节）',
        '光化光AL强度': '1800 umol m⁻²s⁻¹（可调节）',
        '实时荧光参数输出': '≥15种，包括Fo, Fm, Fv, Fv/Fm, Fm\', Ft, Y(II), NPQ, Y(NPQ), Y(NO), Fo\', qP, qL, qN, ETR等',
        '叶片吸光度检测': '具备',
        '图像输出格式': 'TIFF, JPG',
        '工作温度': '5~45摄氏度，非凝结',
        '控制单元配置': '固态硬盘≥1T，显示器≥24英寸，内存≥16G',
        '软件功能': '设备连接、自定义存储路径、自动去除背景噪点、光强设置、图像采集与分析',
        '自动快速光曲线测量': '支持Fast Light Curve，光强梯度、测量时长可设置，进度实时查看',
        '自动荧光诱导曲线测量': '支持Slow Kinetics暗弛豫曲线，序列数组及光强参数可设置',
        '平均值计算': '自动去除暗背景，平均值计算和保存功能',
        '数据自动存储': '支持图像及参数数据本地实时存储，无需手动导出',
        '集成开发支持': '提供API接口，可控制拍摄任务，指定存储目录',
        '感兴趣区域框选计算': '支持自定义形状框选，多区域比较，导出EXCEL表格',
        '伪彩色调节': '软件内置≥12种伪彩色标尺，可实时调节成像伪彩' },

      images: ['https://images.unsplash.com/photo-1581092795360-fd1ca04f0958?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'],
      applications: ['光系统II机制解析', '作物表型与育种筛选', '病虫害早期诊断', '逆境生理生态研究', '胁迫响应机制研究', '作物生理状态监测', '遗传育种筛选', '药物/农药对光合系统影响评估'],
      sampleTypes: ['微藻', '植物叶片', '拟南芥', '烟草', '番茄', '瞿麦', '其他小型盆栽植物'],
      researchBackground: '通过检测植物叶片叶绿素荧光信号，直观呈现光合生理状态。能测定PSⅡ最大光化学效率、光化学猝灭等参数，用于研究植物光合效率、逆境胁迫（如干旱、高温、重金属）响应、遗传育种筛选及药物/农药对光合系统的影响等，以成像方式可视化不同区域光合性能差异，为植物生理生态、农业科研等提供量化分析工具。',
      measurableParameters: {
        '暗适应状态的最小荧光': 'Fo',
        '暗适应后饱和脉冲测量的最大荧光': 'Fm',
        '作用光下的稳态荧光': 'Ft',
        '作用光下的最小荧光': 'Fo\'',
        '作用光下的最大荧光': 'Fm\'',
        '暗适应之后的最大可变荧光': 'Fv',
        '光系统II最大量子效率': 'Fv/Fm',
        '作用光下光系统II实际量子效率': 'Y(II)',
        '电子传递速率': 'ETR=YII*PAR*0.5*abs',
        '非光化学猝灭系数': 'NPQ, qN',
        '光化学淬灭系数': 'qP, qL',
        '非光化学淬灭耗散的能量比例': 'Y(NPQ)',
        '非调节性能量耗散的比例': 'Y(NO)' },

      technicalHighlights: ['高分辨率500万像素成像，清晰呈现荧光细节', '可变焦设计，支持15-23cm成像范围灵活调节', '实时显示15种以上荧光参数，每个参数均可显示荧光彩色图像', '支持Fast Light Curve和Slow Kinetics自动测量曲线', '自定义框选感兴趣区域，支持多区域数据比较分析', '提供API接口，支持系统集成和二次开发', '自动去除暗背景和平均值计算功能，提高数据准确性', '内置12种以上伪彩色标尺，满足不同研究需求'] },
    {
      id: 'fdm-s',
      name: '大面积叶绿素荧光成像系统FDM-S系列',
      category: '光合-叶绿素荧光',
      description: '适用于大面积样品的叶绿素荧光成像分析系统',
      features: ['大面积成像', '均匀照明', '高信噪比', '自动化扫描'],
      specifications: {
        '成像面积': '30×30cm',
        '分辨率': '4096×4096',
        '均匀性': '>95%',
        '扫描时间': '<30s' },

      images: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1593115048165-9dc1b9d0c6ab?w=800&h=600&fit=crop'],
      applications: ['高通量筛选', '大面积样品分析', '群体研究', '育种应用'] },
    {
      id: 'fdm-l',
      name: '吊装式叶绿素荧光成像系统FDM-L系列',
      category: '光合-叶绿素荧光',
      description: '吊装式设计，适用于温室和大田植物的叶绿素荧光成像',
      features: ['吊装设计', '远程控制', '防尘防水', '大范围覆盖'],
      specifications: {
        '安装高度': '2-5m',
        '覆盖范围': '2×2m',
        '防护等级': 'IP66',
        '控制距离': '100m' },

      images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop'],
      applications: ['温室监测', '大田研究', '连续观测', '自动化管理'] },
    {
      id: 'fdm-r',
      name: '可翻转叶绿素荧光成像系统FDM-R系列',
      category: '光合-叶绿素荧光',
      description: '可翻转设计，支持多角度叶绿素荧光成像分析',
      features: ['可翻转设计', '多角度成像', '精确定位', '灵活操作'],
      specifications: {
        '翻转角度': '0-180°',
        '定位精度': '±0.1mm',
        '重复性': '±0.5%',
        '稳定性': '<0.1%/h' },

      images: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1593115048165-9dc1b9d0c6ab?w=800&h=600&fit=crop'],
      applications: ['立体成像', '多角度分析', '精密研究', '特殊样品'] }],

    'phenotype': [{
      id: 'mctp',
      name: '轨道式田间高通量植物表型平台mCTP',
      category: '植物表型',
      description: '轨道式设计，实现田间高通量植物表型数据的自动化采集',
      features: ['轨道式移动', '高通量采集', '多传感器融合', '全天候工作'],
      specifications: {
        '轨道长度': '100-500m',
        '检测速度': '1m/s',
        '传感器数量': '8-16个',
        '数据采集率': '1000株/小时' },

      images: ['https://images.unsplash.com/photo-1593115048165-9dc1b9d0c6ab?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'],
      applications: ['田间育种', '品种筛选', '生长监测', '产量预测'] },
    {
      id: 'm-ctp-greenhouse',
      name: '温室盆栽高通量植物表型成像系统m-CTP',
      category: '植物表型',
      description: '专为温室盆栽植物设计的高通量表型成像分析系统',
      features: ['自动化传送', '多光谱成像', '3D重建', '智能分析'],
      specifications: {
        '处理能力': '200盆/小时',
        '成像分辨率': '5MP',
        '光谱范围': '400-1000nm',
        '重建精度': '±0.5mm' },

      images: ['https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1593115048165-9dc1b9d0c6ab?w=800&h=600&fit=crop'],
      applications: ['温室研究', '盆栽实验', '精准农业', '品种改良'] },
    {
      id: 'a-ctp',
      name: '植物三维成像与建模系统a-CTP',
      category: '植物表型',
      description: '高精度植物三维成像与建模分析系统',
      features: ['3D成像', '精确建模', '参数提取', '可视化分析'],
      specifications: {
        '建模精度': '±0.1mm',
        '点云密度': '1000万点/株',
        '处理时间': '<5min',
        '模型格式': 'PLY/STL/OBJ' },

      images: ['https://images.unsplash.com/photo-1581092795360-fd1ca04f0958?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1593115048165-9dc1b9d0c6ab?w=800&h=600&fit=crop'],
      applications: ['结构分析', '生物量计算', '生长建模', '虚拟植物'] },
    {
      id: 'icm',
      name: '成像与建模分析系统ICM',
      category: '植物表型',
      description: '专业的植物图像处理与建模分析软件系统',
      features: ['图像处理', '数据建模', '统计分析', '报告生成'],
      specifications: {
        '支持格式': '50+种',
        '处理速度': '1000张/小时',
        '分析参数': '200+个',
        '报告模板': '20+种' },

      images: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'],
      applications: ['数据分析', '科研报告', '品种比较', '趋势分析'] },
    {
      id: 'a-ctp-64',
      name: '64相机植物瞬时三维成像与建模系统a-CTP',
      category: '植物表型',
      description: '采用64相机阵列的瞬时三维成像系统，实现无运动伪影的高精度建模',
      features: ['64相机阵列', '瞬时成像', '无运动伪影', '超高精度'],
      specifications: {
        '相机数量': '64个',
        '成像时间': '<0.1s',
        '建模精度': '±0.05mm',
        '数据处理': '实时处理' },

      images: ['https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1593115048165-9dc1b9d0c6ab?w=800&h=600&fit=crop'],
      applications: ['高精度研究', '动态分析', '精密育种', '基础研究'] }],

    'environment': [{
      id: 'cmc',
      name: '冠层微气候测量仪 CMC',
      category: '环境监测',
      description: '专业用于植物冠层微气候参数测量的精密仪器',
      features: ['多参数测量', '高精度传感器', '实时监测', '数据记录'],
      specifications: {
        '测量参数': '温度/湿度/光照/CO2',
        '精度': '±0.1°C/±2%/±5%/±50ppm',
        '采样频率': '1Hz-1Hz',
        '存储容量': '16GB' },

      images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'],
      applications: ['微气候监测', '环境研究', '生态分析', '农业气象'] },
    {
      id: 'cmc-distributed',
      name: '多点分布式冠层微气侯测量系统 CMC',
      category: '环境监测',
      description: '分布式多点冠层微气候监测网络系统',
      features: ['分布式部署', '网络化管理', '无线通信', '云平台集成'],
      specifications: {
        '监测点数': '1-100个',
        '通信距离': '2km',
        '数据传输': '4G/NB-IoT',
        '平台支持': 'Web/移动端' },

      images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1593115048165-9dc1b9d0c6ab?w=800&h=600&fit=crop'],
      applications: ['大田监测', '森林生态', '智慧农业', '环境网络'] }] };


  const getAllProducts = () => {
    if (selectedCategory === 'all') {
      return Object.values(products).flat();
    }
    return products[selectedCategory] || [];
  };
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };
  const handlePrevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };
  const handleNextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };
  const filteredProducts = getAllProducts();
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <LogoHeader />
      
      <div className="px-4 py-6">
        {/* 页面标题 */}
        <div className="flex items-center mb-6">
          <button onClick={() => $w.utils.navigateTo({
          pageId: 'home',
          params: {} })}
        className="mr-3 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            产品中心
          </h1>
        </div>

        {/* 分类筛选 */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category.id ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}>
                <span></span>
                <span>{category.name}</span>
              </button>)}
          </div>
        </div>

        {/* 产品列表 */}
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map((product) => <div key={product.id} onClick={() => handleProductClick(product)} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop';
            }} />
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {product.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {product.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {product.features.slice(0, 3).map((feature, index) => <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                      {feature}
                    </span>)}
                  {product.features.length > 3 && <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                      +{product.features.length - 3}
                    </span>}
                </div>
              </div>
            </div>)}
        </div>
      </div>

      {/* 产品详情弹窗 */}
      {selectedProduct && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={(e) => {
      if (e.target === e.currentTarget) {
        setSelectedProduct(null);
      }
    }}>
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* 关闭按钮 */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedProduct.name}
              </h2>
              <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* 图片轮播 */}
              <div className="relative">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img src={selectedProduct.images[currentImageIndex]} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                {selectedProduct.images.length > 1 && <>
                    <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                      {selectedProduct.images.map((_, index) => <div key={index} className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`} />)}
                    </div>
                  </>}
              </div>

              {/* 产品信息 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    产品描述
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    核心特性
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feature, index) => <li key={index} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>)}
                  </ul>
                </div>
              </div>

              {/* 研究背景 - CAPTS、P-Chamber、C-GHG和FDM-M产品显示 */}
              {(selectedProduct.id === 'capts' || selectedProduct.id === 'c-ghg' || selectedProduct.id === 'p-chamber' || selectedProduct.id === 'fdm-m') && selectedProduct.researchBackground && <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    {selectedProduct.id === 'c-ghg' ? <Globe className="w-5 h-5 mr-2 text-green-500" /> : selectedProduct.id === 'p-chamber' ? <Microscope className="w-5 h-5 mr-2 text-purple-500" /> : selectedProduct.id === 'fdm-m' ? <Camera className="w-5 h-5 mr-2 text-blue-500" /> : <BookOpen className="w-5 h-5 mr-2 text-blue-500" />}
                    研究背景
                  </h3>
                  <div className={`${selectedProduct.id === 'c-ghg' ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : selectedProduct.id === 'p-chamber' ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500' : selectedProduct.id === 'fdm-m' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'} border-l-4 p-4 rounded`}>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {selectedProduct.researchBackground}
                    </p>
                  </div>
                </div>}

              {/* 技术亮点 - P-Chamber、C-GHG和FDM-M产品显示 */}
              {(selectedProduct.id === 'p-chamber' || selectedProduct.id === 'c-ghg' || selectedProduct.id === 'fdm-m') && selectedProduct.technicalHighlights && <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-orange-500" />
                    技术亮点
                  </h3>
                  <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded">
                    <ul className="space-y-2">
                      {selectedProduct.technicalHighlights.map((highlight, index) => <li key={index} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300 text-sm">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </li>)}
                    </ul>
                  </div>
                </div>}

              {/* 适用样本类型 - 仅FDM-M产品显示 */}
              {selectedProduct.id === 'fdm-m' && selectedProduct.sampleTypes && <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Leaf className="w-5 h-5 mr-2 text-green-500" />
                    适用样本类型
                  </h3>
                  <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded">
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sampleTypes.map((sample, index) => <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-full text-sm">
                          {sample}
                        </span>)}
                    </div>
                  </div>
                </div>}

              {/* 可测量参数 - 仅FDM-M产品显示 */}
              {selectedProduct.id === 'fdm-m' && selectedProduct.measurableParameters && <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-indigo-500" />
                    可测量参数
                  </h3>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4 rounded">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(selectedProduct.measurableParameters).map(([param, desc], index) => <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white text-sm">{param}:</span>
                            <span className="text-gray-600 dark:text-gray-300 text-sm ml-1">{desc}</span>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </div>}

              {/* 技术规格 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  技术规格
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => <div key={key} className="flex justify-between items-start">
                        <span className="text-sm text-gray-600 dark:text-gray-300 flex-1 mr-2">
                          {key}:
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white text-right flex-1 break-words">
                          {value}
                        </span>
                      </div>)}
                  </div>
                </div>
              </div>

              {/* 应用领域 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  应用领域
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.applications.map((application, index) => <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm">
                      {application}
                    </span>)}
                </div>
              </div>

              {/* 已发表文献 - 仅CAPTS产品显示 */}
              {selectedProduct.id === 'capts' && selectedProduct.literature && <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
                    已发表文献
                  </h3>
                  <div className="space-y-3">
                    {selectedProduct.literature.map((paper, index) => <div key={index} className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                              {paper.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              {paper.authors}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {paper.journal} ({paper.year}) {paper.volume && `Vol. ${paper.volume}`} {paper.issue && `Issue ${paper.issue}`} {paper.pages && `pp. ${paper.pages}`}
                            </p>
                          </div>
                          <button className="ml-2 p-2 hover:bg-purple-100 dark:hover:bg-purple-800 rounded transition-colors" onClick={() => {
                    toast({
                      title: '文献引用',
                      description: '文献信息已复制到剪贴板' });

                  }}>
                            <Download className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </button>
                        </div>
                      </div>)}
                  </div>
                </div>}
            </div>
          </div>
        </div>}

      <TabBar currentPage="products" onPageChange={handleTabChange} />
    </div>;
}