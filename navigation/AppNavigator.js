import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { useSelector } from 'react-redux';


import HomePage from '../screens/HomePage';
import WalletScreen from '../screens/WalletScreen';
import MembershipScreen from '../screens/MembershipScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import TopUpScreen from '../screens/TopUpScreen';
import WithdrawScreen from '../screens/WithdrawScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import PaymentMethodDetailScreen from '../screens/PaymentMethodDetailScreen';
import AddPaymentMethodScreen from '../screens/AddPaymentMethodScreen';
import WalletSettingsScreen from '../screens/WalletSettingsScreen';
import ChangePinScreen from '../screens/ChangePinScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AppSettingsScreen from '../screens/AppSettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import AboutScreen from '../screens/AboutScreen';
import LoginScreen from '../screens/LoginScreen';
import ParkingHistoryScreen from '../screens/ParkingHistoryScreen';
import ParkingHistoryDetailScreen from '../screens/ParkingHistoryDetailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import PromotionsScreen from '../screens/PromotionsScreen';
import PromotionDetailScreen from '../screens/PromotionDetailScreen';
import ParkingDetailScreen from '../screens/ParkingDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Utility function để tạo reset listener cho tabs
const createTabResetListener = (tabName, mainScreenName) => {
  return ({ navigation, route }) => ({
    tabPress: e => {
      const isFocused = navigation.isFocused();
      const currentRoute = route?.state?.routes?.[route.state.index]?.name;

      if (isFocused && currentRoute !== mainScreenName) {
        e.preventDefault();
        navigation.navigate(tabName, { screen: mainScreenName });
      }
    },
  });
};

// Placeholder screens cho development
const ParkingMapScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Bản đồ đỗ xe</Text>
  </View>
);

// Home Stack Navigator - chỉ chứa các màn hình riêng của Home
const HomeStackNavigator = ({ studentInfo, walletInfo, promotions, announcements, parkingAreas }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" options={{ headerShown: false }}>
        {props => (
          <HomePage
            {...props}
            walletInfo={walletInfo}
            promotions={promotions}
            announcements={announcements}
            parkingAreas={parkingAreas}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Membership" component={MembershipScreen} />
      <Stack.Screen name="ParkingHistory" component={ParkingHistoryScreen} />
      <Stack.Screen name="Promotions" component={PromotionsScreen} />
      <Stack.Screen name="PromotionDetail" component={PromotionDetailScreen} />
      <Stack.Screen name="ParkingDetail" component={ParkingDetailScreen} />
    </Stack.Navigator>
  );
};

// Wallet Stack Navigator - chỉ chứa màn hình chính của Wallet
const WalletStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WalletMain" component={WalletScreen} />
      <Stack.Screen name="WalletSettings" component={WalletSettingsScreen} />
    </Stack.Navigator>
  );
};

// Profile Stack Navigator - chỉ chứa các màn hình riêng của Profile
const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="AppSettings" component={AppSettingsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

// Tab Navigator
const TabNavigator = ({ promotions, announcements, parkingAreas }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Wallet':
              iconName = 'account-balance-wallet';
              break;
            case 'Notifications':
              iconName = 'notifications';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1565C0',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ tabBarLabel: 'Trang chủ' }}
        listeners={createTabResetListener('Home', 'HomeMain')}
      >
        {props => (
          <HomeStackNavigator
            {...props}
            promotions={promotions}
            announcements={announcements}
            parkingAreas={parkingAreas}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Wallet"
        component={WalletStackNavigator}
        options={{ tabBarLabel: 'Ví' }}
        listeners={createTabResetListener('Wallet', 'WalletMain')}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarLabel: 'Thông báo' }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ tabBarLabel: 'Tài khoản' }}
        listeners={createTabResetListener('Profile', 'ProfileMain')}
      />
    </Tab.Navigator>
  );
};

// Main App Navigator - chứa tất cả màn hình chung và luồng chính
const AppNavigator = ({ promotions, announcements, parkingAreas }) => {
  const isLoggedIn = useSelector(state => state.user.isAuthenticated);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
      >
        {/* Nếu chưa đăng nhập => hiển thị Auth screens */}
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          </>
        ) : (
          <>
            {/* Main App sau khi đăng nhập */}
            <Stack.Screen name="Main">
              {props => (
                <TabNavigator
                  {...props}
                  promotions={promotions}
                  announcements={announcements}
                  parkingAreas={parkingAreas}
                />
              )}
            </Stack.Screen>

            {/* Các màn hình dùng chung */}
            <Stack.Screen
              name="PaymentMethods"
              component={PaymentMethodsScreen}
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen name="PaymentMethodDetail" component={PaymentMethodDetailScreen} />
            <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
            <Stack.Screen name="ChangePin" component={ChangePinScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen
              name="PaymentSuccess"
              component={PaymentSuccessScreen}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen name="TopUp" component={TopUpScreen} />
            <Stack.Screen name="Withdraw" component={WithdrawScreen} />
            <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
            <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
            <Stack.Screen name="ParkingMap" component={ParkingMapScreen} />
            <Stack.Screen name="ParkingHistoryDetail" component={ParkingHistoryDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;