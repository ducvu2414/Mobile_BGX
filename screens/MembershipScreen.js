import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Membership data from the JSON file
const membershipData = {
    "membershipTypes": [
        {
            "id": "student",
            "name": "GÓI CHO SINH VIÊN",
            "isActive": true,
            "packages": [
                {
                    "id": "student-basic",
                    "name": "GÓI TIẾT KIỆM",
                    "isActive": true,
                    "duration": 30,
                    "durationUnit": "ngày",
                    "price": 350000,
                    "savedAmount": 50000,
                    "description": "Gói tiết kiệm dành cho sinh viên",
                    "benefits": [
                        "Tiết kiệm đến 15% phí gửi xe",
                        "Nhận được ưu đãi đặc biệt từ căn tin trường",
                        "Nhận thêm 20 điểm tích lũy SV-Points"
                    ],
                    "terms": [
                        "Gói tiết kiệm có giá trị trong thời gian 30 ngày kể từ ngày thanh toán",
                        "Chỉ áp dụng cho sinh viên có thẻ sinh viên hợp lệ",
                        "Không áp dụng cùng lúc với các gói thành viên khác",
                        "Chỉ áp dụng tại các bãi đỗ trong khuôn viên trường"
                    ],
                    "color": "#E3F2FD"
                },
                {
                    "id": "student-premium",
                    "name": "GÓI NÂNG CẤP",
                    "isActive": false,
                    "duration": 90,
                    "durationUnit": "ngày",
                    "price": 900000,
                    "savedAmount": 150000,
                    "description": "Gói nâng cấp dành cho sinh viên",
                    "benefits": [
                        "Tiết kiệm đến 20% phí gửi xe",
                        "Vị trí đỗ xe ưu tiên tại các khu vực đông đúc",
                        "Nhận được ưu đãi đặc biệt từ căn tin và thư viện trường",
                        "Nhận thêm 60 điểm tích lũy SV-Points"
                    ],
                    "terms": [
                        "Gói nâng cấp có giá trị trong thời gian 90 ngày kể từ ngày thanh toán",
                        "Chỉ áp dụng cho sinh viên có thẻ sinh viên hợp lệ",
                        "Không áp dụng cùng lúc với các gói thành viên khác",
                        "Chỉ áp dụng tại các bãi đỗ trong khuôn viên trường",
                        "Có quyền ưu tiên đỗ xe tại các khu vực đông đúc vào giờ cao điểm"
                    ],
                    "color": "#E8F5E9"
                },
                {
                    "id": "student-vip",
                    "name": "GÓI SIÊU CẤP",
                    "isActive": false,
                    "duration": 180,
                    "durationUnit": "ngày",
                    "price": 1500000,
                    "savedAmount": 350000,
                    "description": "Gói siêu cấp dành cho sinh viên",
                    "benefits": [
                        "Tiết kiệm đến 25% phí gửi xe",
                        "Vị trí đỗ xe VIP dành riêng tại tất cả khu vực",
                        "Nhận được ưu đãi đặc biệt từ tất cả các dịch vụ trong trường",
                        "Hỗ trợ tìm chỗ đỗ xe ưu tiên qua ứng dụng",
                        "Nhận thêm 150 điểm tích lũy SV-Points",
                        "Miễn phí đỗ xe ngoài giờ (sau 22:00)"
                    ],
                    "terms": [
                        "Gói siêu cấp có giá trị trong thời gian 180 ngày kể từ ngày thanh toán",
                        "Chỉ áp dụng cho sinh viên có thẻ sinh viên hợp lệ",
                        "Không áp dụng cùng lúc với các gói thành viên khác",
                        "Áp dụng tại tất cả các bãi đỗ xe trong và khu vực lân cận trường",
                        "Có quyền đỗ xe tại khu vực VIP được chỉ định"
                    ],
                    "color": "#FFF3E0"
                }
            ]
        },
        {
            "id": "teacher",
            "name": "GÓI CHO GIẢNG VIÊN",
            "isActive": false,
            "packages": [
                {
                    "id": "teacher-basic",
                    "name": "GÓI TIẾT KIỆM",
                    "isActive": true,
                    "duration": 30,
                    "durationUnit": "ngày",
                    "price": 500000,
                    "savedAmount": 100000,
                    "description": "Gói tiết kiệm dành cho giảng viên",
                    "benefits": [
                        "Tiết kiệm đến 20% phí gửi xe",
                        "Vị trí đỗ xe dành riêng tại khu vực giảng viên",
                        "Nhận được ưu đãi đặc biệt từ căn tin và thư viện trường",
                        "Nhận thêm 30 điểm tích lũy GV-Points"
                    ],
                    "terms": [
                        "Gói tiết kiệm có giá trị trong thời gian 30 ngày kể từ ngày thanh toán",
                        "Chỉ áp dụng cho giảng viên có thẻ giảng viên hợp lệ",
                        "Không áp dụng cùng lúc với các gói thành viên khác",
                        "Chỉ áp dụng tại các bãi đỗ xe khu vực giảng viên"
                    ],
                    "color": "#E3F2FD"
                },
                {
                    "id": "teacher-premium",
                    "name": "GÓI NÂNG CẤP",
                    "isActive": false,
                    "duration": 90,
                    "durationUnit": "ngày",
                    "price": 1200000,
                    "savedAmount": 300000,
                    "description": "Gói nâng cấp dành cho giảng viên",
                    "benefits": [
                        "Tiết kiệm đến 25% phí gửi xe",
                        "Vị trí đỗ xe ưu tiên gần phòng làm việc",
                        "Nhận được ưu đãi đặc biệt từ tất cả dịch vụ trong trường",
                        "Hỗ trợ tìm chỗ đỗ xe ưu tiên qua ứng dụng",
                        "Nhận thêm 90 điểm tích lũy GV-Points"
                    ],
                    "terms": [
                        "Gói nâng cấp có giá trị trong thời gian 90 ngày kể từ ngày thanh toán",
                        "Chỉ áp dụng cho giảng viên có thẻ giảng viên hợp lệ",
                        "Không áp dụng cùng lúc với các gói thành viên khác",
                        "Áp dụng tại tất cả các bãi đỗ xe trong trường",
                        "Có quyền ưu tiên đỗ xe tại khu vực gần phòng làm việc"
                    ],
                    "color": "#E8F5E9"
                },
                {
                    "id": "teacher-vip",
                    "name": "GÓI SIÊU CẤP",
                    "isActive": false,
                    "duration": 365,
                    "durationUnit": "ngày",
                    "price": 3500000,
                    "savedAmount": 1000000,
                    "description": "Gói siêu cấp dành cho giảng viên",
                    "benefits": [
                        "Tiết kiệm đến 30% phí gửi xe",
                        "Vị trí đỗ xe VIP dành riêng có tên giảng viên",
                        "Nhận được ưu đãi đặc biệt từ tất cả dịch vụ trong và ngoài trường",
                        "Hỗ trợ giữ chỗ đỗ xe qua ứng dụng với thời gian linh hoạt",
                        "Nhận thêm 365 điểm tích lũy GV-Points",
                        "Miễn phí đỗ xe ngoài giờ và cuối tuần"
                    ],
                    "terms": [
                        "Gói siêu cấp có giá trị trong thời gian 365 ngày kể từ ngày thanh toán",
                        "Chỉ áp dụng cho giảng viên có thẻ giảng viên hợp lệ",
                        "Không áp dụng cùng lúc với các gói thành viên khác",
                        "Áp dụng tại tất cả các bãi đỗ xe trong và khu vực lân cận trường",
                        "Có quyền đỗ xe tại khu vực VIP có biển tên riêng",
                        "Được hỗ trợ đặt chỗ trước qua ứng dụng"
                    ],
                    "color": "#FFF3E0"
                }
            ]
        }
    ]
};

