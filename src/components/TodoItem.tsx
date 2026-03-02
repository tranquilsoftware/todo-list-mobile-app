import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Todo } from '../types';

interface Props {
  item: Todo;
  onFinish: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ item, onFinish, onDelete }: Props): React.JSX.Element {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={[styles.title, item.finished && styles.finishedTitle]} numberOfLines={1}>
          {item.title}
        </Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#666"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.body}>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.controlPanel}>
            {!item.finished && (
              <TouchableOpacity
                onPress={() => onFinish(item.id)}
                style={styles.iconButton}
                activeOpacity={0.7}
              >
                <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Ionicons name="trash" size={32} color="#f44336" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
    color: '#212121',
  },
  finishedTitle: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  description: {
    fontSize: 14,
    color: '#616161',
    marginTop: 12,
    marginBottom: 12,
    lineHeight: 20,
  },
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
});
