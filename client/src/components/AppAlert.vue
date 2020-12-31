<template>
	<transition appear name="alert-slide">
		<div class="sm:block md:absolute bottom-6 right-4 border bg-secondary rounded text-white px-4 py-2 mb-4 w-80">
			{{ msg }}
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		msg: String,
	},
};
</script>

<style>
.alert-slide-enter {
	transform: translateY(10px);
	opacity: 0;
}
.alert-slide-enter-active {
	transition: all 1s;
}
.alert-slide-leave-active {
	transform: translateY(10px);
	transition: all 1s;
	opacity: 0;
}

.alert-slide-move {
	transition: all 1s;
}
</style>
