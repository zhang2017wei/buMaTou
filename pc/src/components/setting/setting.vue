/* eslint-disable */
<style lang="less" scoped>
.text_container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .text_content {
    width: 90%;
    height: 90%;
    position: relative;
    .contentBox {
      height: 100%;
      width: 100%;
      .tabContent {
        /*width: 400px;*/
        background-color: #eeeeee;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-radius: 10px 10px 0 0;
        overflow: hidden;
        .tabLi {
          width: 100px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          cursor: pointer;
          .li {
            width: 100%;
            height: 100%;
            color: black;
            font-size: 16px;
          }
        }
        .tabLiActive {
          background-color: #409eff;
          .li {
            color: white;
            font-weight: 600;
            font-size: 18px;
          }
        }
      }
      .textChangeContent {
        /*width: 100%;*/
        height: calc(100% - 100px);
        background-color: #ffffff;
        padding: 0 400px 40px 40px;
        overflow-y: auto;
        .line {
          width: 100%;
          margin-top: 40px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #ffb000;
          font-size: 14px;
          color: #ffffff;
        }
      }
      .updateBox {
        width: calc(100% - 400px);
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }

    .iFrameContent {
      width: 375px;
      height: 782px;
      position: absolute;
      top: 80px;
      right: -20px;
      overflow: hidden;
      iframe {
        border: 0;
      }
    }
  }
}
</style>
<style lang="less">
.fromDiv {
  .input {
    width: 600px;
  }
}
</style>

<template>
  <div class="text_container">
    <div class="text_content" v-if="showPage">
      <div class="contentBox">
        <div class="tabContent">
          <div
            class="tabLi"
            v-for="(item, index) in tabList"
            :class="activeIndex === index ? 'tabLiActive' : ''"
            @click="tabBarOptionClick(index, item.type)"
            :key="'keyC_' + index"
          >
            <div class="li">{{ item.content }}</div>
          </div>
        </div>
        <div class="textChangeContent scrollContent">
          <BackSetting ref="baseInfo" v-if="saveType === 'back'" />

          <div v-if="saveType === 'tab'">
            <TabContent :activeIndex="activeIndex - 1" />
            <div class="line">奖励配置</div>
            <RewardContent :activeIndex="activeIndex - 1" />
          </div>

          <RuleContent v-if="saveType === 'ruleData'" />
          <CircleContent v-if="saveType === 'circleData'" />
          <CircleContent2 v-if="saveType === 'circleData2'" />
          <BaseInfo v-if="saveType === 'baseInfo'" />
          <ActModule v-if="saveType === 'actModuleData'" />
        </div>
        <div class="updateBox">
          <!--<el-button
            v-if="activeIndex === 0"
            type="primary"
            @click="saveBaseInfo()"
            >保存</el-button
          >-->
          <el-button v-if="activeIndex >= 1" type="primary" @click="update()">
            保存
          </el-button>
          <el-button
            class="initialize"
            v-if="showBtn"
            @click="initialize(true)"
          >
            初始化数据
          </el-button>
          <el-button
            v-if="activeIndex >= 1"
            class="updateProBtn"
            type="danger"
            @click="updateForPro()"
          >
            同步线上
          </el-button>
        </div>
      </div>
      <div class="iFrameContent" v-if="activeIndex > 0">
        <iframe
          v-if="isShowIF && iFrameUrl"
          width="375"
          height="812"
          :src="iFrameUrl"
        >
        </iframe>
      </div>
    </div>
    <el-dialog title="初始化数据" :visible.sync="dialogVisible" width="30%">
      <el-input
        type="textarea"
        :rows="12"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <a
          href="https://tooltt.com/js-object-to-json/"
          style="margin-right: 50px"
        >
          object 需要转换成json</a
        >
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="initialize()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import RuleContent from './ruleContent'
import CircleContent from './circleContent'
import CircleContent2 from './circleContent2'
import BackSetting from '../back/backSetting'
import TabContent from './tabContent'
import RewardContent from './rewardContent'
import BaseInfo from './baseInfoContent'
import ActModule from './actModule'

