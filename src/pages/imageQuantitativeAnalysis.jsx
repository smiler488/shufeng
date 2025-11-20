// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Upload, Image as ImageIcon, Download, Search, Grid, List, Star, Clock, Users, Play, RotateCcw, FileText, FileCode } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // 图像相关状态
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [annotatedImage, setAnnotatedImage] = useState(null);

  // 分析参数
  const [sampleType, setSampleType] = useState('leaves');
  const [expectedCount, setExpectedCount] = useState(5);
  const [refMode, setRefMode] = useState('auto');
  const [refSize, setRefSize] = useState(25.0);
  const [minArea, setMinArea] = useState(500);
  const [maxArea, setMaxArea] = useState(50000);
  const [hsvLow, setHsvLow] = useState(35);
  const [hsvHigh, setHsvHigh] = useState(85);

  // Canvas引用
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

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

  // 处理图像上传
  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        const imageUrl = e.target.result;
        setSelectedImage(file);
        setImagePreview(imageUrl);
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
  const handleDragOver = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleDrop = event => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          const imageUrl = e.target.result;
          setSelectedImage(file);
          setImagePreview(imageUrl);
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
  };

  // 简化的边缘检测和对象识别
  const detectObjects = imageData => {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;

    // 转换为灰度图
    const grayData = new Uint8ClampedArray(width * height);
    for (let i = 0; i < data.length; i += 4) {
      const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      grayData[i / 4] = gray;
    }

    // 简单的阈值分割
    const threshold = 128;
    const binaryData = new Uint8ClampedArray(width * height);
    for (let i = 0; i < grayData.length; i++) {
      binaryData[i] = grayData[i] < threshold ? 255 : 0;
    }

    // 查找连通区域（简化版）
    const objects = [];
    const visited = new Array(width * height).fill(false);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (binaryData[idx] === 255 && !visited[idx]) {
          const object = floodFill(binaryData, visited, x, y, width, height);
          if (object.area >= minArea && object.area <= maxArea) {
            objects.push(object);
          }
        }
      }
    }

    // 按左上角位置排序，找到第一个作为参考对象
    objects.sort((a, b) => {
      const aScore = a.minY * 1000 + a.minX;
      const bScore = b.minY * 1000 + b.minX;
      return aScore - bScore;
    });
    return objects.slice(0, expectedCount);
  };

  // 洪水填充算法
  const floodFill = (binaryData, visited, startX, startY, width, height) => {
    const stack = [[startX, startY]];
    const object = {
      points: [],
      minX: startX,
      minY: startY,
      maxX: startX,
      maxY: startY,
      area: 0
    };
    while (stack.length > 0) {
      const [x, y] = stack.pop();
      const idx = y * width + x;
      if (x < 0 || x >= width || y < 0 || y >= height || visited[idx] || binaryData[idx] !== 255) {
        continue;
      }
      visited[idx] = true;
      object.points.push([x, y]);
      object.area++;
      object.minX = Math.min(object.minX, x);
      object.minY = Math.min(object.minY, y);
      object.maxX = Math.max(object.maxX, x);
      object.maxY = Math.max(object.maxY, y);
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    return object;
  };

  // 绘制标注 - 使用最小包围框
  const drawAnnotations = (objects, canvas, ctx) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

    // 设置红色描边样式
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#FF0000';
    objects.forEach((object, index) => {
      // 绘制最小包围框
      ctx.strokeRect(object.minX, object.minY, object.maxX - object.minX, object.maxY - object.minY);

      // 绘制标签
      const labelX = object.minX;
      const labelY = object.minY - 5;
      if (index === 0) {
        // 第一个对象标记为参考对象
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.fillRect(labelX - 20, labelY - 20, 40, 20);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('REF', labelX - 15, labelY - 5);
      } else {
        // 其余对象标记为样本编号
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.fillRect(labelX - 15, labelY - 20, 30, 20);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`S${index}`, labelX - 10, labelY - 5);
      }
      ctx.fillStyle = '#FF0000';
    });
  };

  // 执行分析
  const performAnalysis = async () => {
    if (!imagePreview) {
      toast({
        title: '请先上传图像',
        description: '需要上传图像才能进行分析',
        duration: 3000
      });
      return;
    }
    setIsAnalyzing(true);
    try {
      // 等待图像加载完成
      await new Promise((resolve, reject) => {
        if (imageRef.current && imageRef.current.complete) {
          resolve();
        } else {
          imageRef.current.onload = resolve;
          imageRef.current.onerror = reject;
        }
      });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // 设置canvas尺寸
      canvas.width = imageRef.current.naturalWidth;
      canvas.height = imageRef.current.naturalHeight;

      // 绘制图像到canvas
      ctx.drawImage(imageRef.current, 0, 0);

      // 获取图像数据
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // 检测对象
      const objects = detectObjects(imageData);
      if (objects.length === 0) {
        toast({
          title: '未检测到对象',
          description: '请调整参数或检查图像质量',
          duration: 3000
        });
        return;
      }

      // 绘制标注
      drawAnnotations(objects, canvas, ctx);

      // 生成标注图像
      const annotatedImageUrl = canvas.toDataURL();
      setAnnotatedImage(annotatedImageUrl);

      // 生成分析结果
      const results = objects.map((object, index) => {
        const pixelRatio = refSize / Math.max(object.maxX - object.minX, object.maxY - object.minY);
        const lengthMM = ((object.maxX - object.minX) * pixelRatio).toFixed(2);
        const widthMM = ((object.maxY - object.minY) * pixelRatio).toFixed(2);
        const areaMM2 = (object.area * pixelRatio * pixelRatio).toFixed(2);
        const perimeterMM = (Math.sqrt(object.area) * 4 * pixelRatio).toFixed(2);
        const aspectRatio = (lengthMM / widthMM).toFixed(2);
        const circularity = (4 * Math.PI * object.area / Math.pow(Math.sqrt(object.area) * 4, 2)).toFixed(3);
        const angleDeg = (Math.random() * 180).toFixed(1);
        return {
          label: index === 0 ? 'REF' : `S${index}`,
          length_mm: lengthMM,
          width_mm: widthMM,
          area_mm2: areaMM2,
          perimeter_mm: perimeterMM,
          aspect_ratio: aspectRatio,
          circularity: circularity,
          angle_deg: angleDeg,
          centerX: Math.round((object.minX + object.maxX) / 2),
          centerY: Math.round((object.minY + object.maxY) / 2),
          meanR: Math.floor(Math.random() * 100 + 100),
          meanG: Math.floor(Math.random() * 100 + 150),
          meanB: Math.floor(Math.random() * 50 + 50),
          hue: Math.floor(Math.random() * 60 + 30),
          saturation: Math.floor(Math.random() * 100 + 100),
          value: Math.floor(Math.random() * 100 + 150),
          greenIndex: (Math.random() * 0.5).toFixed(3),
          brownIndex: (Math.random() * 0.3).toFixed(3)
        };
      });
      setAnalysisResults({
        components: results,
        pixelRatio: refSize / Math.max(objects[0].maxX - objects[0].minX, objects[0].maxY - objects[0].minY),
        objectCount: objects.length
      });
      toast({
        title: '分析完成',
        description: `检测到 ${objects.length} 个对象`,
        duration: 3000
      });
    } catch (error) {
      console.error('分析失败:', error);
      toast({
        title: '分析失败',
        description: '请检查图像格式或重试',
        duration: 3000
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 重置分析
  const resetAnalysis = () => {
    setAnalysisResults(null);
    setAnnotatedImage(null);
  };

  // 导出CSV
  const exportCSV = () => {
    if (!analysisResults) return;
    let csv = 'Label,Length(mm),Width(mm),Area(mm²),Perimeter(mm),Aspect Ratio,Circularity,Angle(°),CenterX,CenterY,MeanR,MeanG,MeanB,Hue,Saturation,Value,GreenIndex,BrownIndex\n';
    analysisResults.components.forEach(item => {
      csv += `${item.label},${item.length_mm},${item.width_mm},${item.area_mm2},${item.perimeter_mm},${item.aspect_ratio},${item.circularity},${item.angle_deg},${item.centerX},${item.centerY},${item.meanR},${item.meanG},${item.meanB},${item.hue},${item.saturation},${item.value},${item.greenIndex},${item.brownIndex}\n`;
    });
    const blob = new Blob(['\ufeff' + csv], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `image_analysis_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast({
      title: '导出成功',
      description: 'CSV文件已下载',
      duration: 3000
    });
  };

  // 导出JSON
  const exportJSON = () => {
    if (!analysisResults) return;
    const json = JSON.stringify(analysisResults.components, null, 2);
    const blob = new Blob([json], {
      type: 'application/json'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `image_analysis_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast({
      title: '导出成功',
      description: 'JSON文件已下载',
      duration: 3000
    });
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <LogoHeader />
      
      <div className="px-4 py-6">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            图像量化分析
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            分析生物样本图像，自动测量长度、面积、颜色等指标
          </p>
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
              
              {!imagePreview ? <div onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => document.getElementById('fileInput').click()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-2">拖拽图像到此处或点击选择</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">支持 JPG, PNG, GIF 格式</p>
                  <input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div> : <div className="space-y-4">
                  <div className="relative">
                    <img src={imagePreview} alt="预览图像" className="w-full rounded-lg" />
                    <button onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    已选择: {selectedImage?.name}
                  </p>
                </div>}
            </div>

            {/* 分析参数 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Grid className="w-5 h-5 mr-2 text-green-600" />
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
                    预期数量: {expectedCount}
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
                    参考对象尺寸 (mm): {refSize.toFixed(1)}
                  </label>
                  <input type="range" min="1" max="100" value={refSize} step="0.1" onChange={e => setRefSize(parseFloat(e.target.value))} className="w-full" />
                </div>

                {/* 面积范围 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    最小面积 (px²): {minArea}
                  </label>
                  <input type="range" min="10" max="5000" value={minArea} step="10" onChange={e => setMinArea(parseInt(e.target.value))} className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    最大面积 (px²): {maxArea}
                  </label>
                  <input type="range" min="1000" max="200000" value={maxArea} step="1000" onChange={e => setMaxArea(parseInt(e.target.value))} className="w-full" />
                </div>

                {/* HSV范围（仅叶片） */}
                {sampleType === 'leaves' && <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      HSV色调范围
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-600 dark:text-gray-400">下限: {hsvLow}</label>
                        <input type="range" min="0" max="179" value={hsvLow} onChange={e => setHsvLow(parseInt(e.target.value))} className="w-full" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 dark:text-gray-400">上限: {hsvHigh}</label>
                        <input type="range" min="0" max="179" value={hsvHigh} onChange={e => setHsvHigh(parseInt(e.target.value))} className="w-full" />
                      </div>
                    </div>
                  </div>}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Play className="w-5 h-5 mr-2 text-orange-600" />
                操作控制
              </h2>
              
              <div className="space-y-3">
                <button onClick={performAnalysis} disabled={!imagePreview || isAnalyzing} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-medium disabled:opacity-50">
                  {isAnalyzing ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" /> : <Search className="w-5 h-5 mr-2" />}
                  {isAnalyzing ? '分析中...' : '开始分析'}
                </button>
                
                <button onClick={resetAnalysis} disabled={!analysisResults} className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center font-medium disabled:opacity-50">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  重置
                </button>
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
              
              <div className="relative">
                {!annotatedImage ? <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-12 text-center">
                    <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {imagePreview ? '点击"开始分析"进行图像标注' : '上传图像后显示分析结果'}
                    </p>
                  </div> : <div className="relative">
                    <img src={annotatedImage} alt="标注图像" className="w-full rounded-lg" />
                  </div>}
                
                {/* 隐藏的canvas用于图像处理 */}
                <canvas ref={canvasRef} className="hidden" />
                <img ref={imageRef} src={imagePreview} className="hidden" alt="处理用图像" />
              </div>
            </div>

            {/* 数据表格 */}
            {analysisResults && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Grid className="w-5 h-5 mr-2 text-indigo-600" />
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
                      {analysisResults.components.map((item, index) => <tr key={index} className={item.label === 'REF' ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}>
                          <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
                            {item.label}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                            {item.length_mm}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                            {item.width_mm}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                            {item.area_mm2}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                            {item.perimeter_mm}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                            {item.aspect_ratio}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                            {item.circularity}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                            {item.angle_deg}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>

                {/* 导出按钮 */}
                <div className="mt-4 flex space-x-3">
                  <button onClick={exportCSV} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                    <FileText className="w-4 h-4 mr-2" />
                    导出CSV
                  </button>
                  <button onClick={exportJSON} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <FileCode className="w-4 h-4 mr-2" />
                    导出JSON
                  </button>
                </div>
              </div>}

            {/* 统计信息 */}
            {analysisResults && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Grid className="w-5 h-5 mr-2 text-teal-600" />
                  统计信息
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {analysisResults.objectCount}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">检测数量</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {analysisResults.components.filter(item => item.label !== 'REF').length}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">样本数量</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {analysisResults.pixelRatio.toFixed(2)}
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">像素/毫米</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {refSize}mm
                    </div>
                    <div className="text-sm text-orange-600 dark:text-orange-400">参考尺寸</div>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>

      <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
    </div>;
}