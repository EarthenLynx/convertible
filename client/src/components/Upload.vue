<template>
	<div id="upload">
		<div id="wrapper" class="border rounded border-indigo-200 ">
			<div id="header" class="px-8 py-3 flex-row bg-indigo-100">
				<h1 class="font-medium text-xl">{{ heading }}</h1>
				<p class="font-normal text-md">{{ subheading }}</p>
			</div>

			<div
				id="body"
				class="px-8 py-2 md:h-64 lg:h-80 flex flex-col justify-center items-center transition-all"
				:class="{ 'bg-gray-100 text-indigo-400': over }"
				@dragover.prevent="handleDragOver"
				@dragleave.prevent="handleDragLeave"
				@drop.prevent="handleDrop"
			>
				<i class="fas fa-file-upload text-4xl m-2"></i>
				<p class="text-2xl font-semibold m-1">Upload</p>
			</div>
		</div>

		<div v-if="loaded" id="footer" class="border rounded bg-indigo-100 my-4 py-2">
			<p class="text-base px-8 ">
				{{ file.name }}
				<span class="text-xs pl-4 opacity-75">Size: {{ file.size }} kb. Current format: {{ file.type }}. </span>
			</p>
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
			};
		},
	},
};
</script>

<style scoped></style>