const MembershipScreen = ({ navigation }) => {
    const [selectedType, setSelectedType] = useState(membershipData.membershipTypes[0]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showTerms, setShowTerms] = useState(false);

    // Format currency
    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1565C0" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Gói thành viên</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content}>
                {/* Membership Type Selection */}
                <View style={styles.typeSelector}>
                    {membershipData.membershipTypes.map((type) => (
                        <TouchableOpacity
                            key={type.id}
                            style={[
                                styles.typeButton,
                                selectedType.id === type.id && styles.selectedTypeButton
                            ]}
                            onPress={() => setSelectedType(type)}
                        >
                            <Text
                                style={[
                                    styles.typeButtonText,
                                    selectedType.id === type.id && styles.selectedTypeButtonText
                                ]}
                            >
                                {type.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Package Cards */}
                <View style={styles.packagesContainer}>
                    {selectedType.packages.map((pkg) => (
                        <TouchableOpacity
                            key={pkg.id}
                            style={[
                                styles.packageCard,
                                { backgroundColor: pkg.color || '#E3F2FD' }
                            ]}
                            onPress={() => setSelectedPackage(pkg)}
                        >
                            {pkg.isActive && (
                                <View style={styles.activeTag}>
                                    <Text style={styles.activeTagText}>Đang sử dụng</Text>
                                </View>
                            )}
                            <Text style={styles.packageName}>{pkg.name}</Text>
                            <Text style={styles.packageDuration}>
                                {pkg.duration} {pkg.durationUnit}
                            </Text>
                            <View style={styles.priceContainer}>
                                <Text style={styles.packagePrice}>{formatCurrency(pkg.price)}</Text>
                                {pkg.savedAmount > 0 && (
                                    <Text style={styles.savedAmount}>
                                        Tiết kiệm {formatCurrency(pkg.savedAmount)}
                                    </Text>
                                )}
                            </View>
                            <Text style={styles.packageDescription}>{pkg.description}</Text>

                            <View style={styles.benefitsContainer}>
                                {pkg.benefits.map((benefit, index) => (
                                    <View key={index} style={styles.benefitItem}>
                                        <MaterialIcons name="check-circle" size={18} color="#1565C0" />
                                        <Text style={styles.benefitText}>{benefit}</Text>
                                    </View>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={styles.viewTermsButton}
                                onPress={() => {
                                    setSelectedPackage(pkg);
                                    setShowTerms(true);
                                }}
                            >
                                <Text style={styles.viewTermsText}>Xem điều khoản</Text>
                            </TouchableOpacity>

                            {!pkg.isActive && (
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() => {
                                        // Handle registration
                                        navigation.navigate('Payment', {
                                            amount: pkg.price,
                                            description: `Đăng ký ${pkg.name} - ${pkg.duration} ${pkg.durationUnit}`
                                        });
                                    }}
                                >
                                    <Text style={styles.registerButtonText}>Đăng ký ngay</Text>
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Terms Modal */}
            {showTerms && selectedPackage && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Điều khoản sử dụng</Text>
                            <TouchableOpacity onPress={() => setShowTerms(false)}>
                                <MaterialIcons name="close" size={24} color="#212121" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.modalBody}>
                            {selectedPackage.terms.map((term, index) => (
                                <View key={index} style={styles.termItem}>
                                    <Text style={styles.termNumber}>{index + 1}.</Text>
                                    <Text style={styles.termText}>{term}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setShowTerms(false)}
                        >
                            <Text style={styles.modalButtonText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#1565C0',
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    typeSelector: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 4,
    },
    typeButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 6,
    },
    selectedTypeButton: {
        backgroundColor: '#1565C0',
    },
    typeButtonText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#616161',
    },
    selectedTypeButtonText: {
        color: 'white',
    },
    packagesContainer: {
        marginBottom: 20,
    },
    packageCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    activeTag: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#4CAF50',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
    },
    activeTagText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    packageName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#212121',
        marginBottom: 4,
    },
    packageDuration: {
        fontSize: 14,
        color: '#616161',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    packagePrice: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1565C0',
        marginRight: 8,
    },
    savedAmount: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '500',
    },
    packageDescription: {
        fontSize: 14,
        color: '#616161',
        marginBottom: 16,
    },
    benefitsContainer: {
        marginBottom: 16,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    benefitText: {
        fontSize: 14,
        color: '#212121',
        marginLeft: 8,
        flex: 1,
    },
    viewTermsButton: {
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    viewTermsText: {
        fontSize: 14,
        color: '#1565C0',
        textDecorationLine: 'underline',
    },
    registerButton: {
        backgroundColor: '#1565C0',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    registerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        width: '100%',
        maxHeight: '80%',
        padding: 16,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212121',
    },
    modalBody: {
        maxHeight: 300,
    },
    termItem: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    termNumber: {
        fontSize: 14,
        color: '#212121',
        marginRight: 8,
        fontWeight: '500',
    },
    termText: {
        fontSize: 14,
        color: '#616161',
        flex: 1,
    },
    modalButton: {
        backgroundColor: '#1565C0',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default MembershipScreen;