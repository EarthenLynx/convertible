// Main events for drag and drop
const dropHandler = event => {
	const dropzone = document.querySelector('#dropzone');
	const fileDesc = document.querySelector('#file-name');
	const uploadButtonWrap = document.querySelector('#upload-button-wrapper');
	const fileCount = event.dataTransfer.items.length;
	const fileItem = event.dataTransfer.items[0].getAsFile();
	const fileReader = new FileReader();

	// Prevent default behavior (Prevent file from being opened)
	event.preventDefault();

	// Do some basic error handling

	// 1. No more than one file may be uploaded
	if (fileCount > 1) {
		return b5Alert('You cannot work on more than one file at once!', 'alert-danger');
	}

	// 2. The content type has to be an image
	if (fileItem.type.split('/')[0] !== 'image') {
		return b5Alert('The file you try to upload is not an image', 'alert-danger');
	}

	// If the file passes the checks, process it
	fileReader.readAsArrayBuffer(fileItem);

	fileReader.onloadend = async event => {
		const data = event.target.result;

		// Construct a button and append it to the card footer if it doesn't exist yet
		let uploadButton = document.querySelector('#upload-button');
		if (!uploadButton) {
			uploadButton = document.createElement('button');
			uploadButton.id = 'upload-button';
			uploadButton.classList.add('btn', 'btn-primary', 'float-end');
			uploadButton.innerHTML = 'Send <i class="far fa-paper-plane"></i>';
			uploadButton.addEventListener('click', () => {
				const config = getImageConfig(fileItem.type.split('/')[1]);
				uploadImage(data, config);
			});
		}

		// Do the styling and provide basic user feedback, given everything went well
		fileDesc.innerHTML = `<i class="fas fa-photo-video"></i> ${fileItem.name}`;
		uploadButtonWrap.appendChild(uploadButton);
		dropzone.classList.remove('dropActive');
	};
};

//
const dragOverHandler = event => {
	event.preventDefault();
	document.querySelector('#dropzone').classList.add('dropActive');
};

const dragLeaveHandler = event => {
	event.preventDefault();
	document.querySelector('#dropzone').classList.remove('dropActive');
};

// Events to deal with the file itself
const uploadImage = async (img, config) => {
	const { convertFrom, convertTo, fixedAspectRatio, qualityTo, heightTo, widthTo, keepAspectRatio, imgFit } = config;

	let url = 'http://localhost:3000/convert/img?';
	if (convertFrom && convertFrom !== 'undefined') url += `convertFrom=${convertFrom}&`;
	if (convertTo && convertTo !== 'undefined') url += `convertTo=${convertTo}&`;
	if (fixedAspectRatio && fixedAspectRatio !== 'undefined') url += `fixedAspectRatio=${fixedAspectRatio}&`;
	if (qualityTo && qualityTo !== 'undefined') url += `qualityTo=${qualityTo}&`;
	if (heightTo && heightTo !== 'undefined') url += `heightTo=${heightTo}&`;
	if (widthTo && widthTo !== 'undefined') url += `widthTo=${widthTo}&`;
	if (keepAspectRatio && keepAspectRatio !== 'undefined') url += `keepAspectRatio=${keepAspectRatio}&`;
	if (imgFit && imgFit !== 'undefined') url += `imgFit=${imgFit}&`;

	const options = {
		method: 'post',
		body: img,
	};
	const response = await fetch(url, options);
	if (response.status !== 200) {
		const data = await response.json();
		b5Alert(`${data.msg} -> ${data.error}`, 'alert-warning');
	} else {
		console.log(await response.headers);
		const adjustedImg = await response.blob();
		console.log(adjustedImg);
		const imgUrl = URL.createObjectURL(adjustedImg);
		appendImage(imgUrl);
		b5Alert(`Image processing successful`, 'alert-success');
	}
};

const appendImage = imgUrl => {
	// Select and create elements
	const gallery = document.querySelector('#gallery');
	const cardWrapper = document.createElement('div');
	const cardElement = document.createElement('div');
	const cardBody = document.createElement('div');
	const cardFooter = document.createElement('div');
	const imageWrapper = document.createElement('a');
	const image = document.createElement('img');

	// Add styling
	cardWrapper.classList.add('col-lg-3', 'col-md-4', 'col-sm-12');
	cardElement.classList.add('card');
	cardBody.classList.add('card-body');
	cardFooter.classList.add('card-footer');
	cardFooter.innerHTML = 'Click to download';
	imageWrapper.href = imgUrl;
	imageWrapper.download = 'AdjustedImg';
	image.classList.add('img-fluid');
	image.src = imgUrl;

	// Put the elements together
	imageWrapper.append(image);
	cardBody.append(imageWrapper);
	cardElement.append(cardBody, cardFooter);
	cardWrapper.append(cardElement);
	gallery.append(cardWrapper);
};

// Helper functions
const b5Alert = (msg, alertClass) => {
	// Create the elements
	const alert = document.createElement('div');
	const message = document.createElement('span');
	const button = document.createElement('button');

	// Add styling and message
	alert.id = 'alert';
	alert.classList.add('alert', 'fixed-bottom', alertClass);
	alert.style.width = '300px';
	alert.style.margin = 'auto';
	button.classList.add('btn-close', 'float-end');
	message.innerHTML = msg;

	// Add listener to button
	button.addEventListener('click', () => {
		document.querySelector('#alert').remove();
	});

	// Append childs to alert
	alert.append(message);
	alert.append(button);

	// Append alert to document
	document.body.appendChild(alert);

	// Make sure the alert gets removed after 5 seconds
	setTimeout(() => document.querySelector('#alert').remove(), 5000);
};

const getImageConfig = from => {
	const convertFrom = from;
	const convertTo = document.querySelector('#input-convert-to').value;
	const qualityTo = document.querySelector('#input-quality-to').value;
	const heightTo = document.querySelector('#input-height-to').value;
	const widthTo = document.querySelector('#input-width-to').value;
	const fixedAspectRatio = document.querySelector('#input-fixed-aspect').value;
	const keepAspectRatio = document.querySelector('#input-keep-aspect').checked;
	const imgFit = document.querySelector('#input-image-fit').checked;

	const config = {
		convertFrom,
		convertTo,
		fixedAspectRatio,
		qualityTo,
		heightTo,
		widthTo,
		keepAspectRatio,
		imgFit,
	};

	return config;
};
