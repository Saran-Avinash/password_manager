import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PasswordGenerator = ({}) => {
  const navigate = useNavigate()
  const {  currentUser,
    setCurrentUser,
    signUp,
    logOut,
    logIn,
    url,
    setUrl,
    setWebsites,
    websites,
    fetchData} = useAuth()
  const [password, setPassword] = useState('');
  const [purpose, setPurpose] = useState('');
  const [length, setLength] = useState(10);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');

  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+{}:"<>?[];,./';

  useEffect(()=>{
    if(currentUser == null){
      navigate('/login')
    }
  }, [currentUser])
  const generatePassword = () => {
    let charPool = '';
    if (includeLowercase) charPool += lowercaseLetters;
    if (includeUppercase) charPool += uppercaseLetters;
    if (includeNumbers) charPool += numbers;
    if (includeSymbols) charPool += symbols;

    if (charPool === '') {
      alert("Please select at least one character type!");
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool[randomIndex];
    }

    setPassword(newPassword);

    if (includeLowercase && includeUppercase && includeNumbers && includeSymbols) {
      setPasswordStrength('strong');
    } else {
      setPasswordStrength('weak');
    }
  };

  const passwordBorderClass = passwordStrength === 'strong' ? 'border-green-500' : 'border-red-500';

  return (
    <>
      <Navbar/>
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

          <label className="block mb-4">
            <span className="text-gray-700 font-medium">Password Length</span>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min="4"
              max="20"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Include Lowercase Letters</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-gray-700"> Include Uppercase Letters</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Add Numbers</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Need Symbols</span>r
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full bg-indigo-600 text-white py-2 rounded-md text-lg font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Generate Password
          </button>

          {password && (
            <div className={`mt-6 text-center border-2 p-3 rounded-md ${passwordBorderClass}`}>
              <h3 className="text-lg font-semibold text-gray-700">Generated Password for "{purpose}":</h3>
              <p className="mt-2 text-lg font-bold text-indigo-600 break-words">{password}</p>
              <p className="mt-2 text-md font-medium text-gray-600">
                This password is {passwordStrength}.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordGenerator;
