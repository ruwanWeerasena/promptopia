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
  const handleSearchChange = (e)=> {
    setSearchText(e.target.value)
    searchByPrompt()
  }

  const searchByPrompt = (text)=>{
    console.log(posts);
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
        data={posts}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed