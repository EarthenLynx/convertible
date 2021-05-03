<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <base-input label="Test" type="number"></base-input>
  </div>
</template>

<script>
import BaseInput from '@/components/FormElements/BaseInput.vue';

export default {
  name: "Home",
  components: {BaseInput},
};
</script>
