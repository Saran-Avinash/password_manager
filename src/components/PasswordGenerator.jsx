import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [purpose, setPurpose] = useState('');

  // Character pools
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+{}:"<>?[];,./';

  // Password generation function
  const generatePassword = () => {
    const length = 12; // Fixed length
    const charPool = lowercaseLetters + uppercaseLetters + numbers + symbols;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool[randomIndex];
    }

    setPassword(newPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Password Generator
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Purpose of the Password</span>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g., email, bank account"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>

        <button
          onClick={generatePassword}
          className="w-full bg-indigo-600 text-white py-2 rounded-md text-lg font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Generate Password
        </button>

        {password && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Generated Password for "{purpose}":</h3>
            <p className="mt-2 text-lg font-bold text-indigo-600 break-words">{password}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
