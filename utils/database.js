import mongoose from "mongoose";

let isConnected =false;

export const connectToDB = async ()=> {
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("mongodb is alerady connected");
        return
    }else{
        try {
            await mongoose.connect(process.env.MONGODB_URI,{
                dbName:"share_prompts",
                useNewUrlParser:true,
                useUnifiedTopology:true
            })
            isConnected=true;
            console.log("mongodb connected");
        } catch (error) {
            console.log(error);
        }
    }
}