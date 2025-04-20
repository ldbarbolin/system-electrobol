const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require('mysql')

module.exports = (app) => {
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "presentacion/views"));
  app.use(express.static(path.join(__dirname, "presentacion/static")));
  app.use(bodyParser.urlencoded({ extended: true}));
  app.use(express.json());
  app.use(cookieParser());
};
