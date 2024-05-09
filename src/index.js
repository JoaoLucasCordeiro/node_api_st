const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Adicione esta linha
app.use(express.json());

const Movie = mongoose.model("Movie", {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
});

app.get("/", async (req, res) => {
  const movies = await Movie.find();
  return res.send(movies);
});

app.post("/", async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  });

  await movie.save();
  return res.send(movie);
});

app.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  return res.send(movie);
});

app.put("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url,
    },
    {
      new: true,
    }
  );

  return res.send(movie);
});
app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://joaolucascttprofissional:Irb69XwZaTI5t0dY@apiclientcluster.v58xw4m.mongodb.net/?retryWrites=true&w=majority&appName=apiclientcluster"
  );
  console.log(`Escutando da porta ${port}!`);
});
