import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Linking
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const AboutScreen = ({ navigation }) => {
  const appVersion = '1.0.0';
  const buildNumber = '100';
  const releaseDate = '15/03/2025';
  
  const handleOpenWebsite = () => {
    Linking.openURL('https://quanlybaidoxe.com').catch(err => {
      console.error('Không thể mở trang web', err);
    });
  };

  const handleOpenPrivacyPolicy = () => {
    Linking.openURL('https://quanlybaidoxe.com/privacy-policy').catch(err => {
      console.error('Không thể mở trang web', err);
    });
  };

  const handleOpenTerms = () => {
    Linking.openURL('https://quanlybaidoxe.com/terms-of-service').catch(err => {
      console.error('Không thể mở trang web', err);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Về ứng dụng</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <MaterialIcons name="directions-car" size={60} color="#1565C0" />
          </View>
          <Text style={styles.appName}>Quản Lý Bãi Đỗ Xe</Text>
          <Text style={styles.appVersion}>Phiên bản {appVersion} (Build {buildNumber})</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giới thiệu</Text>
          <Text style={styles.sectionContent}>
            Ứng dụng Quản Lý Bãi Đỗ Xe được phát triển nhằm giúp sinh viên và cán bộ trường đại học dễ dàng quản lý việc đỗ xe, thanh toán phí gửi xe và đăng ký các gói thành viên một cách thuận tiện.
          </Text>
          <Text style={styles.sectionContent}>
            Với giao diện thân thiện và dễ sử dụng, ứng dụng cung cấp các tính năng như xem bản đồ bãi đỗ xe, thanh toán trực tuyến, quản lý ví điện tử và nhiều tiện ích khác.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin phát triển</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phát triển bởi:</Text>
            <Text style={styles.infoValue}>Đội ngũ phát triển XYZ</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Ngày phát hành:</Text>
            <Text style={styles.infoValue}>{releaseDate}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Liên hệ:</Text>
            <Text style={styles.infoValue}>support@quanlybaidoxe.com</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tính năng chính</Text>
          <View style={styles.featureItem}>
            <MaterialIcons name="map" size={24} color="#1565C0" />
            <Text style={styles.featureText}>Bản đồ bãi đỗ xe trực quan</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="payment" size={24} color="#1565C0" />
            <Text style={styles.featureText}>Thanh toán trực tuyến an toàn</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="account-balance-wallet" size={24} color="#1565C0" />
            <Text style={styles.featureText}>Quản lý ví điện tử</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="history" size={24} color="#1565C0" />
            <Text style={styles.featureText}>Lịch sử đỗ xe và giao dịch</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="notifications" size={24} color="#1565C0" />
            <Text style={styles.featureText}>Thông báo thông minh</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="card-membership" size={24} color="#1565C0" />
            <Text style={styles.featureText}>Đăng ký gói thành viên</Text>
          </View>
        </View>

        <View style={styles.linksSection}>
          <TouchableOpacity style={styles.linkButton} onPress={handleOpenWebsite}>
            <MaterialIcons name="language" size={20} color="#1565C0" />
            <Text style={styles.linkText}>Trang web chính thức</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkButton} onPress={handleOpenPrivacyPolicy}>
            <MaterialIcons name="security" size={20} color="#1565C0" />
            <Text style={styles.linkText}>Chính sách bảo mật</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkButton} onPress={handleOpenTerms}>
            <MaterialIcons name="description" size={20} color="#1565C0" />
            <Text style={styles.linkText}>Điều khoản sử dụng</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.creditsSection}>
          <Text style={styles.creditsText}>© 2025 Quản Lý Bãi Đỗ Xe. Tất cả các quyền được bảo lưu.</Text>
        </View>
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
  logoContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 14,
    color: '#757575',
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
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#757575',
    width: 120,
  },
  infoValue: {
    fontSize: 14,
    color: '#212121',
    flex: 1,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#424242',
    marginLeft: 12,
  },
  linksSection: {
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
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  linkText: {
    fontSize: 14,
    color: '#1565C0',
    marginLeft: 12,
  },
  creditsSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  creditsText: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'center',
  },
});

export default AboutScreen;