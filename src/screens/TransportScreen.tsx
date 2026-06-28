import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FLIGHTS } from '../data/sampleData';
import StatusBadge from '../components/StatusBadge';

const TABS = ['Flights', 'Transfers', 'Other'];

export default function TransportScreen() {
  const [activeTab, setActiveTab] = useState('Flights');
  const nextFlight = FLIGHTS[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Transport</Text>
        <TouchableOpacity><Text style={{ fontSize: 22 }}>⋯</Text></TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Next up label */}
        <Text style={styles.nextLabel}>Next up</Text>

        {/* Featured flight card */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredTop}>
            <View style={styles.airlineRow}>
              <View style={styles.airlineIcon}>
                <Text style={{ fontSize: 22 }}>✈️</Text>
              </View>
              <View>
                <Text style={styles.airlineName}>{nextFlight.airline}</Text>
                <Text style={styles.flightNum}>{nextFlight.flightNumber}</Text>
              </View>
            </View>
            <StatusBadge status={nextFlight.status} />
          </View>

          {/* Route */}
          <View style={styles.routeRow}>
            <View style={styles.routeEnd}>
              <Text style={styles.airportCode}>{nextFlight.from}</Text>
              <Text style={styles.airportCity}>{nextFlight.fromCity}</Text>
            </View>
            <View style={styles.routeMiddle}>
              <Text style={styles.routeArrow}>→</Text>
            </View>
            <View style={[styles.routeEnd, styles.routeEndRight]}>
              <Text style={styles.airportCode}>{nextFlight.to}</Text>
              <Text style={styles.airportCity}>{nextFlight.toCity}</Text>
            </View>
          </View>

          {/* Times */}
          <View style={styles.timesRow}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeValue}>{nextFlight.departure}</Text>
              <Text style={styles.timeDate}>{nextFlight.departureDate}</Text>
              <Text style={styles.timeSub}>{nextFlight.terminal}</Text>
            </View>
            <View style={styles.planeIconCenter}>
              <Text style={{ fontSize: 28 }}>✈</Text>
            </View>
            <View style={[styles.timeBlock, styles.timeBlockRight]}>
              <Text style={styles.timeValue}>{nextFlight.arrival}</Text>
              <Text style={styles.timeDate}>{nextFlight.departureDate}</Text>
              <Text style={styles.timeSub}>{nextFlight.gate}</Text>
            </View>
          </View>

          {/* Details */}
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Seat</Text>
              <Text style={styles.detailValue}>{nextFlight.seat}</Text>
            </View>
            <View style={styles.detailDivider} />
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Booking ref.</Text>
              <Text style={styles.detailValue}>{nextFlight.bookingRef}</Text>
            </View>
          </View>
        </View>

        {/* All flights */}
        <Text style={styles.allFlightsLabel}>All flights</Text>
        <View style={styles.allFlightsCard}>
          {FLIGHTS.map((flight, index) => (
            <View key={flight.id}>
              <TouchableOpacity style={styles.flightRow}>
                <View style={styles.flightIcon}>
                  <Text style={{ fontSize: 18 }}>
                    {flight.airline === 'Turkish Airlines' ? '🇹🇷' : '🇮🇩'}
                  </Text>
                </View>
                <View style={styles.flightInfo}>
                  <Text style={styles.flightAirline}>{flight.airline}</Text>
                  <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
                </View>
                <StatusBadge status={flight.status} small />
              </TouchableOpacity>
              {index < FLIGHTS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  scroll: { flex: 1, padding: 16 },

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
  title: { fontSize: 24, fontWeight: '800', color: '#1A1A1A' },

  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  tabActive: { backgroundColor: '#4CAF50' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#666' },
  tabTextActive: { color: '#fff' },

  nextLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#888',
    marginBottom: 10,
  },

  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  airlineRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  airlineIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  airlineName: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
  flightNum: { fontSize: 12, color: '#888' },

  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  routeEnd: { flex: 2 },
  routeEndRight: { alignItems: 'flex-end' },
  routeMiddle: { flex: 1, alignItems: 'center' },
  routeArrow: { fontSize: 22, color: '#1A1A1A' },
  airportCode: { fontSize: 32, fontWeight: '900', color: '#1A1A1A' },
  airportCity: { fontSize: 12, color: '#888', marginTop: 2 },

  timesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 14,
  },
  timeBlock: { flex: 2 },
  timeBlockRight: { alignItems: 'flex-end' },
  timeValue: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  timeDate: { fontSize: 12, color: '#888', marginTop: 2 },
  timeSub: { fontSize: 12, color: '#666', marginTop: 4 },
  planeIconCenter: { flex: 1, alignItems: 'center' },

  detailsRow: { flexDirection: 'row', alignItems: 'center' },
  detailItem: { flex: 1 },
  detailDivider: { width: 1, height: 36, backgroundColor: '#E0E0E0', marginHorizontal: 16 },
  detailLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  detailValue: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },

  allFlightsLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  allFlightsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  flightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  flightIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flightInfo: { flex: 1 },
  flightAirline: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  flightNumber: { fontSize: 12, color: '#888', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#F5F5F5' },
});
