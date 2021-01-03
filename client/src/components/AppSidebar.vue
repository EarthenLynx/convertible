<template>
	<transition appear name="sidebar-slide">
		<section class="absolute top-0 left-0 h-screen w-72">
			<div class="w-auto h-1/6 px-4 py-6 bg-primary z-10">
				<h2
					class="font-medium flex justify-between text-2xl cursor-pointer text-white"
					@mouseenter="closeHover = true"
					@mouseleave="closeHover = false"
					@click="$emit('close')"
				>
					{{ heading }}
					<i class="fas fa-chevron-down text-white transform transition-all" :class="{ 'rotate-90': closeHover }"></i>
				</h2>
				<p class="font-normal text-md text-white">{{ subheading }}</p>
			</div>
			<!-- Image collection -->
			<div class="w-auto h-5/6 overflow-y-scroll py-3 px-4 bg-white">
				<transition-group appear name="collection-slide">
					<!-- Single image items -->
					<div v-for="(image, index) in images" :key="image.url" class="border border-gray-200 rounded my-2">
						<div class="w-auto block">
							<img class="w-auto max-h-48 m-auto" :src="image.url" />
							<small class="block mx-4 my-2">{{image.name}}.{{image.type}}</small>
						</div>
						<div class="px-2 py-3 flex justify-between bg-gray-50 bg-opacity-95">
							<button
								class="font-semibold text-secondary border-secondary px-4 py-1 hover:underline focus:outline-none"
								@click="$emit('deleteImage', index)"
							>
								<i class="fas fa-eraser"></i> Delete
							</button>
							<a :href="image.url" :download="`${image.name}.${image.type}`">
								<button
									class="border rounded font-semibold text-primary border-primary px-4 py-1 hover:bg-primary hover:text-white transition-all"
								>
									<i class="far fa-save"></i> Save
								</button></a
							>
						</div>
					</div>
					<!-- /Single image items -->
				</transition-group>
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

.collection-slide-enter {
	transform: translateX(6rem) rotateY(90deg);
	opacity: 0;
}
.collection-slide-enter-active {
	transition: all 1s;
}
.collection-slide-leave-active {
  /* z-index: -1; */
  width: 83%;
	position: absolute;
	transform: translateX(-6rem) rotateY(90deg) ;
	transition: all 1s;
	opacity: 0;

}

.collection-slide-move {
	transition: all .75s;
}
</style>
