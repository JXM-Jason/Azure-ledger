<template>
  <svg class="icon">
    <use :xlink:href="'#' + (iconArray.includes(name) ? name : defaultIcon)" />
  </svg>
</template>

<script lang="ts">
interface IconData {
  iconArray: string[];
  defaultIcon: string;
}
let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/)); //使用require
} catch (error) {
  console.log(error);
}

export default {
  name: "Icon",
  props: ["name"],
  data(): IconData {
    return {
      iconArray: [
        "labels",
        "money",
        "statistics",
        "left",
        "right",
        "衣服",
        "食物",
        "住宿",
        "出行",
        "工资",
        "理财",
        "兼职",
        "零花钱",
        "NoData",
      ],
      defaultIcon: "铜钱",
    };
  },
};
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>