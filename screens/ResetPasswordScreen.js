import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    TextInput,
    ScrollView,
    Alert
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const ResetPasswordScreen = ({ route, navigation }) => {
    const { email } = route.params;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleResetPassword = () => {
        if (!newPassword.trim()) {
            Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu mới');
            return;
        }

        if (!confirmPassword.trim()) {
            Alert.alert('Thông báo', 'Vui lòng xác nhận mật khẩu mới');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Thông báo', 'Mật khẩu xác nhận không khớp');
            return;
        }

        // Trong ứng dụng thực tế, bạn sẽ gửi yêu cầu đặt lại mật khẩu đến server
        // Ở đây chúng ta giả định đã đặt lại thành công
        Alert.alert(
            'Thành công',
            'Mật khẩu của bạn đã được đặt lại thành công.',
            [
                {
                    text: 'Đăng nhập',
                    onPress: () => navigation.navigate('Login')
                }
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
                <Text style={styles.headerTitle}>Đặt lại mật khẩu</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.title}>Tạo mật khẩu mới</Text>
                    <Text style={styles.description}>
                        Vui lòng tạo mật khẩu mới cho tài khoản của bạn.
                    </Text>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={24} color="#1565C0" style={styles.inputIcon} />
                        <View style={styles.textInputContainer}>
                            <Text style={styles.inputLabel}>Mật khẩu mới</Text>
                            <View style={styles.textInputWrapper}>
                                <TextInput
                                    style={styles.textInput}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    placeholder="Nhập mật khẩu mới"
                                    secureTextEntry={!showNewPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    style={styles.passwordToggle}
                                    onPress={() => setShowNewPassword(!showNewPassword)}
                                >
                                    <MaterialIcons
                                        name={showNewPassword ? "visibility" : "visibility-off"}
                                        size={24}
                                        color="#757575"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={24} color="#1565C0" style={styles.inputIcon} />
                        <View style={styles.textInputContainer}>
                            <Text style={styles.inputLabel}>Xác nhận mật khẩu</Text>
                            <View style={styles.textInputWrapper}>
                                <TextInput
                                    style={styles.textInput}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    placeholder="Nhập lại mật khẩu mới"
                                    secureTextEntry={!showConfirmPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    style={styles.passwordToggle}
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <MaterialIcons
                                        name={showConfirmPassword ? "visibility" : "visibility-off"}
                                        size={24}
                                        color="#757575"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={handleResetPassword}
                    >
                        <Text style={styles.resetButtonText}>ĐẶT LẠI MẬT KHẨU</Text>
                    </TouchableOpacity>
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
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        marginVertical: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 16,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    inputIcon: {
        marginRight: 12,
    },
    textInputContainer: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 4,
    },
    textInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    textInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#212121',
        paddingVertical: 8,
    },
    passwordToggle: {
        padding: 8,
    },
    resetButton: {
        backgroundColor: '#1565C0',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default ResetPasswordScreen;