<template>
	<div class="flex border rounded border-primary">
		<label class="p-2 w-1/3 text-center bg-primary text-white font-semibold">{{ label }}</label>
		<input type="number" v-model="value" @change="$emit('change', value)" class="w-full rounded focus:outline-none focus:shadow-primary px-2">
	</div>
</template>

<script>
export default {
  data() {
    return {
      value: 0
    }
  },
	props: {
		label: String,
		options: Array,
	},
};
</script>

<style></style>
