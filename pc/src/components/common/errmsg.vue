/* eslint-disable */
<template>
  <div class="warnInfo bounceInUp" v-show="errorMessage.status">
    <div class="customTips bounceInUp animated">
      <div class="tipsContent">
        {{ errorMessage ? errorMessage.msg : '稍后重试~' }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      errorMessage: (state) => state.errorMessage
    })
  },
  components: {}
}
</script>
<style scoped>
.warnInfo {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: fixed;
  top: 0;
  z-index: 999999;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
}

.customTips {
  font-size: 0.36rem;
  text-align: center;
  overflow-y: auto;
  border-radius: 0.3rem;
  max-width: 50%;
  padding: 0 50px;
  background-color: #f9f9f9;
  color: #000;
  word-break: break-all;
}

.tipImg {
  height: 1.58rem;
  border-bottom: 2px solid #e5e5e5;
  background-color: #ffffff;
}

.tipImg img {
  margin-top: 0.29rem;
  width: 1rem;
  height: 1rem;
  word-break: break-all;
}

.tipsContent {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #202020;
  line-height: 44px;
  padding: 20px;
}

.tipsHead {
  border-bottom: solid 1px #e2e2e5;
  padding: 0.2rem;
  font-size: 20px;
}

.bounceInUp {
  animation-name: bounceInUp;
  -webkit-animation-name: bounceInUp;
}

.animated {
  animation-duration: 0.8s;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.8s;
  -webkit-animation-fill-mode: both;
}

@keyframes bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
    -webkit-transform: translate3d(0, 3000px, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
    -webkit-transform: translate3d(0, -20px, 0);
  }

  75% {
    transform: translate3d(0, 10px, 0);
    -webkit-transform: translate3d(0, 10px, 0);
  }

  90% {
    transform: translate3d(0, -5px, 0);
    -webkit-transform: translate3d(0, -5px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }
}

@-webkit-keyframes bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
    -webkit-transform: translate3d(0, 3000px, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
    -webkit-transform: translate3d(0, -20px, 0);
  }

  75% {
    transform: translate3d(0, 10px, 0);
    -webkit-transform: translate3d(0, 10px, 0);
  }

  90% {
    transform: translate3d(0, -5px, 0);
    -webkit-transform: translate3d(0, -5px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }
}
</style>
