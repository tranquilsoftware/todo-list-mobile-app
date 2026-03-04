import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';

import { useTodos } from '../hooks/useTodos';
import { colors, radii, shadows, spacing, typography } from '../theme';
import { RootStackParamList } from '../types';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'AddTodo'>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  input: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radii.md,
    marginBottom: spacing.md,
    fontSize: typography.input,
    color: colors.textPrimary,
    ...shadows.card,
  },
  multiline: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: radii.md,
  },
  backButton: {
    backgroundColor: colors.danger,
  },
  saveButton: {
    backgroundColor: colors.success,
  },
  buttonText: {
    color: 'white',
    fontSize: typography.input,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
});

export default function AddTodoScreen({ navigation }: Props): React.JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { addTodo } = useTodos();

  const handleSave = async (): Promise<void> => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Validation Error', 'Title and Description cannot be empty.');
      return;
    }
    await addTodo(title, description);
    Alert.alert('Success', 'Todo Added Successfully.');
    setTitle('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#9E9E9E"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Description"
        placeholderTextColor="#9E9E9E"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        maxLength={500}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Ionicons name="save" size={20} color="white" />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