export default {
  data() {
    return {
      tabList: [],
      activeIndex: 0,
      saveType: null,
      isShowIF: true,
      iFrameUrl: null,
      textarea: '',
      dialogVisible: false,
      showBtn: window.location.href.indexOf('admin') > -1,
      itemData: null,
      showPage: false
    }
  },
  filters: {},
  components: {
    RuleContent,
    TabContent,
    RewardContent,
    CircleContent,
    CircleContent2,
    BackSetting,
    BaseInfo,
    ActModule
  },
  computed: {
    ...mapGetters({
      pageTextData: 'pageTextData'
    })
  },
  beforeDestroy() {},
  mounted() {
    this.getDetailDataFun()
    let timer = setTimeout(() => {
      this.onSetTabList()
      clearTimeout(timer)
    }, 200)
  },
  methods: {
    async onSetTabList() {
      const data = this.pageTextData
      if (!data) return
      let listAry = [
        {
          content: '基础配置',
          type: 'back'
        }
      ]
      if (data.tab1) listAry.push({ content: 'tab1', type: 'tab' })
      if (data.tab2) listAry.push({ content: 'tab2', type: 'tab' })
      if (data.tab3) listAry.push({ content: 'tab3', type: 'tab' })
      if (data.tab4) listAry.push({ content: 'tab4', type: 'tab' })
      if (data.tab5) listAry.push({ content: 'tab5', type: 'tab' })
      if (data.ruleData) listAry.push({ content: '规则页', type: 'ruleData' })
      if (data.circleData)
        listAry.push({ content: '点亮图标', type: 'circleData' })
      if (data.circleData2)
        listAry.push({ content: '点亮图标2', type: 'circleData2' })
      listAry.push({ content: '补充配置', type: 'baseInfo' })
      if (data.actModuleData)
        listAry.push({ content: '精选活动', type: 'actModuleData' })
      this.tabList = listAry
    },
    getDetailDataFun() {
      let _data = window.localStorage.getItem('saveListItemData')
      _data = JSON.parse(_data)
      this.itemData = _data
      this.$store
        .dispatch('getDetailAction', { id: _data && _data.id })
        .then((res) => {
          if (res.detail && res.detail.json_config) {
            this.$store.dispatch(
              'setPageTextDataAction',
              JSON.parse(res.detail.json_config)
            )
            console.log(
              'json_config.......',
              JSON.parse(res.detail.json_config)
            )
          }
          this.showPage = true
        })
      this.getUrlLink(_data)
    },
    tabBarOptionClick(index, type) {
      this.activeIndex = index
      this.saveType = type
    },
    update(flag) {
      if (this.activeIndex > 0) this.isShowIF = !this.isShowIF
      let param = {
        name: this.itemData.name,
        link: this.itemData.link,
        dev_link: this.itemData.dev_link,
        start_time: this.itemData.start_time,
        end_time: this.itemData.end_time,
        id: this.itemData.id,
        json_config: JSON.stringify(this.pageTextData)
      }
      if (flag) param.sync = 1
      console.log('保存的数据......', this.pageTextData)
      console.log('param.....', param)
      this.$store
        .dispatch('saveDataAction', param)
        .then((res) => {
          if (res && res.success) {
            console.log('保存的数据......', this.pageTextData, res)
            this.isShowIF = !this.isShowIF
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
          } else {
            this.isShowIF = !this.isShowIF
          }
        })
        .catch(() => {
          this.isShowIF = !this.isShowIF
        })
    },
    updateForPro() {
      if (this.itemData.id < 13) {
        return this.$confirm(`服务器异常，请联系开发人员处理`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      }
      this.$confirm(`此操作将直接覆盖线上环境，请确保检查无误!!`, '提示', {
        confirmButtonText: '检查无误',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.update(true)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    getUrlLink(data) {
      let url = data && data.dev_link
      let param = 'a=808localhost'
      if (window.location.href.indexOf('91hotplay') > -1) {
        url = data && data.link
        param = 'a=808'
      }
      if (!url) return
      this.iFrameUrl =
        url.indexOf('?') > -1 ? url + '&' + param : url + '?' + param
    },
    cancelDialog() {
      this.dialogVisible = false
      this.textarea = ''
    },
    initialize(type) {
      if (type) return (this.dialogVisible = type)
      this.textarea =
        this.textarea instanceof Object
          ? this.textarea
          : JSON.parse(this.textarea)
      let param = {
        name: this.itemData.name,
        link: this.itemData.link,
        dev_link: this.itemData.dev_link,
        start_time: this.itemData.start_time,
        end_time: this.itemData.end_time,
        id: this.itemData.id,
        json_config: this.textarea
      }
      this.$store
        .dispatch('saveDataAction', JSON.stringify(param))
        .then((res) => {
          if (res && res.success) {
            this.dialogVisible = false
          }
        })
      this.textarea = ''
    },
    saveBaseInfo() {
      this.$refs.baseInfo.updateInfo()
    }
  }
}
</script>
