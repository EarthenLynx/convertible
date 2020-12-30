<template
	><transition appear name="card-slide">
		<div
			class="sm:block md:absolute top-6 right-4 border-l-4 px-4 py-2 mb-4 border-primary bg-gray-50 w-80 bg-opacity-95"
		>
			<h2 class="text-lg font-semibold">{{ heading }}</h2>
			<slot /></div
	></transition>
</template>

<script>
export default {
	props: {
		heading: String,
	},
};
</script>

<style>
.card-slide-enter-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.card-slide-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.card-slide-enter, .card-slide-leave-to {
  transition: all 0.5s;
	transform: translateX(10px);
	opacity: 0;
}
</style>
