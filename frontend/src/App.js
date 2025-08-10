import  { useState } from 'react';
import './App.css';
import Todos from './Todos';
import Login from './Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <h1>My NestJS + React Todo App</h1>
      {loggedIn ? (
        <Todos />
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
