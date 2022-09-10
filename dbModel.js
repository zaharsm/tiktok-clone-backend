import mongoose from "mongoose";

const tiktokSchema= new mongoose.Schema({
      url:String, 
      name:String,
      description:String, 
      songs:String,  
      likes:String,
      messages:String,
      shares:String
});

//collection inside the database
export default mongoose.model("tiktokVideo",tiktokSchema);