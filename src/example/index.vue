<template>
  <div class="home">
    <waterfall :data="list"></waterfall>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Waterfall from '@/lib/waterfall.vue';

interface ListItem {
  image: string;
}

export default Vue.extend({
  name: 'Home',

  components: { Waterfall },

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
