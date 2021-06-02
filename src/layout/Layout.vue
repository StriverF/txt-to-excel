<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <router-link to="/">
        <div class="logo" />
      </router-link>

      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['/text-to-excel']"
        :style="{ lineHeight: '64px' }"
        @click="handleClick"
      >
        <a-menu-item key="/text-to-excel">
          文本转Excel
        </a-menu-item>
        <a-menu-item key="/unit-conversion">
          单位计算
        </a-menu-item>
        <a-menu-item key="/time-conversion">
          时间戳转换
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0; " class="">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>小工具箱</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '680px' }">
        <router-view/>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2021 Created by π UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
export default {
  mounted () {
    console.log('sdfsd')
  },
  methods: {
    handleClick (e) {
      console.log(e)
      this.$router.push(e.key)
    }
  }
}
</script>
<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
