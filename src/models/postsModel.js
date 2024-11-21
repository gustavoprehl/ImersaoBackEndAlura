import conectarAoBanco from "../config/dbConnect.js"
const connection = await conectarAoBanco(process.env.STRING_CONNECTION);

export async function getAllPosts(){
    const db = connection.db("Imersão-InstaBytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
}