const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const crs = require('crypto-random-string');

// Import util funs
const { uploadImg, sendConvertedImg, deleteOldFiles } = require('../util/filehandler');

// Create the path which will be used
const baseTempPath = path.join(__dirname, '../store/tmp/');

const convertPdfService = async (req, res) => {
	const { convertFrom, convertTo } = req.query;
	const id = crs({ length: 10 });
	const doc = new PDFDocument({size: [500, 500],});
	let pathFrom = `${baseTempPath}${id}.${convertFrom}`;
	let pathTo = `${baseTempPath}${id}.${convertTo}`;

	pathFrom = await uploadImg(req, `${pathFrom}.${convertFrom}`);

	doc.image(pathFrom, 0, 0, {
		fit: [500, 500],
	});

	doc.end();

	doc.pipe(res);
};

module.exports = { convertPdfService };
