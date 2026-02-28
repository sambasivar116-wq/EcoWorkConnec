import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { fetchAllGovServices } from './src/services/MasterGovService';

const Dashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [servicesData, setServicesData] = useState({});
  const [ecoPoints, setEcoPoints] = useState(2450); // 

  // Smart Alert logic for Solar Maintenance (Screenshot 4)
  useEffect(() => {
    const triggerMaintenanceAlert = () => {
      Alert.alert(
        "Solar Maintenance Due", // [cite: 63]
        "Efficiency of your rooftop solar has dropped by 12% due to dust. We suggest a professional cleaning.", // [cite: 66, 67, 68]
        [
          { text: "LATER", style: "cancel" }, // [cite: 70]
          { text: "SCHEDULE CLEANING", onPress: () => console.log("Navigating to Expert List...") } // [cite: 69, 71]
        ]
      );
    };

    // App load ayyaka 2 seconds tharuvatha alert chupinchadaniki
    const timer = setTimeout(triggerMaintenanceAlert, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Real-time Sync Logic (Screenshot 2 based)
  const syncWithPortals = async () => {
    setLoading(true);
    console.log("Syncing with National Portals..."); // 
    const data = await fetchAllGovServices("Vijayawada"); // [cite: 32]
    if (data) {
      setServicesData(data);
      Alert.alert("Sync Complete", "All 10 Govt Portals are now connected!");
    }
    setLoading(false);
  };

  useEffect(() => {
    syncWithPortals();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section (Screenshot 3) */}
      <View style={styles.header}>
        <Text style={styles.locationLabel}>VIJAYAWADA, AP</Text> {/* [cite: 32] */}
        <Text style={styles.areaLabel}>Governorpet Area</Text> {/* [cite: 33] */}
        
        {/* Rewards Card (Screenshot 4) */}
        <View style={styles.rewardCard}>
          <Text style={styles.rewardTitle}>GREEN REWARDS</Text> {/* [cite: 58] */}
          <Text style={styles.points}>{ecoPoints} Pts</Text> {/*  */}
          <Text style={styles.tierInfo}>Eco-Warrior Tier. Next reward at 3,000 pts.</Text> {/* [cite: 60] */}
        </View>
      </View>

      {/* Sync Status Indicator (Screenshot 2) */}
      {loading && (
        <View style={styles.syncBox}>
          <ActivityIndicator color="#00a86b" />
          <Text style={styles.syncText}>Syncing with National Portals...</Text> {/*  */}
        </View>
      )}

      {/* 10 Services Grid (Screenshot 3 Icons) */}
      <View style={styles.grid}>
        {[
          { id: 'SOLAR', label: 'SOLAR', icon: '☀️' }, // [cite: 35]
          { id: 'RAINWATER', label: 'RAINWATER', icon: '💧' }, // [cite: 36]
          { id: 'ENERGY', label: 'ENERGY AUDIT', icon: '⚡' }, // [cite: 37]
          { id: 'EWASTE', label: 'E-WASTE', icon: '🗑️' }, // [cite: 38]
          { id: 'GARDENING', label: 'GARDENING', icon: '🌱' }, // [cite: 40]
          { id: 'COMPOST', label: 'COMPOST', icon: '♻️' }, // [cite: 41]
          { id: 'BIOGAS', label: 'BIOGAS', icon: '🔥' }, // [cite: 42]
          { id: 'GREYWATER', label: 'GREYWATER', icon: '🚿' }, // [cite: 43]
          { id: 'RECYCLE', label: 'RECYCLING', icon: '📦' },
          { id: 'EV', label: 'EV CHARGE', icon: '🔌' }
        ].map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.serviceItem}
            onPress={() => {
              if (navigation && navigation.navigate) {
                navigation.navigate('ExpertList', { serviceType: item.id, label: item.label });
              } else {
                Alert.alert(`${item.label} API`, `Fetching ${item.label} Professionals from Govt Portal...`);
              }
            }}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.serviceLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Subsidy Banner (Screenshot 3) */}
      <View style={styles.subsidyBanner}>
        <Text style={styles.schemeTag}>PM-SURYA GHAR SCHEME</Text> {/* [cite: 44] */}
        <Text style={styles.subsidyText}>Solar Subsidy Active</Text> {/* [cite: 45] */}
        <Text style={styles.subsidyValue}>Get up to ₹78,000 subsidy on rooftop installations.</Text> {/* [cite: 46] */}
        <TouchableOpacity style={styles.applyBtn} onPress={() => Alert.alert("Redirecting", "Connecting to National Rooftop Portal...")}>
          <Text style={styles.applyText}>Apply Now</Text> {/* [cite: 47] */}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#00a86b', padding: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  locationLabel: { color: '#e0e0e0', fontSize: 12, fontWeight: 'bold' },
  areaLabel: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  rewardCard: { backgroundColor: '#fff', padding: 15, borderRadius: 15, marginTop: 15, elevation: 5 },
  rewardTitle: { fontSize: 10, color: '#666', fontWeight: 'bold' },
  points: { fontSize: 24, fontWeight: 'bold', color: '#00a86b' },
  tierInfo: { fontSize: 11, color: '#888' },
  syncBox: { flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' },
  syncText: { marginLeft: 10, color: '#00a86b', fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'space-between' },
  serviceItem: { width: '23%', backgroundColor: '#fff', padding: 10, borderRadius: 12, alignItems: 'center', marginVertical: 8, elevation: 2 },
  icon: { fontSize: 24, marginBottom: 5 },
  serviceLabel: { fontSize: 9, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  subsidyBanner: { margin: 15, padding: 20, backgroundColor: '#0d1b2a', borderRadius: 20 },
  schemeTag: { color: '#4caf50', fontSize: 10, fontWeight: 'bold' },
  subsidyText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  subsidyValue: { color: '#ccc', fontSize: 12, marginTop: 5 },
  applyBtn: { backgroundColor: '#00a86b', padding: 10, borderRadius: 8, marginTop: 15, alignItems: 'center' },
  applyText: { color: '#fff', fontWeight: 'bold' }
});

export default Dashboard;