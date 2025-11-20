// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Compass, Activity, Clock, Edit3, Save, Download, Database, MapPin, Sun } from 'lucide-react';
// @ts-ignore;
import { useToast, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

import { LogoHeader } from '@/components/LogoHeader';
import { TabBar } from '@/components/TabBar';
export default function LeafAngle(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('leafAngle');

  // 传感器数据状态
  const [sensorData, setSensorData] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
    latitude: 0,
    longitude: 0,
    altitude: 0,
    accuracy: 0
  });

  // 太阳位置数据状态
  const [solarPosition, setSolarPosition] = useState({
    elevation: 0,
    azimuth: 0,
    lastCalcTime: ''
  });

  // 时间状态
  const [currentDateTime, setCurrentDateTime] = useState({
    date: '',
    time: ''
  });

  // 样品名称
  const [sampleName, setSampleName] = useState('');

  // 样品数量
  const [sampleQuantity, setSampleQuantity] = useState(1);

  // 记录列表
  const [records, setRecords] = useState([]);

  // 位置监听器引用
  const watchIdRef = useRef(null);

  // 太阳位置计算函数
  const calculateSolarPosition = (latitude, longitude, date) => {
    try {
      // 将纬度转换为弧度
      const latRad = latitude * Math.PI / 180;

      // 计算儒略日
      const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
      const y = date.getFullYear() + 4800 - a;
      const m = date.getMonth() + 1 + 12 * a - 3;
      const julianDay = date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

      // 计算自2000年1月1日12:00 UTC以来的天数
      const n = julianDay - 2451545.0;

      // 计算平太阳时
      const Jstar = n - longitude / 360;

      // 计算平太阳近点角
      const M = (357.5291 + 0.98560028 * Jstar) % 360;
      const MRad = M * Math.PI / 180;

      // 计算中心差
      const C = 1.9148 * Math.sin(MRad) + 0.0200 * Math.sin(2 * MRad) + 0.0003 * Math.sin(3 * MRad);

      // 计算黄经
      const lambda = (M + C + 180 + 102.9372) % 360;
      const lambdaRad = lambda * Math.PI / 180;

      // 计算赤纬
      const delta = Math.asin(Math.sin(lambdaRad) * Math.sin(23.45 * Math.PI / 180));

      // 计算时角
      const omega0 = Math.acos(-Math.tan(latRad) * Math.tan(delta));

      // 获取当前时间的小时数
      const hours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;

      // 计算时角（弧度）
      const omega = (hours - 12) * 15 * Math.PI / 180;

      // 计算太阳高度角
      const elevationRad = Math.asin(Math.sin(latRad) * Math.sin(delta) + Math.cos(latRad) * Math.cos(delta) * Math.cos(omega));
      const elevation = elevationRad * 180 / Math.PI;

      // 计算太阳方位角
      const azimuthRad = Math.atan2(-Math.sin(omega), Math.tan(delta) * Math.cos(latRad) - Math.sin(latRad) * Math.cos(omega));
      let azimuth = azimuthRad * 180 / Math.PI;
      azimuth = (azimuth + 360) % 360; // 确保角度在0-360度范围内

      return {
        elevation: elevation,
        azimuth: azimuth
      };
    } catch (error) {
      console.error('太阳位置计算错误:', error);
      return {
        elevation: 0,
        azimuth: 0
      };
    }
  };

  // 更新太阳位置
  const updateSolarPosition = date => {
    const {
      latitude,
      longitude
    } = sensorData;
    if (latitude !== 0 && longitude !== 0) {
      const solarPos = calculateSolarPosition(latitude, longitude, date);
      setSolarPosition({
        elevation: solarPos.elevation,
        azimuth: solarPos.azimuth,
        lastCalcTime: date.toLocaleString('zh-CN')
      });
    }
  };

  // 更新时间
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime({
        date: now.toLocaleDateString('zh-CN'),
        time: now.toLocaleTimeString('zh-CN')
      });

      // 更新太阳位置
      updateSolarPosition(now);
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, [sensorData.latitude, sensorData.longitude]);

  // 初始化传感器
  useEffect(() => {
    // 请求陀螺仪权限并开始监听
    const initDeviceOrientation = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined') {
        // 检查是否需要请求权限（iOS 13+）
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          try {
            const response = await DeviceOrientationEvent.requestPermission();
            if (response === 'granted') {
              addDeviceOrientationListener();
            } else {
              toast({
                title: '权限被拒绝',
                description: '需要陀螺仪权限才能测量角度',
                duration: 3000
              });
            }
          } catch (error) {
            console.error('请求陀螺仪权限失败:', error);
            addDeviceOrientationListener(); // 尝试直接监听
          }
        } else {
          addDeviceOrientationListener();
        }
      } else {
        toast({
          title: '设备不支持',
          description: '您的设备不支持陀螺仪功能',
          duration: 3000
        });
      }
    };
    const addDeviceOrientationListener = () => {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    };
    const handleDeviceOrientation = event => {
      setSensorData(prev => ({
        ...prev,
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0
      }));
    };

    // 初始化地理位置
    const initGeolocation = () => {
      if (navigator.geolocation) {
        watchIdRef.current = navigator.geolocation.watchPosition(position => {
          setSensorData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude || 0,
            accuracy: position.coords.accuracy
          }));
        }, error => {
          console.error('位置获取失败:', error);
          toast({
            title: '位置获取失败',
            description: '无法获取地理位置信息',
            duration: 3000
          });
        }, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      } else {
        toast({
          title: '设备不支持',
          description: '您的设备不支持地理位置功能',
          duration: 3000
        });
      }
    };
    initDeviceOrientation();
    initGeolocation();

    // 清理函数
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [toast]);

  // 处理标签页切换
  const handleTabChange = tabId => {
    if (tabId === 'leafAngle') {
      setActiveTab(tabId);
    } else {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };

  // 记录数据
  const handleRecordData = () => {
    if (!sampleName.trim()) {
      toast({
        title: '输入错误',
        description: '请输入样品名称',
        duration: 3000
      });
      return;
    }
    const baseSampleName = sampleName.trim();
    const newRecords = [];

    // 根据样品数量生成多条记录
    for (let i = 1; i <= sampleQuantity; i++) {
      const recordSampleName = sampleQuantity > 1 ? `${baseSampleName}-${i}` : baseSampleName;
      const newRecord = {
        id: Date.now() + i,
        // 确保ID唯一
        sampleName: recordSampleName,
        baseName: baseSampleName,
        number: i,
        date: currentDateTime.date,
        time: currentDateTime.time,
        alpha: sensorData.alpha.toFixed(2),
        beta: sensorData.beta.toFixed(2),
        gamma: sensorData.gamma.toFixed(2),
        solarElevation: solarPosition.elevation.toFixed(2),
        solarAzimuth: solarPosition.azimuth.toFixed(2),
        latitude: sensorData.latitude.toFixed(6),
        longitude: sensorData.longitude.toFixed(6),
        altitude: Math.round(sensorData.altitude)
      };
      newRecords.push(newRecord);
    }
    setRecords(prev => [...newRecords, ...prev]);
    setSampleName('');
    setSampleQuantity(1); // 重置为1

    toast({
      title: '记录成功',
      description: `已成功记录 ${sampleQuantity} 个样品的数据`,
      duration: 2000
    });
  };

  // 下载CSV
  const handleDownloadCSV = () => {
    if (records.length === 0) {
      toast({
        title: '无数据',
        description: '暂无数据可下载',
        duration: 3000
      });
      return;
    }
    const headers = ['样品名称', '样品编号', '日期', '时间', 'Alpha(度)', 'Beta(度)', 'Gamma(度)', '太阳高度角(度)', '太阳方位角(度)', '纬度', '经度', '海拔(米)'];
    const csvContent = [headers.join(','), ...records.map(record => [record.sampleName, record.number || '', record.date, record.time, record.alpha, record.beta, record.gamma, record.solarElevation, record.solarAzimuth, record.latitude, record.longitude, record.altitude].join(','))].join('\n');

    // 添加BOM以支持中文
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `叶片角度测量_${currentDateTime.date.replace(/\//g, '-')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: '下载成功',
      description: 'CSV文件已开始下载',
      duration: 2000
    });
  };

  // 生成样品数量选项
  const quantityOptions = Array.from({
    length: 100
  }, (_, i) => i + 1);
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <LogoHeader />
      
      <div className="px-4 py-6 space-y-4">
        {/* 页面标题 */}
        <div className="bg-green-600 text-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <Compass className="w-6 h-6" />
            <h1 className="text-xl font-bold">叶片角度测量工具</h1>
          </div>
        </div>

        {/* 实时传感器数据 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-600" />
            实时传感器数据
          </h2>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {sensorData.alpha.toFixed(2)}°
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Alpha (Z轴)</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {sensorData.beta.toFixed(2)}°
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Beta (X轴)</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {sensorData.gamma.toFixed(2)}°
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Gamma (Y轴)</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">经度</div>
              <div className="text-lg font-semibold text-blue-600">
                {sensorData.longitude.toFixed(6)}
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">纬度</div>
              <div className="text-lg font-semibold text-blue-600">
                {sensorData.latitude.toFixed(6)}
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">海拔</div>
              <div className="text-lg font-semibold text-green-600">
                {Math.round(sensorData.altitude)}m
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">精度</div>
              <div className="text-lg font-semibold text-purple-600">
                {Math.round(sensorData.accuracy)}m
              </div>
            </div>
          </div>
        </div>

        {/* 太阳位置信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Sun className="w-5 h-5 mr-2 text-orange-500" />
            太阳位置信息
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {solarPosition.elevation.toFixed(2)}°
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">太阳高度角</div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {solarPosition.azimuth.toFixed(2)}°
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">太阳方位角</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">计算时间</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {solarPosition.lastCalcTime || '等待位置数据...'}
            </div>
          </div>
        </div>

        {/* 时间信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-600" />
            时间信息
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">日期</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentDateTime.date}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">时间</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentDateTime.time}
              </div>
            </div>
          </div>
        </div>

        {/* 样品输入和操作 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Edit3 className="w-5 h-5 mr-2 text-green-600" />
            样品信息
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                样品名称
              </label>
              <input type="text" value={sampleName} onChange={e => setSampleName(e.target.value)} placeholder="请输入样品名称" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" onKeyPress={e => e.key === 'Enter' && handleRecordData()} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                样品数量
              </label>
              <Select value={sampleQuantity.toString()} onValueChange={value => setSampleQuantity(parseInt(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="选择样品数量" />
                </SelectTrigger>
                <SelectContent>
                  {quantityOptions.map(num => <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <div className="text-sm text-blue-800 dark:text-blue-200">
                {sampleQuantity > 1 ? `将创建 ${sampleQuantity} 条记录：${sampleName.trim() || '样品名称'}-1 到 ${sampleName.trim() || '样品名称'}-${sampleQuantity}` : '将创建 1 条记录'}
              </div>
            </div>

            <div className="flex space-x-3">
              <button onClick={handleRecordData} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                <Save className="w-4 h-4 mr-2" />
                记录数据
              </button>
              <button onClick={handleDownloadCSV} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                下载CSV
              </button>
            </div>
          </div>
        </div>

        {/* 历史记录 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2 text-green-600" />
            测量记录
          </h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {records.length === 0 ? <div className="text-gray-500 dark:text-gray-400 text-center py-4">
                暂无记录
              </div> : records.map(record => <div key={record.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {record.sampleName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {record.date} {record.time}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs mb-1">
                    <div>α: {record.alpha}°</div>
                    <div>β: {record.beta}°</div>
                    <div>γ: {record.gamma}°</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-1">
                    <div className="text-orange-600">太阳高度: {record.solarElevation}°</div>
                    <div className="text-yellow-600">太阳方位: {record.solarAzimuth}°</div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {record.latitude}, {record.longitude} | 海拔: {record.altitude}m
                  </div>
                </div>)}
          </div>
        </div>
      </div>

      <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
    </div>;
}