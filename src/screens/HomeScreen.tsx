import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
import { View, SectionList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import TodoItem from '../components/TodoItem';
import { useTodos } from '../hooks/useTodos';
import { colors, spacing, typography } from '../theme';
import { Todo, RootStackParamList } from '../types';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
}

interface Section {
  title: string;
  data: Todo[];
}

export default function HomeScreen({ navigation, route }: Props): React.JSX.Element {
  const { todos, reload, finishTodo, deleteTodo } = useTodos();

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  useEffect(() => {
    if (route.params?.successMessage) {
      Toast.show({
        type: 'success',
        text1: route.params.successMessage,
        visibilityTime: 3000,
      });
      navigation.setParams({ successMessage: undefined });
    }
  }, [route.params?.successMessage, navigation]);

  const activeTodos = todos.filter((t) => !t.finished);
  const completedTodos = todos.filter((t) => t.finished);

  const sections: Section[] = [
    { title: 'Todo', data: activeTodos },
    { title: 'Completed', data: completedTodos },
  ];

  const renderItem = ({ item }: { item: Todo }): React.JSX.Element => (
    <TodoItem item={item} onFinish={finishTodo} onDelete={deleteTodo} />
  );

  const renderSectionHeader = ({
    section,
  }: {
    section: Section;
  }): React.JSX.Element => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionCount}>{section.data.length}</Text>
    </View>
  );

  const renderSectionFooter = ({
    section,
  }: {
    section: Section;
  }): React.JSX.Element | null => {
    if (section.data.length > 0) return null;
    return (
      <Text style={styles.emptySection}>
        {section.title === 'Todo' ? 'No active todos.' : 'No completed todos yet.'}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
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
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.title,
    fontWeight: '700',
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionCount: {
    fontSize: typography.body,
    color: colors.textMuted,
    fontWeight: '600',
  },
  emptySection: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: typography.body,
    paddingVertical: spacing.lg,
  },
  addButton: {
    backgroundColor: colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: 8,
    marginTop: spacing.sm,
  },
  addButtonText: {
    color: 'white',
    fontSize: typography.title,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
});
