import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colors, radii, shadows, spacing, typography } from '../theme';
import { Todo } from '../types';

interface Props {
  item: Todo;
  onFinish: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ item, onFinish, onDelete }: Props): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoHeader}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={[styles.title, item.finished && styles.finishedTitle]} numberOfLines={1}>
          {item.title}
        </Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.icon}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.todoBody}>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.controlPanel}>
            {!item.finished && (
              <TouchableOpacity
                onPress={() => onFinish(item.id)}
                style={styles.iconButton}
                activeOpacity={0.7}
              >
                <Ionicons name="checkmark-circle" size={32} color={colors.success} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Ionicons name="trash" size={32} color={colors.danger} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
    ...shadows.card,
    overflow: 'hidden',
  },
  todoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '500',
    flex: 1,
    marginRight: spacing.sm,
    color: colors.textPrimary,
  },
  finishedTitle: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  todoBody: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  description: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    lineHeight: typography.lineHeightBody,
  },
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: spacing.lg,
    padding: spacing.xs,
  },
});
