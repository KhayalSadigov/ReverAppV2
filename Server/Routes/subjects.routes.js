const express = require("express")
const endpoints = require("../Constants/endpoints");
const subjectsController = require("../Controllers/subjects.controller");

const subjectRouter = express.Router() ;

subjectRouter.get(endpoints.subjects.getAll,subjectsController.getAll)
subjectRouter.get(endpoints.subjects.getOne,subjectsController.getOne)

module.exports = subjectRouter