"use client"
import {useState,  useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

import Profile from "@components/profile"

const MyPofile = () => {

    const {data:session} = useSession();
    const [ posts , setPosts] = useState([])
    useEffect(()=>{
        const fetchposts = async ()=> {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data)
        }
        session?.user.id && fetchposts();
      },[])
    const handleEdit = ()=>{

    }

    const handleDelete = ()=>{

    }
  return (
    <Profile    
     name="My"
     desc="welcome to your personalized profile page"
     data={posts}
     handleEdit={handleEdit}
     handleDelete={handleDelete}
     />
  )
}

export default MyPofile