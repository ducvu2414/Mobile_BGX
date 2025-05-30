import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TransactionList = ({ transactions, formatCurrency }) => {
  return (
    <View style={styles.recentTransactions}>
      <Text style={styles.recentTransactionsTitle}>Giao dịch gần đây</Text>
      {transactions.slice(0, 2).map(transaction => (
        <View key={transaction.id} style={styles.transactionItem}>
          <View style={styles.transactionIconContainer}>
            <View style={[
              styles.transactionIcon,
              { backgroundColor: transaction.type === 'expense' ? '#FFF3E0' : '#E8F5E9' }
            ]}>
              <MaterialIcons
                name={transaction.type === 'expense' ? 'arrow-upward' : 'arrow-downward'}
                size={16}
                color={transaction.type === 'expense' ? '#FF9800' : '#4CAF50'}
              />
            </View>
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionDescription}>{transaction.description}</Text>
            <Text style={styles.transactionDate}>{transaction.date} - {transaction.time}</Text>
          </View>
          <Text
            style={[
              styles.transactionAmount,
              { color: transaction.type === 'expense' ? '#F44336' : '#4CAF50' }
            ]}
          >
            {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  recentTransactions: {
    marginTop: 4,
  },
  recentTransactionsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionIconContainer: {
    marginRight: 12,
  },
  transactionIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 13,
    color: '#212121',
  },
  transactionDate: {
    fontSize: 11,
    color: '#757575',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TransactionList;