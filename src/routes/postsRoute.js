import express from "express";
import multer from "multer";
import cors from "cors";
import { newPost, postsList, imgUpload, updatedPost } from "../controllers/postsController.js";

const corsOptions = {
  origin:"https://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname); 
    }
  });
  
  const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/posts", postsList);
    app.post("/posts", newPost);
    app.post("/upload", upload.single("image"), imgUpload);
    app.put("/upload/:id", updatedPost);
}

export default routes;