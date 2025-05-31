import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Header from '../components/Header';
import FeatureGrid from '../components/FeatureGrid';

const { width } = Dimensions.get('window');

const HomePage = ({ navigation, studentInfo, walletInfo, promotions, announcements, parkingAreas }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleRegisterParking = useCallback(() => {
    navigation.navigate('ParkingHistory');
  }, [navigation]);

  // Tối ưu navigation calls
  const handleFeaturePress = useCallback((featureId) => {
    switch (featureId) {
      case 'membership':
        navigation.navigate('Membership');
        break;
      case 'parking-history':
        navigation.navigate('ParkingHistory');
        break;
      case 'wallet':
        navigation.navigate('Wallet');
        break;
      case 'support':
        navigation.navigate('Profile', { screen: 'Help' });
        break;
      default:
        console.warn(`Unknown feature: ${featureId}`);
    }
  }, [navigation]);

  // Wallet actions - navigate đến màn hình chung
  const handleWalletAction = useCallback((action) => {
    switch (action) {
      case 'topup':
        navigation.navigate('TopUp');
        break;
      case 'payment':
        navigation.navigate('Payment');
        break;
      case 'withdraw':
        navigation.navigate('Withdraw');
        break;
      case 'history':
        navigation.navigate('TransactionHistory');
        break;
      default:
        navigation.navigate('Wallet');
    }
  }, [navigation]);

  const formatCurrency = useCallback((amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
  }, []);

  const renderParkingArea = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.parkingItem}
      onPress={() => navigation.navigate('ParkingDetail', { parkingArea: item })}
    >
      <View style={styles.parkingInfo}>
        <View style={styles.parkingIconContainer}>
          <FontAwesome5 name="parking" size={20} color="#1565C0" />
        </View>
        <View style={styles.parkingTextContainer}>
          <Text style={styles.parkingName}>{item.name}</Text>
          <Text style={styles.parkingStatus}>
            {item.available} / {item.total} chỗ trống
          </Text>
        </View>
      </View>
      <View style={styles.parkingStatusBar}>
        <View
          style={[
            styles.parkingStatusFill,
            {
              width: `${Math.round((item.available / item.total) * 100)}%`,
              backgroundColor: item.available < 15 ? '#F44336' :
                item.available < 30 ? '#FF9800' : '#4CAF50'
            }
          ]}
        />
      </View>
    </TouchableOpacity>
  ), [navigation]);

  const renderPromotionItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={[styles.promotionCard, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('PromotionDetail', { promotion: item })}
    >
      <View style={styles.promotionIcon}>
        <MaterialIcons name={item.icon} size={24} color={item.iconColor} />
      </View>
      <Text style={styles.promotionTitle}>{item.title}</Text>
      <Text style={styles.promotionDesc}>{item.description}</Text>
    </TouchableOpacity>
  ), [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <Header
        studentInfo={studentInfo}
        onRegisterParking={handleRegisterParking}
        navigation={navigation}
      />

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Wallet Card với navigation được tối ưu */}
        <View style={styles.walletCardContainer}>
          <View style={styles.walletHeader}>
            <View style={styles.walletTitleContainer}>
              <MaterialIcons name="account-balance-wallet" size={20} color="#1565C0" />
              <Text style={styles.walletTitle}>Ví Điện Tử</Text>
            </View>
            <TouchableOpacity onPress={() => handleWalletAction('history')}>
              <Text style={styles.viewAllText}>Xem lịch sử</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Số dư hiện tại</Text>
            <Text style={styles.balanceAmount}>
              {formatCurrency(walletInfo?.balance || 0)}
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleWalletAction('topup')}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
                <MaterialIcons name="add" size={24} color="#1565C0" />
              </View>
              <Text style={styles.actionText}>Nạp tiền</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleWalletAction('payment')}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
                <MaterialIcons name="payment" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.actionText}>Thanh toán</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleWalletAction('withdraw')}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
                <MaterialIcons name="account-balance-wallet" size={24} color="#FF9800" />
              </View>
              <Text style={styles.actionText}>Rút tiền</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FeatureGrid onFeaturePress={handleFeaturePress} />

        {/* Parking Areas Section */}
        {parkingAreas?.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trạng thái bãi đỗ xe</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ParkingMap')}>
                <Text style={styles.viewAllText}>Xem bản đồ</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={parkingAreas}
              renderItem={renderParkingArea}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {/* Promotions Section */}
        {promotions?.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Khuyến mãi</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Promotions')}>
                <Text style={styles.viewAllText}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={promotions}
              renderItem={renderPromotionItem}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.promotionList}
            />
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  viewAllText: {
    fontSize: 14,
    color: '#1565C0',
    fontWeight: '500',
  },
  parkingItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  parkingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  parkingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  parkingTextContainer: {
    flex: 1,
  },
  parkingName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 4,
  },
  parkingStatus: {
    fontSize: 14,
    color: '#757575',
  },
  parkingStatusBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  parkingStatusFill: {
    height: '100%',
    borderRadius: 2,
  },
  promotionList: {
    paddingRight: 16,
  },
  promotionCard: {
    width: width * 0.7,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  promotionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  promotionDesc: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  walletCardContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  walletTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginLeft: 8,
  },
  balanceContainer: {
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    width: '30%',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#424242',
    textAlign: 'center',
  },
});

export default HomePage;