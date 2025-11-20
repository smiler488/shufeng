// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { User, Settings, HelpCircle, Phone, Mail, MapPin, Navigation, Globe, MessageCircle, ChevronRight, Shield, FileText, Star, LogOut, Award, Building, Camera, Edit2, Save, X, Upload } from 'lucide-react'; // @ts-ignore;
import { useToast } from '@/components/ui';import { LogoHeader } from '@/components/LogoHeader';import { TabBar } from '@/components/TabBar';export default function Profile(props) {const { $w } = props;const { toast } =
  useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  // 用户资料状态
  const [userProfile, setUserProfile] = useState({ avatar: '', nickname: '', phone: '', email: '', bio: '' }); // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  // 编辑表单状态
  const [editForm, setEditForm] = useState({ avatar: '', nickname: '', phone: '', email: '', bio: '' });const contactInfo = { phone: '400-1866090', email: 'info@shu-feng.com.cn', website: 'https://www.shu-feng.com.cn/', address: '上海市中国(上海)自由贸易试验区临港新片区云汉路979号2楼', workHours: '周一至周五 9:00-18:00', emergencySupport: '7×24小时技术支持' };const companyInfo = { name: '黍峰生物Agent', title: '光合&表型解决方案', description: '国家高新技术企业，专注于植物光合表型研究领域', established: '2020年', certification: '国家高新技术企业认证' }; // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  // 机器人头像选项 - 使用机器人风格的头像
  const defaultAvatars = ['https://api.dicebear.com/7.x/bottts/svg?seed=robot1&backgroundColor=b6e3f4', 'https://api.dicebear.com/7.x/bottts/svg?seed=robot2&backgroundColor=c0aede', 'https://api.dicebear.com/7.x/bottts/svg?seed=robot3&backgroundColor=d1d4f9', 'https://api.dicebear.com/7.x/bottts/svg?seed=robot4&backgroundColor=ffd5dc', 'https://api.dicebear.com/7.x/bottts/svg?seed=robot5&backgroundColor=ffdfbf', 'https://api.dicebear.com/7.x/bottts/svg?seed=robot6&backgroundColor=69d2e7']; // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  // 检查登录状态
  useEffect(() => {checkLoginStatus();}, []);const checkLoginStatus = async () => {if (!$w.auth.currentUser?.userId) {// 未登录，显示登录引导
      return;} // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    // 已登录，加载用户资料
    await loadUserProfile();}; // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  // 加载用户资料 - 使用数据源API
  const loadUserProfile = async () => {try {const result = await $w.cloud.callDataSource({ dataSourceName: 'user_profiles', methodName: 'wedaGetRecordsV2', params: { filter: { where: { $and: [{ userId: { $eq: $w.auth.currentUser.userId } }] } }, select: { $master: true }, pageSize: 1 } });if (result.records && result.records.length > 0) {const profile = result.records[0];setUserProfile({ avatar: profile.avatar || defaultAvatars[0], nickname: profile.nickname || $w.auth.currentUser.name || '用户', phone: profile.phone || '', email: profile.email || '', bio: profile.bio || '' });setEditForm({ avatar: profile.avatar || defaultAvatars[0], nickname: profile.nickname || $w.auth.currentUser.name || '用户', phone: profile.phone || '', email: profile.email || '', bio: profile.bio || '' });} else {// 创建默认资料
        const defaultProfile = { userId: $w.auth.currentUser.userId, avatar: defaultAvatars[0], nickname: $w.auth.currentUser.name || '用户', phone: '', email: '', bio: '' };setUserProfile({ avatar: defaultProfile.avatar, nickname: defaultProfile.nickname, phone: defaultProfile.phone, email: defaultProfile.email, bio: defaultProfile.bio });setEditForm(defaultProfile); // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        // 保存默认资料到数据库
        await saveUserProfileToDB(defaultProfile);}} catch (error) {console.error('加载用户资料失败:', error);toast({ title: '加载失败', description: '无法加载用户资料，请稍后重试', duration: 3000 });}}; // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  // 保存用户资料到数据库 - 使用数据源API
  const saveUserProfileToDB = async (profile) => {try {// 先查询是否已存在记录
      const existingResult = await $w.cloud.callDataSource({ dataSourceName: 'user_profiles', methodName: 'wedaGetRecordsV2', params: { filter: { where: { $and: [{ userId: { $eq: $w.auth.currentUser.userId } }] } }, select: { $master: true }, pageSize: 1 } });if (existingResult.records && existingResult.records.length > 0) {// 更新现有记录
        const updateResult = await $w.cloud.callDataSource({ dataSourceName: 'user_profiles', methodName: 'wedaUpdateV2', params: { data: { avatar: profile.avatar, nickname: profile.nickname, phone: profile.phone, email: profile.email, bio: profile.bio }, filter: { where: { $and: [{ userId: { $eq: $w.auth.currentUser.userId } }] } } } });if (updateResult.count === 0) {throw new Error('更新失败，记录不存在');}} else {// 创建新记录
        const createResult = await $w.cloud.callDataSource({ dataSourceName: 'user_profiles', methodName: 'wedaCreateV2', params: { data: { userId: profile.userId, avatar: profile.avatar, nickname: profile.nickname, phone: profile.phone, email: profile.email, bio: profile.bio } } });if (!createResult.id) {throw new Error('创建失败');}}} catch (error) {console.error('保存用户资料失败:', error);throw error;}}; // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  // 微信登录
  const handleWeChatLogin = async () => {try {const tcb = await $w.cloud.getCloudInstance();tcb.auth().toDefaultLoginPage({ config_version: "env", redirect_uri: window.location.href, query: { s_domain: $w.utils.resolveStaticResourceUrl("/").replace(/^https?:\/\//, "").split("/")[0] } });} catch (error) {console.error('微信登录失败:', error);toast({ title: '登录失败', description: '微信登录失败，请稍后重试', duration: 3000 });}}; // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  // 退出登录
  const handleLogout = async () => {try {setIsLoading(true);const tcb = await $w.cloud.getCloudInstance();await tcb.auth().signOut();await tcb.auth().signInAnonymously();await $w.auth.getUserInfo({ force: true });toast({ title: '退出成功', description: '您已成功退出登录', duration: 2000 }); // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      // 重置用户资料
      setUserProfile({ avatar: '', nickname: '', phone: '', email: '', bio: '' });setEditForm({ avatar: '', nickname: '', phone: '', email: '', bio: '' });} catch (error) {console.error('退出登录失败:', error);toast({ title: '退出失败', description: '退出登录失败，请稍后重试', duration: 3000 });} finally {setIsLoading(false);}}; // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  // 开始编辑
  const handleEdit = () => {setEditForm({ ...userProfile });setIsEditing(true);}; // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  // 取消编辑
  const handleCancel = () => {setEditForm({ ...userProfile });setIsEditing(false);}; // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  // 保存编辑
  const handleSave = async () => {// 验证表单
    if (!editForm.nickname.trim()) {toast({ title: '验证失败', description: '昵称不能为空', duration: 3000 });return;}if (editForm.phone && !/^1[3-9]\d{9}$/.test(editForm.phone)) {toast({ title: '验证失败', description: '请输入正确的手机号码', duration: 3000 });return;}if (editForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) {toast({ title: '验证失败', description: '请输入正确的邮箱地址', duration: 3000 });return;}try {setIsLoading(true);await saveUserProfileToDB({ userId: $w.auth.currentUser.userId, ...editForm });setUserProfile({ ...editForm });setIsEditing(false);toast({ title: '保存成功', description: '个人资料已更新', duration: 2000 });} catch (error) {console.error('保存失败:', error);toast({ title: '保存失败', description: '保存个人资料失败，请稍后重试', duration: 3000 });} finally {setIsLoading(false);}}; // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  // 选择头像
  const handleAvatarSelect = (avatar) => {setEditForm({ ...editForm, avatar });}; // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  // 处理表单输入
  const handleInputChange = (field, value) => {setEditForm({ ...editForm, [field]: value });};const handleTabChange = (tabId) => {if (tabId === 'profile') {setActiveTab(tabId);} else {$w.utils.navigateTo({ pageId: tabId, params: {} });}}; // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  // ... 保持已有的联系信息处理函数
  const handlePhoneCall = () => {const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);if (isMobile) {window.location.href = `tel:${contactInfo.phone}`;} else {navigator.clipboard.writeText(contactInfo.phone).then(() => {toast({ title: '电话号码已复制', description: `电话号码 ${contactInfo.phone} 已复制到剪贴板，请使用手机拨打`, duration: 3000 });}).catch(() => {toast({ title: '联系电话', description: contactInfo.phone, duration: 5000 });});}};const handleEmailClick = () => {window.location.href = `mailto:${contactInfo.email}`;};const handleWebsiteClick = () => {window.open(contactInfo.website, '_blank');};const handleMapClick = () => {const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);if (isMobile) {const gaodeUrl = `https://uri.amap.com/navigation?to=${encodeURIComponent(contactInfo.address)}&mode=car&coordinate=121.825,30.865&callnative=1`;const baiduUrl = `https://api.map.baidu.com/direction?destination=${encodeURIComponent(contactInfo.address)}&mode=driving&region=上海&output=html`;window.open(gaodeUrl, '_blank');setTimeout(() => {window.open(baiduUrl, '_blank');}, 500);} else {const baiduMapUrl = `https://map.baidu.com/search/${encodeURIComponent(contactInfo.address)}`;window.open(baiduMapUrl, '_blank');}toast({ title: '地图导航', description: '正在为您打开地图导航', duration: 2000 });};const handleAddressCopy = () => {navigator.clipboard.writeText(contactInfo.address).then(() => {toast({ title: '地址已复制', description: '公司地址已复制到剪贴板', duration: 3000 });}).catch(() => {toast({ title: '公司地址', description: contactInfo.address, duration: 5000 });});};const handleWebsiteCopy = () => {navigator.clipboard.writeText(contactInfo.website).then(() => {toast({ title: '官网地址已复制', description: '公司官网地址已复制到剪贴板', duration: 3000 });}).catch(() => {toast({ title: '公司官网', description: contactInfo.website, duration: 5000 });});}; // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  // 更新菜单项，移除帮助中心和给我评分
  const menuItems = [{ icon: Settings, label: '系统设置', description: '应用设置和偏好配置', onClick: () => {toast({ title: '系统设置', description: '系统设置功能正在开发中', duration: 2000 });} }, { icon: Shield, label: '隐私政策', description: '查看隐私保护政策', onClick: () => {toast({ title: '隐私政策', description: '隐私政策功能正在开发中', duration: 2000 });} }, { icon: FileText, label: '用户协议', description: '查看用户服务协议', onClick: () => {toast({ title: '用户协议', description: '用户协议功能正在开发中', duration: 2000 });} }]; // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  // 如果用户未登录，显示登录引导
  if (!$w.auth.currentUser?.userId) {return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
        <LogoHeader />
        
        <div className="px-4 py-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm text-center">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              欢迎使用黍峰生物Agent
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              登录后可以管理个人资料，享受更多个性化服务
            </p>
            
            <button onClick={handleWeChatLogin} className="w-full bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 mb-4">
              <Globe className="w-5 h-5" />
              <span>微信快捷登录</span>
            </button>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              登录即表示同意用户协议和隐私政策
            </p>
          </div>
          
          {/* 公司信息 */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Building className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                公司信息
              </h2>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                {companyInfo.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {companyInfo.description}
              </p>
            </div>
          </div>
        </div>
        
        <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
      </div>;}return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <LogoHeader />
      
      <div className="px-4 py-6 space-y-6">
        {/* 用户信息卡片 */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-800 dark:to-green-900 rounded-lg p-6 shadow-sm text-white">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden">
                {userProfile.avatar ? <img src={userProfile.avatar} alt="头像" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">
                    <User className="w-8 h-8" />
                  </div>}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">
                {userProfile.nickname || '用户'}
              </h2>
              <p className="text-green-100 text-sm">
                {userProfile.bio || '欢迎使用黍峰生物Agent'}
              </p>
              {(userProfile.phone || userProfile.email) && <div className="mt-2 space-y-1">
                  {userProfile.phone && <div className="text-xs text-green-100">
                      📱 {userProfile.phone}
                    </div>}
                  {userProfile.email && <div className="text-xs text-green-100">
                      ✉️ {userProfile.email}
                    </div>}
                </div>}
            </div>
            <button onClick={isEditing ? handleSave : handleEdit} disabled={isLoading} className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors disabled:opacity-50">
              {isEditing ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            </button>
          </div>
          
          {isEditing && <div className="mt-4 flex space-x-2">
              <button onClick={handleSave} disabled={isLoading} className="flex-1 bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
                {isLoading ? '保存中...' : '保存'}
              </button>
              <button onClick={handleCancel} disabled={isLoading} className="flex-1 bg-white/20 text-white hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
                取消
              </button>
            </div>}
        </div>

        {/* 编辑表单 */}
        {isEditing && <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              编辑个人资料
            </h3>
            
            {/* 头像选择 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                选择头像
              </label>
              <div className="grid grid-cols-6 gap-3">
                {defaultAvatars.map((avatar, index) => <button key={index} onClick={() => handleAvatarSelect(avatar)} className={`relative rounded-lg overflow-hidden border-2 transition-all ${editForm.avatar === avatar ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200 dark:border-gray-600'}`}>
                    <img src={avatar} alt={`机器人头像${index + 1}`} className="w-full h-full object-cover aspect-square" />
                    {editForm.avatar === avatar && <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>}
                  </button>)}
              </div>
            </div>
            
            {/* 昵称 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                昵称 *
              </label>
              <input type="text" value={editForm.nickname} onChange={(e) => handleInputChange('nickname', e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="请输入昵称" maxLength={20} />
            </div>
            
            {/* 手机号 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                手机号
              </label>
              <input type="tel" value={editForm.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="请输入手机号" maxLength={11} />
            </div>
            
            {/* 邮箱 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                邮箱
              </label>
              <input type="email" value={editForm.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="请输入邮箱" />
            </div>
            
            {/* 个人简介 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                个人简介
              </label>
              <textarea value={editForm.bio} onChange={(e) => handleInputChange('bio', e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" placeholder="介绍一下自己..." rows={3} maxLength={100} />
            </div>
          </div>}

        {/* 公司信息卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Building className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              公司信息
            </h2>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
              {companyInfo.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              {companyInfo.description}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-300">成立时间</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{companyInfo.established}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">企业认证</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{companyInfo.certification}</span>
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Phone className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              联系方式
            </h2>
          </div>
          
          <div className="space-y-3">
            {/* 服务热线 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">服务热线</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {contactInfo.phone}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {contactInfo.workHours}
                  </div>
                </div>
                <button onClick={handlePhoneCall} className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span></span>
                </button>
              </div>
            </div>

            {/* 邮箱联系 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">邮箱联系</span>
                  </div>
                  <div className="text-sm text-gray-900 dark:text-white mb-1">
                    {contactInfo.email}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={handleEmailClick} className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span></span>
                  </button>
                </div>
              </div>
            </div>

            {/* 公司官网 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Globe className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">公司官网</span>
                  </div>
                  <div className="text-sm text-gray-900 dark:text-white mb-1 truncate">
                    {contactInfo.website}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={handleWebsiteClick} className="bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span></span>
                  </button>
                  <button onClick={handleWebsiteCopy} className="bg-gray-600 text-white hover:bg-gray-700 px-3 py-2 rounded-lg font-medium transition-colors">
                    <Globe className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 公司地址 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <MapPin className="w-4 h-4 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">公司地址</div>
                    <div className="text-sm text-gray-900 dark:text-white leading-relaxed">
                      {contactInfo.address}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-2">
                  <button onClick={handleMapClick} className="bg-red-600 text-white hover:bg-red-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1">
                    <Navigation className="w-4 h-4" />
                    <span></span>
                  </button>
                  <button onClick={handleAddressCopy} className="bg-gray-600 text-white hover:bg-gray-700 px-3 py-2 rounded-lg font-medium transition-colors">
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 在线客服 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">在线客服</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{contactInfo.emergencySupport}</div>
                  </div>
                </div>
                <button onClick={() => {toast({ title: '在线客服', description: '客服功能正在开发中，请暂时使用电话联系', duration: 3000 });}} className="bg-green-600 text-white hover:bg-green-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {menuItems.map((item, index) => <div key={index} onClick={item.onClick} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>)}
        </div>

        {/* 退出登录 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <button onClick={handleLogout} disabled={isLoading} className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 transition-colors disabled:opacity-50">
            <LogOut className="w-5 h-5" />
            <span>{isLoading ? '退出中...' : '退出登录'}</span>
          </button>
        </div>
      </div>

      <TabBar currentPage={activeTab} onPageChange={handleTabChange} />
    </div>;}