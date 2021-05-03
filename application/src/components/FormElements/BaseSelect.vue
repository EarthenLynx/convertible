<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="modelValue"
      class="field"
      v-bind="{
        ...$attrs,
        onChange: ($event) => $emit('update:modelValue', $event.target.value),
      }"
      :id="uuid"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : null"
    >
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === modelValue"
      >
        {{ option }}
      </option>
    </select>
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
    options: {
      type: Array,
      required: true,
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

<style>
</style>