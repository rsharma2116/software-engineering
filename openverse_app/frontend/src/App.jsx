import { useState, useEffect } from 'react';
import API from './api';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SearchForm from './components/SearchForm';
import MediaResults from './components/MediaResults';
import HistoryList from './components/HistoryList';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [results, setResults] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setResults([]);
  };

  useEffect(() => {
    document.title = 'Openverse Media Search';
  }, []);

  if (!loggedIn) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Openverse App</h1>
        <RegisterForm />
        <LoginForm onLogin={() => setLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Openverse Media Search</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
          Logout
        </button>
      </div>

      <SearchForm setResults={setResults} />
      {results.length > 0 && <MediaResults results={results} />}
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Recent Searches</h2>
        <HistoryList />
      </div>
    </div>
  );
}
