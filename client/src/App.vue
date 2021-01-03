<template>
	<div id="app" class="md:w-4/5 xl:w-1/2 2xl:w-7/12 m-auto mt-6">
		<!-- Card to the fileOptions data to the user -->
		<app-card v-if="settingsModified" heading="Image settings">
			<ul>
				<!-- Format from - and into which to convert -->
				<li v-if="fileOptions.convertFrom && fileOptions.convertTo">
					Convert from <span class="font-medium text-primary">{{ fileOptions.convertFrom }}</span> into
					<span class="font-medium text-primary">{{ fileOptions.convertTo }}</span>
				</li>

				<!-- Whether to use one of the four fixed aspect ratio options, see config/options.js -> fixedRatioOptions -->
				<li v-if="fileOptions.fixedAspectRatio && fileOptions.convertFrom && fileOptions.convertTo">
					... into
					<span class="text-primary font-medium">
						{{ fileOptions.fixedAspectRatio }}
					</span>
					- format
				</li>

				<!-- Target size of the output image -->
				<li v-if="fileOptions.heightTo || fileOptions.widthTo">
					Target size <span class="font-medium">{{ fileOptions.heightTo }} x {{ fileOptions.widthTo }}px </span>
				</li>

				<!-- Target quality to the output image -->
				<li v-if="fileOptions.qualityTo">
					Quality: <span class="font-medium">{{ fileOptions.qualityTo }}%</span>
				</li>

				<!-- Whether to keep the aspect ratio of the source image -->
				<li v-if="fileOptions.keepAspectRatio">
					<i class="fas fa-check text-green-700 mr-2"></i>Aspect ratio will remain the same
				</li>

				<!-- Whether to fit the image size in case target image would be cropped -->
				<li v-if="fileOptions.imgFit">
					<i class="fas fa-check text-green-700 mr-2"></i>Fitting background to image size
				</li>
			</ul>
		</app-card>

		<!-- Sidebar and button to open it -->
		<app-sidebar
			v-if="showSidebar"
			heading="Image gallery"
			subheading="You can choose from your processed images here"
			:images="filesReceived"
			@close="showSidebar = false"
			@deleteImage="filesReceived.splice($event, 1)"
		></app-sidebar>
		<button
			v-else
			class="absolute border-r border-t border-b border-primary top-6 left-0 rounded-r py-4 px-6 text-xl text-primary hover:bg-primary hover:text-white"
			@click="showSidebar = true"
		>
			<i class="fas fa-bars"></i>
		</button>

		<!-- Upload section -->
		<app-upload
			heading="Upload a file"
			subheading="You can drop your file right in this section"
			:allowedFormats="allowedFormats"
			:uploadUrl="uploadUrl"
			:uploadQuery="uploadQuery"
			@fileLoaded="handleFileLoaded($event)"
			@fileError="handleAlertError($event)"
			@imageReceived="pushImage($event)"
			@imageError="handleAlertError($event)"
		/>

		<!-- Form Section to modify fileOptions properties -->
		<section class="grid md:grid-cols-1 xl:grid-cols-2 gap-4 pt-4">
			<app-select name="Format" label="Format" :options="convertOptions" @change="fileOptions.convertTo = $event" />
			<app-select
				name="Ratio"
				label="Fixed ratio"
				:options="fixedRatioOptions"
				@change="fileOptions.fixedAspectRatio = $event"
			/>
			<app-number name="Height" label="Height" @change="fileOptions.heightTo = $event"></app-number>
			<app-number name="Width" label="Width" @change="fileOptions.widthTo = $event"></app-number>
			<app-select name="Quality" label="Quality" :options="qualityOptions" @change="fileOptions.qualityTo = $event" />
			<div>
				<app-switch label="Fixed ratio" @change="fileOptions.keepAspectRatio = $event"></app-switch>
				<app-switch label="Fit background size" @change="fileOptions.imgFit = $event"></app-switch>
			</div>
		</section>

		<!-- An alert to indicate an API or Application error -->
		<app-alert v-if="error.show" :msg="error.msg"></app-alert>
	</div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar';
import AppUpload from '@/components/AppUpload';
import AppSelect from '@/components/AppSelect';
import AppNumber from '@/components/AppNumberInput';
import AppSwitch from '@/components/AppSwitch';
import AppCard from '@/components/AppCard';
import AppAlert from '@/components/AppAlert';
import { convertOptions, fixedRatioOptions, qualityOptions } from '@/config/options';

export default {
	name: 'App',
	components: {
		AppSidebar,
		AppUpload,
		AppSelect,
		AppNumber,
		AppSwitch,
		AppCard,
		AppAlert,
	},

	data() {
		return {
			// Global app settings
			error: {
				msg: '',
				show: false,
			},
			showSidebar: false,
			allowedFormats: ['image'],

			// File specific settings
			fileOptions: {
				name: '',
				convertFrom: '',
				convertTo: '',
				qualityTo: null,
				heightTo: null,
				widthTo: null,
				fixedAspectRatio: '',
				keepAspectRatio: false,
				imgFit: false,
			},
			filesReceived: [],
			convertOptions,
			fixedRatioOptions,
			qualityOptions,
		};
	},

	computed: {
		// Indicate if an image has been uploaded or any user input has been registered
		settingsModified() {
			let modified = false;
			Object.keys(this.fileOptions).forEach(key => {
				if (this.fileOptions[key]) modified = true;
			});
			return modified;
		},

		// Define the upload endpoint based on environment
		uploadUrl() {
			return process.env.ENVIRONMENT === 'development' ? 'http://localhost:9000/convert/img' : '/convert/img';
		},

		// Define the upload query based on user input
		uploadQuery() {
			let query = '?';
			if (this.fileOptions.convertFrom) {
				query += `convertFrom=${this.fileOptions.convertFrom}&`;
			}
			if (this.fileOptions.convertTo) {
				query += `convertTo=${this.fileOptions.convertTo}&`;
			}
			if (this.fileOptions.fixedAspectRatio) {
				query += `fixedAspectRatio=${this.fileOptions.fixedAspectRatio}&`;
			}
			if (this.fileOptions.qualityTo) {
				query += `qualityTo=${this.fileOptions.qualityTo}&`;
			}
			if (this.fileOptions.heightTo) {
				query += `heightTo=${this.fileOptions.heightTo}&`;
			}
			if (this.fileOptions.widthTo) {
				query += `widthTo=${this.fileOptions.widthTo}&`;
			}
			if (this.fileOptions.keepAspectRatio) {
				query += `keepAspectRatio=${this.fileOptions.keepAspectRatio}&`;
			}
			if (this.fileOptions.imgFit) {
				query += `imgFit=${this.fileOptions.imgFit}&`;
			}
			return query;
		},
	},

	methods: {
		// Get name and extension of the uploaded file
		handleFileLoaded(filedata) {
			this.fileOptions.name = filedata.name;
			this.fileOptions.convertFrom = filedata.type;
		},

		// Adds an image to the collection -> and to the sidebar
		pushImage(url) {
			const options = this.fileOptions;
			const img = {
				name: options.name.split('.')[0],
				type: options.convertTo || options.convertFrom,
				url,
			};
			this.filesReceived.push(img);
			this.showSidebar = true;
		},

		// Helper for when error events are caught from a child component
		handleAlertError(errorMsg) {
			this.error.msg = errorMsg;
			this.error.show = true;
			setTimeout(() => (this.error.show = false), 4000);
		},
	},
};
</script>

<style></style>
