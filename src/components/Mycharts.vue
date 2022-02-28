<template>
  <div>
    <ul class="incomeAndspending">
      <li class="red">- {{ this.classifyData(this.time)[0] }}</li>
      <li class="green">+{{ this.classifyData(this.time)[1] }}</li>
    </ul>
    <div ref="root" class="root" v-show="showModule()"></div>

    <div v-show="!showModule()">
      <div for="" class="label">
        <icon name="NoData" />
      </div>
      <div class="link">
        <div>暂无数据</div>
        <div class="buttonlink">
          <router-link to="/Money" class="selected"> 记一笔 </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import clone from "../lib/clone";
export default {
  props: ["nowTime", "nowType"],
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      // Data: this.recordData,
      Data: this.$store.state.recordList,
      time: this.nowTime,
      type: this.nowType,
      myChartInstance: null,
    };
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    nowTime(newtime) {
      this.time = newtime;
      this.updateChartsData(this.findData());
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    nowType(newtype) {
      this.type = newtype;
      this.updateChartsData(this.findData());
    },
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  beforeCreate() {
    this.$store.commit("fetchRecords");
  },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    // let width = document.body.clientWidth;
    // console.log("clientwidth");
    // console.log(document.body.clientWidth);

    //echarts饼图所在div的width因该和支出收入按钮宽度之和相同
    // let width = 481.2;
    // this.$refs.root.style.width = `${width}px`;
    // this.$refs.root.style.height = `${width * 1.2}px`;
    this.$refs.root.style.height = 400 + "px";
    this.myChartInstance = echarts.init(this.$refs.root);
    this.myChartInstance.setOption({
      tooltip: {
        show: true,
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        left: 32,
        top: 20,
        bottom: 20,
      },
      series: [
        {
          type: "pie",
          data: this.findData(),
          radius: "50%",
          center: ["50%", "50%"],
        },
      ],
    });
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    showModule() {
      if (this.findData().length > 0) {
        return true;
      } else {
        return false;
      }
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    findData() {
      if (this.Data.length < 0) {
        return [];
      }
      let resultData = [];
      let filterData = [];
      let inputTime = dayjs(this.nowTime).format("YYYY-MM-DD");
      filterData = this.Data.filter(
        (item) => item.type === this.type && item.createdAt === inputTime
      );
      filterData.forEach((item) => {
        resultData.push({ value: item.number, name: item.tags[0].name });
      });
      // console.log("resultData");
      // console.log(resultData);
      return resultData;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    classifyData(time) {
      if (this.Data.length < 0) {
        return;
      }
      let resultData = [];
      let filterData = [];
      let spendingArray = [];
      let incomeArray = [];
      let spendingValue = 0;
      let incomeValue = 0;
      // let inputTime = dayjs(this.nowTime).format("YYYY-MM-DD");
      let inputTime = dayjs(time).format("YYYY-MM-DD");
      filterData = this.Data.filter((item) => item.createdAt === inputTime);
      filterData.forEach((item) => {
        resultData.push({
          value: item.number,
          name: item.tags[0].name,
          type: item.type,
        });
      });
      resultData.forEach((item) => {
        if (item.type === "-") {
          spendingArray.push(item.value);
        } else if (item.type === "+") {
          incomeArray.push(item.value);
        }
      });
      spendingArray.forEach((item) => {
        spendingValue += item;
      });
      incomeArray.forEach((item) => {
        incomeValue += item;
      });

      return [spendingValue, incomeValue];
    },
    updateChartsData(newData) {
      const prevOption = this.myChartInstance.getOption();
      prevOption.legend.data = newData;
      prevOption.series[0].data = newData;

      this.myChartInstance.setOption(prevOption);
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  // border: 1px solid red;
  text-align: center;
  margin-top: 100px;
  .icon {
    width: 50px;
    height: 80px;
  }
}
.link {
  display: flex;
  flex-direction: column;
  align-items: center;
  .buttonlink {
    // border: 1px solid red;
    margin-top: 5px;
    // background-color: #c4c4c4;
    background-color: rgb(230, 230, 230);
    width: 80px;
    .selected {
      display: block;
      width: 80px;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
  }
}
.incomeAndspending {
  // border: 1px solid red;
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  li {
    display: block;
    width: 120px;
    text-align: center;
    // line-height: 40px;
    padding: 10px;
    box-shadow: 0 0 2px;
    background-color: #ffffff;
    // border: 1px solid blue;
    &.red {
      color: red;
    }
    &.green {
      color: green;
    }
  }
}
</style>