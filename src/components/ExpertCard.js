import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const ExpertCard = ({
  avatar,
  name = 'Unknown',
  title, // From Screen: 'Suryamitra Certified'
  location, // From Screen: '1.2 KM'
  rating, // From Screen: '4.9'
  expertId, // From Screen: 'SM-VJ-9912'
  fee, // From Screen: '₹499'
  onPress,
}) => {
  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {/* Avatar Section with Placeholder */}
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.avatar} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>{name ? name.charAt(0).toUpperCase() : '?'}</Text>
        </View>
      )}

      {/* Info Section - Direct Govt Data Mapping */}
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>{name}</Text>
        
        {/* Title from Screen */}
        {title ? <Text numberOfLines={1} style={styles.title}>{title}</Text> : null}
        
        {/* Distance + Location */}
        <View style={styles.locationRow}>
          <Text style={styles.location}>{location} • Vijayawada</Text>
        </View>

        {/* Govt ID Verification */}
        <View style={styles.idContainer}>
          <Text style={styles.idText}>ID: {expertId}</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>VERIFIED</Text>
          </View>
        </View>
      </View>

      {/* Rating & Fee Section */}
      <View style={styles.rightAction}>
        <View style={styles.ratingWrap}>
          <Text style={styles.ratingText}>★ {rating}</Text>
        </View>
        <Text style={styles.feeText}>Starts {fee}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  pressed: {
    opacity: 0.85,
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    marginRight: 15,
    backgroundColor: '#eee',
  },
  placeholder: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    marginRight: 15,
    backgroundColor: '#00a86b', // Eco-Green theme
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  title: {
    fontSize: 14,
    color: '#007b5e', // Certified green