<template>
  <layout class="layout1">
    <Tabs :datasource="recordTypeList" :value.sync="record.type" />
    {{ record }}

    <Tags @update:value="onUpdateTags" :Type.sync="record.type" />
    <Notes
      fieldname="备注"
      placeholder="在这里添加备注"
      :value.sync="record.notes"
      class="Notes"
    />
    <Notes
      fieldname="日期"
      placeholder="在这里添加备注"
      :value.sync="record.createdAt"
      type="date"
      class="Notes"
    />

    <Number
      @update:value="onUpdateNumber"
      :oneTag="record.tags"
      @submit="saveRecord"
    />
  </layout>
</template>

<script lang="ts">
import vue from "vue";
import Tabs from "../components/Tabs.vue";
import Tags from "../components/money/Tags.vue";
import Notes from "../components/money/Notes.vue";
import Number from "../components/money/Number.vue";
import { Component } from "vue-property-decorator";
import typeList from "../constants/typeList";

@Component({
  components: { Tabs, Notes, Tags, Number },
  computed: {
    recordList() {
      return this.$store.state.recordList;
    },
    tagList() {
      return this.$store.state.tagList;
    },
  },
})
export default class Money extends vue {
  record: any = {
    tags: [],
    notes: "",
    type: "-",
    number: 0,
    createdAt: new Date().toISOString(),
  };
  recordTypeList = typeList;

  created() {
    // console.log("测试record");
    // console.log(this.record.type);
    this.$store.commit("fetchRecords");
  }

  onUpdateTags(tag: string[]) {
    if (this.record.type) {
      this.record.tags = tag;
    }
  }
  onUpdateNotes(value: string) {
    // this.record.createdAt = value;
    this.record.notes = value;
  }
  onUpdateNumber(output: string) {
    this.record.number = parseFloat(output);
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
    this.record.tags = [];
    this.record.notes = "";
    this.record.number = "0";
    this.record.createdAt = new Date().toISOString();
  }
}
</script>

<style lang="scss" scoped>
.layout1 {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.Notes {
  height: 40px;
  ::v-deep input {
    height: 40px;
    font-size: 14px;
    color: rgb(44, 43, 43);
  }
}
::v-deep.notes {
  background-color: #e5e7ee;
  // border: 1px solid #e5e7ee;
}
::v-deep.notes span {
  // color: #5771c9;
  color: rgb(128, 126, 126);
}
::v-deep.notes input {
  color: rgb(128, 126, 126);
  background-color: #e5e7ee;
  filter: alpha(opacity=0); /*androd*/
  appearance: none; /*下拉框去掉右侧图标*/
}
</style>









