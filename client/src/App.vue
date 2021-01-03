<template>
	<div id="app" class="md:w-4/5 xl:w-1/2 2xl:w-7/12 m-auto mt-6">
		<app-card v-if="settingsModified" heading="Image settings">
			<ul>
				<li v-if="fileOptions.convertFrom && fileOptions.convertTo">
					Convert from <span class="font-medium text-primary">{{ fileOptions.convertFrom }}</span> into
					<span class="font-medium text-primary">{{ fileOptions.convertTo }}</span>
				</li>
				<li v-if="fileOptions.fixedAspectRatio && fileOptions.convertFrom && fileOptions.convertTo">
					... in
					<span class="text-primary font-medium">
						{{ fileOptions.fixedAspectRatio }}
					</span>
					- format
				</li>
				<li v-if="fileOptions.heightTo || fileOptions.widthTo">
					Target size <span class="font-medium">{{ fileOptions.heightTo }} x {{ fileOptions.widthTo }}px </span>
				</li>
				<li v-if="fileOptions.qualityTo">
					Quality: <span class="font-medium">{{ fileOptions.qualityTo }}%</span>
				</li>
				<li v-if="fileOptions.keepAspectRatio">
					<i class="fas fa-check text-green-700 mr-2"></i>Aspect ratio will remain the same
				</li>
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
			:uploadUrl="uploadUrl"
			:uploadQuery="uploadQuery"
			:allowedFormats="allowedFormats"
			@fileLoaded="fileOptions.convertFrom = $event.type"
			@fileIllegalFormat="handleAlertError($event)"
			@imageReceived="pushImage($event)"
			@imageError="handleAlertError($event)"
		/>

		<!-- Form Section -->
		<section class="grid md:grid-cols-1 xl:grid-cols-2 gap-4 pt-4">
			<app-select name="Format" label="Format" @change="fileOptions.convertTo = $event" :options="convertOptions" />
			<app-select
				name="Ratio"
				label="Fixed ratio"
				@change="fileOptions.fixedAspectRatio = $event"
				:options="fixedRatioOptions"
			/>
			<app-number name="Height" label="Height" @change="fileOptions.heightTo = $event"></app-number>
			<app-number name="Width" label="Width" @change="fileOptions.widthTo = $event"></app-number>
			<app-select name="Quality" label="Quality" @change="fileOptions.qualityTo = $event" :options="qualityOptions" />
			<div>
				<app-switch label="Fixed ratio" @change="fileOptions.keepAspectRatio = $event"></app-switch>
				<app-switch label="Fit background size" @change="fileOptions.imgFit = $event"></app-switch>
			</div>
		</section>
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
			uploadUrl: 'http://localhost:9000/convert/img',
			error: {
				msg: '',
				show: false,
			},
			showSidebar: false,
			fileOptions: {
				convertFrom: '',
				convertTo: '',
				qualityTo: null,
				heightTo: null,
				widthTo: null,
				fixedAspectRatio: '',
				keepAspectRatio: false,
				imgFit: false,
			},
			allowedFormats: ['image'],
			filesReceived: [],
			convertOptions,
			fixedRatioOptions,
			qualityOptions,
		};
	},

	methods: {
		pushImage(url) {
			this.filesReceived.push(url);
			this.showSidebar = true;
		},
		handleAlertError(errorMsg) {
			this.error.msg = errorMsg;
			this.error.show = true;
			setTimeout(() => (this.error.show = false), 4000);
		},
	},

	computed: {
		settingsModified() {
			let modified = false;
			Object.keys(this.fileOptions).forEach(key => {
				if (this.fileOptions[key]) modified = true;
			});
			return modified;
		},

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
};
</script>

<style></style>
