<template lang="pug">
  table.table__block.container
    .thead
      .tr.flex.border-b.px-2
        .th.p-1.flex(
          v-for="(col, index) in columns"
          :key="index"
          :class="[index === 0 ? 'justify-start' : 'justify-center']"
          :style="{ width: 100 * (col.width ? col.width : 1) + '%' }") {{ col.headerName ? col.headerName : col.field }}
    .tbody
      tableRow(
        v-for="(row, index) in tableData"
        :key="index"
        :row="row"
        :columns="columns"
      )
    .tfoot.bg-gray-200.border-gray-300.border-t
      .tr.flex.px-2
        .th.px-1.py-4.flex(
          v-for="(col, index) in columns"
          :class="[index === 0 ? 'justify-start' : 'justify-center']"
          :style="{ width: 100 * (col.width ? col.width : 1) + '%' }"
        )
          | {{col.notCalculated ? col.footerText : totalColValue(col)}}




</template>

<script lang="ts">
  import ITableColumn from "@/interfaces/ITableColumn";

  import { defineComponent } from 'vue'
  import tableRow from "./row.vue";

  export default defineComponent({
    name: "index",
    components: {
      tableRow
    },
    props: {
      tableData: {
        type: Array,
        default: () => ([])
      },
      columns: {
        type: Array,
        default: () => ([])
      }
    },
    methods: {
      totalColValue(column: ITableColumn): number | string {
        const total = this.tableData.reduce((acc: number, item: any): number => {
          acc += item[column.field];
          return acc
        }, 0)
        function toFixed(value: number): number | string {
          return value % 1 === 0 ? value : value.toFixed(2)
        }
        return column.inPercent
          ? toFixed(total / this.tableData.length) + '%'
          : toFixed(total)
      }
    },
  })
</script>

<style scoped lang="scss">
</style>