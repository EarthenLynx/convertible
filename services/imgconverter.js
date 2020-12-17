const path = require('path');
const sharp = require('sharp');
const crs = require('crypto-random-string');

// Import util funs
const { uploadImg, sendConvertedImg, deleteOldFiles } = require('../util/filehandler');

// Create the path which will be used
const baseTempPath = path.join(__dirname, '../store/tmp/');

// Create the image service
const convertImgService = async (req, res) => {
	const id = crs({ length: 24 });
	let log = [];
	let { convertFrom, convertTo, heightTo, widthTo, qualityTo, keepAspectRatio } = req.query;

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

		// Do img resize operations if values are provided and source and target values differ
		if ((heightTo || widthTo) && (widthFrom != widthTo || heightTo != heightFrom)) {
			log.push(`> FileID ${id}: Image source and target size differ, resizing ...`);

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

			img = img.resize(parseInt(widthTo), parseInt(heightTo), resizeOptions);
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
		log.push(e.message);
		res.status(500).send({ msg: 'Something went wrong', error: e.message });
	} finally {
		log.forEach(el => console.log(el));
		await deleteOldFiles(pathFrom, pathTo);
	}
};

module.exports = { convertImgService };
