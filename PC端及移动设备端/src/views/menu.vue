<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item class="menuItem" index="1" id="home"
        ><Icon class="ios-home" type="ios-home" size="22" />首页</el-menu-item
      >
      <el-menu-item class="menuItem" index="2" id="kind"
        ><Icon class="md-apps" type="md-apps" size="22" />分类</el-menu-item
      >
      <el-menu-item class="menuItem" index="3" id="label"
        ><Icon
          class="md-pricetags"
          type="md-pricetags"
          size="22"
        />标签</el-menu-item
      >
      <el-menu-item class="menuItem" index="4" id="about"
        ><i class="el-icon-s-custom" style="font-size: 20px;"></i
        ><span>关于</span></el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
require("../viewstyle/menu.scss");
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  mounted() {
    document.getElementById("home").style.backgroundColor = "#409EFF";
    document.getElementById("home").style.color = "#fff";
    document.getElementById("kind").style.backgroundColor = "#fff";
    document.getElementById("kind").style.color = "#909399";
    document.getElementById("label").style.backgroundColor = "#fff";
    document.getElementById("label").style.color = "#909399";
    document.getElementById("about").style.backgroundColor = "#fff";
    document.getElementById("about").style.color = "#909399";
  },
  methods: {
    handleSelect(val) {
      this.activeIndex = val;
      if (this.activeIndex == "1") {
        document.getElementById("home").style.backgroundColor = "#409EFF";
        document.getElementById("home").style.color = "#fff";
        document.getElementById("kind").style.backgroundColor = "#fff";
        document.getElementById("kind").style.color = "#909399";
        document.getElementById("label").style.backgroundColor = "#fff";
        document.getElementById("label").style.color = "#909399";
        document.getElementById("about").style.backgroundColor = "#fff";
        document.getElementById("about").style.color = "#909399";
      } else if (this.activeIndex == "2") {
        document.getElementById("home").style.backgroundColor = "#fff";
        document.getElementById("home").style.color = "#909399";
        document.getElementById("kind").style.backgroundColor = "#409EFF";
        document.getElementById("kind").style.color = "#fff";
        document.getElementById("label").style.backgroundColor = "#fff";
        document.getElementById("label").style.color = "#909399";
        document.getElementById("about").style.backgroundColor = "#fff";
        document.getElementById("about").style.color = "#909399";
      } else if (this.activeIndex == "3") {
        document.getElementById("home").style.backgroundColor = "#fff";
        document.getElementById("home").style.color = "#909399";
        document.getElementById("kind").style.backgroundColor = "#fff";
        document.getElementById("kind").style.color = "#909399";
        document.getElementById("label").style.backgroundColor = "#409EFF";
        document.getElementById("label").style.color = "#fff";
        document.getElementById("about").style.backgroundColor = "#fff";
        document.getElementById("about").style.color = "#909399";
      } else if (this.activeIndex == "4") {
        document.getElementById("home").style.backgroundColor = "#fff";
        document.getElementById("home").style.color = "#909399";
        document.getElementById("kind").style.backgroundColor = "#fff";
        document.getElementById("kind").style.color = "#909399";
        document.getElementById("label").style.backgroundColor = "#fff";
        document.getElementById("label").style.color = "#909399";
        document.getElementById("about").style.backgroundColor = "#409EFF";
        document.getElementById("about").style.color = "#fff";
      }
    }
  }
};
</script>

