<template>
  <div class="galleryitem-wrapper">
    <transition name="fade" mode="out-in" appear>
      <header
        v-if="!showBody"
        class="galleryitem-header"
        @click="$emit('imageHeaderClicked', image.id)"
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
      <trash-icon
        class="galleryitem-icon"
        @click="$emit('imageDeleteClicked', image.id)"
      >
      </trash-icon>
      <graph-icon
        class="galleryitem-icon"
        @click="$emit('imageInspectClicked', item.id)"
      >
      </graph-icon>
      <info-icon
        class="galleryitem-icon"
        @mouseenter="showBody = true"
        @mouseleave="showBody = false"
      >

      </info-icon>
    </footer>
  </div>
</template>

<script>
import Popper from "vue-popperjs";
import TrashIcon from "@/components/Icons/trash.vue";
import GraphIcon from "@/components/Icons/graph.vue";
import InfoIcon from "@/components/Icons/info.vue";
import "vue-popperjs/dist/vue-popper.css";
import AnimateMixin from "@/mixins/animate.mixin.js";
import AppButton from "@/components/Buttons/AppButton.vue";
export default {
  components: {
    AppButton,
    Popper,
    TrashIcon,
    GraphIcon,
    InfoIcon,
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
};
</script>

<style scoped>
.galleryitem-wrapper {
  @apply rounded bg-white shadow;
  @apply dark:bg-dark;
}

.galleryitem-header {
  cursor: zoom-in;
  @apply h-40 w-full rounded-t flex items-center bg-gray-200;
  @apply dark:bg-gray-700;
}

.galleryitem-image {
  @apply rounded-t max-h-full m-auto;
}

.galleryitem-body {
  @apply h-40 p-4;
}

.galleryitem-body-text {
  @apply my-2;
  @apply dark:text-dark-accent;
}

.galleryitem-footer {
  @apply p-4 flex justify-between object-bottom;
}

.galleryitem-icon {
  @apply cursor-pointer w-6 h-6;
  @apply dark:text-dark-accent;
}
</style>