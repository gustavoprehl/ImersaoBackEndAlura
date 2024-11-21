import { getAllPosts } from "../models/postsModel";

export async function postsList(req, res){
    const posts = await getAllPosts();
    res.status(200).json(posts);
}