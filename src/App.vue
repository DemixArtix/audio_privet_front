<template lang="pug">
  #app
    Table(
      :tableData="tableData"
      :columns="columns"
    )
</template>

<script lang="ts">

import ITableRow from "@/interfaces/ITableRow";
import ITableColumn from "@/interfaces/ITableColumn";

import Vue from 'vue';
//@ts-ignore
import Table from 'components/table'

export default Vue.extend({
  name: 'App',
  components: {
    Table
  },
  async created(): Promise<void> {
    await this.getTableData()
  },
  computed: {
    tableData(): ITableRow[] {
      return this.$store.getters['data/tableData'].items
    },
  },
  data: function () {
    return {
      columns: [
        {
          headerName: 'Категория' ,
          field: 'title',
          width: 2,
          notCalculated: true,
          footerText: 'Итого'
        },
        {
          headerName: 'Просмотры' ,
          field: 'countView',
          width: .6
        },
        {
          headerName: 'Воспроизв.' ,
          field: 'countPlay',
          width: .6
        },
        {
          headerName: 'Отправлено' ,
          field: 'countSend',
          width: .6
        },
        {
          headerName: 'Заказов' ,
          field: 'countOrder',
          width: .6
        },
        {
          headerName: 'Оплачено' ,
          field: 'countPay',
          width: .6
        },
        {
          headerName: 'Просм./Отпр.' ,
          field: 'viewSend',
          width: .6,
          inPercent: true,
        },
        {
          headerName: 'Просм./Оплат.' ,
          field: 'viewPay',
          width: .6,
          inPercent: true,
        },
      ] as ITableColumn[]
    }
  },
  methods: {
    async getTableData() {
      await this.$store.dispatch('data/getData')
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
