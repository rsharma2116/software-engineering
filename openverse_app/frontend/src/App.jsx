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
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
        style={{ backgroundImage: "url('/login-bg.jpg')" }}
      >
        <div className="bg-blue-500 bg-opacity-80 p-10 md:p-12 rounded-lg shadow-xl w-full max-w-lg text-white">
          <h1 className="text-3xl font-bold mb-6 text-center">OPENVERSE LOGIN</h1>
          <RegisterForm />
          <LoginForm onLogin={() => setLoggedIn(true)} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: "url('/search-bg.jpg')" }}
    >
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-800">Openverse Media Search</h1>
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
    </div>
  );
}
