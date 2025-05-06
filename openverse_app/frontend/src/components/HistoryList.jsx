import { useEffect, useState } from 'react';
import API from '../api';

export default function HistoryList() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get('/search/history')
      .then((res) => setHistory(res.data))
      .catch(() => setHistory([]));
  }, []);

  if (!history.length) return <p className="text-sm text-gray-500">No search history found.</p>;

  return (
    <ul className="text-sm list-disc ml-5">
      {history.map((entry, index) => (
        <li key={index}>
          {entry.query} — {new Date(entry.timestamp).toLocaleString()}
        </li>
      ))}
    </ul>
  );
}
