import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import ExpertCard from '../components/ExpertCard';
import { fetchAllGovServices } from '../services/MasterGovService';

const ExpertListScreen = ({ route, navigation }) => {
  const { serviceType, label } = route.params || { serviceType: 'SOLAR', label: 'Service' };
  const [loading, setLoading] = useState(true);
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    const loadProfessionals = async () => {
      setLoading(true);
      const allData = await fetchAllGovServices('Vijayawada');
      if (allData && allData[serviceType]) {
        setExperts(allData[serviceType]);
      } else {
        setExperts([]);
      }
      setLoading(false);
    };
    loadProfessionals();
  }, [serviceType]);

  const navigateToPayment = (expert, service) => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Payment', { expert, serviceType, service });
    } else {
      console.log('Navigate to Payment:', expert, service);
    }
  };

  const handleBooking = (expert, serviceTypeKey) => {
    const services = {
      SOLAR: ['Professional Cleaning', 'Health Checkup', 'Panel Repair'],
      EWASTE: ['Bulk Pickup', 'Device Valuation', 'Data Wipe'],
      ENERGY: ['Home Audit', 'Industrial Audit', 'Bill Analysis'],
      RAINWATER: ['Inspection', 'Recharge Well Installation', 'Consultation'],
      BIOGAS: ['Installation', 'Maintenance', 'Feedstock Assessment'],
      COMPOST: ['On-site Composting Setup', 'Organic Waste Collection'],
      GARDENING: ['Lawn Care', 'Landscape Design', 'Planting'],
      GREYWATER: ['System Design', 'Maintenance'],
      RECYCLING: ['Pickup Scheduling', 'Segregation Assistance'],
      EV: ['Charger Installation', 'Maintenance']
    };

    const opts = services[serviceTypeKey] || ['General Consultation'];

    Alert.alert(
      `Book ${expert.name}`,
      `Choose a service for ${serviceTypeKey}:`,
      opts.map((service) => ({
        text: service,
        onPress: () => navigateToPayment(expert, service)
      }))
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{label} Specialists</Text>
        <Text style={styles.headerSub}>VERIFIED PROFESSIONALS NEARBY</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00a86b" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={experts}
          keyExtractor={(item, index) => (item && (item.expertId || item.id) ? String(item.expertId || item.id) : String(index))}
          renderItem={({ item }) => (
            <ExpertCard
              name={item.name}
              title={item.title}
              location={item.location || '2.0 KM'}
              rating={item.rating || '4.5'}
              expertId={item.expertId}
              fee={item.fee || '₹499'}
              onPress={() => handleBooking(item, serviceType)}
            />
          )}
          ListEmptyComponent={<Text style={styles.empty}>No verified professionals found in this area.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1a1a1a' },
  headerSub: { fontSize: 10, color: '#00a86b', fontWeight: 'bold', marginTop: 4, letterSpacing: 1 },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' }
});

export default ExpertListScreen;