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
import { ACCOMMODATION } from '../data/sampleData';
import StatusBadge from '../components/StatusBadge';
import { Sparkle, Cloud, Dot } from '../components/TravelDecorations';

const AMENITIES = [
  { name: 'WiFi', emoji: '📶' },
  { name: 'Pool', emoji: '🏊' },
  { name: 'Breakfast', emoji: '🍳' },
  { name: 'AC', emoji: '❄️' },
];

export default function AccommodationScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Accommodation</Text>
        <TouchableOpacity><Text style={{ fontSize: 22 }}>⋯</Text></TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero with illustrated villa */}
        <View style={styles.heroContainer}>
          <View style={styles.heroScene}>
            <View style={styles.sky} />
            <View style={styles.ground} />
            <View style={styles.hillLeft} />
            <View style={styles.hillRight} />
            <View style={styles.villaBase}>
              <Text style={{ fontSize: 72 }}>🏡</Text>
            </View>
            <Text style={[styles.sceneDecor, { left: 16, bottom: 16 }]}>🌴</Text>
            <Text style={[styles.sceneDecor, { right: 16, bottom: 16 }]}>🌴</Text>
            <Text style={[styles.sceneDecor, { left: 50, top: 16 }]}>☁️</Text>
            <Text style={[styles.sceneDecor, { right: 60, top: 24 }]}>☁️</Text>
            <Sparkle color="#FFD700" size={12} style={{ position: 'absolute', right: 30, top: 30 }} />
          </View>
        </View>

        {/* Property name */}
        <View style={styles.propertyHeader}>
          <Text style={styles.propertyName}>{ACCOMMODATION.name}</Text>
          <StatusBadge status={ACCOMMODATION.status} />
        </View>

        {/* Check-in / Check-out */}
        <View style={styles.card}>
          <View style={styles.checkRow}>
            <View style={styles.checkItem}>
              <Text style={styles.checkLabel}>Check-in</Text>
              <Text style={styles.checkTime}>{ACCOMMODATION.checkInTime}</Text>
              <Text style={styles.checkDay}>{ACCOMMODATION.checkInDay}</Text>
            </View>
            <View style={styles.checkDivider} />
            <View style={styles.checkItem}>
              <Text style={styles.checkLabel}>Check-out</Text>
              <Text style={styles.checkTime}>{ACCOMMODATION.checkOutTime}</Text>
              <Text style={styles.checkDay}>{ACCOMMODATION.checkOutDay}</Text>
            </View>
          </View>
        </View>

        {/* Address */}
        <View style={styles.card}>
          <View style={styles.addressRow}>
            <View style={styles.addressIconBg}>
              <Text style={{ fontSize: 20 }}>📍</Text>
            </View>
            <View style={styles.addressContent}>
              <Text style={styles.addressText}>{ACCOMMODATION.address}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.mapsButton}>
            <Text style={styles.mapsButtonText}>Open in Maps</Text>
          </TouchableOpacity>
        </View>

        {/* Amenities */}
        <View style={styles.card}>
          <View style={styles.amenitiesRow}>
            {AMENITIES.map((a) => (
              <View key={a.name} style={styles.amenityChip}>
                <Text style={{ fontSize: 18 }}>{a.emoji}</Text>
                <Text style={styles.amenityName}>{a.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Booking ref */}
        <View style={styles.card}>
          <View style={styles.bookingRow}>
            <View>
              <Text style={styles.bookingLabel}>Booking confirmation</Text>
              <Text style={styles.bookingRef}>{ACCOMMODATION.bookingRef}</Text>
            </View>
            <TouchableOpacity style={styles.downloadBtn}>
              <Text style={{ fontSize: 20 }}>⬇</Text>
            </TouchableOpacity>
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
  backBtn: { padding: 4 },
  backIcon: { fontSize: 28, color: '#1A1A1A', fontWeight: '300' },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },

  heroContainer: {
    height: 220,
    overflow: 'hidden',
  },
  heroScene: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  sky: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#81D4FA',
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: '#A5D6A7',
  },
  hillLeft: {
    position: 'absolute',
    bottom: 20,
    left: -20,
    width: 100,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#81C784',
  },
  hillRight: {
    position: 'absolute',
    bottom: 20,
    right: -20,
    width: 120,
    height: 70,
    borderRadius: 60,
    backgroundColor: '#66BB6A',
  },
  villaBase: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  sceneDecor: { position: 'absolute', fontSize: 28 },

  propertyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  propertyName: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', flex: 1, marginRight: 12 },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },

  checkRow: { flexDirection: 'row', alignItems: 'center' },
  checkItem: { flex: 1, alignItems: 'center' },
  checkLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  checkTime: { fontSize: 24, fontWeight: '800', color: '#1A1A1A' },
  checkDay: { fontSize: 13, color: '#666', marginTop: 2 },
  checkDivider: { width: 1, height: 60, backgroundColor: '#E0E0E0', marginHorizontal: 16 },

  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  addressIconBg: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContent: { flex: 1 },
  addressText: { fontSize: 14, color: '#333', lineHeight: 20 },
  mapsButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  mapsButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  amenitiesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  amenityChip: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 10,
    gap: 4,
  },
  amenityName: { fontSize: 11, fontWeight: '600', color: '#666' },

  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookingLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  bookingRef: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
  downloadBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  footerDecor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});
