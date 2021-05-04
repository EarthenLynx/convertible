<template>
  <li class="fileitem-wrapper">
    <div class="fileitem-icon-wrapper" @click="$emit('fileClicked')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <!-- <img :src="imageUrl" :alt="file.name" class="fileitem-image"> -->
    </div>
    <div class="fileitem-body">
      <p class="fileitem-name">
        {{ file.name }}
      </p>
      <small class="fileitem-size"> {{ file.size }} kb </small>
    </div>
    <div class="fileitem-icon-wrapper" @click="$emit('fileClose')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },

  computed: {
    imageUrl() {
      const blob = new Blob([this.file.buffer]);
      const src = URL.createObjectURL(blob);
      return src;
    },
  },
};
</script>

<style scoped>
.fileitem-wrapper {
  @apply p-4 my-2 rounded grid grid-cols-12 border border-primary text-primary bg-opacity-40;
}

.fileitem-icon-wrapper {
  @apply col-span-1 flex items-center justify-center  cursor-pointer;
}

.fileitem-image {
  @apply h-14 w-14;
}

.fileitem-body {
  @apply col-span-10;
}
</style>