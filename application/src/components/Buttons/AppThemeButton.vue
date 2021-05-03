<template>
  <button
    @click="toggleDarkTheme()"
    class="bg-transparent text-white dark:border-dark-primary dark:text-yellow-400"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
      />
    </svg>
  </button>
</template>

<script>
export default {
  mounted() {
    this.initLocalStorage();
    this.applyUserTheme();
  },
  methods: {
    initLocalStorage() {
      if (!localStorage.getItem("user-theme")) {
        const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
        const userTheme = userMedia.matches === true ? "dark" : "light";
        localStorage.setItem("user-theme", userTheme);
      }
    },

    applyUserTheme() {
      const userTheme = localStorage.getItem("user-theme");
      const appRoot = window.document.documentElement;

      appRoot.classList.remove("dark", "light");
      appRoot.classList.add(userTheme);
    },

    toggleDarkTheme() {
      const userTheme = localStorage.getItem("user-theme");
      if (userTheme === "dark") {
        localStorage.setItem("user-theme", "light");
      }
      if (userTheme === "light") {
        localStorage.setItem("user-theme", "dark");
      }
      this.applyUserTheme();
    },
  },
};
</script>

<style>
</style>
