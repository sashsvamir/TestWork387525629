<script setup>
import { computed } from 'vue'

defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: Boolean,
  attr: String,
  label: String,
  help: String,
  required: Boolean,
  errors: {type: Object, default: null},
})

const error = computed(() => {
  return props.errors?.[props.attr] ? props.errors?.[props.attr].join(', ') : null
})



</script>

<template>
  <div class="form-check mb-3">

    <input type='checkbox'
           :class=" 'form-check-input' + (error ? ' is-invalid' : '') "
           :id="attr"
           :name="attr"
           :checked="modelValue"
           @input="$emit('update:modelValue', $event.target.checked)"
           v-bind="$attrs"
    />

    <label :for="attr" class="form-check-label">{{label}}</label>

    <small v-if="help" class="form-text text-muted">{{help}}</small>

    <span v-if="error" class="invalid-feedback" role="alert">{{error}}</span>

  </div>
</template>