"use client"
import Form from '@components/Form';
import {useEffect, useState} from 'react';
import { useRouter ,useSearchParams } from 'next/navigation';


const EditPrompt = () => {

    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:'',

    })
    useEffect(()=>{
        const fetchpost = async ()=> {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
          }
          promptId && fetchpost();
    },[promptId])
 
    const router = useRouter();

    console.log(22,promptId);

    // const createPrompt = async (e) => {
    //     e.preventDefault();
    //     setSubmitting(true);
    //     try {
    //         const response = await fetch('/api/prompt/new',{
    //             method:'POST',
    //             body: JSON.stringify({
    //                 prompt:post.prompt,
    //                 userId: session?.user.id,
    //                 tag:post.tag
    //             })
    //         });
    //         if(response.ok){
    //             router.push('/')
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     } finally{
    //         setSubmitting(false); 
    //     }
    // }

    const updatePrompt = async (e)=>{
        e.preventDefault();
        setSubmitting(true);

        try {
                const response = await fetch(`/api/prompt/${promptId}`,{
                    method:'PATCH',
                    body: JSON.stringify({
                        prompt:post.prompt,
                        tag:post.tag
                    })
                });
                console.log(response);
                if(response.ok){
                    router.push('/')
                }
        }catch(error){
            console.log(error);
        }finally{
            setSubmitting(false); 
        }
    }
  return (
    <Form
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt }

    />
  )
}

export default EditPrompt