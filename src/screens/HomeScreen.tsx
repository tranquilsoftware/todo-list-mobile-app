import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

import TodoItem from '../components/TodoItem';
import { useTodos } from '../hooks/useTodos';
import { Todo, RootStackParamList } from '../types';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export default function HomeScreen({ navigation }: Props): React.JSX.Element {
  const { todos, reload, finishTodo, deleteTodo } = useTodos();

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const renderItem = ({ item }: { item: Todo }): React.JSX.Element => (
    <TodoItem item={item} onFinish={finishTodo} onDelete={deleteTodo} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No todos yet. Tap below to add one!</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTodo')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Add New Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9E9E9E',
    marginTop: 60,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
