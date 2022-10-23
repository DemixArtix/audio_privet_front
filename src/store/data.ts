import ITableRow from "@/interfaces/ITableRow";

// @ts-ignore
import api from 'api'

export default ({
  namespaced: true,
  state: {
    tableData: [] as ITableRow[]
  },
  getters: {
    tableData(state: any): any[] {
      return state.tableData;
    }
  },
  mutations: {
    SET_TABLE_DATA(state: any, data: ITableRow[]) {
      state.tableData = data;
    },
  },
  actions: {
    async getData({ commit }: any): Promise<void> {
        await api.get('/').then((res: any) => {
          if(res?.data) {
            commit('SET_TABLE_DATA', res?.data)
          }
        })
    }
  },
})