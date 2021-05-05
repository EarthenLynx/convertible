<template>
  <div
    @click.self="$router.push({ name: 'Gallery' })"
    class="upload-background"
  >
    <app-upload
      heading="Upload a file here or"
      @fileError="handleFileError"
      @fileLoaded="handleFileLoaded"
    ></app-upload>
  </div>
</template>

<script>
import AppUpload from "@/components/FormElements/AppUpload.vue";
export default {
  components: {
    AppUpload,
  },

  methods: {
    handleFileLoaded(file) {
      console.log(file);
    },
    handleFileError() {
      console.log("Could not load file");
    },

    onClickUploadBackground() {},
  },
};
</script>

<style scoped>
.upload-background {
  @apply m-auto bg-black bg-opacity-70 absolute pt-52 top-0 left-0 h-screen w-screen;
}
</style>