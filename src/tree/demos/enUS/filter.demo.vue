<markdown>
# Search

Tree accept `pattern` and `filter` to do searching.
</markdown>

<script lang="ts" setup>
import type { TreeOption } from 'naive-ui'
import { ref } from 'vue'

const data: TreeOption[] = [
  {
    label: '0',
    key: '0',
    children: [
      {
        label: '0-0',
        key: '0-0',
        children: [
          { label: '0-0-0', key: '0-0-0' },
          { label: '0-0-1', key: '0-0-1' }
        ]
      },
      {
        label: '0-1',
        key: '0-1',
        children: [
          { label: '0-1-0', key: '0-1-0' },
          { label: '0-1-1', key: '0-1-1' }
        ]
      }
    ]
  },
  {
    label: '1',
    key: '1',
    children: [
      {
        label: '1-0',
        key: '1-0',
        children: [
          { label: '1-0-0', key: '1-0-0' },
          { label: '1-0-1', key: '1-0-1' }
        ]
      },
      {
        label: '1-1',
        key: '1-1',
        children: [
          { label: '1-1-0', key: '1-1-0' },
          { label: '1-1-1', key: '1-1-1' }
        ]
      }
    ]
  }
]

const pattern = ref('')
const showIrrelevantNodes = ref(false)
</script>

<template>
  <n-space vertical :size="12">
    <n-input v-model:value="pattern" placeholder="Search" />
    <n-switch v-model:value="showIrrelevantNodes">
      <template #checked>
        Show irrelevant nodes
      </template>
      <template #unchecked>
        Hide irrelevant nodes
      </template>
    </n-switch>
    <n-tree
      :show-irrelevant-nodes="showIrrelevantNodes"
      :pattern="pattern"
      :data="data"
      block-line
    />
  </n-space>
</template>
