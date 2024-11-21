import express from "express";

const posts = [
    {
      id: 1,
      description: "Gato 1",
      img: "https://placecats.com/millie/300/158"
    },
    {
      id: 2,
      description: "Gato 2",
      img: "https://placecats.com/millie/300/158"
    },
    {
      id: 3,
      description: "Gato 3",
      img: "https://placecats.com/millie/300/158"
    },
];

const app = express();
app.use(express.json);
app.listen(3000, () => {
    console.log("Listening server");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function searchPostId(id){
    return posts.findIndex((post) => {
      return post.id === Number(id);
    });
}

app.get("/posts/:id", (req, res) => {
  const index = searchPostId(req.params.id);
  res.status(200).json(posts[index]);
});