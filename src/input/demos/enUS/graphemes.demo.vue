<markdown>
# Count graphemes

Browser's default `maxlength` and `minlength` and naive-ui's builtin character count method can't split all string correctly. You can use `count-graphemes` count to count graphemes correctly.
</markdown>

<script lang="ts" setup>
import GraphemeSplitter from 'grapheme-splitter'

const splitter = new GraphemeSplitter()
const countGraphemes = (value: string) => splitter.countGraphemes(value)
</script>

<template>
  <n-form>
    <n-form-item label="Default behavior">
      <n-input default-value="🌷🏳️‍🌈" show-count :maxlength="12" />
    </n-form-item>
    <n-form-item label="Correct behavior">
      <n-input
        default-value="🌷🏳️‍🌈"
        show-count
        :maxlength="12"
        :count-graphemes="countGraphemes"
      />
    </n-form-item>
  </n-form>
</template>
