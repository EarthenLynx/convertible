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
				const config = getConfig(fileItem.type);
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
	const rootUrl = 'http://localhost:3000/convert/img?';
	const url =
		'http://localhost:3000/convert/img?convertFrom=jpg&convertTo=webp&qualityTo=100&heightTo=60&widthTo=2400&keepAspectRatio=true';

	const options = {
		method: 'post',
		body: img,
	};
	const response = await fetch(url, options);
	const adjustedImg = await response.blob();

	console.log(adjustedImg);
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
};

const getConfig = from => {
	const convertFrom = from;
	const convertTo = 'webp';
	const fixedAspectRatio = 'hd';
	const qualityTo = 100;
	const heightTo = 60;
	const widthTo = 2400;
	const keepAspectRatio = true;
	const imgFit = true;

	return {
		convertFrom,
		convertTo,
		fixedAspectRatio,
		qualityTo,
		heightTo,
		widthTo,
		keepAspectRatio,
		imgFit,
	};
};
