"use client"
import {useState,  useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

import Profile from "@components/profile"

const UserPofile = ({params}) => {

    const {data:session} = useSession();
    const [ posts , setPosts] = useState([])
    const [user, setUser] = useState(null)
    const router = useRouter();
    
    useEffect(()=>{
        const fetchposts = async ()=> {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();
            setPosts(data)
            if(data[0]?.creator){
                setUser(data[0].creator)
            }
            if(session.user.id==params.id){
                router.push('/profile')
            }
        }
        params && fetchposts();
    },[params.id])
    

        return (
    
            <Profile    
             name={user?.username}
             desc={`${user?.username} profile page`}
             data={posts}
             handleEdit={()=>{}}
             handleDelete={()=>{}}
             />
          )

    

  
}

export default UserPofile