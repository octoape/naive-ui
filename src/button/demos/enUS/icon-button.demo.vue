<markdown>
# Use icons as buttons

Sometimes you may want to use an icon as a button and customize its size. You can use the `text` prop and `font-size` style to set it.
</markdown>

<script lang="ts" setup>
import { CashOutline as CashIcon } from '@vicons/ionicons5'
</script>

<template>
  <n-button text style="font-size: 24px">
    <n-icon>
      <CashIcon />
    </n-icon>
  </n-button>
</template>
