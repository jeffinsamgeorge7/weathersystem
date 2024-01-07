import React, { useState, useEffect } from 'react';
import { gb } from './firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function DisplayData() {
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

  return (
    <div className="container mx-auto px-4"><br/>
      <h2 className="text-2xl font-bold mb-4" align="center">STAFF DATA</h2><br/>
      <table className=" bg-white border border-gray-300 table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={updatedData.name}
                    onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={updatedData.address}
                    onChange={(e) => setUpdatedData({ ...updatedData, address: e.target.value })}
                  />
                ) : (
                  item.address
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={updatedData.email}
                    onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                  />
                ) : (
                  item.email
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={updatedData.phone}
                    onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })}
                  />
                ) : (
                  item.phone
                )}
              </td>
              
              <td className="py-2 px-4 border-b">
                {editingId === item.id ? (
                  <>
                    <button onClick={() => handleUpdate(item.id, updatedData)} className="text-green-600">Save</button><br/>
                    <button onClick={handleCancelEdit} className="ml-2">Cancel</button><br/>
                  </>
                ) : (
                  <button onClick={() => handleEdit(item.id, item)} className="text-blue-600">Edit</button>
                )}
                <button onClick={() => handleDelete(item.id)} className="ml-2 text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayData;