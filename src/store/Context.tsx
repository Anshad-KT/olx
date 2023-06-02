import { createContext, ReactNode, useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

interface FirebaseContextType {
  auth: any
  db: any
  storage:any
  // other properties
}


 // const db = getFirestore(Firebase);
            // const usersCollection = collection(db, "users");

export const FirebaseContext = createContext({} as FirebaseContextType);
interface ContextProps {
  children: ReactNode;
}
interface useR{ 
  user?: any,
  setUser: any
 } 

export const AuthContext = createContext({} as useR);

export default function Context({ children }: ContextProps) {
  const [user, setUser] = useState<any>(null);

  return (
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
  )
}
