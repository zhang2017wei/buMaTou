/* eslint-disable */
<template>
  <div class="tips_info" v-show="showLoadTip" style="z-index: 1999">
    <div class="preloader-wrapper active">
      <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
      <div class="spinner-layer spinner-red">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-yellow">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>

      <div class="spinner-layer spinner-green">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      msg: ''
    }
  },
  computed: {
    ...mapState({
      showLoadTip: (state) => state.showLoadTip
    })
  },
  components: {}
}
</script>
<style>
*,
*:before,
*:after {
  /*-webkit-box-sizing: inherit;*/
  /*box-sizing: inherit;*/
}

@-webkit-keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
}

@keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
}

@-webkit-keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
}

@keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
}

.hide {
  display: none !important;
}

.left-align {
  text-align: left;
}

.right-align {
  text-align: right;
}

.center,
.center-align {
  text-align: center;
}

.left {
  float: left !important;
}

.right {
  float: right !important;
}

.circle {
  border-radius: 50%;
}
.preloader-wrapper {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  left: 50%;
  top: 50%;
  margin-left: -0.5rem;
  position: absolute;
  margin-top: -0.5rem;
}

@media (min-width: 800px) {
  .preloader-wrapper {
    width: 80px;
    height: 80px;
  }
}

.preloader-wrapper.small {
  width: 0.18rem;
  height: 0.18rem;
}

.preloader-wrapper.big {
  width: 0.32rem;
  height: 0.32rem;
}

.preloader-wrapper.active {
  -webkit-animation: container-rotate 1568ms linear infinite;
  animation: container-rotate 1568ms linear infinite;
}

@-webkit-keyframes container-rotate {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes container-rotate {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.spinner-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-color: #26a69a;
}

.spinner-blue,
.spinner-blue-only {
  border-color: #4285f4;
}

.spinner-red,
.spinner-red-only {
  border-color: #db4437;
}

.spinner-yellow,
.spinner-yellow-only {
  border-color: #f4b400;
}

.spinner-green,
.spinner-green-only {
  border-color: #0f9d58;
}

.active .spinner-layer.spinner-blue {
  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1)
      infinite both,
    blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite
      both,
    blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.active .spinner-layer.spinner-red {
  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1)
      infinite both,
    red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite
      both,
    red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.active .spinner-layer.spinner-yellow {
  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1)
      infinite both,
    yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite
      both,
    yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.active .spinner-layer.spinner-green {
  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1)
      infinite both,
    green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite
      both,
    green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.active .spinner-layer,
.active .spinner-layer.spinner-blue-only,
.active .spinner-layer.spinner-red-only,
.active .spinner-layer.spinner-yellow-only,
.active .spinner-layer.spinner-green-only {
  opacity: 1;
  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1)
    infinite both;
  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite
    both;
}

@-webkit-keyframes fill-unfill-rotate {
  12.5% {
    -webkit-transform: rotate(135deg);
  }

  25% {
    -webkit-transform: rotate(270deg);
  }

  37.5% {
    -webkit-transform: rotate(405deg);
  }

  50% {
    -webkit-transform: rotate(540deg);
  }

  62.5% {
    -webkit-transform: rotate(675deg);
  }

  75% {
    -webkit-transform: rotate(810deg);
  }

  87.5% {
    -webkit-transform: rotate(945deg);
  }

  to {
    -webkit-transform: rotate(1080deg);
  }
}

