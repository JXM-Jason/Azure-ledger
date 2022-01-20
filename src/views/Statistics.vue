<template>
  <layout>
    <Tabs classPrefix="types" :datasource="recordTypeList" :value.sync="type" />
    <div>
      <Notes type="date" class="dateChoose" :value.sync="todyTime" />
      <Mycharts :nowTime.sync="todyTime" :nowType.sync="type" />
    </div>
    <!-- <div v-else class="Norecord">目前没有记录</div> -->

    <!-- <ul v-if="this.groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <ol>
          <h3 class="title">
            {{ beautify(group.title) }} <span>{{ group.total }}</span>
          </h3>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagsString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>{{ "￥" + item.number }}</span>
          </li>
        </ol>
      </li>
    </ul>
    <div v-else class="Norecord">目前没有记录</div> -->
  </layout>
</template>

<script lang="ts">
import vue from "vue";
import Type from "../components/money/Type.vue";
import Tabs from "../components/Tabs.vue";
import Notes from "../components/money/Notes.vue";
import { Component } from "vue-property-decorator";
import typeList from "../constants/typeList";
import dayjs from "dayjs";
import clone from "../lib/clone";
import Mycharts from "../components/Mycharts.vue";

@Component({
  components: { Type, Tabs, Mycharts, Notes },
})
export default class Statistics extends vue {
  type = "-";
  interval = "day";
  recordTypeList = typeList;
  todyTime = new Date().toISOString();

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  tagsString(tags: Tag[]) {
    return tags.map((t) => t.name).join("，");
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  beforeCreate() {
    this.$store.commit("fetchRecords");
    return;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get groupedList() {
    if (this.recordList.length === 0) {
      return [];
    }
    const newList = clone(this.recordList)
      .filter((t) => t.type === this.type)
      .sort((a, b) => {
        // dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
        return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
      });

    type Result = {
      title: string;
      total?: number;
      items: RecordItem[];
    }[];
    if (newList.length === 0) {
      return [];
    }
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        total: 0,
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const last = result[result.length - 1];
      const current = newList[i];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          total: 0,
          items: [current],
        });
      }
    }
    // console.log(result);

    result.map((group) => {
      group.total = group.items.reduce((sum, item) => sum + item.number, 0);
    });
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  beautify(stringTime: string) {
    const day = dayjs(stringTime);
    const now = dayjs();
    // console.log(now);
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .tabs > .interval-item {
  height: 48px;
  line-height: 48px;
}
.Norecord {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%);
  font-size: 22px;
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
.dateChoose {
  background-color: #ffffff;
  margin-right: 20px;
  margin-top: 20px;
  height: 40px;
  // border: 1px solid red;
}
::v-deep.dateChoose > input {
  background-color: #ffffff;
  height: 40px;
}
</style>









