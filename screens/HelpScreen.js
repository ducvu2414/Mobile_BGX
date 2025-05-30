import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Linking,
    Alert
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const HelpScreen = ({ navigation }) => {
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (sectionId) => {
        if (expandedSection === sectionId) {
            setExpandedSection(null);
        } else {
            setExpandedSection(sectionId);
        }
    };

    const faqData = [
        {
            id: 'faq1',
            question: 'Làm thế nào để đăng ký đỗ xe?',
            answer: 'Để đăng ký đỗ xe, bạn cần đăng nhập vào ứng dụng, chọn "Đăng ký đỗ xe" từ màn hình chính, sau đó làm theo các hướng dẫn để hoàn tất quá trình đăng ký.'
        },
        {
            id: 'faq2',
            question: 'Làm thế nào để nạp tiền vào ví?',
            answer: 'Để nạp tiền vào ví, bạn cần vào mục "Ví" từ thanh điều hướng phía dưới, sau đó chọn "Nạp tiền" và làm theo hướng dẫn để hoàn tất giao dịch.'
        },
        {
            id: 'faq3',
            question: 'Làm thế nào để đăng ký gói thành viên?',
            answer: 'Để đăng ký gói thành viên, bạn cần vào mục "Gói thành viên" từ màn hình chính, chọn gói phù hợp và làm theo hướng dẫn để hoàn tất thanh toán.'
        },
        {
            id: 'faq4',
            question: 'Làm thế nào để xem lịch sử giao dịch?',
            answer: 'Để xem lịch sử giao dịch, bạn cần vào mục "Ví" từ thanh điều hướng phía dưới, sau đó chọn "Lịch sử giao dịch" để xem chi tiết các giao dịch đã thực hiện.'
        },
        {
            id: 'faq5',
            question: 'Làm thế nào để thay đổi thông tin cá nhân?',
            answer: 'Để thay đổi thông tin cá nhân, bạn cần vào mục "Tài khoản" từ thanh điều hướng phía dưới, sau đó chọn "Thông tin cá nhân" và nhấn vào biểu tượng chỉnh sửa để cập nhật thông tin.'
        }
    ];

    const supportChannels = [
        {
            id: 'phone',
            title: 'Hotline',
            value: '1900 1234',
            icon: 'phone',
            color: '#4CAF50',
            action: () => {
                Linking.openURL('tel:19001234').catch(err => {
                    Alert.alert('Không thể thực hiện cuộc gọi', 'Vui lòng thử lại sau.');
                });
            }
        },
        {
            id: 'email',
            title: 'Email',
            value: 'support@quanlybaidoxe.com',
            icon: 'email',
            color: '#2196F3',
            action: () => {
                Linking.openURL('mailto:support@quanlybaidoxe.com').catch(err => {
                    Alert.alert('Không thể mở ứng dụng email', 'Vui lòng thử lại sau.');
                });
            }
        },
        {
            id: 'chat',
            title: 'Chat trực tuyến',
            value: 'Hỗ trợ 24/7',
            icon: 'chat',
            color: '#FF9800',
            action: () => {
                Alert.alert('Thông báo', 'Tính năng chat trực tuyến đang được phát triển.');
            }
        },
        {
            id: 'facebook',
            title: 'Facebook',
            value: 'Quản lý bãi đỗ xe',
            icon: 'facebook',
            color: '#1565C0',
            action: () => {
                Linking.openURL('https://www.facebook.com/quanlybaidoxe').catch(err => {
                    Alert.alert('Không thể mở trình duyệt', 'Vui lòng thử lại sau.');
                });
            }
        }
    ];

    const helpTopics = [
        {
            id: 'account',
            title: 'Tài khoản & Đăng nhập',
            icon: 'person',
            color: '#1565C0'
        },
        {
            id: 'payment',
            title: 'Thanh toán & Giao dịch',
            icon: 'payment',
            color: '#F44336'
        },
        {
            id: 'parking',
            title: 'Đăng ký đỗ xe',
            icon: 'directions-car',
            color: '#4CAF50'
        },
        {
            id: 'membership',
            title: 'Gói thành viên',
            icon: 'card-membership',
            color: '#FF9800'
        },
        {
            id: 'technical',
            title: 'Vấn đề kỹ thuật',
            icon: 'build',
            color: '#9C27B0'
        },
        {
            id: 'other',
            title: 'Vấn đề khác',
            icon: 'help',
            color: '#607D8B'
        }
    ];

    const handleHelpTopicPress = (topicId) => {
        // Xử lý khi người dùng chọn một chủ đề trợ giúp
        Alert.alert('Thông báo', `Bạn đã chọn chủ đề: ${helpTopics.find(topic => topic.id === topicId).title}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Trợ giúp & Hỗ trợ</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bạn cần hỗ trợ về vấn đề gì?</Text>
                    <View style={styles.topicsGrid}>
                        {helpTopics.map((topic) => (
                            <TouchableOpacity
                                key={topic.id}
                                style={styles.topicItem}
                                onPress={() => handleHelpTopicPress(topic.id)}
                            >
                                <View style={[styles.topicIcon, { backgroundColor: topic.color + '20' }]}>
                                    <MaterialIcons name={topic.icon} size={24} color={topic.color} />
                                </View>
                                <Text style={styles.topicTitle}>{topic.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>
                    {faqData.map((faq) => (
                        <TouchableOpacity
                            key={faq.id}
                            style={styles.faqItem}
                            onPress={() => toggleSection(faq.id)}
                        >
                            <View style={styles.faqHeader}>
                                <Text style={styles.faqQuestion}>{faq.question}</Text>
                                <MaterialIcons
                                    name={expandedSection === faq.id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                    size={24}
                                    color="#757575"
                                />
                            </View>
                            {expandedSection === faq.id && (
                                <Text style={styles.faqAnswer}>{faq.answer}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Liên hệ với chúng tôi</Text>
                    {supportChannels.map((channel) => (
                        <TouchableOpacity
                            key={channel.id}
                            style={styles.contactItem}
                            onPress={channel.action}
                        >
                            <View style={[styles.contactIcon, { backgroundColor: channel.color + '20' }]}>
                                <MaterialIcons name={channel.icon} size={24} color={channel.color} />
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactTitle}>{channel.title}</Text>
                                <Text style={styles.contactValue}>{channel.value}</Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.feedbackSection}>
                    <Text style={styles.feedbackTitle}>Phản hồi của bạn giúp chúng tôi cải thiện dịch vụ</Text>
                    <TouchableOpacity
                        style={styles.feedbackButton}
                        onPress={() => Alert.alert('Thông báo', 'Tính năng gửi phản hồi đang được phát triển.')}
                    >
                        <Text style={styles.feedbackButtonText}>Gửi phản hồi</Text>
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
    topicsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    topicItem: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    topicIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    topicTitle: {
        fontSize: 14,
        color: '#212121',
        textAlign: 'center',
    },
    faqItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        paddingVertical: 12,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontSize: 14,
        color: '#212121',
        fontWeight: '500',
        flex: 1,
    },
    faqAnswer: {
        fontSize: 14,
        color: '#757575',
        marginTop: 8,
        lineHeight: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    contactIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    contactInfo: {
        flex: 1,
    },
    contactTitle: {
        fontSize: 14,
        color: '#212121',
        fontWeight: '500',
    },
    contactValue: {
        fontSize: 14,
        color: '#757575',
        marginTop: 2,
    },
    feedbackSection: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    feedbackTitle: {
        fontSize: 14,
        color: '#212121',
        textAlign: 'center',
        marginBottom: 16,
    },
    feedbackButton: {
        backgroundColor: '#1565C0',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    feedbackButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default HelpScreen;