<template>
	<div id="upload">
		<div id="wrapper" class="border rounded border-primary">
			<div id="header" class="px-8 py-3 flex-row bg-gradient-to-br from-primary to-secondary ">
				<h1 class="font-medium text-xl text-white">{{ heading }}</h1>
				<p class="font-normal text-md text-white">{{ subheading }}</p>
			</div>

			<div
				id="body"
				class="px-8 py-2 md:h-64 lg:h-80 flex flex-col text-secondary justify-center items-center transition-all"
				:class="{ 'bg-gray-100 animate-pulse': over }"
				@dragover.prevent="handleDragOver"
				@dragleave.prevent="handleDragLeave"
				@drop.prevent="handleDrop"
			>
				<i class="fas fa-file-upload text-4xl m-2"></i>
				<p class="text-2xl font-semibold m-1">Upload</p>
			</div>
		</div>

		<div v-if="loaded" id="footer" class="border border-primary rounded flex justify-between bg-gradient-to-r from-primary to-secondary my-4 px-8 py-2">
			<div id="text-wrapper">
				<p class="text-base text-white">{{ file.name }}</p>
				<small class="text-xs opacity-75 text-white">Size: {{ file.size }} kb. Current format: {{ file.type }}. </small>
			</div>
			<button
				class="border rounded font-semibold text-white border-white-400 px-4 hover:bg-white hover:text-secondary transition-all"
			>
				<i class="far fa-paper-plane"></i> Upload
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		heading: String,
		subheading: String,
		uploadUrl: String,
		uploadQuery: Object,
	},

	data() {
		return {
			over: false,
			loaded: false,
			file: {
				name: '',
				size: '',
				type: '',
			},
			buffer: '',
		};
	},

	methods: {
		handleDragOver() {
			this.over = true;
		},

		handleDragLeave() {
			this.over = false;
		},

		handleDrop(event) {
			const fileItem = event.dataTransfer.items[0].getAsFile();
			const reader = new FileReader();

			this.file = {
				name: fileItem.name,
				size: (fileItem.size / 1000).toFixed(2),
				type: fileItem.type.split('/')[1],
			};

			reader.readAsArrayBuffer(fileItem);
			reader.onloadend = event => {
				this.over = false;
				this.loaded = true;
				this.buffer = event.target.result;
				this.$emit('fileLoaded', this.file)
			};
		},

		handleUploadFile() {},
	},
};
</script>

<style scoped></style>
