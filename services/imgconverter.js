const path = require('path');
const sharp = require('sharp');
const crs = require('crypto-random-string');

// Import util funs
const { uploadImg, sendConvertedImg, deleteOldFiles } = require('../util/filehandler');

// Create the path which will be used
const baseTempPath = path.join(__dirname, '../store/tmp/');

// Create the modular functions used in the service
const resizeImg = (img, widthFrom, widthTo, heightFrom, heightTo, keepAspectRatio) => {
	// Calculate img aspect ratio
	const ratioFrom = (parseInt(widthFrom) / parseInt(heightFrom)).toFixed(2);
	const ratioTo = (parseInt(widthTo) / parseInt(heightTo)).toFixed(2);

	// Define the options for the resizing
	let resizeOptions = {
		fit: 'cover',
		position: 'centre',
		background: { r: 255, g: 255, b: 255, alpha: 0.5 },
	};

	// If user wants to keep aspect ratio, fit the height so it fits the width
	if (keepAspectRatio) {
		heightTo = widthTo / ratioFrom;
	}

	// If the old and new ratio differ, redo the fit property
	if (ratioFrom !== ratioTo) {
		resizeOptions.fit = 'contain';
	}

	return img.resize(parseInt(widthTo), parseInt(heightTo), resizeOptions);
};

const setFixedAspectRatio = (img, widthFrom, heightFrom, fixedAspectRatio) => {
	let heightTo = 0;
	let widthTo = 0;

	switch (fixedAspectRatio) {
		// If user chooses hd, transform img into 16:9 format
		case 'hd':
			if ((widthFrom * 9) / 16 < heightFrom) {
				widthTo = widthFrom;
				heightTo = ((widthFrom * 9) / 16).toFixed(0);
			} else {
				heightTo = heightFrom;
				widthTo = ((heightFrom * 9) / 16).toFixed(0);
			}
			break;

		case 'classic':
			if ((widthFrom * 3) / 4 < heightFrom) {
				widthTo = widthFrom;
				heightTo = ((widthFrom * 3) / 4).toFixed(0);
			} else {
				heightTo = heightFrom;
				widthTo = ((heightFrom * 3) / 4).toFixed(0);
			}
			break;
		case 'square':
			if (widthFrom < heightFrom) {
				widthTo = widthFrom;
				heightTo = widthFrom;
			} else {
				heightTo = heightFrom;
				widthTo = heightFrom;
			}
			break;
		default:
			throw new Error(
				'This aspect ratio is not supported. Supported formats are "hd" (16:9), "classic" (4:3) or "square" (1:1) '
			);
	}

	return img.resize(parseInt(widthTo), parseInt(heightTo));
};

// Create the image service
const convertImgService = async (req, res) => {
	const id = crs({ length: 24 });
	let log = [];
	let { convertFrom, convertTo, heightTo, widthTo, qualityTo, fixedAspectRatio, keepAspectRatio } = req.query;

	// Define the paths. Their endings determine the conversion format
	let pathFrom = `${baseTempPath}${id}_in.${convertFrom}`;
	let pathTo = `${baseTempPath}${id}_out.${convertTo}`;

	try {
		// Wait for the image to be uploaded
		log.push(`> FileID ${id}: Started upload ...`);
		pathFrom = await uploadImg(req, `${pathFrom}.${convertFrom}`);

		// Start img processing, load relevant metadata and img itself
		const { width: widthFrom, height: heightFrom } = await sharp(pathFrom).metadata();
		let img = sharp(pathFrom);

		if ((heightTo || widthTo) && (widthFrom != widthTo || heightTo != heightFrom)) {
			log.push(`> FileID ${id}: Image source and target size differ, resizing ...`);
			img = resizeImg(img, widthFrom, widthTo, heightFrom, heightTo, keepAspectRatio);
		}

		// If user inputs fixed aspect ratio,
		if (fixedAspectRatio) {
			log.push(`> FileID ${id}: Fixed aspect ratio requested, resizing ...`);
			// If img has been resized before, use that height and width for this function
			if ((heightTo || widthTo) && (widthFrom != widthTo || heightTo != heightFrom)) {
				log.push(`> FileID ${id}: Img has been resized before, using that params ...`);
				img = setFixedAspectRatio(img, widthTo, widthTo, fixedAspectRatio);
			} else {
				img = setFixedAspectRatio(img, widthFrom, heightFrom, fixedAspectRatio);
			}
			// If user inputs either desired height or width,
		}

		// Handle explicit file conversion
		const formatOptions = { quality: parseInt(qualityTo) };
		log.push(`> FileID ${id}: Attempting to convert from ${convertFrom} to ${convertTo}`);
		switch (convertTo) {
			case 'webp':
				log.push(`> FileID ${id}: Converting to webp with quality ${formatOptions.quality}`);
				img = img.webp(formatOptions);
				break;

			case 'png':
				log.push(`> FileID ${id}: Converting to png with quality ${formatOptions.quality}`);
				img = img.png(formatOptions);
				break;

			case 'jpg':
				log.push(`> FileID ${id}: Converting to jpg with quality ${formatOptions.quality}`);
				img = img.jpeg(formatOptions);
				break;

			default:
				break;
		}

		// After operations are done, save to file
		const info = await img.toFile(pathTo);
		log.push(`> FileID ${id}: Successfully converted file`);
		log.push(`> FileID ${id}: Filesize: ${(info.size / 1000).toFixed(2)}kb`);
		log.push(`> FileID ${id}: Format ( w x h ): ${info.width} x ${info.height} in ${info.format} format`);
		log.push(`> FileID ${id}: Now sending file back to client ...`);

		img.end();
		await sendConvertedImg(res, pathTo);
	} catch (e) {
		log.push(`> Something went wrong: ${e.message}`);
		res.status(500).send({ msg: 'Something went wrong', error: e.message });
	} finally {
		log.forEach(el => console.log(el));
		await deleteOldFiles(pathFrom, pathTo).catch(err => console.log(err));
	}
};

module.exports = { convertImgService };
