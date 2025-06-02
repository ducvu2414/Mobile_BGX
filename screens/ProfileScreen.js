import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    ScrollView
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const ProfileScreen = ({ navigation }) => {
    const user = useSelector(state => state.user);
    console.log("User: ", user.userData.userData);

    const userInfo = user.userData.userData || {
        userCode: '',
        name: '',
        phoneNumber: '',
        email: '',
        gender: true,
        dateOfBirth: '',
        address: '',
        role: '',
        balance: 0
    };

    const menuItems = [
        {
            id: 'personal',
            title: 'Thông tin cá nhân',
            icon: 'person',
            color: '#1565C0',
            screen: 'EditProfile'
        },
        {
            id: 'payment',
            title: 'Phương thức thanh toán',
            icon: 'credit-card',
            color: '#F44336',
            screen: 'PaymentMethods'
        },
        {
            id: 'settings',
            title: 'Cài đặt',
            icon: 'settings',
            color: '#FF9800',
            screen: 'AppSettings'
        },
        {
            id: 'help',
            title: 'Trợ giúp & Hỗ trợ',
            icon: 'help',
            color: '#9C27B0',
            screen: 'Help'
        },
        {
            id: 'about',
            title: 'Về ứng dụng',
            icon: 'info',
            color: '#607D8B',
            screen: 'About'
        },
        {
            id: 'parking-history',
            title: 'Lịch sử ra vào',
            icon: 'history',
            color: '#4CAF50',
            screen: 'ParkingHistory'
        },
        {
            id: 'change-pin',
            title: 'Đổi mã PIN',
            icon: 'dialpad',
            color: '#009688',
            screen: 'ChangePin'
        },
        {
            id: 'change-password',
            title: 'Đổi mật khẩu',
            icon: 'lock',
            color: '#FF5722',
            screen: 'ChangePassword'
        }
    ];

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tài khoản</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                    <Ionicons name="notifications-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        {userInfo.avatar ? (
                            <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}>
                                    {userInfo.name ? userInfo.name.charAt(0) : 'U'}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>{userInfo.name}</Text>
                        <Text style={styles.userDetail}>Mã người dùng: {userInfo.userCode}</Text>
                        <Text style={styles.userDetail}>Vai trò: {userInfo.role}</Text>
                        <Text style={styles.userDetail}>Số dư: {userInfo.balance} VNĐ</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <MaterialIcons name="edit" size={20} color="#1565C0" />
                    </TouchableOpacity>
                </View>

                <View style={styles.userDetailsCard}>
                    <Text style={styles.sectionTitle}>Thông tin chi tiết</Text>

                    <View style={styles.detailItem}>
                        <MaterialIcons name="email" size={20} color="#1565C0" />
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Email</Text>
                            <Text style={styles.detailValue}>{userInfo.email}</Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <MaterialIcons name="phone" size={20} color="#1565C0" />
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Số điện thoại</Text>
                            <Text style={styles.detailValue}>{userInfo.phoneNumber}</Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <MaterialIcons name="person" size={20} color="#1565C0" />
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Giới tính</Text>
                            <Text style={styles.detailValue}>{userInfo.gender ? 'Nam' : 'Nữ'}</Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <MaterialIcons name="cake" size={20} color="#1565C0" />
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Ngày sinh</Text>
                            <Text style={styles.detailValue}>
                                {new Date(userInfo.dateOfBirth).toLocaleDateString('vi-VN')}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.detailItem}>
                        <MaterialIcons name="location-on" size={20} color="#1565C0" />
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Địa chỉ</Text>
                            <Text style={styles.detailValue}>{userInfo.address}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            onPress={() => navigation.navigate(item.screen)}
                        >
                            <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                                <MaterialIcons name={item.icon} size={24} color={item.color} />
                            </View>
                            <View style={styles.menuInfo}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <MaterialIcons name="logout" size={20} color="#F44336" />
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                </TouchableOpacity>

                <View style={styles.versionInfo}>
                    <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
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
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    content: {
        flex: 1,
    },
    profileCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        margin: 16,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    avatarContainer: {
        marginRight: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    avatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1565C0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 4,
    },
    userDetail: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 2,
    },
    editButton: {
        padding: 8,
    },
    userDetailsCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        margin: 16,
        marginTop: 0,
        marginBottom: 8,
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
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    detailContent: {
        marginLeft: 12,
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        color: '#757575',
    },
    detailValue: {
        fontSize: 14,
        color: '#212121',
        marginTop: 2,
    },
    menuContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        margin: 16,
        marginTop: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuInfo: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        color: '#212121',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        margin: 16,
        marginTop: 8,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    logoutText: {
        color: '#F44336',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    versionInfo: {
        alignItems: 'center',
        padding: 16,
    },
    versionText: {
        color: '#9E9E9E',
        fontSize: 14,
    },
});

export default ProfileScreen;