import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const ParkingDetailScreen = ({ navigation, route }) => {
  const { parkingArea } = route.params;
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegisterParking = () => {
    setIsRegistering(true);
    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false);
      navigation.navigate('PaymentSuccess', { 
        title: 'Đăng ký thành công',
        message: `Bạn đã đăng ký gửi xe tại ${parkingArea.name} thành công.`,
        buttonText: 'Xem lịch sử gửi xe',
        nextScreen: 'ParkingHistory'
      });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết bãi đỗ xe</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.parkingInfoCard}>
          <View style={styles.parkingHeader}>
            <View style={styles.parkingIconContainer}>
              <FontAwesome5 name="parking" size={24} color="#1565C0" />
            </View>
            <View style={styles.parkingTextContainer}>
              <Text style={styles.parkingName}>{parkingArea.name}</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusIndicator, {
                  backgroundColor: parkingArea.available < 15 ? '#F44336' :
                    parkingArea.available < 30 ? '#FF9800' : '#4CAF50'
                }]} />
                <Text style={styles.parkingStatus}>
                  {parkingArea.available} / {parkingArea.total} chỗ trống
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.parkingStatusBar}>
            <View
              style={[
                styles.parkingStatusFill,
                {
                  width: `${Math.round((parkingArea.available / parkingArea.total) * 100)}%`,
                  backgroundColor: parkingArea.available < 15 ? '#F44336' :
                    parkingArea.available < 30 ? '#FF9800' : '#4CAF50'
                }
              ]}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin bãi đỗ</Text>
          <View style={styles.infoItem}>
            <MaterialIcons name="location-on" size={20} color="#1565C0" style={styles.infoIcon} />
            <Text style={styles.infoText}>Khu vực: {parkingArea.location || 'Khu A - Trường Đại học'}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="access-time" size={20} color="#1565C0" style={styles.infoIcon} />
            <Text style={styles.infoText}>Giờ mở cửa: 06:00 - 22:00</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="motorcycle" size={20} color="#1565C0" style={styles.infoIcon} />
            <Text style={styles.infoText}>Loại xe: Xe máy, Xe đạp</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="attach-money" size={20} color="#1565C0" style={styles.infoIcon} />
            <Text style={styles.infoText}>Phí gửi xe: 5.000đ / lượt</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quy định</Text>
          <View style={styles.ruleItem}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.ruleIcon} />
            <Text style={styles.ruleText}>Xuất trình thẻ sinh viên khi gửi và lấy xe</Text>
          </View>
          <View style={styles.ruleItem}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.ruleIcon} />
            <Text style={styles.ruleText}>Giữ phiếu gửi xe cẩn thận, không làm mất</Text>
          </View>
          <View style={styles.ruleItem}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" style={styles.ruleIcon} />
            <Text style={styles.ruleText}>Không để tài sản có giá trị trên xe</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.registerButton, isRegistering && styles.registeringButton]}
          onPress={handleRegisterParking}
          disabled={isRegistering}
        >
          <Text style={styles.registerButtonText}>
            {isRegistering ? 'Đang đăng ký...' : 'Đăng ký gửi xe'}
          </Text>
        </TouchableOpacity>
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
  parkingInfoCard: {
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
  parkingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  parkingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  parkingTextContainer: {
    flex: 1,
  },
  parkingName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  parkingStatus: {
    fontSize: 14,
    color: '#757575',
  },
  parkingStatusBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  parkingStatusFill: {
    height: '100%',
    borderRadius: 3,
  },
  section: {
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ruleIcon: {
    marginRight: 12,
  },
  ruleText: {
    fontSize: 14,
    color: '#424242',
    flex: 1,
  },
  registerButton: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  registeringButton: {
    backgroundColor: '#90CAF9',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ParkingDetailScreen;