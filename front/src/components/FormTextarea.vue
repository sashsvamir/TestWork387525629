<script setup>
import { computed } from 'vue'

defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: String,
  attr: String,
  label: String,
  help: String,
  type: String,
  required: Boolean,
  errors: {type: Object, default: null},
})

const error = computed(() => {
  return props.errors?.[props.attr] ? props.errors?.[props.attr].join(', ') : null
})



</script>

<template>
  <div class="mb-3">

    <label :for="attr">{{label}}</label>

    <textarea
           :class=" 'form-control' + (error ? ' is-invalid' : '') "
           :id="attr"
           :name="attr"
           v-model="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           v-bind="$attrs"
    />

    <small v-if="help" class="form-text text-muted">{{help}}</small>

    <span v-if="error" class="invalid-feedback" role="alert">{{error}}</span>

  </div>
</template>