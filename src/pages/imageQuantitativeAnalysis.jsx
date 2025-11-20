// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Upload, Image as ImageIcon, Settings, Play, RotateCcw, Download, Table, FileText, BarChart3, X, Loader2, MousePointer, Crosshair } from 'lucide-react';

import { LogoHeader } from '@/components/LogoHeader';
import { TabBar } from '@/components/TabBar';
export default function ImageQuantitativeAnalysis(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('imageQuantitativeAnalysis');

  // 图像相关状态
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [annotatedImage, setAnnotatedImage] = useState(null);

  // 分析参数状态
  const [sampleType, setSampleType] = useState('leaves');
  const [expectedCount, setExpectedCount] = useState(5);
  const [refMode, setRefMode] = useState('auto');
  const [refSize, setRefSize] = useState(25.0);
  const [minArea, setMinArea] = useState(500);
  const [maxArea, setMaxArea] = useState(50000);
  const [hsvLow, setHsvLow] = useState(35);
  const [hsvHigh, setHsvHigh] = useState(85);
  const [correctionMode, setCorrectionMode] = useState('none');

  // 文件上传引用
  const fileInputRef = useRef(null);
  const imageContainerRef = useRef(null);

  // 处理文件上传
  const handleFileUpload = event => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        const result = e.target.result;
        setSelectedImage(result);
        setImagePreview(result);
        setAnalysisResults(null);
        setAnnotatedImage(null);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: '文件格式错误',
        description: '请选择有效的图像文件',
        duration: 3000
      });
    }
  };

  // 处理拖拽上传
  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = event => {
          const result = event.target.result;
          setSelectedImage(result);
          setImagePreview(result);
          setAnalysisResults(null);
          setAnnotatedImage(null);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // 移除图像
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResults(null);
    setAnnotatedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 执行分析
  const performAnalysis = async () => {
    if (!selectedImage) {
      toast({
        title: '请先上传图像',
        description: '需要上传图像才能进行分析',
        duration: 3000
      });
      return;
    }
    setIsAnalyzing(true);
    try {
      // 模拟分析过程
      await new Promise(resolve => setTimeout(resolve, 3000));

      // 生成模拟分析结果
      const mockResults = generateMockResults();
      setAnalysisResults(mockResults);
      setAnnotatedImage(selectedImage); // 实际应用中应该是处理后的图像

      toast({
        title: '分析完成',
        description: `成功检测到 ${mockResults.components.length} 个样本`,
        duration: 3000
      });
    } catch (error) {
      console.error('分析失败:', error);
      toast({
        title: '分析失败',
        description: '请检查图像质量并重试',
        duration: 5000
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 生成模拟分析结果
  const generateMockResults = () => {
    const components = [];
    for (let i = 1; i <= expectedCount; i++) {
      components.push({
        label: `s${i}`,
        length_mm: (Math.random() * 50 + 20).toFixed(2),
        width_mm: (Math.random() * 30 + 10).toFixed(2),
        area_mm2: (Math.random() * 1000 + 200).toFixed(2),
        perimeter_mm: (Math.random() * 150 + 50).toFixed(2),
        aspect_ratio: (Math.random() * 2 + 1).toFixed(2),
        circularity: (Math.random() * 0.5 + 0.5).toFixed(3),
        angle_deg: (Math.random() * 180).toFixed(1),
        meanR: Math.floor(Math.random() * 100 + 100),
        meanG: Math.floor(Math.random() * 100 + 150),
        meanB: Math.floor(Math.random() * 50 + 50),
        hue: Math.floor(Math.random() * 60 + 30),
        saturation: Math.floor(Math.random() * 100 + 100),
        value: Math.floor(Math.random() * 100 + 150),
        greenIndex: (Math.random() * 0.5).toFixed(3),
        brownIndex: (Math.random() * 0.3).toFixed(3)
      });
    }
    return {
      components,
      pixelRatio: 4.0,
      totalCount: components.length,
      avgLength: (components.reduce((sum, item) => sum + parseFloat(item.length_mm), 0) / components.length).toFixed(2),
      avgArea: (components.reduce((sum, item) => sum + parseFloat(item.area_mm2), 0) / components.length).toFixed(2)
    };
  };

  // 重置分析
  const resetAnalysis = () => {
    setAnalysisResults(null);
    setAnnotatedImage(null);
  };

  // 导出CSV
  const exportCSV = () => {
    if (!analysisResults) return;
    let csv = 'Label,Length(mm),Width(mm),Area(mm²),Perimeter(mm),Aspect Ratio,Circularity,Angle(°),Mean R,Mean G,Mean B,Hue,Saturation,Value,Green Index,Brown Index\n';
    analysisResults.components.forEach(item => {
      csv += `${item.label},${item.length_mm},${item.width_mm},${item.area_mm2},${item.perimeter_mm},${item.aspect_ratio},${item.circularity},${item.angle_deg},${item.meanR},${item.meanG},${item.meanB},${item.hue},${item.saturation},${item.value},${item.greenIndex},${item.brownIndex}\n`;
    });
    downloadFile(csv, 'image_analysis_results.csv', 'text/csv');
  };

  // 导出JSON
  const exportJSON = () => {
    if (!analysisResults) return;
    const json = JSON.stringify(analysisResults, null, 2);
    downloadFile(json, 'image_analysis_results.json', 'application/json');
  };

  // 下载文件
  const downloadFile = (content, filename, contentType) => {
    const blob = new Blob([content], {
      type: contentType
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: '导出成功',
      description: `${filename} 已下载`,
      duration: 3000
    });
  };

  // 处理图像点击（交互校正）
  const handleImageClick = e => {
    if (!analysisResults || correctionMode === 'none') return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(`点击位置: (${x.toFixed(0)}, ${y.toFixed(0)}), 模式: ${correctionMode}`);
    if (correctionMode === 'set-ref') {
      toast({
        title: '设置参考对象',
        description: '点击位置已记录，功能开发中',
        duration: 2000
      });
    } else if (correctionMode === 'toggle-sample') {
      toast({
        title: '切换样本选择',
        description: '点击位置已记录，功能开发中',
        duration: 2000
      });
    }
  };

  // 处理标签页切换
  const handleTabChange = tabId => {
    if (tabId === 'imageQuantitativeAnalysis') {
      setActiveTab(tabId);
    } else {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <LogoHeader />
      
      <div className="px-4 py-6">
        {/* 页面标题 */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex items-center space-x-3">
            <ImageIcon className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">图像量化分析工具</h1>
              <p className="text-purple-100">分析生物样本图像，自动测量形态和颜色特征</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 图像上传 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-blue-600" />
                图像上传
              </h2>
              
              {!imagePreview ? <div onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">拖拽图像到此处或点击选择</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">支持 JPG, PNG, GIF 格式</p>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </div> : <div className="space-y-4">
                  <img src={imagePreview} alt="预览图像" className="w-full rounded-lg shadow-sm" />
                  <button onClick={removeImage} className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
                    <X className="w-4 h-4 mr-2" />
                    移除图像
                  </button>
                </div>}
            </div>

            {/* 分析参数 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-green-600" />
                分析参数
              </h2>
              
              <div className="space-y-4">
                {/* 样本类型 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    样本类型
                  </label>
                  <select value={sampleType} onChange={e => setSampleType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                    <option value="leaves">叶片</option>
                    <option value="seeds-grains">种子/谷物</option>
                  </select>
                </div>

                {/* 预期数量 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    预期数量: <span className="text-blue-600 font-medium">{expectedCount}</span>
                  </label>
                  <input type="range" min="1" max="50" value={expectedCount} onChange={e => setExpectedCount(parseInt(e.target.value))} className="w-full" />
                </div>

                {/* 参考对象模式 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    参考对象模式
                  </label>
                  <select value={refMode} onChange={e => setRefMode(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                    <option value="auto">自动检测</option>
                    <option value="coin">硬币</option>
                    <option value="square">方形卡片</option>
                  </select>
                </div>

                {/* 参考对象尺寸 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    参考对象尺寸 (mm): <span className="text-blue-600 font-medium">{refSize.toFixed(1)}</span>
                  </label>
                  <input type="range" min="1" max="100" step="0.1" value={refSize} onChange={e => setRefSize(parseFloat(e.target.value))} className="w-full" />
                </div>

                {/* 面积范围 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    最小面积 (px²): <span className="text-blue-600 font-medium">{minArea}</span>
                  </label>
                  <input type="range" min="10" max="5000" step="10" value={minArea} onChange={e => setMinArea(parseInt(e.target.value))} className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    最大面积 (px²): <span className="text-blue-600 font-medium">{maxArea}</span>
                  </label>
                  <input type="range" min="1000" max="200000" step="1000" value={maxArea} onChange={e => setMaxArea(parseInt(e.target.value))} className="w-full" />
                </div>

                {/* HSV范围（仅叶片） */}
                {sampleType === 'leaves' && <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      HSV色调范围
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-600 dark:text-gray-400">
                          下限: <span className="text-blue-600 font-medium">{hsvLow}</span>
                        </label>
                        <input type="range" min="0" max="179" value={hsvLow} onChange={e => setHsvLow(parseInt(e.target.value))} className="w-full" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 dark:text-gray-400">
                          上限: <span className="text-blue-600 font-medium">{hsvHigh}</span>
                        </label>
                        <input type="range" min="0" max="179" value={hsvHigh} onChange={e => setHsvHigh(parseInt(e.target.value))} className="w-full" />
                      </div>
                    </div>
                  </div>}
              </div>
            </div>

            {/* 操作控制 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Play className="w-5 h-5 mr-2 text-orange-600" />
                操作控制
              </h2>
              
              <div className="space-y-3">
                <button onClick={performAnalysis} disabled={!selectedImage || isAnalyzing} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                  {isAnalyzing ? <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      分析中...
                    </> : <>
                      <Play className="w-5 h-5 mr-2" />
                      开始分析
                    </>}
                </button>
                
                <button onClick={resetAnalysis} disabled={!analysisResults} className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  重置
                </button>
              </div>

              {/* 交互校正模式 */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  交互校正模式
                </label>
                <select value={correctionMode} onChange={e => setCorrectionMode(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option value="none">无</option>
                  <option value="set-ref">设置参考对象</option>
                  <option value="toggle-sample">切换样本选择</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  点击标注图像进行交互校正
                </p>
              </div>
            </div>
          </div>

          {/* 右侧结果展示 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 标注图像 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-purple-600" />
                标注图像
              </h2>
              
              <div ref={imageContainerRef} className="relative" onClick={handleImageClick}>
                {!annotatedImage ? <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-12 text-center">
                    <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {selectedImage ? '点击"开始分析"进行处理' : '上传图像后显示分析结果'}
                    </p>
                  </div> : <div className="relative">
                    <img src={annotatedImage} alt="标注图像" className={`w-full rounded-lg ${correctionMode !== 'none' ? 'cursor-crosshair' : ''}`} />
                    {correctionMode !== 'none' && <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs flex items-center">
                        <MousePointer className="w-3 h-3 mr-1" />
                        {correctionMode === 'set-ref' ? '设置参考' : '选择样本'}
                      </div>}
                  </div>}
              </div>
            </div>

            {/* 数据表格 */}
            {analysisResults && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Table className="w-5 h-5 mr-2 text-indigo-600" />
                  量化数据
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">标签</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">长度(mm)</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">宽度(mm)</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">面积(mm²)</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">周长(mm)</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">长宽比</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">圆形度</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">角度(°)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {analysisResults.components.map((item, index) => <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">{item.label}</td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.length_mm}</td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.width_mm}</td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.area_mm2}</td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.perimeter_mm}</td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.aspect_ratio}</td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.circularity}</td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.angle_deg}</td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>

                {/* 导出按钮 */}
                <div className="mt-4 flex space-x-3">
                  <button onClick={exportCSV} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    导出CSV
                  </button>
                  <button onClick={exportJSON} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <FileText className="w-4 h-4 mr-2" />
                    导出JSON
                  </button>
                </div>
              </div>}

            {/* 统计信息 */}
            {analysisResults && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-teal-600" />
                  统计信息
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {analysisResults.totalCount}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">检测数量</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {analysisResults.avgLength}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">平均长度(mm)</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {analysisResults.avgArea}
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">平均面积(mm²)</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {analysisResults.pixelRatio.toFixed(2)}
                    </div>
                    <div className="text-sm text-orange-600 dark:text-orange-400">像素/毫米</div>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>

      <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
    </div>;
}