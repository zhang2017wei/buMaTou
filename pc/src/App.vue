/* eslint-disable */
<template>
  <div id="container" class="activePageContainer">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <loading></loading>
    <errMsg />
  </div>
</template>
<style>
.longText {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.scrollContent::-webkit-scrollbar {
  display: none;
}
</style>

<style type="text/css" scoped>
#container {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  overflow-x: hidden;
  background: #f9f5ea;
}
#container::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  display: none;
}
</style>
<script>
import loading from './components/common/loading.vue'
import errMsg from './components/common/errmsg.vue'
import pageTextData from './services/pageData'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data: () => ({}),
  components: {
    loading,
    errMsg
  },
  watch: {},
  computed: {
    ...mapGetters({})
  },
  mounted() {},
  methods: {}
}
</script>
