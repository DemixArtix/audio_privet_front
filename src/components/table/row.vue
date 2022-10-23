<template lang="pug">
  .tr__block(:class="{'border-b': showBorder}")
    .tr.row.flex.px-2
      .td.flex.justify-start.px-1.py-4.cursor-pointer(
        v-for="(col, index) in columns"
        :key="index"
        :style="{ width: 100 * (col.width ? col.width : 1) + '%' }"
        :class="[index === 0 ? 'justify-start' : 'justify-center']"
        @click="expandLevel()"
      )
        .mr-4(v-if="index === 0" :style="{'marginLeft': `${1 * level}rem`}")
          g-icon(
            name="ui/arrow"
            v-if="row.children && index === 0"
            :class="{ 'rotate-90': expanded }"
            class="ease-linear duration-300"
            )
          .mr-1(v-else)
        span.text-left {{row[col.field]}}
</template>

<script lang="ts">
  import tableRow from "./row.vue";
  import Vue from 'vue'
  import $ from 'jquery'

  import IRowPropsData from "@/interfaces/IRowPropsData";

  import { defineComponent } from 'vue'
  export default defineComponent({
    name: "index",
    props: {
      row: {
        type: Object,
        default: () => ({})
      },
      columns: {
        type: Array,
        default: () => ({})
      },
      level: {
        type: Number,
        default: 1
      },
      showBorder: {
        type: Boolean,
        default: true
      },
    },
    data: function() {
      return {
        expanded: false as boolean,
        instances: [] as any[],
        parentDestroyed: false,
      }
    },
    methods: {
      expandLevel(): void {
        if(this.row.children && this.row.children.length > 0) {
          this.expanded = !this.expanded;
          if(this.expanded) {
            this.instances = [...this.row.children].reverse().map((row: any, index: number) => {
              //@ts-ignore
              const tableRowClass = Vue.extend(tableRow)
              const propsData: IRowPropsData = {
                  row: row as string[],
                  columns: this.columns as string[],
                  level: this.level + 1,
              };
              if(index === 0) {
                  propsData.showBorder = false;
              }
              const instance = new tableRowClass({
                  propsData,
                  parent: this as any,
              })
              instance.$mount()
              this.$el.insertAdjacentElement('afterend', instance.$el)
              return instance
            })
          } else {
            this.deleteChildrenRows();
          }
        }
      },
      deleteChildrenRows() {
        this.instances.forEach(instance => {
          instance.$data.parentDestroyed = true;
        })
        this.instances.splice(0);
      },
    },
    watch: {
      parentDestroyed: {
        handler(val) {
          const vm = this;
          if(val) {
            this.deleteChildrenRows()
            $(this.$el).slideUp(250, function () {
              vm.$destroy()
              vm.$el.remove()
            })
          } else {
            this.$nextTick(function () {
              $(vm.$el).slideDown()
            })
          }
        },
        immediate: true
      }
    }
  })
</script>

<style scoped lang="sass">
  .tr__block
    display: none
</style>