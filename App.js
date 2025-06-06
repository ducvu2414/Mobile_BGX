import React, { useState, useMemo } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { persistor } from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  const parkingAreas = useMemo(() => [
    { id: 1, name: 'Bãi A - Khu giảng đường', total: 120, available: 15, isReserved: false },
    { id: 2, name: 'Bãi B - Thư viện', total: 150, available: 42, isReserved: true },
    { id: 3, name: 'Bãi C - Ký túc xá', total: 200, available: 8, isReserved: false },
    { id: 4, name: 'Bãi D - Nhà thi đấu', total: 180, available: 85, isReserved: false }
  ], []);

  const studentInfo = useMemo(() => ({
    id: 'SV123456',
    name: 'Nguyễn Văn A',
    class: 'DHKT',
    hasParking: true
  }), []);

  const promotions = useMemo(() => [
    {
      id: 1,
      title: 'Gói đỗ xe máy học kỳ mới',
      description: 'Đăng ký gói học kỳ và tiết kiệm 20% chi phí',
      color: '#E3F2FD',
      icon: 'local-offer',
      iconColor: '#1565C0'
    },
    {
      id: 2,
      title: 'Gửi xe có mái che',
      description: 'Thêm 5.000đ/tháng cho vị trí có mái che chống nắng mưa',
      color: '#FFF3E0',
      icon: 'beach-access',
      iconColor: '#FF9800'
    },
    {
      id: 3,
      title: 'Vị trí ưu tiên',
      description: 'Đỗ xe máy ở vị trí gần cổng ra vào',
      color: '#E8F5E9',
      icon: 'verified',
      iconColor: '#4CAF50'
    },
  ], []);

  const announcements = useMemo(() => [
    {
      id: 1,
      title: 'Quy định đeo thẻ gửi xe',
      date: '15/03/2025',
      description: 'Từ ngày 01/04/2025, tất cả xe máy khi vào trường bắt buộc phải dán thẻ định danh. Liên hệ phòng Bảo vệ để đăng ký...',
      color: '#E3F2FD',
      icon: 'campaign',
      iconColor: '#1565C0'
    },
    {
      id: 2,
      title: 'Tu sửa bãi xe máy khu C',
      date: '10/03/2025',
      description: 'Bãi đỗ xe máy khu C sẽ đóng cửa để lắp thêm mái che từ ngày 20/03 đến 25/03/2025. Trong thời gian này, sinh viên có thể gửi xe tại khu B.',
      color: '#FFF9C4',
      icon: 'warning',
      iconColor: '#FFC107'
    },
    {
      id: 3,
      title: 'Chương trình kiểm tra xe',
      date: '05/03/2025',
      description: 'Trường phối hợp với Cảnh sát giao thông tổ chức kiểm tra xe miễn phí vào ngày 15/03/2025. Các bạn sinh viên mang theo giấy tờ xe.',
      color: '#E8F5E9',
      icon: 'event',
      iconColor: '#4CAF50'
    }
  ], []);

  const walletInfo = useMemo(() => ({
    balance: 250000,
    pendingTopup: false,
    transactions: [
      {
        id: 1,
        type: 'expense',
        amount: 5000,
        description: 'Phí gửi xe ngày 09/03/2025',
        date: '09/03/2025',
        time: '08:15'
      },
      {
        id: 2,
        type: 'topup',
        amount: 100000,
        description: 'Nạp tiền qua MoMo',
        date: '05/03/2025',
        time: '14:30'
      },
      {
        id: 3,
        type: 'expense',
        amount: 25000,
        description: 'Phí gửi xe tuần (01/03 - 05/03)',
        date: '01/03/2025',
        time: '07:45'
      },
      {
        id: 4,
        type: 'topup',
        amount: 150000,
        description: 'Nạp tiền qua ngân hàng',
        date: '28/02/2025',
        time: '16:20'
      }
    ]
  }), []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
          <AppNavigator
            promotions={promotions}
            announcements={announcements}
            parkingAreas={parkingAreas}
          />
          <Toast />
        </>
      </PersistGate>
    </Provider>
  );
};

export default App;
