<template>
  <div>
    gallery
    <div class="gallery-grid">
      <div v-for="image in images" :key="image.id" class="gallery-grid-item">
        <gallery-item :item="image"></gallery-item>
      </div>
    </div>

    <router-view v-slot="{ Component }">
      <transition name="fade" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import GalleryItem from "@/components/Gallery/GalleryItem.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    GalleryItem,
  },
  computed: {
    ...mapGetters(["images", "getImageById"]),
  },
};
</script>

<style scoped>
.gallery-grid {
  @apply grid grid-cols-12 gap-6;
}

.gallery-grid-item {
  @apply col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2
}
</style>