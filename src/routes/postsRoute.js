import express from "express";
import { postsList } from "../controllers/postsController";

const routes = (app) => {
    app.use(express.json);
    app.get("/posts", postsList);
}

export default routes;