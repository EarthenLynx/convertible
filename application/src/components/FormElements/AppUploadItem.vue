<template>
  <div class="fileitem-wrapper">
    <div class="fileitem-icon-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="fileitem-icon"
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
    </div>
    <div class="fileitem-body">
      <p class="fileitem-name">
        {{ file.name }}
      </p>
      <small class="fileitem-size"> {{ file.size }} kb </small>
    </div>
    <div class="fileitem-icon-wrapper">
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
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.fileitem-wrapper {
  @apply p-4 my-2 rounded grid grid-cols-12 border border-primary text-primary bg-opacity-40;
}

.fileitem-icon-wrapper {
  @apply col-span-1 flex items-center justify-center;
}

.fileitem-icon {
  @apply h-10 w-10;
}

.fileitem-body {
  @apply col-span-10
}
</style>