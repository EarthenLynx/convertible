<template>
	<div id="app" class="md:w-4/5 xl:w-1/2 2xl:w-7/12 m-auto mt-6">
		<app-card heading="Image settings">
			<ul>
				<li v-if="convertFrom && convertTo">
					Convert from <span class="font-medium text-primary">{{ convertFrom }}</span> into
					<span class="font-medium text-primary">{{ convertTo }}</span>
				</li>
				<li v-if="fixedAspectRatio && convertFrom && convertTo">
					... in
					<span class="text-primary font-medium">
						{{ fixedAspectRatio }}
					</span>
					- format
				</li>
				<li v-if="heightTo || widthTo">
					Target size <span class="font-medium">{{ heightTo }} x {{ widthTo }}px </span>
				</li>
				<li v-if="qualityTo">
					Quality: <span class="font-medium">{{ qualityTo }}%</span>
				</li>
				<li v-if="keepAspectRatio">
					<i class="fas fa-check text-green-700 mr-2"></i>Aspect ratio will remain the same
				</li>
				<li v-if="imgFit"><i class="fas fa-check text-green-700 mr-2"></i>Fitting background to image size</li>
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
			@fileLoaded="convertFrom = $event.type"
			@imageReceived="pushImage($event)"
		/>

		<!-- Form Section -->
		<section class="grid md:grid-cols-1 xl:grid-cols-2 gap-4 pt-4">
			<app-select name="Format" label="Format" @change="convertTo = $event" :options="convertOptions" />
			<app-select name="Ratio" label="Fixed ratio" @change="fixedAspectRatio = $event" :options="fixedRatioOptions" />
			<app-number name="Height" label="Height" :value="heightTo" @change="heightTo = $event"></app-number>
			<app-number name="Width" label="Width" :value="widthTo" @change="widthTo = $event"></app-number>
			<app-number name="Quality" label="Quality" :value="qualityTo" @change="qualityTo = $event"></app-number>
			<div>
				<app-switch label="Fixed ratio" @change="keepAspectRatio = $event"></app-switch>
				<app-switch label="Fit background size" @change="imgFit = $event"></app-switch>
			</div>
		</section>
	</div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar';
import AppUpload from '@/components/AppUpload';
import AppSelect from '@/components/AppSelect';
import AppNumber from '@/components/AppNumberInput';
import AppSwitch from '@/components/AppSwitch';
import AppCard from '@/components/AppCard';
import { convertOptions, fixedRatioOptions } from '@/config/options';

export default {
	name: 'App',
	components: {
		AppSidebar,
		AppUpload,
		AppSelect,
		AppNumber,
		AppSwitch,
		AppCard,
	},

	data() {
		return {
			// Form vars
			convertFrom: '',
			convertTo: '',
			qualityTo: null,
			heightTo: null,
			widthTo: null,
			fixedAspectRatio: '',
			keepAspectRatio: false,
			imgFit: false,

			// Config vary
			uploadUrl: 'http://localhost:3000/convert/img',
			showSidebar: false,
			convertOptions,
			fixedRatioOptions,

			// Others
			filesReceived: [],
		};
	},

	methods: {
		pushImage(url) {
			this.filesReceived.push(url);
			this.showSidebar = true;
		},
	},

	computed: {
		uploadQuery() {
			let query = '?';
			if (this.convertFrom) {
				query += `convertFrom=${this.convertFrom}&`;
			}
			if (this.convertTo) {
				query += `convertTo=${this.convertTo}&`;
			}
			if (this.fixedAspectRatio) {
				query += `fixedAspectRatio=${this.fixedAspectRatio}&`;
			}
			if (this.qualityTo) {
				query += `qualityTo=${this.qualityTo}&`;
			}
			if (this.heightTo) {
				query += `heightTo=${this.heightTo}&`;
			}
			if (this.widthTo) {
				query += `widthTo=${this.widthTo}&`;
			}
			if (this.keepAspectRatio) {
				query += `keepAspectRatio=${this.keepAspectRatio}&`;
			}
			if (this.imgFit) {
				query += `imgFit=${this.imgFit}&`;
			}
			return query;
		},
	},
};
</script>

<style></style>
