require('dotenv').config();
// Initialize the base modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize the services and the application
const { convertImgService } = require('./services/imgconverter');
const { convertPdfService } = require('./services/pdfconverter');
const { cleanTempDir } = require('./util/filehandler');

const app = express();

// Initialize the middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure the service routes
app.post('/convert/img', (req, res) => convertImgService(req, res));
app.post('/convert/pdf', (req, res) => convertPdfService(req, res));

// Make the app listen to the standard port
app.listen(process.env.PORT, () => {
	cleanTempDir(path.join(__dirname, './store/tmp/'));
	console.log(`App listening on ${process.env.HOST}:${process.env.PORT}`);
});
