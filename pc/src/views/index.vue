/* eslint-disable */
<style lang="less" scoped>
.home_container45 {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: calc(100% - 100px);
    margin: 40px auto;
    height: calc(100% - 80px);
    background-color: #ffffff;
    .title {
      height: 60px;
      width: 96%;
      margin: 0 auto;
      line-height: 60px;
      color: #000000;
      font-size: 20px;
      font-weight: bolder;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
}
.moveLeft {
  animation-name: moveLeftShare;
}
.moveRight {
  /*animation-name: moveRightShare;*/
  /*right: -100%;*/
}
</style>
<style>
@keyframes moveLeftShare {
  0% {
    right: -100%;
  }
  100% {
    right: 0;
  }
}
@keyframes moveRightShare {
  0% {
    right: 0;
  }
  100% {
    right: -100%;
  }
}
</style>
<template>
  <div class="home_container45">
    <div class="content" v-if="isLogin">
      <div class="title">凶手活动配置系统</div>
      <HomeList />
      <!--<div class="textManage">
        <el-button type="primary" @click="textManagement">文案管理</el-button>
      </div>-->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import HomeList from '../components/home/homeList'
import { setTime } from '../services/transformTime'
export default {
  data() {
    return {
      isLogin: false
    }
  },
  filters: {
    setTime
  },
  components: {
    HomeList
  },
  computed: {},
  beforeDestroy() {},

  async mounted() {
    this.isLogin = window.sessionStorage.getItem('whoSetToken')
    if (!this.isLogin) return this.$router.push({ path: '/login' })
  },
  methods: {
    textManagement() {
      this.$router.push({ path: '/setting' })
    }
  }
}
</script>
