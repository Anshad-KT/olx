import { createContext, ReactNode, useState } from "react";

export const postContext = createContext<any>(null)
interface ContextProps {
    children: ReactNode;
  }
export default function PostDetails({children}:ContextProps) {
    const [post,setPost] = useState<object|null>(null)
    return(
        <postContext.Provider value={{post,setPost}}>
            {children}
        </postContext.Provider>
    )
}