import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';

import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import App from './app';
import { useTodoStore } from './store/todo.store';

describe('app', () => {
  beforeEach(() => {
    const store = useTodoStore.getState();
    store.todos.forEach((todo) => store.deleteTodo(todo.id));
  });

  it('shows empty state when no todos exist', () => {
    render(<App />);
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it('should add a new todo', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByRole('button', { name: /add/i });

    await act(async () => {
      await userEvent.type(input, 'Test todo');
      fireEvent.click(button);
    });

    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('should toggle todo completion', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByRole('button', { name: /add/i });

    await act(async () => {
      await userEvent.type(input, 'Test todo');
      fireEvent.click(button);
    });

    const checkbox = screen.getByRole('checkbox');

    act(() => {
      fireEvent.click(checkbox);
    });

    const completedTab = screen.getByRole('tab', { name: /completed/i });

    act(() => {
      fireEvent.click(completedTab);
    });

    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('allows deleting a todo', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/add a new todo/i);

    await act(async () => {
      await userEvent.type(input, 'Learn Testing{enter}');
    });

    const deleteButton = screen.getByRole('button', { name: /delete/i });

    await act(async () => {
      await userEvent.click(deleteButton);
    });

    expect(screen.queryByText('Learn Testing')).not.toBeInTheDocument();
  });
});
