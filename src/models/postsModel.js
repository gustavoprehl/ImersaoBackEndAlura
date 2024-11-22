import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const connection = await conectarAoBanco(process.env.STRING_CONNECTION);

export async function getAllPosts(){
    const db = connection.db("Imersão-InstaBytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
}

export async function createPost(newPost){
    const db = connection.db("Imersão-InstaBytes");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
}

export async function updatePost(id, updatePost){
    const objtId = ObjectId.createFromHexString(id);
    const db = connection.db("Imersão-InstaBytes");
    const collection = db.collection("posts");
    return collection.updateOne({_id: new ObjectId(objtId)}, {$set: updatePost});
}