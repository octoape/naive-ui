<markdown>
# 加载状态

`input` 支持加载状态。

注意：同时使用 `clearable`、`suffix` 和 `loading`，且 `loading` 为 `false` 时，清除按钮和后缀之间会有空白，如果想去除空白，停止加载时 `loading` 应当设置为 `undefined`。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(null)
</script>

<template>
  <n-input
    v-model:value="value"
    type="text"
    placeholder="基本的 Input"
    loading
  />
</template>
