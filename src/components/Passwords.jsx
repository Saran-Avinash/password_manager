import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, collection, getDocs, query, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function Passwords() {
    const [selectedWebsite, setSelectedWebsite] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [editedPassword, setEditedPassword] = useState('');

    const { currentUser, websites, fetchData, accounts, setAccounts, setWebsites } = useAuth();

    useEffect(() => {  
        if (currentUser) {  
            fetchData();
        }
    }, [currentUser, refresh]);

    useEffect(() => {
        if (websites && websites.length > 0) {
            const fetchAccounts = async () => {
                const accountsData = {};
                await Promise.all(
                    websites.map(async (website) => {
                        const q = query(collection(db, "users", currentUser, "websites", website, "accounts"));
                        const querySnapshot = await getDocs(q);
                        accountsData[website] = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                    })
                );
                setError(false);
                setRefresh(false);
                setAccounts(accountsData);
            };
            fetchAccounts();
        } else {
            setError(true);
        }
    }, [websites, refresh]);

    const handleWebsiteClick = (website) => {
        setSelectedWebsite(selectedWebsite === website ? null : website);
    };

    const handleEditClick = (account) => {
        setEditingAccount(account);
        setEditedPassword(account.password);
    };

    const handleSave = async () => {
        if (editingAccount) {
            try {
                const accountRef = doc(db, "users", currentUser, "websites", selectedWebsite, "accounts", editingAccount.id);
                await updateDoc(accountRef, { password: editedPassword });
                setRefresh((prev) => !prev);
                setEditingAccount(null);
            } catch (error) {
                console.error("Error updating password:", error);
            }
        }
    };

    const handleDelete = async (accountId) => {
        try {
            const accountRef = doc(db, "users", currentUser, "websites", selectedWebsite, "accounts", accountId);
            await deleteDoc(accountRef);
            const updatedAccounts = accounts[selectedWebsite].filter(account => account.id !== accountId);

            if (updatedAccounts.length === 0) {
                // Delete website if no accounts left
                const websiteRef = doc(db, "users", currentUser, "websites", selectedWebsite);
                await deleteDoc(websiteRef);
                setWebsites(websites.filter(website => website !== selectedWebsite));
                setSelectedWebsite(null); // Close accounts list if website is deleted
            } else {
                // Update accounts state for the selected website
                setAccounts((prev) => ({
                    ...prev,
                    [selectedWebsite]: updatedAccounts,
                }));
            }

            setRefresh((prev) => !prev);
        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    return (
        <>
            <div className='flex flex-col max-w-custom mx-auto border-2 gap-7 rounded-2xl px-10 py-6'>
                <div className='flex w-full justify-between border-b-2 pb-6'>
                    <h1 className='text-2xl'>{accounts && Object.values(accounts).reduce((acc, accList) => acc + accList.length, 0)} Passwords</h1>
                    <button className='hover:bg-slate-100' onClick={() => setRefresh(prev => !prev)}>Refresh</button>
                </div>
                <div>
                    {accounts && Object.keys(accounts).length > 0 && !refresh && !error ? (
                        Object.entries(accounts).map(([website, accountList]) => (
                            <div key={website}>
                                <div
                                    className='flex justify-between cursor-pointer hover:bg-gray-100 p-2 rounded'
                                    onClick={() => handleWebsiteClick(website)}
                                >
                                    <h2>{website}</h2>
                                    <span>({accountList.length} accounts)</span>
                                </div>
                                {selectedWebsite === website && (
                                    <div className='pl-4'>
                                        {accountList.map((account) => (
                                            <div key={account.id} className='my-2'>
                                                <p><strong>UserName:</strong> {account.userName}</p>
                                                <p><strong>Password:</strong> {account.password}</p>
                                                <button className='px-4 py-2 my-5 text-black  bg-green-400 hover:bg-white hover:shadow-xl hover:text-green-800' onClick={() => handleEditClick(account)}>Edit</button>
                                                <button className='px-4 py-2 my-5 text-black bg-red-400 hover:bg-white hover:shadow-xl hover:text-red-800 ml-2' onClick={() => handleDelete(account.id)}>Delete</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        error ? (
                            <p className='text-center text-red-600'>No accounts to fetch data from...</p>
                        ) : (
                            <p className='text-center text-green-600'>Fetching data from database</p>
                        )
                    )}
                </div>
            </div>

            {editingAccount && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
                    <div className='bg-white p-5 rounded'>
                        <h2>Edit Password for {editingAccount.userName}</h2>
                        <input
                            type='text'
                            value={editedPassword}
                            onChange={(e) => setEditedPassword(e.target.value)}
                            className='border p-2 rounded w-full'
                        />
                        <button onClick={handleSave} className='bg-blue-500 text-white p-2 rounded mt-2'>Save</button>
                        <button onClick={() => setEditingAccount(null)} className='text-red-500 p-2 rounded mt-2'>Cancel</button>
                    </div>
                </div>
            )}
        </>
    );
}
