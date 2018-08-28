<template>
  <div class="vue-waterfall">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  private name = 'WaterfallItem';

  @Prop() private msg!: string;
}
</script>

<style lang="less">
</style>
