<template>
  <layout>
    <div class="labelTitle">
      <router-link to="/Labels" class="link" active-class="selected">
        <icon name="left" />
      </router-link>
      <span> 编辑标签 </span>
    </div>

    <div class="labelName">
      <Notes
        :value="currentTag.name"
        fieldname="标签名"
        placeholder="请输入标签名"
        @update:value="onUpdateTagname"
      />
      <!-- <Notes
        :value="currentTag.type"
        fieldname="标签类型"
        placeholder="请输入标签类型"
        @update:value="onUpdateTagType"
      /> -->
    </div>
    <button class="deleteButton" @click="DeleteNewTag">删除标签</button>
  </layout>
</template>

<script lang="ts">
import vue from "vue";
import { Component } from "vue-property-decorator";
import Notes from "../components/money/Notes.vue";
// import store from "../store/index";
//  @update:value="onUpdateTagType(this.currentTag.name, type)"
@Component({
  components: { Notes },
})
export default class EditLabel extends vue {
  $route: any;
  $router: any;
  get currentTag() {
    return this.$store.state.currentTag;
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit("fetchTags");
    this.$store.commit("setcurrentTag", id);
    if (!this.currentTag) {
      this.$router.replace("/404");
    }
  }
  onUpdateTagname(name: string) {
    if (this.currentTag) {
      this.$store.commit("updateTag", { id: this.currentTag.id, name });
    }
  }
  // onUpdateTagType(type: string) {
  //   if (type === "-" || type === "+") {
  //     this.$store.commit("updateTag", {
  //       id: this.currentTag.id,
  //       name: this.currentTag.name,
  //       type: type,
  //     });
  //   } else {
  //     alert("请输入-或+，其余无效");
  //   }
  // }
  DeleteNewTag() {
    if (this.currentTag) {
      this.$store.commit("removeTag", this.currentTag.id);
      this.$router.back();
    } else {
      window.alert("删除失败");
    }
  }
  // Typechange(value: string) {
  //   if (value === "-") {
  //     return "支出";
  //   } else {
  //     return "收入";
  //   }
  // }
  goBack() {
    this.$router.back();
  }
}
</script>
<style lang="scss" scoped>
.labelTitle {
  //   border: 1px solid red;
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
  background-color: #cfd6f3;
  color: #5771c9;
  // border-bottom: 1px solid #869ef0;
  > .link {
    margin-left: 24px;
  }
  span {
    position: absolute;
    line-height: 18px;
    height: 20px;
    left: 50%;
    top: 30%;
    transform: translate(-50%);
  }
}

.labelName {
  // border: 1px solid red;
  // background-color: #fff;
  margin-top: 8px;
}
::v-deep.notes {
  // border: 1px solid red;
  background-color: #e5e7ee;
  color: #5771c9;
}
::v-deep.notes > input {
  background-color: #e5e7ee;
  color: #5771c9;
}
.deleteButton {
  width: 98px;
  height: 40px;
  background-color: #788bca;
  border: none;
  border-radius: 4px;
  color: white;
  position: absolute;
  left: 50%;
  top: 88%;
  transform: translate(-50%);
}
</style>