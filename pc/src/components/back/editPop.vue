/* eslint-disable */
<style lang="less" scoped>
.editPop_container {
  width: 100%;
  height: 100%;
  .popCover {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 7;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .popContent {
    width: 80%;
    height: 90%;
    background-color: #ffffff;
    border-radius: 20px;
    position: fixed;
    z-index: 9;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .createContent {
      width: 100%;
      height: calc(100% - 60px);
      display: flex;
      justify-content: center;
      .boxC {
        width: 48%;
        background-color: #ffffff;
        padding: 20px;
        .settingTitle {
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 20px;
          height: 20px;
        }
        .fromBox {
          width: 100%;
          height: calc(100% - 40px);
          overflow-y: auto;
        }
      }
      .activitySetting {
        margin-right: 10px;
      }
    }
    .optionBtn {
      width: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
    }
  }
}
</style>

<template>
  <div class="editPop_container">
    <div class="popCover"></div>
    <div class="popContent">
      <div class="createContent" v-if="actConfig">
        <div class="activitySetting boxC">
          <div class="settingTitle">活动配置</div>
          <el-form :model="actConfig" label-width="100px" class="fromBox">
            <el-form-item label="活动名称：">
              <el-input
                type="text"
                :disabled="true"
                v-model="actConfig.name"
              ></el-input>
            </el-form-item>

            <el-form-item label="活动描述：">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="actConfig.desc"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="活动时间：">
              <span>{{ (actConfig.start_time * 1000) | setTime }}</span> 至
              <span>{{ (actConfig.end_time * 1000) | setTime }}</span>
            </el-form-item>
            <el-form-item label="是否开启：">
              <el-select v-model="actConfig.show_state" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="首页icon：">
              <el-input type="text" v-model="actConfig.icon"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="rewardSetting boxC">
          <div class="settingTitle">奖励配置</div>
          <div class="fromBox">
            <div v-for="(list, index) in rewardList" :key="'reward_i' + index">
              <el-form :model="list" label-width="120px">
                <el-form-item label="奖励ID：">
                  <el-input
                    type="text"
                    :disabled="true"
                    v-model="list.id"
                  ></el-input>
                </el-form-item>

                <el-form-item label="奖励类型：">
                  <el-input type="text" v-model="list.reward_type"></el-input>
                </el-form-item>
                <el-form-item label="奖励条件：">
                  <el-input type="text" v-model="list.condition"></el-input>
                </el-form-item>
                <el-form-item label="奖励名称：">
                  <el-input type="text" v-model="list.name"></el-input>
                </el-form-item>
                <el-form-item label="奖励物品：">
                  <el-input type="text" v-model="list.package"></el-input>
                </el-form-item>
                <el-form-item label="奖励称号：">
                  <el-input type="text" v-model="list.titles"></el-input>
                </el-form-item>
                <el-form-item label="获奖系统消息：">
                  <el-input type="text" v-model="list.msg"></el-input>
                </el-form-item>
                <el-form-item label="获奖探长消息：">
                  <el-input type="text" v-model="list.sysmsg"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接：">
                  <el-input type="text" v-model="list.scheme_url"></el-input>
                </el-form-item>
              </el-form>
              <div
                v-if="rewardList.length - 1 > index"
                style="
                  width: 100%;
                  height: 10px;
                  background-color: #eeeeee;
                  margin-bottom: 20px;
                "
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="optionBtn">
        <el-button @click="onCancelFun()"> 取消 </el-button>
        <el-button type="primary" @click="onSubmitData()"> 保存 </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { setTime } from '../../services/transformTime'
export default {
  props: {
    act_id: null
  },
  data() {
    return {
      options: [
        {
          value: 0,
          label: '白名单生效'
        },
        {
          value: 1,
          label: '所有用户生效'
        }
      ],
      actConfig: null,
      rewardList: null
    }
  },
  filters: {
    setTime
  },
  components: {},
  computed: {},

  mounted() {
    this.onGetDetailData()
  },
  methods: {
    onGetDetailData() {
      if (!this.act_id) return
      this.$store
        .dispatch('getServerDetailUrlAction', { act_id: this.act_id })
        .then((res) => {
          if (res && res.success) {
            this.actConfig = res.serverActDetail.act_config
            this.rewardList = res.serverActDetail.reward_list
          }
        })
    },
    onSubmitData() {
      console.log(this.rewardList)
      let param = {
        actconfig: JSON.stringify(this.actConfig),
        rewardlist: JSON.stringify(this.rewardList)
      }
      this.$store.dispatch('saveServerAcAction', param).then((res) => {
        if (res && res.success) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.onCancelFun()
        }
      })
    },
    onCancelFun() {
      this.$parent.onCancelPopFun(false)
    }
  }
}
</script>
