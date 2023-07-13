/* eslint-disable */
<style lang="less" scoped>
.addModule_container {
  .addModuleContent {
    width: 90%;
    min-height: 400px;
    height: auto;
    background-color: #ffffff;
    border-radius: 14px;
    padding: 40px 40px 40px 0;
  }
}
</style>

<template>
  <div class="addModule_container">
    <div class="addModuleContent">
      <el-form
        status-icon
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item
          v-for="(item, index) in tabData"
          :label="'tab' + (index + 1) + '：'"
        >
          <el-input
            type="text"
            @input="saveTabText(item.text, index)"
            v-model="item.text"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :model="formData"
        status-icon
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="分享TP：">
          <el-input
            type="text"
            @input="saveShareTpFun(formData.share_tp)"
            v-model="formData.share_tp"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-form
        :model="formData"
        status-icon
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="小宝箱ID：">
          <el-input
            type="text"
            @input="saveCircle1IDFun(formData.circle1ID)"
            v-model="formData.circle1ID"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :model="formData"
        status-icon
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="大宝箱ID：">
          <el-input
            type="text"
            @input="saveCircle2IDFun(formData.circle2ID)"
            v-model="formData.circle2ID"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :model="formData"
        status-icon
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="爆戒指礼物AID：">
          <el-input
            type="text"
            @input="saveSendGiftIDFun(formData.sendGiftID)"
            v-model="formData.sendGiftID"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :model="formData"
        status-icon
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="爆戒指礼物BID：">
          <el-input
            type="text"
            @input="saveSendGiftID2Fun(formData.sendGiftID2)"
            v-model="formData.sendGiftID2"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      formData: {
        share_tp: '',
        circle1ID: 504,
        circle2ID: 504,
        sendGiftID: 222,
        sendGiftID2: 223
      },
      tabData: null,
      itemData: null
    }
  },
  filters: {},
  components: {},
  computed: {
    ...mapGetters({
      pageTextData: 'pageTextData'
    })
  },

  mounted() {
    let _data = window.localStorage.getItem('saveListItemData')
    _data = JSON.parse(_data)
    this.itemData = _data
    this._onLoadPage()
  },
  methods: {
    _onLoadPage() {
      let _data = this.pageTextData
      if (!_data) {
        let _timer = setTimeout(() => {
          this._onLoadPage()
          clearTimeout(_timer)
        }, 200)
        return
      }
      this.formData = this.pageTextData.baseInfo
      this.tabData = this.pageTextData.bannerTabList
    },
    saveShareTpFun(value) {
      let _data = this.pageTextData
      _data.baseInfo.share_tp = parseInt(value)
      this.$store.dispatch('setPageTextDataAction', _data)
    },
    saveTabText(text, index) {
      let _data = this.pageTextData
      _data.bannerTabList[index].text = text
    },
    saveCircle1IDFun(value) {
      let _data = this.pageTextData
      _data.baseInfo.circle1ID = parseInt(value)
      this.$store.dispatch('setPageTextDataAction', _data)
    },
    saveCircle2IDFun(value) {
      let _data = this.pageTextData
      _data.baseInfo.circle2ID = parseInt(value)
      this.$store.dispatch('setPageTextDataAction', _data)
    },
    saveSendGiftIDFun(value) {
      let _data = this.pageTextData
      _data.baseInfo.sendGiftID = parseInt(value)
      this.$store.dispatch('setPageTextDataAction', _data)
    },
    saveSendGiftID2Fun(value) {
      let _data = this.pageTextData
      _data.baseInfo.sendGiftID2 = parseInt(value)
      this.$store.dispatch('setPageTextDataAction', _data)
    }
  }
}
</script>
