import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail
} from "firebase/auth";
import auth from '../firebase/firebaseConfig'


export const AuthContext = createContext();


const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      setCurrentUser(user)
      setLoading(false)
    })

    return ()=> unsubscribe()
  },[])

  const signupWithName = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: fullName });
    return userCredential.user;
  };

  const login = async (email, password, keepSignedIn) => {
    const persistence = keepSignedIn ? browserLocalPersistence : browserSessionPersistence;
    await setPersistence(auth, persistence)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => signOut(auth)

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }


  return (
    <AuthContext.Provider value={{currentUser , signupWithName, login, logout, forgotPassword}}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
