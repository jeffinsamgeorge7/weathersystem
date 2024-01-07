import React, { useState } from 'react';

const AddEmployeePage = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleInputChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });

    setErrorMessages({
      ...errorMessages,
      [e.target.name]: '', // Clear previous error messages when the user starts typing
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!employeeData.email.includes('@')) {
      setErrorMessages({
        ...errorMessages,
        email: 'Email must contain "@" symbol.',
      });
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$^&*+=]).{8,}$/;
    if (!passwordRegex.test(employeeData.password)) {
      setErrorMessages({
        ...errorMessages,
        password: 'Password must be at least 8 characters and include lowercase, uppercase, number, and special character.',
      });
      return;
    }

    // Validate phone number
    const phoneRegex = /^91\d{10}$/;
    if (!phoneRegex.test(employeeData.phoneNumber)) {
      setErrorMessages({
        ...errorMessages,
        phoneNumber: 'Phone number must start with country code 91 and be 10 digits long.',
      });
      return;
    }

    // If all validations pass, you can submit the form or perform other actions
    console.log('Form submitted:', employeeData);
  };

  return (
    <div className="container mx-auto mt-8">
      <form className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="text-sm font-semibold text-gray-600 block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employeeData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="text-sm font-semibold text-gray-600 block">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
            className={`w-full p-2 border border-gray-300 rounded mt-1 ${errorMessages.email && 'border-red-500'}`}
            required
          />
          {errorMessages.email && <p className="text-red-500 text-xs mt-1">{errorMessages.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-sm font-semibold text-gray-600 block">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={employeeData.password}
            onChange={handleInputChange}
            className={`w-full p-2 border border-gray-300 rounded mt-1 ${errorMessages.password && 'border-red-500'}`}
            required
          />
          {errorMessages.password && <p className="text-red-500 text-xs mt-1">{errorMessages.password}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-600 block">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={employeeData.phoneNumber}
            onChange={handleInputChange}
            className={`w-full p-2 border border-gray-300 rounded mt-1 ${errorMessages.phoneNumber && 'border-red-500'}`}
            required
          />
          {errorMessages.phoneNumber && <p className="text-red-500 text-xs mt-1">{errorMessages.phoneNumber}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default AddEmployeePage;