// @ts-ignore;
import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore;
import { Cloud, MapPin, Calendar, Download, Table, FileDown, Crosshair, Search } from 'lucide-react';
// @ts-ignore;
import { useToast } from '@/components/ui';

import { LogoHeader } from '@/components/LogoHeader';
import { TabBar } from '@/components/TabBar';
export default function AgriWeather(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('agriWeather');

  // 位置选择状态 - 添加默认值防止null引用
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
    name: null
  });

  // 选点方式标签页
  const [activeLocationTab, setActiveLocationTab] = useState('manual');

  // 手动输入坐标 - 确保初始值不为null
  const [manualCoords, setManualCoords] = useState({
    lat: '',
    lng: ''
  });

  // 日期范围 - 确保初始值不为null
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  // 搜索相关
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // GPS定位状态
  const [gpsStatus, setGpsStatus] = useState('获取中...');

  // 数据获取状态
  const [isFetching, setIsFetching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  // 气象数据
  const [weatherData, setWeatherData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  // 地图相关
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // 初始化
  useEffect(() => {
    initializeDates();
    initializeMap();
    getCurrentLocation();
  }, []);

  // 初始化日期
  const initializeDates = () => {
    const today = new Date();
    const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    setDateRange({
      startDate: lastYear.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    });
  };

  // 初始化地图
  const initializeMap = () => {
    if (typeof window !== 'undefined' && window.L) {
      setTimeout(() => {
        if (!mapInstanceRef.current && mapRef.current) {
          const map = window.L.map(mapRef.current).setView([39.9042, 116.4074], 5);
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          map.on('click', handleMapClick);
          mapInstanceRef.current = map;
        }
      }, 100);
    }
  };

  // 处理地图点击
  const handleMapClick = e => {
    if (markerRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current);
    }
    const marker = window.L.marker([e.latlng.lat, e.latlng.lng]).addTo(mapInstanceRef.current);
    markerRef.current = marker;
    const newLocation = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      name: '地图选择'
    };
    setSelectedLocation(newLocation);
  };

  // 获取当前位置
  const getCurrentLocation = () => {
    setGpsStatus('获取中...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const newLocation = {
          lat,
          lng,
          name: '当前位置'
        };
        setSelectedLocation(newLocation);
        setGpsStatus(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }, error => {
        setGpsStatus('定位失败');
        console.error('GPS定位失败:', error);
      }, {
        enableHighAccuracy: true,
        timeout: 10000
      });
    } else {
      setGpsStatus('不支持GPS定位');
    }
  };

  // 搜索位置
  const searchLocation = async () => {
    if (!searchQuery || !searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
      const data = await response.json();
      setSearchResults(data || []);
    } catch (error) {
      console.error('搜索失败:', error);
      toast({
        title: '搜索失败',
        description: '请重试',
        duration: 3000
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // 选择搜索结果
  const selectSearchResult = place => {
    if (!place) return;
    const newLocation = {
      lat: parseFloat(place.lat || '0'),
      lng: parseFloat(place.lon || '0'),
      name: place.display_name && place.display_name.split(',')[0] || '未知地点'
    };
    setSelectedLocation(newLocation);
    setSearchResults([place]); // 只显示选中的结果
  };

  // 手动输入坐标变化 - 添加安全检查
  const handleManualCoordChange = (field, value) => {
    // 确保manualCoords存在
    if (!manualCoords) {
      setManualCoords({
        lat: '',
        lng: ''
      });
      return;
    }

    // 安全更新状态
    setManualCoords(prev => {
      if (!prev) {
        return {
          lat: field === 'lat' ? value || '' : '',
          lng: field === 'lng' ? value || '' : ''
        };
      }
      return {
        ...prev,
        [field]: value || ''
      };
    });

    // 延迟计算位置，避免状态更新冲突
    setTimeout(() => {
      setManualCoords(currentCoords => {
        if (!currentCoords) return currentCoords;
        const lat = field === 'lat' ? parseFloat(value || '0') : parseFloat(currentCoords.lat || '0');
        const lng = field === 'lng' ? parseFloat(value || '0') : parseFloat(currentCoords.lng || '0');
        if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
          setSelectedLocation({
            lat,
            lng,
            name: '手动输入'
          });
        }
        return currentCoords;
      });
    }, 0);
  };

  // 获取气象数据
  const fetchWeatherData = async () => {
    if (!selectedLocation || !selectedLocation.lat || !selectedLocation.lng) {
      toast({
        title: '请先选择位置',
        description: '需要选择经纬度位置',
        duration: 3000
      });
      return;
    }
    if (!dateRange || !dateRange.startDate || !dateRange.endDate) {
      toast({
        title: '请选择日期范围',
        description: '需要选择开始和结束日期',
        duration: 3000
      });
      return;
    }
    setIsFetching(true);
    setProgress(0);
    setStatusMessage('开始获取数据...');
    try {
      const server = "https://power.larc.nasa.gov/api/temporal/daily/point";
      const powerVariables = ["TOA_SW_DWN", "ALLSKY_SFC_SW_DWN", "T2M", "T2M_MIN", "T2M_MAX", "T2MDEW", "WS2M", "PRECTOTCORR"];
      const params = new URLSearchParams({
        request: "execute",
        parameters: powerVariables.join(","),
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        start: (dateRange.startDate || '').replace(/-/g, ''),
        end: (dateRange.endDate || '').replace(/-/g, ''),
        community: "AG",
        format: "JSON",
        user: "anonymous"
      });
      setProgress(20);
      setStatusMessage('连接NASA服务器...');
      const response = await fetch(`${server}?${params}`);
      setProgress(40);
      setStatusMessage('下载数据中...');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProgress(60);
      setStatusMessage('处理数据中...');

      // 处理数据
      const processedData = processWeatherData(data);
      setWeatherData(processedData);
      setProgress(80);
      setStatusMessage('生成预览...');

      // 显示预览
      setShowPreview(true);
      setProgress(100);
      setStatusMessage('完成！');
      setTimeout(() => {
        setIsFetching(false);
      }, 2000);
      toast({
        title: '数据获取成功',
        description: `获取了${processedData.length}条数据`,
        duration: 3000
      });
    } catch (error) {
      console.error('获取数据失败:', error);
      toast({
        title: '获取数据失败',
        description: error.message,
        duration: 5000
      });
      setIsFetching(false);
    }
  };

  // 处理气象数据
  const processWeatherData = data => {
    if (!data || !data.header || !data.properties || !data.properties.parameter) {
      console.error('无效的NASA数据格式');
      return [];
    }
    const fillValue = parseFloat(data.header.fill_value || '-999');
    const variables = ["TOA_SW_DWN", "ALLSKY_SFC_SW_DWN", "T2M", "T2M_MIN", "T2M_MAX", "T2MDEW", "WS2M", "PRECTOTCORR"];
    const processedData = [];

    // 安全获取第一个变量的日期
    const firstVar = variables[0];
    if (!data.properties.parameter[firstVar]) {
      console.error('无法获取日期数据');
      return [];
    }
    const dates = Object.keys(data.properties.parameter[firstVar]);
    dates.forEach(date => {
      const row = {
        date: formatDate(date)
      };
      variables.forEach(varName => {
        const paramData = data.properties.parameter[varName];
        if (paramData && paramData[date]) {
          const value = paramData[date];
          row[varName] = value === fillValue ? null : parseFloat(value);
        } else {
          row[varName] = null;
        }
      });

      // 计算派生数据
      if (row.T2MDEW !== null) {
        row.VAP = calculateVaporPressure(row.T2MDEW);
      }
      processedData.push(row);
    });
    return processedData;
  };

  // 计算水汽压
  const calculateVaporPressure = tdew => {
    if (tdew === null || tdew === undefined || tdew < -95.0 || tdew > 65.0) return null;
    const tmp = 17.27 * tdew / (tdew + 237.3);
    return 0.6108 * Math.exp(tmp);
  };

  // 格式化日期
  const formatDate = dateStr => {
    if (!dateStr || typeof dateStr !== 'string' || dateStr.length < 8) {
      return '未知日期';
    }
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}-${month}-${day}`;
  };

  // 导出CSV
  const exportToCSV = () => {
    if (!weatherData || weatherData.length === 0) {
      toast({
        title: '没有数据可导出',
        description: '请先获取气象数据',
        duration: 3000
      });
      return;
    }
    const columns = [{
      key: 'date',
      label: '日期'
    }, {
      key: 'ALLSKY_SFC_SW_DWN',
      label: '太阳辐射(MJ/m2/day)'
    }, {
      key: 'T2M',
      label: '平均温度(C)'
    }, {
      key: 'T2M_MIN',
      label: '最低温度(C)'
    }, {
      key: 'T2M_MAX',
      label: '最高温度(C)'
    }, {
      key: 'T2MDEW',
      label: '露点温度(C)'
    }, {
      key: 'VAP',
      label: '水汽压(kPa)'
    }, {
      key: 'WS2M',
      label: '风速(m/s)'
    }, {
      key: 'PRECTOTCORR',
      label: '降水量(mm/day)'
    }];

    // 生成CSV内容
    let csvContent = columns.map(col => col.label).join(',') + '\n';
    weatherData.forEach(row => {
      if (!row) return;
      csvContent += columns.map(col => {
        const value = row[col.key];
        return value !== null && value !== undefined ? value.toFixed(2) : '';
      }).join(',') + '\n';
    });

    // 添加文件头信息
    const locationName = selectedLocation && selectedLocation.name || '未知';
    const lat = selectedLocation && selectedLocation.lat ? selectedLocation.lat.toFixed(4) : '0.0000';
    const lng = selectedLocation && selectedLocation.lng ? selectedLocation.lng.toFixed(4) : '0.0000';
    const startDate = dateRange && dateRange.startDate || '';
    const endDate = dateRange && dateRange.endDate || '';
    const header = [`农业气象数据`, `位置: ${locationName} (${lat}, ${lng})`, `日期范围: ${startDate} 至 ${endDate}`, `数据源: NASA POWER`, `生成时间: ${new Date().toLocaleString('zh-CN')}`, '', ''].join('\n');
    csvContent = header + csvContent;

    // 下载文件
    const blob = new Blob(['\ufeff' + csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `农业气象数据_${locationName}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({
      title: '导出成功',
      description: 'CSV文件已下载',
      duration: 3000
    });
  };

  // 处理标签页切换
  const handleTabChange = tabId => {
    if (tabId === 'agriWeather') {
      setActiveTab(tabId);
    } else {
      $w.utils.navigateTo({
        pageId: tabId,
        params: {}
      });
    }
  };

  // 表格列定义
  const tableColumns = [{
    key: 'date',
    label: '日期'
  }, {
    key: 'ALLSKY_SFC_SW_DWN',
    label: '太阳辐射(MJ/m²/day)'
  }, {
    key: 'T2M',
    label: '平均温度(°C)'
  }, {
    key: 'T2M_MIN',
    label: '最低温度(°C)'
  }, {
    key: 'T2M_MAX',
    label: '最高温度(°C)'
  }, {
    key: 'T2MDEW',
    label: '露点温度(°C)'
  }, {
    key: 'VAP',
    label: '水汽压(kPa)'
  }, {
    key: 'WS2M',
    label: '风速(m/s)'
  }, {
    key: 'PRECTOTCORR',
    label: '降水量(mm/day)'
  }];

  // 安全格式化数值的函数
  const formatCellValue = (value, key) => {
    if (value === null || value === undefined) {
      return '-';
    }

    // 日期字段直接返回
    if (key === 'date') {
      return value;
    }

    // 检查是否为数字
    if (typeof value === 'number' && !isNaN(value)) {
      return value.toFixed(2);
    }

    // 其他情况转为字符串
    return String(value);
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <LogoHeader />
      
      <div className="px-4 py-6 space-y-4">
        {/* 页面标题 */}
        <div className="bg-blue-600 text-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <Cloud className="w-6 h-6" />
            <h1 className="text-xl font-bold">农业气象分析工具</h1>
          </div>
        </div>

        {/* 位置选择 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            位置选择
          </h2>
          
          {/* 选点方式标签页 */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
            <nav className="-mb-px flex space-x-8">
              {[{
              id: 'manual',
              label: '手动输入'
            }, {
              id: 'map',
              label: '地图选点'
            }, {
              id: 'search',
              label: '地名搜索'
            }, {
              id: 'gps',
              label: '当前定位'
            }].map(tab => <button key={tab.id} onClick={() => setActiveLocationTab(tab.id)} className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeLocationTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  {tab.label}
                </button>)}
            </nav>
          </div>

          {/* 手动输入 */}
          {activeLocationTab === 'manual' && <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  纬度
                </label>
                <input type="number" value={manualCoords && manualCoords.lat || ''} onChange={e => handleManualCoordChange('lat', e.target.value)} step="0.000001" placeholder="例: 39.9042" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  经度
                </label>
                <input type="number" value={manualCoords && manualCoords.lng || ''} onChange={e => handleManualCoordChange('lng', e.target.value)} step="0.000001" placeholder="例: 116.4074" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
              </div>
            </div>}

          {/* 地图选点 */}
          {activeLocationTab === 'map' && <div>
              <div ref={mapRef} className="h-64 rounded-lg border border-gray-300 dark:border-gray-600" />
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                点击地图选择位置：
                {selectedLocation && selectedLocation.lat && selectedLocation.lng ? <span className="font-medium text-gray-900 dark:text-white">
                    {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </span> : <span className="font-medium">未选择</span>}
              </div>
            </div>}

          {/* 地名搜索 */}
          {activeLocationTab === 'search' && <div className="space-y-4">
              <div className="flex space-x-2">
                <input type="text" value={searchQuery && searchQuery || ''} onChange={e => setSearchQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && searchLocation()} placeholder="输入地名，如：北京、上海、广州" className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                <button onClick={searchLocation} disabled={isSearching} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  搜索
                </button>
              </div>
              
              {searchResults && searchResults.length > 0 && <div className="space-y-2">
                  {searchResults.map((place, index) => <div key={index} onClick={() => selectSearchResult(place)} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {place && place.display_name && place.display_name.split(',')[0] || '未知地点'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {place && place.display_name || '无描述'}
                      </div>
                    </div>)}
                </div>}
            </div>}

          {/* 当前定位 */}
          {activeLocationTab === 'gps' && <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">当前位置</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {gpsStatus && gpsStatus || '未知'}
                  </div>
                </div>
                <button onClick={getCurrentLocation} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Crosshair className="w-4 h-4 mr-2" />
                  重新定位
                </button>
              </div>
            </div>}
        </div>

        {/* 日期范围选择 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            日期范围选择
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                开始日期
              </label>
              <input type="date" value={dateRange && dateRange.startDate || ''} onChange={e => {
              const newValue = e.target.value || '';
              setDateRange(prev => {
                if (!prev) {
                  return {
                    startDate: newValue,
                    endDate: ''
                  };
                }
                return {
                  ...prev,
                  startDate: newValue
                };
              });
            }} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                结束日期
              </label>
              <input type="date" value={dateRange && dateRange.endDate || ''} onChange={e => {
              const newValue = e.target.value || '';
              setDateRange(prev => {
                if (!prev) {
                  return {
                    startDate: '',
                    endDate: newValue
                  };
                }
                return {
                  ...prev,
                  endDate: newValue
                };
              });
            }} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
            </div>
          </div>
        </div>

        {/* 数据获取控制 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Download className="w-5 h-5 mr-2 text-orange-600" />
            数据获取
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">当前配置</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">位置：</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedLocation && selectedLocation.lat && selectedLocation.lng ? `${selectedLocation.name || '未知'} (${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)})` : '未选择'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">日期范围：</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {dateRange && dateRange.startDate && dateRange.endDate ? `${dateRange.startDate} 至 ${dateRange.endDate}` : '未选择'}
                  </span>
                </div>
              </div>
            </div>

            <button onClick={fetchWeatherData} disabled={isFetching} className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center font-medium disabled:opacity-50">
              <Cloud className="w-5 h-5 mr-2" />
              获取NASA气象数据
            </button>

            {/* 进度显示 */}
            {isFetching && <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-300">获取进度</span>
                  <span className="text-sm text-blue-700 dark:text-blue-400">{progress}%</span>
                </div>
                <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{
                width: `${progress}%`
              }} />
                </div>
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                  {statusMessage}
                </div>
              </div>}
          </div>
        </div>

        {/* 数据预览 */}
        {showPreview && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Table className="w-5 h-5 mr-2 text-purple-600" />
              数据预览（前100行）
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {tableColumns.map(col => <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {col.label}
                      </th>)}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {weatherData && weatherData.length > 0 && weatherData.slice(0, 100).map((row, index) => <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      {tableColumns.map(col => <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {formatCellValue(row && row[col.key], col.key)}
                        </td>)}
                    </tr>)}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                共 <span className="font-medium text-gray-900 dark:text-white">{weatherData && weatherData.length || 0}</span> 行数据，显示前100行
              </div>
              <button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                <FileDown className="w-4 h-4 mr-2" />
                导出CSV
              </button>
            </div>
          </div>}
      </div>

      <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
    </div>;
}