import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BUDGET, BUDGET_CATEGORIES, RECENT_EXPENSES } from '../data/sampleData';
import BudgetDonut from '../components/BudgetDonut';
import CartoonIcon from '../components/CartoonIcon';
import { Sparkle, Cloud, Dot, TravelStamp } from '../components/TravelDecorations';
import { PASTEL } from '../data/colors';

const CATEGORY_PASTEL_BG: Record<string, string> = {
  Food: PASTEL.food,
  Transport: PASTEL.flights,
  Accommodation: PASTEL.accommodation,
  Activities: PASTEL.activities,
  Shopping: PASTEL.shopping,
};

export default function BudgetScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Sparkle color="#FF9800" size={14} style={{ position: 'relative', marginRight: 4 }} />
            <Text style={styles.title}>Budget</Text>
          </View>
          <TouchableOpacity><Text style={{ fontSize: 22 }}>⋯</Text></TouchableOpacity>
        </View>

        {/* Total + Donut */}
        <View style={styles.topCard}>
          <View style={styles.totalLeft}>
            <Text style={styles.totalLabel}>Total budget</Text>
            <Text style={styles.totalAmount}>€{BUDGET.total.toLocaleString()}</Text>
            <View style={styles.moneyBag}>
              <Text style={{ fontSize: 40 }}>💰</Text>
            </View>
          </View>
          <BudgetDonut percentage={BUDGET.percentUsed} size={140} strokeWidth={16} />
        </View>

        {/* Spent / Remaining */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#DDF4E4' }]}>
            <View style={[styles.statDot, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.statLabel}>Spent so far</Text>
            <Text style={styles.statValue}>€{BUDGET.spent.toLocaleString()}</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FFF2C7' }]}>
            <View style={[styles.statDot, { backgroundColor: '#FF9800' }]} />
            <Text style={styles.statLabel}>Remaining</Text>
            <Text style={styles.statValue}>€{BUDGET.remaining}</Text>
          </View>
        </View>

        {/* By category */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWrap}>
              <Cloud size={16} style={{ position: 'relative', marginRight: 4 }} />
              <Text style={styles.sectionTitle}>By category</Text>
            </View>
            <TravelStamp label="BUDGET" color="#4CAF50" style={{ position: 'relative' }} />
          </View>
          <View style={styles.card}>
            {BUDGET_CATEGORIES.map((cat, index) => {
              const pastelBg = CATEGORY_PASTEL_BG[cat.name] ?? '#fff';
              return (
                <View key={cat.name}>
                  <View style={[styles.catRow, { backgroundColor: pastelBg }]}>
                    <CartoonIcon emoji={cat.icon} bg={`${cat.color}22`} size={36} />
                    <View style={styles.catContent}>
                      <View style={styles.catHeader}>
                        <Text style={styles.catName}>{cat.name}</Text>
                        <Text style={styles.catAmount}>€{cat.spent}</Text>
                        <Text style={styles.catPercent}>{cat.percentage}%</Text>
                      </View>
                      <View style={styles.progressBg}>
                        <View
                          style={[
                            styles.progressFill,
                            {
                              width: `${cat.percentage}%`,
                              backgroundColor: cat.color,
                            },
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                  {index < BUDGET_CATEGORIES.length - 1 && <View style={styles.divider} />}
                </View>
              );
            })}
          </View>
        </View>

        {/* Recent expenses */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWrap}>
              <Sparkle color="#FF9800" size={12} style={{ position: 'relative', marginRight: 4 }} />
              <Text style={styles.sectionTitle}>Recent expenses</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            {RECENT_EXPENSES.map((expense, index) => (
              <View key={expense.id}>
                <View style={styles.expenseRow}>
                  <CartoonIcon emoji={expense.icon} bg={expense.iconBg} size={40} />
                  <View style={styles.expenseInfo}>
                    <Text style={styles.expenseName}>{expense.name}</Text>
                    <Text style={styles.expenseTime}>{expense.time}</Text>
                  </View>
                  <Text style={styles.expenseAmount}>€{expense.amount}</Text>
                </View>
                {index < RECENT_EXPENSES.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>

        {/* Decorative footer */}
        <View style={styles.footerDecor}>
          <Dot color="#DDD" size={5} style={{ position: 'relative' }} />
          <Dot color="#DDD" size={4} style={{ position: 'relative', marginLeft: 8 }} />
          <Sparkle color="#FF9800" size={10} style={{ position: 'relative', marginLeft: 6 }} />
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  scroll: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: '#1A1A1A' },

  topCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  totalLeft: { flex: 1 },
  totalLabel: { fontSize: 13, color: '#888', marginBottom: 4 },
  totalAmount: { fontSize: 32, fontWeight: '900', color: '#1A1A1A' },
  moneyBag: { marginTop: 8 },

  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  statDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 6,
  },
  statLabel: { fontSize: 12, color: '#888' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginTop: 2 },

  section: { paddingHorizontal: 16, marginBottom: 8 },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  seeAll: { fontSize: 13, color: '#4CAF50', fontWeight: '600' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginVertical: 2,
  },
  catContent: { flex: 1 },
  catHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  catName: { fontSize: 14, fontWeight: '600', color: '#1A1A1A', flex: 1 },
  catAmount: { fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginRight: 8 },
  catPercent: { fontSize: 12, color: '#888', width: 32, textAlign: 'right' },
  progressBg: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },
  divider: { height: 1, backgroundColor: '#F5F5F5' },

  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  expenseInfo: { flex: 1 },
  expenseName: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  expenseTime: { fontSize: 12, color: '#888', marginTop: 2 },
  expenseAmount: { fontSize: 15, fontWeight: '700', color: '#1A1A1A' },

  footerDecor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});
