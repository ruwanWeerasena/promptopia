//GET (read)

import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req,{params})=>{

    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt Not Found", {status :404})
        return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response("Failed to fetch the prompt",{status:500})
    }
}


//PATCH (Update)
export const PATCH = async ( req, {params})=> {
    const {prompt, tag } = await req.json();
    try {
        await connectToDB();
        console.log(params);
        const existingprompt = await Prompt.findById(params.id);
        if(!existingprompt) return new Response("Prompt Not Found", {status :404})
        existingprompt.prompt = prompt;
        existingprompt.tag = tag;
        await existingprompt.save();
        return new Response(JSON.stringify(existingprompt),{status:200})
    } catch (error) {
        return new Response("Failed to Update the prompt",{status:500})
    }
}

//DELETE ( delete)

export const DELETE = async ( req, {params})=> {
    
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        
        return new Response("Prompt deleted successfully",{status:200})
    } catch (error) {
        return new Response("Failed to delete the prompt",{status:500})
    }
}