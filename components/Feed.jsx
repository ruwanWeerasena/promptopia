"use client"
import {useEffect, useState} from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data,handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>{
        
        return <PromptCard 
         key={post._id}
         post={post}
         handleTagClick={handleTagClick}
        />
      })}

    </div>
  )
}



const Feed = () => {
  const [searchText ,setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filteredPosts , setFilteredPosts] = useState([])
  const handleSearchChange = (e)=> {
    setSearchText(e.target.value)
    mastersearch(searchText);
  }

  const mastersearch = (text)=>{
    const filteredposts = posts.filter((post)=>{
      const promptresult = post.prompt.toLowerCase().includes(text.toLowerCase());
      const tagresult = post.tag.toLowerCase().includes(text.toLowerCase());
      const usernameresult = post.creator.username.toLowerCase().includes(text.toLowerCase());

      if(promptresult || tagresult || usernameresult){
        return true;
      }else{
        return false;
      }
      
    });
    setFilteredPosts(filteredposts)
  }

  const searchClickOnTag = (text)=>{
    setSearchText(text);
    mastersearch(text);
  }
  useEffect(()=>{
    const fetchposts = async ()=> {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data)
    }
    fetchposts();
  },[])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          required
          onChange={handleSearchChange}
          className='search_input peer'/>
      </form>
      <PromptCardList
        data={searchText?filteredPosts: posts}
        handleTagClick={searchClickOnTag}
      />
    </section>
  )
}

export default Feed