import { parseAsString, useQueryState } from 'nuqs';

import { TodoInput } from './components/shared/todo-input';
import { TodoList } from './components/shared/todo-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { useTodoStore } from './store/todo.store';

import './app.css';

const App = () => {
  const [tab, setTab] = useQueryState('tab', parseAsString.withDefault('all'));

  const { todos, addTodo, toggleTodo, deleteTodo, updateTodoText } = useTodoStore();

  const activeTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <div className='container mx-auto flex max-w-2xl flex-col gap-y-3 py-10'>
      <h1 className='text-center text-3xl font-bold'>Todo App</h1>

      <TodoInput onAdd={addTodo} />

      <Tabs defaultValue='all' value={tab} onValueChange={setTab}>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='all'>
            All (
            {todos.length}
            )
          </TabsTrigger>
          <TabsTrigger value='active'>
            Active (
            {activeTodos.length}
            )
          </TabsTrigger>
          <TabsTrigger value='completed'>
            Completed (
            {completedTodos.length}
            )
          </TabsTrigger>
        </TabsList>

        <TabsContent className='mt-4' value='all'>
          <TodoList
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onUpdate={updateTodoText}
            todos={todos}
          />
        </TabsContent>

        <TabsContent className='mt-4' value='active'>
          <TodoList
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onUpdate={updateTodoText}
            todos={activeTodos}
          />
        </TabsContent>

        <TabsContent className='mt-4' value='completed'>
          <TodoList
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onUpdate={updateTodoText}
            todos={completedTodos}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
