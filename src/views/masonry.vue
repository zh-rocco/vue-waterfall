<template>
  <masonry :cols="4"
           :gutter="8"
           style="padding: 8px;">
    <div class="vue-waterfall__item"
         v-for="(item, i) in list"
         :key="item.image"
         :class="`column-${i}`">
      <img class="image"
           :src="item.image">
      <h4>{{ i+ 1 }}</h4>
    </div>
  </masonry>
</template>

<script lang="ts">
import Vue from 'vue';

interface ListItem {
  image: string;
}

export default Vue.extend({
  name: 'vue-masonry',

  data() {
    const list: ListItem[] = [];
    return {
      list,
    };
  },

  methods: {
    getList(length: number = 50): any[] {
      length = Math.min(length, 100);
      return Array.from({ length }).map((item, index) => ({
        image: `http://cued.xunlei.com/demos/publ/img/P_${(10 + index + '').padStart(3, '0')}.jpg`,
      }));
    },
  },

  created() {
    this.list = this.getList();
  },
});
</script>

<style lang="less">
</style>
