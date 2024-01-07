import React, { useState, useEffect } from 'react';
import { gb } from './firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';




function DashboardCard10() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    id: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(gb, 'users'));
        const fetchedData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error.message);
      }
    };
    fetchData();
  }, []); 

  const handleUpdate = async (id, newData) => {
    try {
      await updateDoc(doc(gb, 'users', id), newData);
      setData(prevData => {
        const updatedData = [...prevData];
        const index = updatedData.findIndex(item => item.id === id);
        updatedData[index] = { ...updatedData[index], ...newData };
        return updatedData;
      });
      console.log('Document successfully updated!');
      setEditingId(null);
      setUpdatedData({
        id: '',
        name: '',
        address: '',
        email: '',
        phone: '',
        password: '',
      });
    } catch (error) {
      console.error('Error updating document:', error.message);
    }
  };

  const handleEdit = (id, currentData) => {
    setEditingId(id);
    setUpdatedData(currentData);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setUpdatedData({
      id: '',
      name: '',
      address: '',
      email: '',
      phone: '',
      password: '',
    });
  };


  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Employees</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Address</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Phone</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                data.map(item =>  {
                  return (
                    <tr key={item.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                          <div className="text-left">{item.name}</div>
                          </div>
                          
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{item.address}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{item.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{item.phone}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
