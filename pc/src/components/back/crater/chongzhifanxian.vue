/* eslint-disable */
<style lang="less" scoped>
.createModulePage {
  width: 100%;
  height: 100%;
  .createContent {
    width: 100%;
    height: 90%;
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
      .fromBox2 {
        /*border: 1px solid red;*/
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
    margin-top: 40px;
  }
}
</style>

<template>
  <div class="createModulePage">
    <div class="createContent" v-if="itemData">
      <div class="activitySetting boxC">
        <div class="settingTitle">活动配置</div>
        <el-form :model="actConfig" label-width="100px" class="fromBox">
          <el-form-item label="活动名称：">
            <el-input
              type="text"
              :disabled="true"
              v-model="itemData.name"
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
          <el-form-item label="开始时间：">
            <el-input
              type="text"
              :disabled="true"
              v-model="itemData.start_time_text"
            ></el-input>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-input
              type="text"
              :disabled="true"
              v-model="itemData.end_time_text"
            ></el-input>
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
          <el-form-item label="share_tp：">
            <el-input type="number" v-model="actConfig.share_tp"></el-input>
          </el-form-item>
          <el-form-item label="首页icon：">
            <el-input type="text" v-model="actConfig.icon"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="rewardSetting boxC">
        <div class="settingTitle">奖励配置</div>
        <div class="fromBox fromBox2">
          <div v-for="(list, index) in rewardList" :key="'reward_i' + index">
            <el-form :model="list" label-width="120px">
              <el-form-item label="活动ID：">
                <el-input
                  type="text"
                  :disabled="true"
                  v-model="itemData.id"
                ></el-input>
              </el-form-item>

              <el-form-item label="奖励类型：">
                <el-input type="text" v-model="list.reward_type"></el-input>
              </el-form-item>
              <el-form-item label="奖励条件：">
                <el-input type="number" v-model="list.condition"></el-input>
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
            <div v-else style="text-align: center">
              <el-button @click="toAddLi()"> 添加一条 </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="optionBtn">
      <el-button type="primary" @click="onSubmitData()"> 保存 </el-button>
    </div>
  </div>
</template>
<script>
import { setTime } from '../../../services/transformTime'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      actConfig: {
        desc: '充值返现',
        show_state: 0,
        share_tp: 0,
        icon: 'http://xs-voice.oss-cn-hangzhou.aliyuncs.com/mini/expand/user_head/202205.128947672.b245f9121336dde9132864.png'
      },
      rewardList: [
        {
          reward_type: 'total_rank',
          condition: 500000,
          name: '累计充值5000元',
          package: '[{"cid":22070,"num":1}]',
          titles: '[{"cid":158,"num":1}]',
          msg: '恭喜你，单日累计充值满2000元，7天【家里有矿】称号和星空木马头像框奖励已发放，请注意查看~',
          sysmsg: '',
          scheme_url: 'who://www/browser?page=bag'
        }
      ],
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
      itemData: null,
      serverActId: null
    }
  },
  filters: {
    setTime
  },
  components: {},
  computed: {
    ...mapGetters({
      pageTextData: 'pageTextData'
    })
  },

  mounted() {
    let _data = window.localStorage.getItem('saveListItemData')
    _data = JSON.parse(_data)
    _data.start_time_text = setTime(
      _data.start_time * 1000,
      'yyyy-MM-dd hh:mm:ss'
    )
    _data.end_time_text = setTime(_data.end_time * 1000, 'yyyy-MM-dd hh:mm:ss')
    this.itemData = _data
    console.log('_data_________________', _data)
  },
  methods: {
    onSubmitData() {
      let _data = window.localStorage.getItem('saveListItemData')
      _data = JSON.parse(_data)
      _data.id = 0 // 新增是id赋值为0
      this.rewardList.forEach((li) => {
        li.condition = parseInt(li.condition)
      })
      this.actConfig.share_tp = parseInt(this.actConfig.share_tp)
      let param = {
        actconfig: JSON.stringify(Object.assign(this.actConfig, _data)),
        rewardlist: JSON.stringify(this.rewardList)
      }
      console.log('saveServerAcAction param.....', param)
      this.$store.dispatch('saveServerAcAction', param).then((res) => {
        if (res && res.success) {
          this._onSuccess(res.serverActId)
        }
      })
    },
    _onSuccess(id) {
      this.serverActId = id
      // 将ID保存到JSON数据里面
      let _data = this.pageTextData
      let _id = _data.serverActId
      _id = _id ? _id + ',' + id : id
      _data.serverActId = _id
      this.$store.dispatch('setPageTextDataAction', _data)
      this.$parent.onSetStepIndex()
      this.$message({
        type: 'success',
        message: '操作成功!'
      })
    },

    toAddLi() {
      let _li = {
        reward_type: 'total_rank',
        condition: 500000,
        name: '累计充值5000元new',
        package: '[{"cid":22070,"num":1}]',
        titles: '[{"cid":158,"num":1}]',
        msg: '恭喜你，单日累计充值满2000元，7天【家里有矿】称号和星空木马头像框奖励已发放，请注意查看~',
        sysmsg: '',
        scheme_url: 'who://www/browser?page=bag'
      }
      this.rewardList.push(_li)
    }
  }
}
</script>
