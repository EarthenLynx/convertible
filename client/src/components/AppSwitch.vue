<template>
	<div class="flex items-center cursor-pointer" @click="handleToggle">
		<div
			class="w-6 h-3 p-0.5 flex items-center rounded-full duration-300 ease-in-out bg-primary"
			:class="{ 'bg-secondary': toggleActive, 'bg-primary': !toggleActive }"
		>
			<div
				class="bg-white w-2 h-2 border-transparent rounded-full shadow-md transform duration-300 ease-in-out"
				:class="{ 'translate-x-3': toggleActive }"
			></div>
		</div>
		<p class="font-semibold ml-1">{{ label }}</p>
	</div>
</template>

<script>
export default {
	props: {
		label: String,
	},
	data() {
		return {
			toggleActive: false,
		};
	},

	methods: {
		handleToggle() {
			this.toggleActive = !this.toggleActive;
			this.$emit('change', this.toggleActive);
		},
	},
};
</script>
