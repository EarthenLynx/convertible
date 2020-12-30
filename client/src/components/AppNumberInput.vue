<template>
	<div class="flex border rounded border-primary">
		<label class="p-2 w-1/3 text-center bg-gradient-to-bl from-secondary to-primary text-white font-semibold">{{ label }}</label>
		<input type="number" v-model="number" @change="$emit('change', number)" class="w-full rounded focus:outline-none focus:shadow-primary px-2">
	</div>
</template>

<script>
export default {
  data() {
    return {
      number: 0
    }
  },
	props: {
		label: String,
		options: Array,
	},
};
</script>

<style></style>
