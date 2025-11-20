// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Map, MapPin, Edit3, Plus, Crosshair, List, Calculator, Eye, Trash2, Download } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { LogoHeader } from '@/components/LogoHeader';
import { TabBar } from '@/components/TabBar';
export default function LandArea(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('landArea');

  // 当前位置状态 - 添加默认值防止null引用
  const [currentPosition, setCurrentPosition] = useState({
    lng: 0,
    lat: 0,
    accuracy: 0,
    status: '等待定位'
  });

  // 输入坐标状态 - 确保初始值不为null
  const [inputCoords, setInputCoords] = useState({
    lng: '',
    lat: ''
  });

  // 顶点坐标列表
  const [points, setPoints] = useState([]);

  // 面积计算结果
  const [areaResult, setAreaResult] = useState({
    m2: 0,
    ha: 0,
    mu: 0
  });

  // GPS监听器引用
  const watchIdRef = useRef(null);

  // Canvas引用
  const canvasRef = useRef(null);

  // 初始化GPS定位
  useEffect(() => {
    const initGPS = () => {
      if (navigator.geolocation) {
        watchIdRef.current = navigator.geolocation.watchPosition(position => {
          setCurrentPosition({
            lng: position.coords.longitude || 0,
            lat: position.coords.latitude || 0,
            accuracy: position.coords.accuracy || 0,
            status: '定位成功'
          });
        }, error => {
          setCurrentPosition(prev => ({
            ...prev,
            status: '定位失败'
          }));
          console.error('GPS定位失败:', error);
        }, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      } else {
        setCurrentPosition(prev => ({
          ...prev,
          status: '不支持GPS'
        }));
      }
    };
    initGPS();

    // 清理函数
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // 更新可视化预览 - 添加安全检查
  useEffect(() => {
    // 延迟执行确保DOM已渲染
    const timer = setTimeout(() => {
      updatePreview();
    }, 100);
    return () => clearTimeout(timer);
  }, [points]);

  // 处理标签页切换
  const handleTabChange = tabId => {
    if (tabId === 'landArea') {
      setActiveTab(tabId);
    } else {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };

  // 手动添加坐标点 - 添加输入验证
  const handleAddManualPoint = () => {
    // 确保inputCoords存在
    if (!inputCoords) {
      toast({
        title: '输入错误',
        description: '输入数据异常，请刷新页面重试',
        duration: 3000
      });
      return;
    }
    const lng = parseFloat(inputCoords.lng || '0');
    const lat = parseFloat(inputCoords.lat || '0');
    if (isNaN(lng) || isNaN(lat)) {
      toast({
        title: '输入错误',
        description: '请输入有效的经纬度坐标',
        duration: 3000
      });
      return;
    }
    if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
      toast({
        title: '输入错误',
        description: '坐标超出有效范围',
        duration: 3000
      });
      return;
    }
    addPoint(lng, lat, '手动输入');
    setInputCoords({
      lng: '',
      lat: ''
    });
  };

  // GPS定位添加坐标点 - 添加安全检查
  const handleAddGPSPoint = () => {
    // 确保currentPosition存在
    if (!currentPosition) {
      toast({
        title: '定位失败',
        description: '位置数据异常，请刷新页面重试',
        duration: 3000
      });
      return;
    }
    if (currentPosition.lng === 0 && currentPosition.lat === 0) {
      toast({
        title: '定位失败',
        description: 'GPS定位失败，无法获取当前位置',
        duration: 3000
      });
      return;
    }
    addPoint(currentPosition.lng, currentPosition.lat, 'GPS定位');
  };

  // 添加坐标点 - 添加安全检查
  const addPoint = (lng, lat, source) => {
    // 确保points存在
    if (!points) {
      setPoints([]);
      return;
    }
    const newPoint = {
      id: Date.now(),
      lng: lng,
      lat: lat,
      source: source,
      time: new Date().toLocaleString('zh-CN')
    };
    setPoints(prev => [...(prev || []), newPoint]);
    toast({
      title: '添加成功',
      description: `已添加顶点 ${(points || []).length + 1}`,
      duration: 2000
    });
  };

  // 删除坐标点 - 添加安全检查
  const handleDeletePoint = id => {
    if (!points) {
      setPoints([]);
      return;
    }
    setPoints(prev => (prev || []).filter(p => p.id !== id));
    calculateArea(); // 重新计算面积
    toast({
      title: '删除成功',
      description: '已删除顶点',
      duration: 2000
    });
  };

  // 计算多边形面积（使用Shoelace公式）- 添加安全检查
  const calculateArea = () => {
    if (!points || points.length < 3) {
      toast({
        title: '计算失败',
        description: '至少需要3个顶点才能计算面积',
        duration: 3000
      });
      return;
    }
    try {
      // 将经纬度转换为平面坐标（简化处理，使用墨卡托投影近似）
      const projectedPoints = points.map(p => {
        const x = p.lng * 111320 * Math.cos(p.lat * Math.PI / 180);
        const y = p.lat * 110540;
        return {
          x,
          y
        };
      });

      // 使用Shoelace公式计算面积
      let area = 0;
      const n = projectedPoints.length;
      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += projectedPoints[i].x * projectedPoints[j].y;
        area -= projectedPoints[j].x * projectedPoints[i].y;
      }
      area = Math.abs(area) / 2; // 平方米

      // 更新状态
      setAreaResult({
        m2: area,
        ha: area / 10000,
        mu: area / 666.67
      });
      toast({
        title: '计算完成',
        description: '面积计算完成',
        duration: 2000
      });
    } catch (error) {
      console.error('面积计算错误:', error);
      toast({
        title: '计算错误',
        description: '面积计算时发生错误',
        duration: 3000
      });
    }
  };

  // 更新可视化预览 - 添加全面的安全检查
  const updatePreview = () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 确保points存在
      const currentPoints = points || [];

      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (currentPoints.length === 0) {
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('暂无数据', canvas.width / 2, canvas.height / 2);
        return;
      }

      // 计算边界
      const lngs = currentPoints.map(p => p.lng || 0);
      const lats = currentPoints.map(p => p.lat || 0);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const padding = 20;
      const width = canvas.width - 2 * padding;
      const height = canvas.height - 2 * padding;

      // 坐标转换函数
      const transform = (lng, lat) => {
        const x = padding + (lng - minLng) / (maxLng - minLng || 1) * width;
        const y = padding + (1 - (lat - minLat) / (maxLat - minLat || 1)) * height;
        return {
          x,
          y
        };
      };

      // 绘制多边形
      if (currentPoints.length >= 3) {
        ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
        ctx.strokeStyle = '#22C55E';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const firstPoint = transform(currentPoints[0].lng, currentPoints[0].lat);
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (let i = 1; i < currentPoints.length; i++) {
          const point = transform(currentPoints[i].lng, currentPoints[i].lat);
          ctx.lineTo(point.x, point.y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // 绘制顶点
      currentPoints.forEach((point, index) => {
        const {
          x,
          y
        } = transform(point.lng, point.lat);
        // 绘制点
        ctx.fillStyle = '#3B82F6';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        // 绘制编号
        ctx.fillStyle = '#1F2937';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(index + 1, x, y - 10);
      });
    } catch (error) {
      console.error('预览更新错误:', error);
    }
  };

  // 清空所有数据 - 添加安全检查
  const handleClearAll = () => {
    if (!points || points.length === 0) {
      toast({
        title: '无数据',
        description: '暂无数据可清空',
        duration: 3000
      });
      return;
    }
    if (window.confirm('确定要清空所有数据吗？')) {
      setPoints([]);
      setAreaResult({
        m2: 0,
        ha: 0,
        mu: 0
      });
      toast({
        title: '清空成功',
        description: '已清空所有数据',
        duration: 2000
      });
    }
  };

  // 导出数据 - 添加安全检查
  const handleExportData = () => {
    if (!points || points.length === 0) {
      toast({
        title: '无数据',
        description: '暂无数据可导出',
        duration: 3000
      });
      return;
    }
    try {
      const data = {
        exportTime: new Date().toLocaleString('zh-CN'),
        points: points,
        area: areaResult || {
          m2: 0,
          ha: 0,
          mu: 0
        }
      };
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `土地面积测量_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.json`;
      link.click();
      URL.revokeObjectURL(url);
      toast({
        title: '导出成功',
        description: '数据导出成功',
        duration: 2000
      });
    } catch (error) {
      console.error('导出错误:', error);
      toast({
        title: '导出失败',
        description: '数据导出时发生错误',
        duration: 3000
      });
    }
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <LogoHeader />
      
      <div className="px-4 py-6 space-y-4">
        {/* 页面标题 */}
        <div className="bg-green-600 text-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <Map className="w-6 h-6" />
            <h1 className="text-xl font-bold">土地面积测量工具</h1>
          </div>
        </div>

        {/* 实时位置信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            当前位置
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">经度</div>
              <div className="text-lg font-semibold text-blue-600">
                {(currentPosition || {}).lng?.toFixed(6) || '0.000000'}
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">纬度</div>
              <div className="text-lg font-semibold text-blue-600">
                {(currentPosition || {}).lat?.toFixed(6) || '0.000000'}
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">精度</div>
              <div className="text-lg font-semibold text-green-600">
                {Math.round((currentPosition || {}).accuracy || 0)}m
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">状态</div>
              <div className={`text-lg font-semibold ${(currentPosition || {}).status === '定位成功' ? 'text-green-600' : (currentPosition || {}).status === '定位失败' ? 'text-red-600' : 'text-gray-600'}`}>
                {(currentPosition || {}).status || '未知'}
              </div>
            </div>
          </div>
        </div>

        {/* 坐标输入 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Edit3 className="w-5 h-5 mr-2 text-green-600" />
            添加顶点坐标
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  经度
                </label>
                <input type="number" value={(inputCoords || {}).lng || ''} onChange={e => setInputCoords(prev => ({
                ...(prev || {}),
                lng: e.target.value
              }))} step="0.000001" placeholder="请输入经度" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  纬度
                </label>
                <input type="number" value={(inputCoords || {}).lat || ''} onChange={e => setInputCoords(prev => ({
                ...(prev || {}),
                lat: e.target.value
              }))} step="0.000001" placeholder="请输入纬度" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button onClick={handleAddManualPoint} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                <Plus className="w-4 h-4 mr-2" />
                手动添加
              </button>
              <button onClick={handleAddGPSPoint} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Crosshair className="w-4 h-4 mr-2" />
                GPS定位
              </button>
            </div>
          </div>
        </div>

        {/* 顶点列表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <List className="w-5 h-5 mr-2 text-green-600" />
            顶点坐标列表
          </h2>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {!(points && points.length > 0) ? <div className="text-gray-500 dark:text-gray-400 text-center py-4">
                暂无顶点坐标
              </div> : points.map((point, index) => <div key={point.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white mb-1">
                      顶点 {index + 1} ({point.source})
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      经度: {(point.lng || 0).toFixed(6)}<br />
                      纬度: {(point.lat || 0).toFixed(6)}<br />
                      时间: {point.time}
                    </div>
                  </div>
                  <button onClick={() => handleDeletePoint(point.id)} className="ml-2 text-red-600 hover:text-red-800 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>)}
          </div>
        </div>

        {/* 面积计算结果 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-orange-600" />
            面积计算结果
          </h2>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {(areaResult || {}).m2?.toFixed(2) || '0.00'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">平方米 (m²)</div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {(areaResult || {}).ha?.toFixed(4) || '0.0000'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">公顷 (ha)</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {(areaResult || {}).mu?.toFixed(4) || '0.0000'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">亩</div>
            </div>
          </div>

          <button onClick={calculateArea} className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center">
            <Calculator className="w-4 h-4 mr-2" />
            计算面积
          </button>
        </div>

        {/* 可视化预览 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-purple-600" />
            可视化预览
          </h2>
          
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4" style={{
          height: '300px'
        }}>
            <canvas ref={canvasRef} width={400} height={300} className="w-full h-full" />
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleClearAll} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
              <Trash2 className="w-4 h-4 mr-2" />
              清空数据
            </button>
            <button onClick={handleExportData} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </button>
          </div>
        </div>
      </div>

      <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
    </div>;
}