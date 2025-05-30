import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Share,
  Alert
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const ParkingHistoryDetailScreen = ({ route, navigation }) => {
  const { parkingRecord } = route.params;

  // Format số tiền VNĐ
  const formatCurrency = (amount) => {
    if (amount === null) return 'Chưa tính';
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
  };

  // Hiển thị biểu tượng cho loại phương tiện
  const getVehicleIcon = (type) => {
    switch (type) {
      case 'motorcycle':
        return <FontAwesome5 name="motorcycle" size={24} color="#1565C0" />;
      case 'car':
        return <FontAwesome5 name="car" size={24} color="#1565C0" />;
      case 'bicycle':
        return <FontAwesome5 name="bicycle" size={24} color="#1565C0" />;
      default:
        return <FontAwesome5 name="motorcycle" size={24} color="#1565C0" />;
    }
  };

  // Hiển thị màu cho trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'ongoing':
        return '#2196F3';
      default:
        return '#9E9E9E';
    }
  };

  // Hiển thị text cho trạng thái
  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Đã hoàn thành';
      case 'ongoing':
        return 'Đang đỗ xe';
      default:
        return 'Không xác định';
    }
  };

  // Chia sẻ thông tin giao dịch
  const handleShare = async () => {
    try {
      const message = `
        Thông tin đỗ xe:
        Biển số: ${parkingRecord.vehicleNumber}
        Bãi đỗ: ${parkingRecord.parkingArea}
        Thời gian vào: ${parkingRecord.entryTime} ${parkingRecord.entryDate}
        ${parkingRecord.exitTime ? `Thời gian ra: ${parkingRecord.exitTime} ${parkingRecord.exitDate}` : ''}
        ${parkingRecord.duration ? `Thời gian đỗ: ${parkingRecord.duration}` : ''}
        ${parkingRecord.fee ? `Phí đỗ xe: ${formatCurrency(parkingRecord.fee)}` : ''}
      `;
      
      await Share.share({
        message,
        title: 'Thông tin đỗ xe',
      });
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chia sẻ thông tin');
    }
  };

  // Báo cáo vấn đề
  const handleReport = () => {
    Alert.alert(
      'Báo cáo vấn đề',
      'Bạn muốn báo cáo vấn đề gì với lần đỗ xe này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Thông tin không chính xác',
          onPress: () => Alert.alert('Thông báo', 'Báo cáo của bạn đã được ghi nhận. Chúng tôi sẽ xem xét và phản hồi sớm.'),
        },
        {
          text: 'Phí không chính xác',
          onPress: () => Alert.alert('Thông báo', 'Báo cáo của bạn đã được ghi nhận. Chúng tôi sẽ xem xét và phản hồi sớm.'),
        },
        {
          text: 'Vấn đề khác',
          onPress: () => Alert.alert('Thông báo', 'Báo cáo của bạn đã được ghi nhận. Chúng tôi sẽ xem xét và phản hồi sớm.'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết đỗ xe</Text>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(parkingRecord.status) }]}>
            <Text style={styles.statusText}>{getStatusText(parkingRecord.status)}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.vehicleInfo}>
              {getVehicleIcon(parkingRecord.vehicleType)}
              <Text style={styles.vehicleNumber}>{parkingRecord.vehicleNumber}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Thông tin bãi đỗ</Text>
            <View style={styles.infoRow}>
              <MaterialIcons name="location-on" size={20} color="#757575" />
              <Text style={styles.infoText}>{parkingRecord.parkingArea}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Thời gian</Text>
            <View style={styles.infoRow}>
              <MaterialIcons name="login" size={20} color="#757575" />
              <View>
                <Text style={styles.infoLabel}>Thời gian vào:</Text>
                <Text style={styles.infoText}>{parkingRecord.entryTime} - {parkingRecord.entryDate}</Text>
              </View>
            </View>
            
            {parkingRecord.exitTime && (
              <View style={styles.infoRow}>
                <MaterialIcons name="logout" size={20} color="#757575" />
                <View>
                  <Text style={styles.infoLabel}>Thời gian ra:</Text>
                  <Text style={styles.infoText}>{parkingRecord.exitTime} - {parkingRecord.exitDate}</Text>
                </View>
              </View>
            )}
            
            <View style={styles.infoRow}>
              <MaterialIcons name="timer" size={20} color="#757575" />
              <View>
                <Text style={styles.infoLabel}>Thời gian đỗ:</Text>
                <Text style={styles.infoText}>{parkingRecord.duration}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Thanh toán</Text>
            {parkingRecord.paymentMethod ? (
              <>
                <View style={styles.infoRow}>
                  <MaterialIcons name="payment" size={20} color="#757575" />
                  <View>
                    <Text style={styles.infoLabel}>Phương thức thanh toán:</Text>
                    <Text style={styles.infoText}>{parkingRecord.paymentMethod}</Text>
                  </View>
                </View>
                <View style={styles.infoRow}>
                  <MaterialIcons name="attach-money" size={20} color="#757575" />
                  <View>
                    <Text style={styles.infoLabel}>Phí đỗ xe:</Text>
                    <Text style={styles.feeText}>{formatCurrency(parkingRecord.fee)}</Text>
                  </View>
                </View>
              </>
            ) : (
              <View style={styles.infoRow}>
                <MaterialIcons name="info" size={20} color="#757575" />
                <Text style={styles.infoText}>Chưa thanh toán</Text>
              </View>
            )}
          </View>
        </View>

        {parkingRecord.status === 'completed' && (
          <TouchableOpacity style={styles.reportButton} onPress={handleReport}>
            <MaterialIcons name="report-problem" size={20} color="#F44336" />
            <Text style={styles.reportButtonText}>Báo cáo vấn đề</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#1565C0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  infoSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#212121',
    marginLeft: 12,
  },
  feeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginLeft: 12,
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F44336',
    marginBottom: 24,
  },
  reportButtonText: {
    color: '#F44336',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default ParkingHistoryDetailScreen;