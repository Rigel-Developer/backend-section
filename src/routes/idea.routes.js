const { Router } = require("express");
const { ParseIntMiddleware } = require("../middlewares");

module.exports = function ({ IdeaController }) {
  const router = Router();
  router.get("/:ideaId", IdeaController.get);
  router.get("/:ideaId/all", IdeaController.getUserIdeas);
  router.get("", ParseIntMiddleware, IdeaController.getAll);
  router.patch("/:ideaId", IdeaController.update);
  router.delete("/:ideaId", IdeaController.delete);
  router.post("", IdeaController.create);
  router.post("/:ideaId/upvote", IdeaController.upvoteIdea);
  router.post("/:ideaId/downvote", IdeaController.downvoteIdea);

  return router;
};
