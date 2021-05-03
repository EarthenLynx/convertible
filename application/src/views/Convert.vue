<template>
  <div>
    this is the convert page
    <div class="upload-background" v-if="isUploadOpen">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isUploadOpen() {
      return this.$route.name === "upload"
    }
  }
}
</script>

<style>

</style>