@keyframes fill-unfill-rotate {
  12.5% {
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
  }

  25% {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  37.5% {
    -webkit-transform: rotate(405deg);
    transform: rotate(405deg);
  }

  50% {
    -webkit-transform: rotate(540deg);
    transform: rotate(540deg);
  }

  62.5% {
    -webkit-transform: rotate(675deg);
    transform: rotate(675deg);
  }

  75% {
    -webkit-transform: rotate(810deg);
    transform: rotate(810deg);
  }

  87.5% {
    -webkit-transform: rotate(945deg);
    transform: rotate(945deg);
  }

  to {
    -webkit-transform: rotate(1080deg);
    transform: rotate(1080deg);
  }
}

@-webkit-keyframes blue-fade-in-out {
  from {
    opacity: 1;
  }

  25% {
    opacity: 1;
  }

  26% {
    opacity: 0;
  }

  89% {
    opacity: 0;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

@keyframes blue-fade-in-out {
  from {
    opacity: 1;
  }

  25% {
    opacity: 1;
  }

  26% {
    opacity: 0;
  }

  89% {
    opacity: 0;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

@-webkit-keyframes red-fade-in-out {
  from {
    opacity: 0;
  }

  15% {
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  51% {
    opacity: 0;
  }
}

@keyframes red-fade-in-out {
  from {
    opacity: 0;
  }

  15% {
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  51% {
    opacity: 0;
  }
}

@-webkit-keyframes yellow-fade-in-out {
  from {
    opacity: 0;
  }

  40% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  75% {
    opacity: 1;
  }

  76% {
    opacity: 0;
  }
}

@keyframes yellow-fade-in-out {
  from {
    opacity: 0;
  }

  40% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  75% {
    opacity: 1;
  }

  76% {
    opacity: 0;
  }
}

@-webkit-keyframes green-fade-in-out {
  from {
    opacity: 0;
  }

  65% {
    opacity: 0;
  }

  75% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes green-fade-in-out {
  from {
    opacity: 0;
  }

  65% {
    opacity: 0;
  }

  75% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.gap-patch {
  position: absolute;
  top: 0;
  left: 45%;
  width: 10%;
  height: 100%;
  overflow: hidden;
  border-color: inherit;
}

.gap-patch .circle {
  width: 1000%;
  left: -450%;
}

.circle-clipper {
  display: inline-block;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
  border-color: inherit;
}

.circle-clipper .circle {
  width: 200%;
  height: 100%;
  border-width: 3px;
  border-style: solid;
  border-color: inherit;
  border-bottom-color: transparent !important;
  border-radius: 50%;
  -webkit-animation: none;
  animation: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
}

.circle-clipper.left .circle {
  left: 0;
  border-right-color: transparent !important;
  -webkit-transform: rotate(129deg);
  transform: rotate(129deg);
}

.circle-clipper.right .circle {
  left: -100%;
  border-left-color: transparent !important;
  -webkit-transform: rotate(-129deg);
  transform: rotate(-129deg);
}

.active .circle-clipper.left .circle {
  -webkit-animation: left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
  animation: left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.active .circle-clipper.right .circle {
  -webkit-animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite
    both;
  animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

@-webkit-keyframes left-spin {
  from {
    -webkit-transform: rotate(130deg);
  }

  50% {
    -webkit-transform: rotate(-5deg);
  }

  to {
    -webkit-transform: rotate(130deg);
  }
}

@keyframes left-spin {
  from {
    -webkit-transform: rotate(130deg);
    transform: rotate(130deg);
  }

  50% {
    -webkit-transform: rotate(-5deg);
    transform: rotate(-5deg);
  }

  to {
    -webkit-transform: rotate(130deg);
    transform: rotate(130deg);
  }
}

@-webkit-keyframes right-spin {
  from {
    -webkit-transform: rotate(-130deg);
  }

  50% {
    -webkit-transform: rotate(5deg);
  }

  to {
    -webkit-transform: rotate(-130deg);
  }
}

@keyframes right-spin {
  from {
    -webkit-transform: rotate(-130deg);
    transform: rotate(-130deg);
  }

  50% {
    -webkit-transform: rotate(5deg);
    transform: rotate(5deg);
  }

  to {
    -webkit-transform: rotate(-130deg);
    transform: rotate(-130deg);
  }
}

#spinnerContainer.cooldown {
  -webkit-animation: container-rotate 1568ms linear infinite,
    fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);
  animation: container-rotate 1568ms linear infinite,
    fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

@-webkit-keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.tips_info {
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.3);
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
