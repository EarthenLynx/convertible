<template>
  <div>
    this is the gallery page
    <router-view v-slot="{ Component }">
      <transition name="fade" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>