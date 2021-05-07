<template>
  <div class="galleryitem-wrapper">
    <transition name="fade" mode="out-in" appear>
      <header
        v-if="!showBody"
        class="galleryitem-header"
        :style="{ 'background-color': `${background.light}` }"
      >
        <img :src="imageUrl" :alt="item.name" class="galleryitem-image" />
      </header>
      <main v-else class="galleryitem-body">
        <h4 class="galleryitem-body-text" :class="{ hidden: !showBody }">
          {{ item.name }}
        </h4>
        <small class="galleryitem-body-text" :class="{ hidden: !showBody }">
          {{ item.size }} kb
        </small>
      </main>
    </transition>

    <footer class="galleryitem-footer">
      <i class="galleryitem-icon" @click="$emit('deleteItem', item.id)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H4"
          />
        </svg>
      </i>
      <i class="galleryitem-icon" @click="$emit('selectItem', item.id)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </i>
      <i class="galleryitem-icon" @mouseenter="showBody = true" @mouseleave="showBody = false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </i>
    </footer>
  </div>
</template>

<script>
import * as Vibrant from "node-vibrant";
import AnimateMixin from "@/mixins/animate.mixin.js";
import AppButton from "@/components/Buttons/AppButton.vue";
export default {
  mounted() {
    this.getDominantColorsFromImage();
  },
  components: {
    AppButton,
  },
  mixins: [AnimateMixin],
  data() {
    return {
      showBody: false,
      background: {
        dark: null,
        light: null,
      },
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    imageUrl() {
      const blob = new Blob([this.item.buffer]);
      const src = URL.createObjectURL(blob);
      return src;
    },
  },

  methods: {
    getDominantColorsFromImage() {
      Vibrant.from(this.imageUrl)
        .getPalette()
        .then((palette) => {
          console.log(palette);
          this.background.light = palette.LightMuted.hex;
          this.background.dark = palette.DarkMuted.hex;
        });
    },
  },
};
</script>

<style scoped>
.galleryitem-wrapper {
  @apply rounded bg-white shadow;
  @apply dark:bg-dark;
}

.galleryitem-header {
  cursor: zoom-in;
  @apply h-40 w-full rounded-t flex items-center;
}

.galleryitem-image {
  @apply rounded-t max-h-full m-auto;
}

.galleryitem-body {
  @apply h-40 p-4;
}

.galleryitem-body-text {
  @apply my-2;
}

.galleryitem-footer {
  @apply p-4 flex justify-between object-bottom;
}

.galleryitem-icon {
  @apply cursor-pointer w-6 h-6;
}
</style>