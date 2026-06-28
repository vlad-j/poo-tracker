import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JOURNAL_ENTRIES } from '../data/sampleData';
import { Sparkle, Cloud, Dot, TravelStamp } from '../components/TravelDecorations';

const FILTER_TABS = ['All', 'Notes', 'Photos', 'Places'];

export default function JournalScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const day8 = JOURNAL_ENTRIES.filter((e) => e.day === 8);
  const day7 = JOURNAL_ENTRIES.filter((e) => e.day === 7);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Sparkle color="#FF9800" size={14} style={{ position: 'relative', marginRight: 4 }} />
          <Text style={styles.title}>Journal</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={{ fontSize: 22 }}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={{ fontSize: 22 }}>＋</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
        contentContainerStyle={styles.tabScrollContent}
      >
        {FILTER_TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterTab, activeFilter === tab && styles.filterTabActive]}
            onPress={() => setActiveFilter(tab)}
          >
            <Text style={[styles.filterTabText, activeFilter === tab && styles.filterTabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Day 8 */}
        <View style={styles.dayGroup}>
          <View style={styles.dayLabelRow}>
            <Text style={styles.dayLabel}>Today · Day 8</Text>
            <TravelStamp label="MEMORIES" color="#FF9800" style={{ position: 'relative' }} />
          </View>
          {day8.map((entry) => (
            <JournalCard key={entry.id} entry={entry} />
          ))}
        </View>

        {/* Day 7 */}
        <View style={styles.dayGroup}>
          <View style={styles.dayLabelRow}>
            <Text style={styles.dayLabel}>Yesterday · Day 7</Text>
            <Cloud size={16} style={{ position: 'relative' }} />
          </View>
          {day7.map((entry) => (
            <JournalCard key={entry.id} entry={entry} />
          ))}
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

function JournalCard({ entry }: { entry: (typeof JOURNAL_ENTRIES)[0] }) {
  return (
    <View style={styles.card}>
      {/* Photo-first scrapbook layout */}
      {entry.photoUrl ? (
        <View style={styles.photoFrame}>
          <Image
            source={{ uri: entry.photoUrl }}
            style={styles.photoLarge}
            resizeMode="cover"
          />
          <View style={styles.photoOverlay}>
            <Text style={styles.photoEmoji}>{entry.emoji}</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.locationChip}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.location}>{entry.location}</Text>
          </View>
          <Text style={styles.time}>{entry.time}</Text>
        </View>

        <Text style={styles.note}>{entry.note}</Text>

        {entry.photoUrl ? (
          <View style={styles.photoMeta}>
            <View style={styles.metaDot} />
            <Text style={styles.photoCount}>
              {entry.day === 8 && entry.id === '1' ? '3 photos' : '2 photos'}
            </Text>
            <Sparkle color="#FFD700" size={10} style={{ position: 'relative', marginLeft: 4 }} />
          </View>
        ) : null}
      </View>

      {/* Scrapbook tape decoration */}
      <View style={styles.tapeLeft} />
      <View style={styles.tapeRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },

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
  headerIcons: { flexDirection: 'row', gap: 8 },
  iconBtn: { padding: 4 },

  tabScroll: { backgroundColor: '#fff', maxHeight: 52 },
  tabScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    flexDirection: 'row',
  },
  filterTab: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  filterTabActive: { backgroundColor: '#4CAF50' },
  filterTabText: { fontSize: 14, fontWeight: '600', color: '#666' },
  filterTabTextActive: { color: '#fff' },

  scroll: { flex: 1, padding: 16 },
  dayGroup: { marginBottom: 20 },
  dayLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 0.3,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  photoFrame: {
    position: 'relative',
    width: '100%',
    height: 180,
    backgroundColor: '#F5F5F5',
  },
  photoLarge: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  photoEmoji: { fontSize: 18 },

  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  locationIcon: { fontSize: 12 },
  location: { fontSize: 13, fontWeight: '700', color: '#1A1A1A' },
  time: { fontSize: 12, color: '#888' },

  note: { fontSize: 14, color: '#444', lineHeight: 21 },

  photoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  metaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  photoCount: { fontSize: 12, color: '#4CAF50', fontWeight: '600' },

  // Scrapbook tape decorations
  tapeLeft: {
    position: 'absolute',
    top: 12,
    left: -6,
    width: 24,
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 2,
    transform: [{ rotate: '-25deg' }],
  },
  tapeRight: {
    position: 'absolute',
    top: 14,
    right: -4,
    width: 20,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 2,
    transform: [{ rotate: '18deg' }],
  },

  footerDecor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
});
