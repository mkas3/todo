import type { Todo } from '@/types/todo.type';

import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
};

export const TodoList = ({ todos, onToggle, onDelete, onUpdate }: TodoListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleEditStart = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = (id: string) => {
    if (editText.trim()) {
      onUpdate(id, editText.trim());
    }
    setEditingId(null);
  };

  if (todos.length === 0)
    return <div className='flex w-full items-center justify-center text-muted-foreground'>No todos yet</div>;

  return (
    <ul className='space-y-2'>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className='flex items-center gap-x-3 rounded-lg'
        >
          <Checkbox
            checked={todo.isCompleted}
            onCheckedChange={() => onToggle(todo.id)}
          />

          {editingId === todo.id
            ? (
                <div className='flex flex-1 items-center gap-x-2'>
                  <Input
                    value={editText}
                    autoComplete='off'
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEditSave(todo.id)}
                  />
                  <Button
                    variant='default'
                    onClick={() => handleEditSave(todo.id)}
                  >
                    Save
                  </Button>
                  <Button
                    variant='ghost'
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              )
            : (
                <>
                  <Button
                    className={cn(
                      'flex-1 cursor-pointer text-start justify-start',
                      todo.isCompleted ? 'text-muted-foreground line-through' : ''
                    )}
                    variant='ghost'
                    onClick={() => handleEditStart(todo)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEditStart(todo)}
                  >
                    {todo.text}
                  </Button>
                  <Button
                    size='icon'
                    variant='ghost'
                    onClick={() => onDelete(todo.id)}
                  >
                    <Trash2Icon className='size-4' />
                    <span className='sr-only'>Delete</span>
                  </Button>
                </>
              )}
        </li>
      ))}
    </ul>
  );
};
