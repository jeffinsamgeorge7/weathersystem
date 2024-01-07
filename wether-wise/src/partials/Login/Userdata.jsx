import React, { useState, useEffect } from 'react';
import { gb } from './firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function Userdatas(){

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
  
    const handleDelete = async (id) => {
      try {
        await deleteDoc(doc(gb, 'users', id));
        setData(prevData => prevData.filter(item => item.id !== id));
        console.log('Document successfully deleted!');
      } catch (error) {
        console.error('Error deleting document:', error.message);
      }
    };
  
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
  
    return(
        <>
        <div class="flex flex-col">
  <div class="-m-1.5 overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
              <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Address</th>
              <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Email</th>
              <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map(item => (
            <tr class="hover:bg-gray-100 dark:hover:bg-gray-700" key={item.id}>
              
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
              {editingId === item.id ? (
                  <input class="text-black"
                    type="text"
                    value={updatedData.name}
                    onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
              {editingId === item.id ? (
                  <input class="text-black"
                    type="text"
                    value={updatedData.address}
                    onChange={(e) => setUpdatedData({ ...updatedData, address: e.target.value })}
                  />
                ) : (
                  item.address
                )}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
              {editingId === item.id ? (
                  <input class="text-black"
                    type="text"
                    value={updatedData.email}
                    onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                  />
                ) : (
                  item.email
                )}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
              {editingId === item.id ? (
                  <input class="text-black"
                    type="text"
                    value={updatedData.phone}
                    onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })}
                  />
                ) : (
                  item.phone
                )}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
              {editingId === item.id ? (
                  <>
                    <button onClick={() => handleUpdate(item.id, updatedData)} className="text-green-600">Save</button><br/>
                    <button onClick={handleCancelEdit} className="ml-2">Cancel</button><br/>
                  </>
                ) : (
                <button onClick={() => handleEdit(item.id, item)}  type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Edit</button>
                )}
                <br/>
                <button onClick={() => handleDelete(item.id)} type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent  disabled:opacity-50 disabled:pointer-events-none  text-red-300 hover:text-red-500  dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Delete</button>
              </td>
            </tr>
          

          ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        </>
    )
}