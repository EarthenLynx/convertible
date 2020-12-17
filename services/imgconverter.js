const path = require('path');
const sharp = require('sharp');
const crs = require('crypto-random-string');

// Import util funs
const { uploadImg, sendConvertedImg } = require('../util/filehandler');

// Create the path which will be used
const baseTempPath = path.join(__dirname, '../store/tmp/');

// Create the image service
const convertImgService = async (req, res) => {
	const { convertFrom, convertTo, heightTo, widthTo, qualityTo } = req.query;
	const id = crs({ length: 24 });

	// Define the paths. Their endings determine the conversion format
	let pathFrom = `${baseTempPath}${id}.${convertFrom}`;
	let pathTo = `${baseTempPath}${id}.${convertTo}`;

	// Wait for the image to be uploaded
	pathFrom = await uploadImg(req, `${pathFrom}.${convertFrom}`);

	// Start img processing, load relevant metadata and img itself
	const { width: widthFrom, height: heightFrom } = await sharp(pathFrom).metadata();
	let img = sharp(pathFrom);

	// Do img resize operations if values are provided and source and target values differ
	if ((heightTo || widthTo) && (widthFrom != widthTo || heightTo != heightFrom)) {
		console.log('Image source and target size differ, resizing ...');

		// Calculate img aspect ratio
		const ratioFrom = (parseInt(widthFrom) / parseInt(heightFrom)).toFixed(2);
		const ratioTo = (parseInt(widthTo) / parseInt(heightTo)).toFixed(2);

		// Define the options for the resizing
		let resizeOptions = {
			fit: 'cover',
			position: 'centre',
			background: { r: 255, g: 255, b: 255, alpha: 0.5 },
		};

		// If the old and new ratio differ, redo the fit property
		if (ratioFrom !== ratioTo) {
			resizeOptions.fit = 'contain';
		}

		img = img.resize(parseInt(widthTo), parseInt(heightTo), resizeOptions);
	}

	// Handle explicit file conversion
	const formatOptions = { quality: parseInt(qualityTo) };
	console.log('Trying to convert now');
	switch (convertTo) {
		case 'webp':
			console.log(`Converting to webp with quality ${formatOptions.quality}`);
			img = img.webp(formatOptions);
			break;

		case 'png':
			console.log(`Converting to png with quality ${formatOptions.quality}`);
			img = img.png(formatOptions);
			break;

		case 'jpg':
			console.log(`Converting to jpg with quality ${formatOptions.quality}`);
			img = img.jpeg(formatOptions);
			break;

		default:
			break;
	}

	// After operations are done, save to file
	const info = await img.toFile(pathTo);
	console.log(`Successfully converted file`);
	console.log(`Filesize: ${(info.size / 1000).toFixed(2)}kb`);
	console.log(`Format ( w x h ): ${info.width} x ${info.height} in ${info.format} format`);
	await sendConvertedImg(res, pathTo);
};

module.exports = { convertImgService };
