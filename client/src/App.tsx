import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { axiosUsersApi } from './utils/axios';

type User = { id: number; firstName: string; lastName: string };
function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    axiosUsersApi
      .get('/')
      .then((data) => {
        if (data) {
          setUsers(data.data);
          console.log(data.data);
        }
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <div>
          {users.map((user, index) => (
            <div key={index}>{user.firstName}</div>
          ))}
        </div>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
