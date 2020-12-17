const path = require('path');
const webp = require('webp-converter');
const crs = require('crypto-random-string');
webp.grant_permission();

// Import util funs
const { uploadImg, sendConvertedImg, deleteOldFiles } = require('../util/filehandler');

// Create the path which will be used
const baseTempPath = path.join(__dirname, '../store/tmp/');

// Conversion function to Webp
const toWebp = (inputPath, outputPath, quality) => {
	return new Promise((resolve, reject) => {
		const result = webp.cwebp(inputPath, outputPath, `-q ${quality}`);
		result.then(() => resolve(outputPath)).catch(err => reject(err));
	});
};

// onversion function from Webp
const fromWebp = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const result = webp.dwebp(inputPath, outputPath, '-o')
    result.then(() => resolve(outputPath)).catch(err => reject(err))
  })
}

// Create the image service
const convertImgService = async (req, res) => {
	const { convertFrom, convertTo, quality } = req.query;
	const id = crs({ length: 10 });
	let pathFrom = `${baseTempPath}${id}.${convertFrom}`;
	let pathTo = `${baseTempPath}${id}.${convertTo}`;

  pathFrom = await uploadImg(req, `${pathFrom}.${convertFrom}`);
  if(convertFrom === 'webp') {
    pathTo = await fromWebp(pathFrom, pathTo);
  } else {
    console.log('logging to webp');
    pathTo = await toWebp(pathFrom, pathTo, quality);
  }

	const path = await sendConvertedImg(res, pathTo);
  const deleted = await deleteOldFiles(pathFrom, pathTo);
  console.log(deleted)
};

module.exports = { convertImgService };
