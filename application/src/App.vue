<template>
  <div id="nav">
    <div>
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Gallery' }">Gallery</router-link>
      <router-link :to="{ name: 'About' }">About</router-link>
      <router-link :to="{ name: 'Upload' }">Upload</router-link>
    </div>
    <div>
      <app-theme-button @click="toggleDarkTheme">Toggle Theme</app-theme-button>
    </div>
  </div>
  <main id="body">
    <router-view />
  </main>
</template>

<script>
import AppThemeButton from "@/components/Buttons/AppThemeButton.vue";
export default {
  components: {
    AppThemeButton,
  },
};
</script>

<style>
body {
  transition: all 0.35s;
  @apply bg-gray-50;
  @apply dark:bg-dark-primary;
}

#body {
  @apply px-6 lg:px-16 my-6;
}

#nav {
  transition: all 0.35s;
  @apply flex justify-between items-center px-6 lg:px-16 py-6 bg-opacity-90 bg-secondary;
  @apply dark:bg-dark;
}

#nav a {
  @apply text-white font-semibold px-2 transition-opacity opacity-80;
}

#nav a:hover,
#nav a.router-link-exact-active {
  @apply opacity-100 transition-opacity;
  @apply dark:text-primary;
}

/* Transitions */
.slideup-enter,
.slideup-leave-to {
  opacity: 0;
  transition: all 1s ease;
  transform: translateY(10px);
}

.slideup-leave-active {
  transform: translateX(-10px);
  transition: all 1s ease;
  @apply absolute w-full;
}

.slideup-move {
  transition: all 0.75s;
}

.grow-enter, .grow-leave-to {
  max-height: 0;
  transition: all 1s;
}

.grow-enter-active, .grow-leave-active {
  max-height: 250px;
  transition: all 1s;
}
</style>
