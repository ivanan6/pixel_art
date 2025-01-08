import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pictureScema = new Schema({
    picture_id: String,
    name:String,
    picture_data:[[String]],
    author: {
        user_id:String,
        username: String,
    },
    created_at: Date,
    updated_at: Date
})

const Picture = mongoose.model('Picture',pictureScema)
module.exports = Picture















// import mongoose, { Schema, Document } from "mongoose";

// export interface Picture extends Document {
//     name: string;
//     picture_data: string[][];
//     author: {
//       user_id: string;
//       username: string;
//     };
//     created_at: Date;
//     updated_at: Date;
//   }
  

// const PictureShema = new Schema<Picture>({
//     name:String,
//     picture_data:[[String]],
//     author: {
//         user_id:String,
//         username: String,
//     },
//     created_at: Date.now;
//     updated_at: Date;

// })