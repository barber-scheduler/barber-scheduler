import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: 20,
    borderRadius: 14,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.2)',
    marginTop: 20,
  },
});
