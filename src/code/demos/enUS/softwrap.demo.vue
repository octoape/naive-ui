<markdown>
# Soft wrap

Code can wrap content if it overflows.
</markdown>

<script lang="ts" setup>
const code = `
function padEnd(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  return (length && strLength < length)? (string + createPadding(length - strLength, chars)): (string || '')
}
      `
</script>

<template>
  <n-code :code="code" language="js" word-wrap />
</template>
