import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { getDoc, doc, collection, getDocs, query } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { CIcon } from '@coreui/icons-react';
import * as icon from '@coreui/icons';
export default function Passwords() {

    const [allData, setAllData] = useState([])
    const [selectedWebsite, setSelectedWebsite] = useState(null); // Track selected website to show/hide accounts
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState(false)
    let count = 0
    const {   currentUser,
        setCurrentUser,
        signUp,
        logOut,
        logIn,
        url,
        setUrl,
        setWebsites,
        websites,
        fetchData,
    accounts,
setAccounts} = useAuth()
        console.log(websites)
        
        useEffect(()=>{  
          console.log("useeffect ran in data fetch")      
          if(currentUser){  
            fetchData()   
          }      
        }, [currentUser, refresh])   

        useEffect(() => {
          if (websites && websites.length > 0) {
              const fetchAccounts = async () => {
                  const accountsData = {};
                  await Promise.all(
                      websites.map(async (website) => {
                          console.log(`Fetching accounts for website: ${website}`);
                          const q = query(collection(db, "users", currentUser, "websites", website, "accounts"));
                          const querySnapshot = await getDocs(q);
                          accountsData[website] = querySnapshot.docs.map((doc) => ({
                              id: doc.id,
                              ...doc.data(),
                          }));
                      })
                  );
                  console.log("Accounts data fetched:", accountsData);
                  setError(false);
                  setRefresh(false)
                  setAccounts(accountsData); // Update state after data fetching
              };
              fetchAccounts();
          } else {
            setError(true);
              console.log("No websites data to fetch accounts for.");
          }
      }, [websites, refresh]); // Trigger re-fetch when `websites` or `currentUser` changes
  
      console.log("Accounts:", accounts)
        
       
    //     const passwordData = {}
    //     async function getAccountsData(){
    //         for(const website of websiteData){
    //             const collectionRef = collection(db, "users", currentUser, "websites", website, "accounts")
    //             const querySnapShot = await getDocs(collectionRef)
    
    //            querySnapShot.forEach((doc)=>{
    //             // console.log(doc.id, "=>", doc.data())
    //              passwordData[doc.data()["websiteUrl"]] = {
    //                 data : {
    //                     userName : doc.data()["userName"],
    //                     password : doc.data
    //                 }

    //              }   
    //            })
    //         }
    //     }
    //     async function fetchData(){
    //     const data = []
    //     const collectionRef = collection(db, "users", currentUser, "websites")
    //     const querySnapShot = await getDocs(collectionRef)
        
    //     querySnapShot.forEach((doc)=>{
    //         data.push(doc.id)
    //     })

    //     setWebsiteData([...new Set([...data])])
    //     // getAccountsData()
    // }
    const handleWebsiteClick = (website) => {
      setSelectedWebsite(selectedWebsite === website ? null : website); // Toggle the selected website
  };


  return (
    <>
        <div className='flex flex-col max-w-custom mx-auto border-2 gap-7 rounded-2xl px-10 py-6'>
           <div className='flex w-full  justify-between border-b-2 pb-6'>
            { accounts && Object.keys(accounts).length > 0 ? (<h1 className=' text-2xl '>{Object.values(accounts).reduce((acc, accList)=> acc + accList.length, 0)} Passwords</h1>)
            :
            (<h1 className=' text-2xl '>Calculating passwords....</h1>)}
              <button className='hover:bg-slate-100' onClick={()=>{
                setRefresh(prev => !prev)
              }}>Refersh</button>
           </div>
           <div>
           {accounts &&  Object.keys(accounts).length > 0 && refresh == false && error == false ? (
                    Object.entries(accounts).map(([website, accountList]) => (
                        <div key={website}>
                            <div
                                className='flex justify-between cursor-pointer hover:bg-gray-100 p-2 rounded'
                                onClick={() => handleWebsiteClick(website)}
                            >
                                <h2>{website}</h2>
                                <span>({accountList.length} accounts)</span>
                            </div>

                            {/* Show account details when the website is clicked */}
                            {selectedWebsite === website && (
                                <div className='pl-4'>
                                    {accountList.map((account) => (
                                        <div key={account.id} className='my-2'>
                                            <p><strong>UserName:</strong> {account.userName}</p>
                                            <p><strong>Password:</strong> {account.password}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (  
                    error == true ? (<p className='text-center'>No accounts to fetch data from...</p>):
                        (<p>Fetching data from database</p>)
                    
                )}
           </div>
        </div> 
    </>
  )
}
