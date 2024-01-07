import React from 'react';
import { auth,gb } from './firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function RegisterAndLogin() {

  const history = useNavigate();
  //const [error, setError] = useState(null); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const address = e.target.address.value;
    const phoneNumber = e.target.phone.value;

    createUserWithEmailAndPassword(auth, email, password,name,address,phoneNumber)
      .then(async (userCredential) => {
        const user = userCredential.user;
        
        // Create a user document in Firestore with additional fields
        const userDocRef = await addDoc(collection(gb, 'users'), {
          uid: user.uid,
          email: email,
          name: name,
          address: address,
          phone: phoneNumber,
          createdAt: serverTimestamp(),
        });

        console.log('User registered successfully:', user);
        console.log('User document added to Firestore:', userDocRef.id);

        //history("/admin-dashboard");
        
      })
      .catch(error => {
        console.error('Error registering user:', error.message);
        //setError(error.message);
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Staff Registration</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 " onSubmit={(e) => handleSubmit(e)}>
            <div className="grid grid-cols-2 gap-4">
            <div >
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">Full Name</label>
              <div className="mt-2">
                <input id="name" name="name" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-white">Address</label>
              <div className="mt-2">
                <input id="address" name="address" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-white">Phone Number</label>
              <div className="mt-2">
                <input id="phone" name="phone" type="tel" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
        <div className="mt-2">
          <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Password</label>
         
        </div>
        <div className="mt-2">
          <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
      
    </form> 
    </div>
 
</div>
        </>
    )
}
export default RegisterAndLogin ;