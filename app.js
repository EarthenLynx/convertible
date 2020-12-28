// Initialize the base modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require("express-handlebars");

// Initialize the services and the application
const { convertImgService } = require('./services/imgconverter');
const { convertPdfService } = require('./services/pdfconverter');

// When reloading the app, clean up the temp dir and load env vars
require('dotenv').config();
require('./util/filehandler').cleanTempDir(path.join(__dirname, './store/tmp/'));

const app = express();

// Set the view engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Initialize the middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set a static folder
app.use(express.static("public"));

// Configure the view routes
app.get("/", (req, res) => res.render("upload"))

// Configure the service routes
app.post('/convert/img', (req, res) => convertImgService(req, res));
app.post('/convert/pdf', (req, res) => convertPdfService(req, res));

// Make the app listen to the standard port
app.listen(process.env.PORT, () => {
	console.log(`App listening on ${process.env.HOST}:${process.env.PORT}`);
});
