<template>
	<div id="app" class="md:w-2/3 lg:w-2/5 m-auto mt-6">
		<Upload
      :heading="uploadHeading"
      :subheading="uploadSubheading"
    />
	</div>
</template>

<script>
import Upload from '@/components/Upload';

export default {
	name: 'App',
	components: {
		Upload,
  },

  data() {
    return {
      uploadHeading: 'Upload a file',
      uploadSubheading: 'You can drop your file right in this section'
    }
  }
};
</script>

<style>
</style>
