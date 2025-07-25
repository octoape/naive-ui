<markdown>
# 受控的过滤器
</markdown>

<script lang="ts" setup>
import type {
  DataTableBaseColumn,
  DataTableColumns,
  DataTableFilterState
} from 'naive-ui'
import { reactive } from 'vue'

interface Row {
  key: number
  name: string
  age: number
  address: string
}

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
]

const addressColumn = reactive<DataTableBaseColumn<Row>>({
  title: 'Address',
  key: 'address',
  filterMultiple: false,
  filterOptionValue: null,
  sorter: 'default',
  filterOptions: [
    {
      label: 'London',
      value: 'London'
    },
    {
      label: 'New York',
      value: 'New York'
    }
  ],
  filter(value, row) {
    return !!~row.address.indexOf(value.toString())
  }
})

const columns = reactive<DataTableColumns<Row>>([
  {
    title: 'Name',
    key: 'name',
    sorter(rowA, rowB) {
      return rowA.name.length - rowB.name.length
    }
  },
  {
    title: 'Age',
    key: 'age',
    sorter(rowA, rowB) {
      return rowA.age - rowB.age
    }
  },
  addressColumn
])

const pagination = { pageSize: 5 }

function filterAddress() {
  addressColumn.filterOptionValue = 'London'
}

function unfilterAddress() {
  addressColumn.filterOptionValue = null
}

function handleUpdateFilter(
  filters: DataTableFilterState,
  sourceColumn: DataTableBaseColumn
) {
  addressColumn.filterOptionValue = filters[sourceColumn.key] as string
}
</script>

<template>
  <n-space vertical :size="12">
    <n-space>
      <n-button @click="filterAddress">
        Filter Address(Use Value 'London')
      </n-button>
      <n-button @click="unfilterAddress">
        Clear Address Filters
      </n-button>
    </n-space>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @update:filters="handleUpdateFilter"
    />
  </n-space>
</template>
