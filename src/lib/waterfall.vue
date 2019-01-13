<template>
  <div class="vue-waterfall"
       :style="getContainerStyle">
    <div class="vue-waterfall__column"
         v-for="(col, i) in list"
         :key="i"
         :style="getColumnStyle(i)">
      <div class="vue-waterfall__item"
           v-for="(item, j) in col"
           :key="item.image"
           :class="`column-${i}-${j}`">
        <img class="image"
             :src="item.image">
        <h4>{{ i + j * column + 1 }}</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import WaterfallItem from './waterfall-item.vue';

@Component({
  components: {
    WaterfallItem,
  },
})
export default class Waterfall extends Vue {
  @Prop({ type: Array, default: () => [] })
  private data!: object[];

  @Prop({ type: Number, default: 4 })
  private column!: number;

  //  ['20%', '40%', '20%', '20%']
  @Prop({ type: Array, default: () => ['25%', '25%', '25%', '25%'] })
  private widths!: string[];

  @Prop({ type: String, default: '8px' })
  private gap!: string;

  @Prop({ type: Boolean, default: true })
  private isLoaded!: boolean;

  private columns: any[] = [];
  private averageHeight: number = 0;

  private get list() {
    const column = this.column;
    const structure = this.getListStructure(column);
    this.data.forEach((item, index) => {
      const i = index % column;
      structure[i].push(item);
    });
    return structure;
  }

  private getContainerStyle(): object {
    const gap = this.gap;
    return gap ? { padding: gap } : {};
  }

  private getColumnStyle(index: number): object {
    return { width: this.widths[index] || '100%', marginLeft: index && this.gap };
  }

  private getListStructure(length: number): any[] {
    return Array.from({ length }).map(() => []);
  }

  private getColumnInfo(): any[] {
    const nodeList: NodeList = this.$el.querySelectorAll('.vue-waterfall__column');
    const list = this.list;
    const columns: any[] = Array.from(nodeList).map((element: any, index) => ({
      width: element.offsetWidth,
      height: element.offsetHeight,
      length: list[index].length,
      percentage: 0,
      collection: [],
    }));
    const totalWidth = columns.reduce((accu, { width }) => accu + width, 0);
    columns.forEach((item) => {
      item.percentage = item.width / totalWidth;
    });
    return columns;
  }

  private getWeightedAverageHeight(): number {
    return this.columns
      .map(({ height, percentage }, index) => height * percentage)
      .reduce((accu, curr) => accu + curr, 0);
  }

  private collectExceededElement() {
    const columns = this.columns;
    columns.forEach((column, i) => {
      const average = this.averageHeight;
      const { collection, length } = column;
      let height = column.height;
      column.subtraction = height - average;
      let j = length - 1;
      for (; true; j--) {
        const element: any = this.$el.querySelector(`.column-${i}-${j}`);
        // window.console.log(i, j, element);
        const h = element ? element.offsetHeight : 0;
        if (height - h > average) {
          height -= h;
          collection.push([j, h]);
        } else {
          break;
        }
      }
    });
  }

  // private created() {}

  private mounted() {
    this.columns = this.getColumnInfo();
    this.averageHeight = this.getWeightedAverageHeight();
    // window.console.log(this.averageHeight);
    this.collectExceededElement();
    // window.console.log(this.columns);
  }
}
</script>

<style lang="less">
.vue-waterfall {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px;

  &__column {
    &:not(:first-child) {
      margin-left: 8px;
    }
  }

  &__item {
    border-radius: 4px;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.14);
    overflow: hidden;
    font-size: 14px;
    cursor: pointer;

    &:not(:first-child) {
      margin-top: 16px;
    }

    .image {
      display: block;
      width: 100%;
    }
  }

  .item-move {
    transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
}
</style>
