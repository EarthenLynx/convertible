<template>
  <button
    v-bind="$attrs"
    class="app-button"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "filled",
    },
  },
};
</script>

<style scoped>
.app-button {
  @apply px-4 py-2 my-2 w-full md:w-auto lg:mr-2 border-2 rounded-md font-semibold border-primary text-primary focus:outline-none;
}
</style>
