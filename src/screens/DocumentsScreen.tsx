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
import { DOCUMENTS } from '../data/sampleData';
import CartoonIcon from '../components/CartoonIcon';
import { Sparkle, Dot } from '../components/TravelDecorations';

export default function DocumentsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Documents</Text>
        <TouchableOpacity><Text style={{ fontSize: 22 }}>⋯</Text></TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {DOCUMENTS.map((doc, index) => (
            <View key={doc.id}>
              <TouchableOpacity style={styles.docRow} activeOpacity={0.7}>
                <CartoonIcon emoji={doc.icon} bg={doc.iconBg} size={52} />
                <View style={styles.docInfo}>
                  <Text style={styles.docName}>{doc.name}</Text>
                  <Text style={styles.docDetail}>{doc.detail}</Text>
                  {doc.savedOffline && (
                    <View style={styles.offlineBadge}>
                      <Text style={styles.offlineBadgeText}>Saved offline</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
              {index < DOCUMENTS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Add document button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addIcon}>＋</Text>
          <Text style={styles.addText}>Add document</Text>
        </TouchableOpacity>

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
  backBtn: { padding: 4 },
  backIcon: { fontSize: 28, color: '#1A1A1A', fontWeight: '300' },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
  },
  docInfo: { flex: 1 },
  docName: { fontSize: 16, fontWeight: '700', color: '#1A1A1A', marginBottom: 3 },
  docDetail: { fontSize: 13, color: '#666', marginBottom: 6 },
  offlineBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  offlineBadgeText: { fontSize: 11, color: '#4CAF50', fontWeight: '600' },
  chevron: { fontSize: 22, color: '#CCC', fontWeight: '300' },
  divider: { height: 1, backgroundColor: '#F5F5F5', marginLeft: 66 },

  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  addIcon: { fontSize: 20, color: '#4CAF50', fontWeight: '700' },
  addText: { fontSize: 15, fontWeight: '600', color: '#4CAF50' },

  footerDecor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});
