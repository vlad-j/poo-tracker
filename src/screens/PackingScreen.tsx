import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store/useAppStore';
import { Sparkle, Cloud, Dot } from '../components/TravelDecorations';

export default function PackingScreen() {
  const navigation = useNavigation();
  const { packingCategories, togglePackingItem } = useAppStore();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const totalItems = packingCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  const packedItems = packingCategories.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.packed).length,
    0
  );
  const progress = totalItems > 0 ? packedItems / totalItems : 0;

  const toggleExpand = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isExpanded = (name: string) => expanded[name] !== false;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Packing List</Text>
        <TouchableOpacity><Text style={{ fontSize: 22 }}>⋯</Text></TouchableOpacity>
      </View>

      {/* Progress */}
      <View style={styles.progressSection}>
        <Text style={styles.progressText}>
          {packedItems} of {totalItems} packed
        </Text>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {packingCategories.map((category) => {
          const catPacked = category.items.filter((i) => i.packed).length;
          const catTotal = category.items.length;
          const expand = isExpanded(category.name);

          return (
            <View key={category.name} style={styles.category}>
              <TouchableOpacity
                style={styles.categoryHeader}
                onPress={() => toggleExpand(category.name)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryTitleWrap}>
                  <Text style={styles.categoryTitle}>{category.name}</Text>
                  <Text style={styles.categoryCount}>
                    {catPacked}/{catTotal}
                  </Text>
                </View>
                <Text style={[styles.chevron, expand && styles.chevronOpen]}>▾</Text>
              </TouchableOpacity>

              {expand && (
                <View style={styles.card}>
                  {category.items.map((item, index) => (
                    <View key={item.id}>
                      <TouchableOpacity
                        style={styles.itemRow}
                        onPress={() => togglePackingItem(category.name, item.id)}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.checkbox, item.packed && styles.checkboxChecked]}>
                          {item.packed && <Text style={styles.checkMark}>✓</Text>}
                        </View>
                        <Text style={[styles.itemName, item.packed && styles.itemNamePacked]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                      {index < category.items.length - 1 && <View style={styles.divider} />}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        {/* Decorative footer */}
        <View style={styles.footerDecor}>
          <Dot color="#DDD" size={5} style={{ position: 'relative' }} />
          <Dot color="#DDD" size={4} style={{ position: 'relative', marginLeft: 8 }} />
          <Sparkle color="#FF9800" size={10} style={{ position: 'relative', marginLeft: 6 }} />
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  backBtn: { padding: 4 },
  backIcon: { fontSize: 28, color: '#1A1A1A', fontWeight: '300' },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },

  progressSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  progressBg: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },

  scroll: { flex: 1, padding: 16 },
  category: { marginBottom: 14 },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  categoryCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  chevron: { fontSize: 16, color: '#888' },
  chevronOpen: { transform: [{ rotate: '180deg' }] },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkMark: { fontSize: 13, color: '#fff', fontWeight: '800' },
  itemName: { flex: 1, fontSize: 15, color: '#1A1A1A', fontWeight: '500' },
  itemNamePacked: { color: '#888', textDecorationLine: 'line-through' },
  divider: { height: 1, backgroundColor: '#F5F5F5', marginLeft: 36 },

  footerDecor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabText: { fontSize: 28, color: '#fff', fontWeight: '400', lineHeight: 32 },
});
