<template>
  <div class="type">
    <ul class="tabs">
      <li
        v-for="item in datasource"
        :key="item.value"
        :class="liClass(item)"
        @click="selected(item)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Component, Prop } from "vue-property-decorator";
type DataSourceItem = { text: string; value: string };
@Component
export default class Tabs extends vue {
  @Prop(String) classPrefix?: string;
  @Prop({ required: true, type: Array }) datasource!: DataSourceItem;
  @Prop(String) readonly value!: string;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  selected(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + "-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }
}
</script>

<style lang="scss" scoped>
.type {
  ul {
    display: flex;
    background-color: #96aef5;
    text-align: center;
    line-height: 64px;
  }

  li {
    // border: 1px solid red;
    width: 50%;
    height: 64px;
    border: none;
    font-size: 24px;
    position: relative;
    // &.selected::after {
    //   content: "";
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 4px;
    //   background: #2a57df;
    // }
    &.selected {
      color: #fff;
      background-color: #7692e6;
    }
  }
}
</style>