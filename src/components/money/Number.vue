<template>
  <div class="number">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok">OK</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component
export default class Number extends vue {
  @Prop(Array) oneTag!: string[];
  output = "0";
  inputContent(event: MouseEvent) {
    const buttontext = (event.target as HTMLButtonElement).textContent!;
    if (this.output === "0") {
      if ("0123456789".indexOf(buttontext) >= 0) {
        this.output = buttontext;
      } else {
        this.output += buttontext;
      }
    } else if (this.output.indexOf(".") >= 0 && buttontext === ".") {
      return;
    } else {
      this.output += buttontext;
    }
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  clear() {
    this.output = "0";
  }
  ok() {
    if (this.oneTag.length > 0) {
      this.$emit("update:value", this.output);
      this.$emit("submit", this.output);
    } else {
      alert("请至少选择一个标签！");
    }
    this.output = "0";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.number {
  .output {
    @extend %clearfix;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
    border-bottom: 1px solid #5a7ff7;
    border-top: 1px solid #5a7ff7;
  }
  .buttons {
    @extend %clearfix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      font-size: 22px;
      &.ok {
        height: 64 * 2px;
        float: right;
      }
      &.zero {
        width: 25 * 2%;
      }
      // $bg: #f2f2f2;
      $bg: #e4e9f7;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>