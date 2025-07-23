'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface BusType {
  BusTypeID: string;
  BusType: string;
}

export default function BusTypeForm() {
  const [busType, setBusType] = useState<BusType[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://rta-backend-1.onrender.com/api/busType/get')
      .then((res) => {
        setBusType(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load bus types.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) {
      alert('Please select a bus type before submitting.');
      return;
    }
    console.log('Selected:', selectedOption);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-cyan-300 to-indigo-300 font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Select a Bus Type</h2>

        {loading ? (
          <p className="text-blue-600 text-center font-semibold">Loading...</p>
        ) : error ? (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        ) : (
          <div className="flex flex-col gap-3 mb-6">
            {busType.map((item) => (
              <label key={item.BusTypeID} className="flex items-center gap-3 font-medium text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="busType"
                  checked={selectedOption === item.BusType}
                  id={item.BusTypeID}
                  onChange={() => setSelectedOption(item.BusType)}
                  className="w-5 h-5"
                />
                {item.BusType}
              </label>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
