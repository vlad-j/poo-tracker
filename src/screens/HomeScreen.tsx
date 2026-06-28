import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  USER,
  TRIP,
  TODAY_ACTIVITIES,
  BUDGET,
} from '../data/sampleData';
import CartoonIcon from '../components/CartoonIcon';
import StatusBadge from '../components/StatusBadge';
import BudgetDonut from '../components/BudgetDonut';
import DestinationHero from '../components/DestinationHero';
import { Sparkle, Cloud, Dot } from '../components/TravelDecorations';
import { STATUS_BG } from '../data/colors';

const QUICK_ACTIONS = [
  { label: 'Packing List', emoji: '🎒', screen: 'Packing' as const },
  { label: 'Documents', emoji: '📁', screen: 'Documents' as const },
  { label: 'Transport', emoji: '✈️', screen: 'Transport' as const },
  { label: 'Trip Overview', emoji: '🗺️', screen: 'TripOverview' as const },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👨</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Good morning,</Text>
              <Text style={styles.name}>{USER.name} 👋</Text>
            </View>
          </View>
          <View style={styles.bell}>
            <Text style={{ fontSize: 20 }}>🔔</Text>
            <View style={styles.bellDot} />
          </View>
        </View>

        {/* Destination Hero */}
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('TripOverview')}>
          <DestinationHero
            country="Indonesia"
            tripName={TRIP.name}
            currentDay={TRIP.currentDay}
            totalDays={TRIP.totalDays}
            location={TRIP.location}
            temperature={TRIP.temperature}
          />
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.quickBtn}
              onPress={() => navigation.navigate(action.screen)}
            >
              <View style={styles.quickIconBg}>
                <Text style={{ fontSize: 22 }}>{action.emoji}</Text>
              </View>
              <Text style={styles.quickLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Today's Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <Sparkle color="#FF9800" size={12} style={{ position: 'relative', top: -2, left: -4 }} />
              <Text style={styles.sectionTitle}>TODAY'S ACTIVITIES</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            {TODAY_ACTIVITIES.map((activity, index) => (
              <View key={activity.id}>
                <View style={[styles.activityRow, { backgroundColor: STATUS_BG[activity.status] ?? '#fff' }]}>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                  <CartoonIcon emoji={activity.icon} bg={activity.iconBg} size={42} />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle} numberOfLines={1}>
                      {activity.title}
                    </Text>
                  </View>
                  <StatusBadge status={activity.status} small />
                </View>
                {index < TODAY_ACTIVITIES.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Budget Snapshot */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleWrap}>
              <Cloud size={16} style={{ position: 'relative', top: -2, left: -4 }} />
              <Text style={styles.sectionTitle}>BUDGET SNAPSHOT</Text>
            </View>
            <Sparkle color="#FF9800" size={14} style={{ position: 'relative' }} />
          </View>
          <View style={styles.budgetCard}>
            <View style={styles.budgetLeft}>
              <BudgetDonut percentage={BUDGET.percentUsed} size={110} strokeWidth={13} />
            </View>
            <View style={styles.budgetRight}>
              <BudgetRow label="Total budget" value={`€${BUDGET.total.toLocaleString()}`} dotColor="#1A1A1A" />
              <BudgetRow label="Spent so far" value={`€${BUDGET.spent.toLocaleString()}`} dotColor="#4CAF50" />
              <BudgetRow label="Today's spending" value={`€${BUDGET.todaySpending}`} dotColor="#FF9800" />
              <View style={styles.partnerRow}>
                <Text style={styles.partnerText}>
                  Raul owes Vlad{' '}
                  <Text style={styles.partnerAmount}>€{BUDGET.partnerOwes}</Text>
                  <Text style={{ fontSize: 14 }}> 💛</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Decorative footer */}
        <View style={styles.footerDecor}>
          <Dot color="#DDD" size={5} style={{ position: 'relative' }} />
          <Dot color="#DDD" size={4} style={{ position: 'relative', marginLeft: 8 }} />
          <Dot color="#DDD" size={6} style={{ position: 'relative', marginLeft: 6 }} />
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function BudgetRow({ label, value, dotColor }: { label: string; value: string; dotColor: string }) {
  return (
    <View style={styles.budgetRow}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <View style={{ flex: 1 }}>
        <Text style={styles.budgetLabel}>{label}</Text>
        <Text style={styles.budgetValue}>{value}</Text>
      </View>
    </View>
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
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF9C4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFD600',
  },
  avatarText: { fontSize: 22 },
  greeting: { fontSize: 12, color: '#888' },
  name: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  bell: { position: 'relative', padding: 4 },
  bellDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
  },

  section: { paddingHorizontal: 16, marginBottom: 4 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 4,
  },
  sectionTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 0.8,
  },
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
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderRadius: 12,
    marginVertical: 2,
    paddingHorizontal: 6,
  },
  activityTime: { width: 42, fontSize: 12, fontWeight: '600', color: '#666' },
  activityContent: { flex: 1 },
  activityTitle: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  divider: { height: 1, backgroundColor: '#F5F5F5', marginLeft: 52 },

  budgetCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  budgetLeft: { alignItems: 'center' },
  budgetRight: { flex: 1, gap: 6 },
  budgetRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 4 },
  dot: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
  budgetLabel: { fontSize: 11, color: '#888' },
  budgetValue: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
  partnerRow: { marginTop: 6 },
  partnerText: { fontSize: 12, color: '#666' },
  partnerAmount: { fontWeight: '700', color: '#FF9800' },

  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  quickBtn: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  quickIconBg: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  quickLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  footerDecor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});
