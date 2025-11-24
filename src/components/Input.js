import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#777"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={secureTextEntry ? "none" : "sentences"}
        autoCorrect={!secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    color: '#d4af37',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
});
