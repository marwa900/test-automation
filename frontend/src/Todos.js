import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:4000/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const res = await axios.post('http://localhost:4000/todos', { text: newText });
    setTodos([...todos, res.data]);
    setNewText('');
  };

  const editTodo = async (id) => {
    const newText = prompt('Edit todo');
    if (!newText) return;
    const res = await axios.put(`http://localhost:4000/todos/${id}`, { text: newText });
    setTodos(todos.map(t => (t.id === id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:4000/todos/${id}`);
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>Todos</h2>
      <input
        value={newText}
        onChange={e => setNewText(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.text}{' '}
            <button onClick={() => editTodo(t.id)}>Edit</button>
           <button onClick={() => deleteTodo(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
