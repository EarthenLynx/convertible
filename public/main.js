// Main events for drag and drop
const dropHandler = event => {
	const dropzone = document.querySelector('#dropzone');
	const footer = document.querySelector('#card-footer');
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
	fileReader.readAsDataURL(fileItem);

	fileReader.onload = async event => {
		console.log(event.target.result);
		const response = await uploadImage(event.target.result);
	};

	// Do the styling and provide basic user feedback, given everything went well
	footer.innerHTML = `<i class="fas fa-photo-video"></i> ${fileItem.name}`;
	dropzone.classList.remove('dropActive');
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
const uploadImage = async img => {
	const url =
		'http://localhost:3000/convert/img?convertFrom=jpg&convertTo=webp&qualityTo=100&heightTo=60&widthTo=2400&keepAspectRatio=true';
	const options = {
		method: 'post',
		data: img,
	};
	const response = await fetch(url, options);
	console.log(response);
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
