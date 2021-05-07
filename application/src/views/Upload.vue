<template>
  <div
    @click.self="$router.push({ name: 'Gallery' })"
    class="upload-background"
  >
    <app-upload
      heading="Upload a file here or"
      @fileError="handleFileError"
      @receiveFiles="onFilesReceived"
    ></app-upload>
  </div>
</template>

<script>
import AppUpload from "@/components/Upload/AppUpload.vue";
export default {
  components: {
    AppUpload,
  },

  methods: {
    onFilesReceived(files) {
      const receivedFiles = [...files];
      this.$store.commit("CREATE_IMAGE", {
        files: receivedFiles,
      });
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