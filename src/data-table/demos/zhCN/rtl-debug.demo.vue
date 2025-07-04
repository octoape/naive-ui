<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import type {
  DataTableBaseColumn,
  DataTableColumns,
  DataTableFilterState
} from 'naive-ui'
import { unstableDataTableRtl } from 'naive-ui'
import { reactive, ref } from 'vue'

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
  },
  {
    key: 4,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  },
  {
    key: 5,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  },
  {
    key: 6,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  },
  {
    key: 7,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  },
  {
    key: 8,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  },
  {
    key: 9,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  },
  {
    key: 10,
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

const paginationReactive = reactive({
  page: 1,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [3, 5, 7],
  onChange: (page: number) => {
    paginationReactive.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    paginationReactive.pageSize = pageSize
    paginationReactive.page = 1
  }
})

const rtlEnabled = ref(true)
const rtlStyles = [unstableDataTableRtl]
const pagination = paginationReactive

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
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <div :dir="rtlEnabled ? 'rtl' : 'ltr'">
        <n-button @click="filterAddress">
          Filter Address(Use Value 'London')
        </n-button>
        <n-button @click="unfilterAddress">
          Clear Address Filters
        </n-button>
      </div>
      <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
      {{ rtlEnabled }}
      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        @update:filters="handleUpdateFilter"
      />
    </n-config-provider>
  </n-space>
</template>
