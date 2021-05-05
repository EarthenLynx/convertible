<template>
  <div class="container m-auto">
    <app-upload heading="Upload a file here or" @fileError="handleFileError" @fileLoaded="handleFileLoaded"></app-upload>
  </div>
</template>

<script>
import AppUpload from '@/components/FormElements/AppUpload.vue'
export default {
  components: {
    AppUpload
  },

  methods: {
    handleFileLoaded(file) {
      console.log(file)
    },
    handleFileError() {
      console.log('Could not load file')
    }
  }
};
</script>

<style>
</style>