import { beforeEach, describe, expect, it } from 'vitest';

import { useTodoStore } from './todo.store';

describe('todo Store', () => {
  beforeEach(() => {
    useTodoStore.setState({
      todos: []
    });
  });

  it('should initialize with empty todos', () => {
    const state = useTodoStore.getState();
    expect(state.todos).toEqual([]);
  });

  it('should add a new todo', () => {
    const { addTodo } = useTodoStore.getState();

    addTodo('Test todo');

    const { todos } = useTodoStore.getState();
    expect(todos).toHaveLength(1);
    expect(todos[0]).toMatchObject({
      text: 'Test todo',
      isCompleted: false
    });
    expect(todos[0].id).toBeDefined();
    expect(todos[0].createdAt).toBeInstanceOf(Date);
  });

  it('should toggle todo completion status', () => {
    const { addTodo, toggleTodo } = useTodoStore.getState();

    addTodo('Test todo');
    const { todos: initialTodos } = useTodoStore.getState();
    const todoId = initialTodos[0].id;

    toggleTodo(todoId);

    const { todos } = useTodoStore.getState();
    expect(todos[0].isCompleted).toBe(true);

    toggleTodo(todoId);
    expect(useTodoStore.getState().todos[0].isCompleted).toBe(false);
  });

  it('should delete a todo', () => {
    const { addTodo, deleteTodo } = useTodoStore.getState();

    addTodo('Test todo');
    const { todos: initialTodos } = useTodoStore.getState();
    const todoId = initialTodos[0].id;

    deleteTodo(todoId);

    const { todos } = useTodoStore.getState();
    expect(todos).toHaveLength(0);
  });

  it('should update todo text', () => {
    const { addTodo, updateTodoText } = useTodoStore.getState();

    addTodo('Test todo');
    const { todos: initialTodos } = useTodoStore.getState();
    const todoId = initialTodos[0].id;

    updateTodoText(todoId, 'Updated todo');

    const { todos } = useTodoStore.getState();
    expect(todos[0].text).toBe('Updated todo');
  });

  it('should handle multiple todos', () => {
    const { addTodo } = useTodoStore.getState();

    addTodo('First todo');
    addTodo('Second todo');
    addTodo('Third todo');

    const { todos } = useTodoStore.getState();
    expect(todos).toHaveLength(3);
    expect(todos.map((todo) => todo.text)).toEqual([
      'First todo',
      'Second todo',
      'Third todo'
    ]);
  });
});
