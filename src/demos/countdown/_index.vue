<template>
  <!-- THIS FILE IS AUTO-GENERATED BY build/vux-config.js -->
  <group>
    <cell v-for="demo in list" :key="demo.path" is-link :link="demo.path" :title="demo.title[lang]"></cell>
  </group>
</template>

<script>
/* eslint-disable */
export default {
  created () {
    this.lang = this.$locale.get()
  },
  data () {
    return {
      lang: 'en',
      list: [
  {
    "title": {
      "en": "Manually",
      "zh-CN": "手动模式"
    },
    "path": "/components/countdown/manually",
    "order": 1
  },
  {
    "title": {
      "en": "Automatic countdown",
      "zh-CN": "自动倒计时"
    },
    "path": "/components/countdown/basic",
    "order": 1
  }
]
    }
  }
}
</script>
