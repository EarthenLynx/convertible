<template>
  <div class="input-group">
    <label class="input-label" :for="uuid">{{ label }}</label>
    <input
      v-bind="$attrs"
      :placeholder="label"
      class="input-field"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="uuid"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : null"
    />
    <small v-if="error" :id="`${uuid}-error`" aria-live="assertive">
      {{ error }}
    </small>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  setup() {
    const uuid = uuidv4();
    return {
      uuid,
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },

    modelValue: {
      type: [String, Number],
      default: "",
    },

    error: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.input-group {
  @apply block my-2;
}

.input-label {
  @apply block mb-2 text-dark-primary dark:text-dark-secondary;
}

.input-field {
  @apply block py-1 px-3 rounded w-full border-2 border-gray-200 transition-all bg-transparent;
  @apply focus:border-primary focus:outline-none rounded;
}
</style>