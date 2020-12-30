<template>
	<transition appear name="sidebar-slide">
		<section class="absolute top-0 left-0 h-screen w-72">
			<div class="w-auto h-1/6 px-4 py-6 bg-primary">
				<h2
					class="font-medium flex justify-between text-2xl cursor-pointer text-white"
					@mouseenter="closeHover = true"
					@mouseleave="closeHover = false"
					@click="$emit('close')"
				>
					{{ heading }}
					<i
						class="fas fa-chevron-down text-white transform transition-all"
						:class="{ 'rotate-90': closeHover }"
					></i>
				</h2>
				<p class="font-normal text-md text-white">{{ subheading }}</p>
			</div>
			<div class="w-auto h-5/6 overflow-auto py-3 px-4 ">
				<div v-for="image in images" :key="image">
					<div class="border rounded">
						<img :src="image" class="" />
					</div>
				</div>
			</div>
		</section>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			closeHover: false,
		};
	},
	props: {
		heading: String,
		subheading: String,
		images: Array,
	},
};
</script>

<style>
.sidebar-slide-enter-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.sidebar-slide-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.sidebar-slide-enter,
.sidebar-slide-leave-to {
	transition: all 0.5s;
	transform: translateX(-50px);
	opacity: 0;
}
</style>
