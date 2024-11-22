import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../service/germiniService.js";
import fs from "fs";

export async function postsList(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function newPost(req, res) {
    const newPost = req.body;
    try {
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }

}

export async function imgUpload(req, res) {
    const newPost = {
        description: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try {
        const createdPost = await createPost(newPost);
        const imageAtt = `uploads/${createdPost.insertedId}.png`
        fs.renameSync(req.file.path, imageAtt);
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }

}

export async function updatedPost(req, res) {
    const id = req.params.id;
    const imgUrl = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const description = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: imgUrl,
            description: description,
            alt: req.body.alt
        }

        const postCriado = await updatePost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
    
}
