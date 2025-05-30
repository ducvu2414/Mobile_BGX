import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const ParkingHistoryScreen = ({ navigation }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    // Sample parking history data
    const [parkingHistory] = useState([
        {
            id: 1,
            date: '10/03/2025',
            timeIn: '07:30',
            timeOut: '17:45',
            duration: '10h 15m',
            location: 'Bãi A - Khu giảng đường',
            vehicle: 'motorcycle',
            fee: 5000,
            status: 'completed'
        },
        {
            id: 2,
            date: '09/03/2025',
            timeIn: '08:15',
            timeOut: '16:30',
            duration: '8h 15m',
            location: 'Bãi B - Thư viện',
            vehicle: 'motorcycle',
            fee: 5000,
            status: 'completed'
        },
        {
            id: 3,
            date: '08/03/2025',
            timeIn: '07:45',
            timeOut: '18:00',
            duration: '10h 15m',
            location: 'Bãi C - Ký túc xá',
            vehicle: 'motorcycle',
            fee: 5000,
            status: 'completed'
        }
    ]);

    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
    };

    const renderParkingItem = ({ item }) => (
        <TouchableOpacity
            style={styles.parkingItem}
            onPress={() => navigation.navigate('ParkingHistoryDetail', { parkingRecord: item })}
        >
            <View style={styles.parkingItemHeader}>
                <View style={styles.parkingItemLeft}>
                    <FontAwesome5 name="motorcycle" size={20} color="#1565C0" />
                    <Text style={styles.parkingLocation}>{item.location}</Text>
                </View>
                <Text style={styles.parkingDate}>{item.date}</Text>
            </View>

            <View style={styles.parkingDetails}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Thời gian vào:</Text>
                    <Text style={styles.detailValue}>{item.timeIn}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Thời gian ra:</Text>
                    <Text style={styles.detailValue}>{item.timeOut}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Thời gian gửi:</Text>
                    <Text style={styles.detailValue}>{item.duration}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Phí gửi xe:</Text>
                    <Text style={styles.detailValue}>{formatCurrency(item.fee)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1565C0" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Lịch sử gửi xe</Text>
                <View style={{ width: 24 }} />
            </View>

            <FlatList
                data={parkingHistory}
                renderItem={renderParkingItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
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
    listContainer: {
        padding: 16,
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
    parkingItemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    parkingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    parkingLocation: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8,
        color: '#212121',
    },
    parkingDate: {
        fontSize: 14,
        color: '#757575',
    },
    parkingDetails: {
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 12,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: '#757575',
    },
    detailValue: {
        fontSize: 14,
        color: '#212121',
        fontWeight: '500',
    },
});

export default ParkingHistoryScreen;