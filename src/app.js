const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const newRepo = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  }

  repositories.push(newRepo);

  return response.json(newRepo)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (!repositories[repoIndex]) {
    return response.status(400).json({ error: "Repository does not exist" });
  }

  repositories[repoIndex] = {
    id: repositories[repoIndex].id,
    url,
    title,
    techs,
    likes: repositories[repoIndex].likes
  }

  return response.json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (!repositories[repoIndex]) {
    return response.status(400).json({ error: "Repository does not exist" });
  }

  repositories.splice(repoIndex, 1);

  return response.sendStatus(204);
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
