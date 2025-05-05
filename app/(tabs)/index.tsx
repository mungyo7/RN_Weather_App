import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TodoItem } from '@/components/TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    
    const newTodoItem: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
        contentContainerStyle={styles.keyboardAvoidingContent}
      >
        <ThemedText type="title" style={styles.title}>할 일 목록</ThemedText>
        
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TodoItem
              id={item.id}
              text={item.text}
              completed={item.completed}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          )}
          style={styles.list}
          ListEmptyComponent={
            <ThemedView style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>할 일이 없습니다. 새로운 할 일을 추가하세요!</ThemedText>
            </ThemedView>
          }
        />
        
        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newTodo}
            onChangeText={setNewTodo}
            placeholder="새로운 할 일 입력..."
            placeholderTextColor="#999"
            returnKeyType="done"
            blurOnSubmit={false}
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={addTodo}
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={addTodo}
          >
            <ThemedText style={styles.addButtonText}>추가</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginTop: Platform.OS === 'ios' ? 20 : 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.6,
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    marginBottom: Platform.OS === 'ios' ? 70 : 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  keyboardAvoidingContent: {
    flex: 1,
  },
});
