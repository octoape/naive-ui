<markdown>
# Content size

Text is resized to fit the avatar.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('Oasis')
</script>

<template>
  <n-space vertical item-style="line-height: 0;">
    <n-space>
      <n-avatar>{{ value }}</n-avatar>
      <n-avatar round>
        {{ value }}
      </n-avatar>
    </n-space>
    <n-input v-model:value="value" />
  </n-space>
</template>
