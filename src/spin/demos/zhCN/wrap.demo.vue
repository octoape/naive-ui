<markdown>
# 填充内容

你可以把其他内容包裹在 Spin 中。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <n-space vertical>
    <n-spin :show="show">
      <n-alert title="啦啦啦" type="success">
        明天再打开行李箱。宝贝，挂电话啦。
      </n-alert>
    </n-spin>
    <n-button @click="show = !show">
      点击来转圈
    </n-button>
  </n-space>
</template>
