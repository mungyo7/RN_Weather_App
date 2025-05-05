import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ id, text, completed, onToggle, onDelete }: TodoItemProps) => {
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.checkboxContainer} onPress={() => onToggle(id)}>
        <View style={[styles.checkbox, completed && styles.checkboxChecked]}>
          {completed && <IconSymbol name="checkmark" size={16} color="white" />}
        </View>
        <ThemedText style={[styles.text, completed && styles.textCompleted]}>
          {text}
        </ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => onDelete(id)} style={styles.deleteButton}>
        <IconSymbol name="trash" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteButton: {
    padding: 8,
  },
}); 