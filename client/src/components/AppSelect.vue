<template>
	<div class="flex border rounded border-primary">
		<label class="p-2 w-1/3 text-center bg-primary text-white font-semibold">{{ label }}</label>
		<select v-model="selected" @change="$emit('change', selected)" class="w-full rounded focus:outline-none focus:shadow-primary px-2">
      <option selected disabled :value="undefined">Choose one ...</option>
			<option class="border-secondary" v-for="option in options" :key="option.key" :value="option.key">{{ option.value }}</option>
		</select>
	</div>
</template>

<script>
export default {
  data() {
    return {
      selected: ''
    }
  },
	props: {
		label: String,
		options: Array,
	},
};
</script>

<style></style>
