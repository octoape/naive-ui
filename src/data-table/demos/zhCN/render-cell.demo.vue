<markdown>
# 自定义单元格

你可以使用 `render-cell` 去渲染空状态。
</markdown>

<script lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NText } from 'naive-ui'
import { defineComponent, h } from 'vue'

interface Song {
  no: number
  note: string
}

function createColumns(): DataTableColumns<Song> {
  return [
    {
      title: '日期',
      key: 'no',
      width: 120,
      render: (_, index) => {
        return `星期 ${index + 1}`
      }
    },
    {
      title: '记录',
      key: 'note'
    }
  ]
}

const data: Song[] = [
  { no: 3, note: '' },
  { no: 4, note: '' },
  { no: 12, note: '' },
  { no: 10, note: '' },
  { no: 19, note: '' }
]

export default defineComponent({
  setup() {
    return {
      data,
      columns: createColumns(),
      pagination: false as const,
      renderCell: (value: string | number) => {
        if (!value) {
          return h(NText, { depth: 3 }, { default: () => '未填写' })
        }
        return value
      }
    }
  }
})
</script>

<template>
  <n-data-table :columns="columns" :data="data" :render-cell="renderCell" />
</template>
