import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Firestore functions
import { auth } from '../firebaseConfig'; // Firebase config

const db = getFirestore(); // Firestore instance

function Form({ setIsLoggedIn }) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [isSignUp, setIsSignUp] = useState(false);

   const handleSubmit = (e) => {
       e.preventDefault();
       setError('');

       if (isSignUp) {
           createUserWithEmailAndPassword(auth, email, password)
               .then(async (userCredential) => {
                   console.log("User signed up:", userCredential.user);
                   
                   // User Profile Data
                   const userProfile = {
                       email: email,
                       preferences: [], // Yahan user preferences store kar sakte hain
                       orderHistory: [], // Yahan user order history store kar sakte hain
                       savedItems: [] // Yahan saved items store kar sakte hain
                   };

                   // Firestore mein user profile ko save karein
                   await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);

                   setIsLoggedIn(true); // Set logged in state to true
               })
               .catch((error) => {
                   console.error("Error signing up:", error);
                   setError("Error creating account: " + error.message);
               });
       } else {
           signInWithEmailAndPassword(auth, email, password)
               .then((userCredential) => {
                   console.log("User signed in:", userCredential.user);
                   setIsLoggedIn(true); // Set logged in state to true
               })
               .catch((error) => {
                   console.error("Error signing in:", error);
                   setError("Invalid email or password: " + error.message);
               });
       }
   };

   return (
       <div className="container mt-5">
           <div className="row justify-content-center">
               <div className="col-md-6">
                   <div className="card p-4">
                       <h3 className="card-title text-center">{isSignUp ? "Sign Up" : "Login"}</h3>
                       <form onSubmit={handleSubmit}>
                           {error && <p className="text-danger text-center">{error}</p>}
                           <div className="form-group mb-3">
                               <label htmlFor="email">Email address</label>
                               <input
                                   type="email"
                                   className="form-control"
                                   id="email"
                                   placeholder="Enter email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required
                               />
                           </div>
                           <div className="form-group mb-3">
                               <label htmlFor="password">Password</label>
                               <input
                                   type="password"
                                   className="form-control"
                                   id="password"
                                   placeholder="Password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                               />
                           </div>
                           <button type="submit" className="btn btn-primary w-100">
                               {isSignUp ? "Sign Up" : "Login"}
                           </button>
                           <div className="mt-2 text-center">
                               <button
                                   type="button"
                                   className="btn btn-link"
                                   onClick={() => setIsSignUp(!isSignUp)}
                               >
                                   {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                               </button>
                           </div>
                       </form>
                   </div>
               </div>
           </div>
       </div>
   );
}

export default Form;
