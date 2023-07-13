/* eslint-disable */
<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
  background: url('../assets/image/login2.jpg') 0 0 no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .loginContent {
    width: 800px;
    min-height: 300px;
    height: auto;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    position: relative;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-bottom: 40px;
  }
  .loginTitle {
    text-align: center;
    padding: 30px 0;
    font-size: 36px;
    color: rgba(251, 251, 251, 0.7);
    font-family: YouSheBiaoTiHei;
  }
  .userName,
  .password {
    width: 70%;
    height: 40px;
    text-align: center;
    margin: 20px auto;
  }
  .password {
    margin-top: 40px;
  }
  .input {
    width: 100%;
    height: 100%;
    border: 0;
    background-color: transparent;
    color: rgba(251, 251, 251, 0.7);
    border-bottom: 1px solid rgba(251, 251, 251, 0.2);
    font-size: 20px;
    text-indent: 20px;
  }
  input:focus {
    border-bottom-color: rgba(251, 251, 251, 0.9);
  }
  .btn {
    border: 1px solid rgba(251, 251, 251, 0.2);
    width: 300px;
    height: 50px;
    line-height: 50px;
    margin: 60px auto 0;
    text-align: center;
    font-size: 20px;
    color: rgba(251, 251, 251, 0.2);
    cursor: pointer;
    &:hover {
      transform: scale(1.02);
      font-size: 21px;
    }
  }
  .btnActive {
    border: 1px solid #718eae;
    color: #718eae;
  }
}
</style>

<template>
  <div class="login_container">
    <div class="loginContent">
      <div class="loginTitle">《谁是凶手》h5活动配置后台</div>
      <div class="userName">
        <input
          type="text"
          v-model="userName"
          class="input"
          placeholder="email"
        />
      </div>
      <div class="password">
        <input
          type="text"
          v-model="password"
          class="input"
          placeholder="password"
        />
      </div>
      <div
        class="btn"
        :class="userName && password ? 'btnActive' : ''"
        @click="onSubmitInfo"
      >
        登录
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: '',
      password: ''
    }
  },
  filters: {},
  components: {},
  computed: {},

  mounted() {},
  methods: {
    onSubmitInfo() {
      if (!this.userName || !this.password) {
        return this.$notify.error({
          title: '错误',
          message: '请输入用户名或密码'
        })
      }
      window.sessionStorage.setItem('whoSetToken', location.href)
      this.$router.push({ path: '/' })
      window.location.reload()
      // let param = {
      //   email: this.userName,
      //   password: this.password
      // }
      // this.$store.dispatch('loginAction', param).then((res) => {
      //   if(!res || !res.success ){
      //     return  this.$notify.error({
      //       title: '错误',
      //       message: res && res.msg || "网络异常，请稍后重试~"
      //     });
      //   }
      //
      // })
    }
  }
}
</script>
