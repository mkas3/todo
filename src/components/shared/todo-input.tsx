import { useState } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

type TodoInputProps = React.ComponentProps<'form'> & {
  onAdd: (text: string) => void;
};

export const TodoInput = ({ onAdd, ...props }: TodoInputProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAdd(text);
    setText('');
  };

  return (
    <form className='flex gap-2' onSubmit={handleSubmit} {...props}>
      <Input
        className='flex-1'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Add a new todo...'
      />
      <Button type='submit'>Add</Button>
    </form>
  );
};
