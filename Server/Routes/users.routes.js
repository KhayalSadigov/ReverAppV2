const express = require("express");
const endpoints = require("../Constants/endpoints");
const usersController = require("../Controllers/users.controller");
const userMiddlewares = require("../Middlewares/users.middlewares");

const usersRouter = express.Router();

usersRouter.get(endpoints.users.getAll, usersController.getAll);
usersRouter.get(endpoints.users.getOne, usersController.getOne);
usersRouter.post(
  endpoints.users.post,
  userMiddlewares.post,
  usersController.post
);
usersRouter.delete(endpoints.users.delete, usersController.delete);
usersRouter.patch(endpoints.users.patch, usersController.patch);

module.exports = usersRouter;