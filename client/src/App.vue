<template>
	<div id="app" class="md:w-4/5 xl:w-3/5 2xl:w-1/2 m-auto mt-6">
		<Upload :heading="uploadHeading" :subheading="uploadSubheading" @fileLoaded="fileOptions.convertFrom = $event.type" />
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
			<app-number name="Quality" label="Quality" @change="fileOptions.qualityTo = $event"></app-number>
		</section>
	</div>
</template>

<script>
import Upload from '@/components/Upload';
import AppSelect from '@/components/AppSelect';
import AppNumber from '@/components/AppNumberInput';
import { convertOptions, fixedRatioOptions } from '@/config/options';

export default {
	name: 'App',
	components: {
		Upload,
		AppSelect,
		AppNumber,
	},

	data() {
		return {
			uploadHeading: 'Upload a file',
			uploadSubheading: 'You can drop your file right in this section',

			fileOptions: {
				convertFrom: '',
				convertTo: '',
				qualityTo: '',
				heightTo: '',
				widthTo: '',
				fixedAspectRatio: '',
				keepAspectRatio: '',
				imgFit: '',
			},

			convertOptions,
			fixedRatioOptions,
		};
	},

	methods: {},
};
</script>

<style></style>
