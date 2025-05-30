import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

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

const WalletStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WalletMain" component={WalletScreen} />
      <Stack.Screen name="TopUp" component={TopUpScreen} />
      <Stack.Screen name="Withdraw" component={WithdrawScreen} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="PaymentMethodDetail" component={PaymentMethodDetailScreen} />
      <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
      <Stack.Screen name="WalletSettings" component={WalletSettingsScreen} />
      <Stack.Screen name="ChangePin" component={ChangePinScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="AppSettings" component={AppSettingsScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="ParkingHistory" component={ParkingHistoryScreen} />
      <Stack.Screen name="ChangePin" component={ChangePinScreen} />
    </Stack.Navigator>
  );
};

const HistoryScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Lịch sử đỗ xe</Text></View>;
const ParkingMapScreen = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Bản đồ đỗ xe</Text></View>;

// Remove the duplicate import
// import ParkingDetailScreen from '../screens/ParkingDetailScreen';

// Trong HomeStackNavigator, thêm ParkingMapScreen vào danh sách các màn hình
const HomeStackNavigator = ({ studentInfo, walletInfo, promotions, announcements, parkingAreas }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeMain"
        options={{ headerShown: false }}
      >
        {props => (
          <HomePage
            {...props}
            studentInfo={studentInfo}
            walletInfo={walletInfo}
            promotions={promotions}
            announcements={announcements}
            parkingAreas={parkingAreas}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Membership" component={MembershipScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      <Stack.Screen name="ParkingHistory" component={ParkingHistoryScreen} />
      <Stack.Screen name="ParkingHistoryDetail" component={ParkingHistoryDetailScreen} />
      <Stack.Screen name="Promotions" component={PromotionsScreen} />
      <Stack.Screen name="PromotionDetail" component={PromotionDetailScreen} />
      <Stack.Screen name="ParkingDetail" component={ParkingDetailScreen} />
      <Stack.Screen name="ParkingMap" component={ParkingMapScreen} />
    </Stack.Navigator>
  );
};
const TabNavigator = ({ studentInfo, walletInfo, promotions, announcements, parkingAreas }) => {
  const getResetListener = (tabName, mainScreenName) => {
    return ({ navigation, route }) => ({
      tabPress: e => {
        const isFocused = navigation.isFocused();

        // Nếu đang ở tab đó và không phải màn hình chính -> reset về màn chính
        const currentRoute = route?.state?.routes?.[route.state.index]?.name;

        if (isFocused && currentRoute !== mainScreenName) {
          e.preventDefault();
          navigation.navigate(tabName, {
            screen: mainScreenName,
          });
        }
      },
    });
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Wallet') {
            iconName = 'account-balance-wallet';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
          } else if (route.name === 'Profile') {
            iconName = 'person';
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
        listeners={getResetListener('Home', 'HomeMain')}
      >
        {props => (
          <HomeStackNavigator
            {...props}
            studentInfo={studentInfo}
            walletInfo={walletInfo}
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
        listeners={getResetListener('Wallet', 'WalletMain')}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarLabel: 'Thông báo' }}
      // Notifications là màn hình đơn -> không cần reset stack
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ tabBarLabel: 'Tài khoản' }}
        listeners={getResetListener('Profile', 'ProfileMain')}
      />
    </Tab.Navigator>
  );
};


const AppNavigator = ({ studentInfo, walletInfo, promotions, announcements, parkingAreas }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
        >
          {props => (
            <TabNavigator
              {...props}
              studentInfo={studentInfo}
              walletInfo={walletInfo}
              promotions={promotions}
              announcements={announcements}
              parkingAreas={parkingAreas}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="ParkingHistoryDetail" component={ParkingHistoryDetailScreen} />

        {/* Add wallet-related screens to the main stack */}
        <Stack.Screen name="TopUp" component={TopUpScreen} />
        <Stack.Screen name="Withdraw" component={WithdrawScreen} />
        <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
        <Stack.Screen name="PaymentMethodDetail" component={PaymentMethodDetailScreen} />
        <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen} />
        <Stack.Screen name="WalletSettings" component={WalletSettingsScreen} />
        <Stack.Screen name="ChangePin" component={ChangePinScreen} />
        <Stack.Screen name="ParkingMap" component={ParkingMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

