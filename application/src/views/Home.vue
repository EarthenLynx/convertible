<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <base-input label="Test" type="number"></base-input>
    <base-select :options="options" label="Test" type="number"></base-select>
  </div>
</template>

<script>
import BaseInput from '@/components/FormElements/BaseInput.vue';
import BaseSelect from '@/components/FormElements/BaseSelect.vue';

export default {
  name: "Home",
  data() {
    return {
      options: ['Test', 'Test2']
    }
  },
  components: {BaseInput, BaseSelect},
};
</script>
