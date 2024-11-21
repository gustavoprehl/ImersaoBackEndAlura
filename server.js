import express from "express";
import routes from "./src/routes/postsRoute";

const app = express();
routes(app);

app.listen(3000, () => {
    console.log("Listening server");
});