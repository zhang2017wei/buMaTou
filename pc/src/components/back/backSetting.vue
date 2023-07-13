<style lang="less" scoped>
.backSetting_container {
  width: calc(100% + 300px);
  height: calc(100% - 20px);
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
  /*background-color: rgba(0, 0, 0, 0.06);*/
  .back_content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;

    .chooseModule {
      width: 120px;
      padding: 20px 0;
      background-color: rgba(0, 0, 0, 0.1);
      .liText {
        width: 100%;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        margin-top: 10px;
        &:hover {
          cursor: pointer;
        }
      }
      .liTextActive {
        background-color: #409eff;
        color: #ffffff;
        font-weight: 500;
      }
    }
    .createContainer {
      width: calc(100% - 120px);
      padding: 20px 0;
      background-color: rgba(0, 0, 0, 0.06);
    }
  }

  .createAct {
    position: fixed;
    top: 50px;
    right: 140px;
    z-index: 6;
  }
}
</style>

<template>
  <div class="backSetting_container" v-if="false">
    <div class="back_content" v-if="stepIndex === 1">
      <div class="chooseModule">
        <div
          class="moduleLi"
          v-for="(item, index) in moduleList"
          @click="setLiStatus(index)"
          :key="'moKey_' + index"
        >
          <div class="liText" :class="item.status ? 'liTextActive' : ''">
            {{ item.content }}
          </div>
        </div>
      </div>
      <div class="createContainer">
        <Chongzhifanxian />
      </div>
    </div>

    <div class="back_content" v-if="stepIndex === 2">
      <ServerList />
    </div>
    <el-button size="mini" type="primary" class="createAct" @click="toCreateAct"
      >创建</el-button
    >
  </div>
</template>
<script>
import Chongzhifanxian from './crater/chongzhifanxian'
import ServerList from './serverList'
export default {
  data() {
    return {
      moduleList: [
        {
          content: '充值返现',
          status: true
        }
        // {
        //   content: '测试模板一',
        //   status: false
        // },
        // {
        //   content: '测试模板二',
        //   status: false
        // },
      ],
      stepIndex: 2
    }
  },
  filters: {},
  components: {
    Chongzhifanxian,
    ServerList
  },
  computed: {},

  mounted() {},
  methods: {
    setLiStatus(index) {
      this.moduleList[index].status = !this.moduleList[index].status
    },
    onSetStepIndex() {
      this.stepIndex = 2
      this.$parent.update()
    },
    toCreateAct() {
      this.stepIndex = 1
    }
  }
}
</script>
