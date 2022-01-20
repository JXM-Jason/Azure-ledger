<template>
  <div class="tags">
    <div class="content">
      <ul>
        <li
          v-for="item in TagList"
          :key="item.id"
          @click="selected(item)"
          :class="{ selected: selectTags.indexOf(item) >= 0 }"
        >
          <div class="parcel">
            <icon :name="item.name" />
            <!-- <span>{{ item.name }}</span> -->
            {{ item.name }}
          </div>
        </li>
        <li class="lastli" @click="addTags()">
          <icon name="添加" />
          <button>新增</button>
        </li>
      </ul>
      <!-- {item.name:true,"收入":this.Type==="+","支出":this.Type==="+"} -->
      <!-- <div>
      <button @click="addTags()">新增标签</button>
    </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import clone from "@/lib/clone";
import vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Tags extends vue {
  @Prop(String) Type = "-";
  // tagList = store.fetchTags();
  @Watch("Type")
  onTypechange(newType: string) {
    this.Type = newType;
    // console.log(this.Type);
  }

  get tagList() {
    return this.$store.state.tagList;
  }
  get TagList() {
    //这是按照类型过滤后的数据
    return this.findType();
  }
  beforecreated() {
    this.$store.commit("fetchTags");
  }
  selectTags: string[] = [];
  selected(tag: any) {
    const index = this.selectTags.indexOf(tag);
    if (index >= 0) {
      this.selectTags.splice(index, 1);
    } else {
      if (this.selectTags.length < 3) {
        this.selectTags.forEach((item: any) => {
          if (item.type !== this.Type) {
            this.selectTags = [];
          }
        });
        this.selectTags.push(tag);
      } else {
        this.selectTags = [];
        alert("最多选择3个标签！");
      }
    }
    this.$emit("update:value", this.selectTags);
  }
  addTags() {
    const Tagname = window.prompt("请输入新的标签名！");
    const tagType = this.Type;
    let flag = false;
    this.$store.commit("createTag", {
      name: Tagname,
      type: tagType,
      flag: flag,
    });
  }
  findType() {
    const TypeData = clone(this.tagList).filter(
      (item: any) => item.type === this.Type
    );
    return TypeData;
  }
}
</script>

<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom: 1px solid #5a7ff7;
  .content {
    // border: 1px solid red;
    padding: 0 15px 0 15px;
  }
  .lastli {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      font-size: 32px;
    }
    button {
      color: #333;
      border: none;
      background: transparent;
      font-size: 16px;
      text-align: center;
      margin-top: 2px;
    }
  }
  ul {
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    // border: 1px solid blue;
    li {
      overflow: hidden;
      text-overflow: ellipsis;
      width: 92px;
      // $bg: #d9d9d9;
      $bg: #e5e9f8;
      background-color: $bg;
      $h: 24px;
      height: $h * 2.5;
      border-radius: $h/2;
      padding: 0 6px;
      margin: 10px 4px 2px 7px;
      text-align: center;
      .parcel {
        margin: 0 auto;
        // border: 1px solid blue;
        width: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 16px;
        .icon {
          // border: 1px solid red;
          margin-top: 4px;
          font-size: 32px;
        }
      }

      &.selected {
        // background: darken($bg, 50%);
        background-color: #c2cef5;
        color: white;
      }
    }
  }
}
</style>