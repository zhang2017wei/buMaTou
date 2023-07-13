/* eslint-disable */
<style lang="less" scoped>
.sendLinkPop_container {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  .sendLinkPopContent {
    width: 800px;
    height: 600px;
    background-color: #fff;
    border-radius: 20px;
    padding: 40px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      font-size: 26px;
      font-weight: 600;
      text-align: center;
    }
    .contentBox {
      margin: 20px auto;
      max-height: 400px;
      height: auto;
      overflow-y: auto;
      .linkLiBox {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .numberInput {
        width: 400px;
        height: 60px;
        display: flex;
        align-items: center;
      }
      .rankNo {
        width: 50px;
        text-align: center;
      }
      .span {
        width: 20px;
        height: 20px;
        padding: 4px;
        text-align: center;
        line-height: 20px;
        font-size: 20px;
        font-weight: bolder;
        margin-left: 20px;
        cursor: pointer;
      }
      .span1 {
        right: 100px;
        background: url('../../assets/image/icon_edit.png') 0 0 no-repeat;
        background-size: 20px;
      }
      .span2 {
        right: 60px;
        background: url('../../assets/image/icon_add.png') 0 0 no-repeat;
        background-size: 20px;
      }
      .span3 {
        right: 20px;
        background: url('../../assets/image/icon_delete.png') 0 0 no-repeat;
        background-size: 20px;
      }
    }
    .optionContent {
      text-align: center;
    }
  }
}
</style>

<template>
  <div class="sendLinkPop_container">
    <div class="sendLinkPopContent">
      <div class="title">发送超链接</div>
      <div class="contentBox">
        <div
          class="linkLiBox"
          v-for="(item, index) in uidList"
          :key="'liaKey_' + index"
        >
          <div class="rankNo">{{ index + 1 }}</div>
          <el-input
            type="number"
            v-model="item.uid"
            class="numberInput"
            placeholder="请输入用户uid"
          ></el-input>
          <div class="span span2" @click="toAddLi(index)"></div>
          <div class="span span3" @click="handleDelete(index)"></div>
        </div>
      </div>
      <div class="optionContent">
        <el-button @click="onCancelPop()">取消</el-button>
        <el-button type="primary" @click="submitForm()">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { dateFormat } from '../../services/transformTime'
export default {
  props: {
    item: null
  },
  data() {
    return {
      uidList: [
        {
          uid: '' // 128439980
        }
      ]
    }
  },
  filters: {},
  components: {},
  computed: {},

  mounted() {
    console.log(this.item)
  },
  methods: {
    // isShowSendLinkPop
    toAddLi() {
      this.uidList.push({ uid: '' })
    },
    handleDelete(index) {
      this.uidList.splice(index, 1)
    },
    onCancelPop() {
      this.$parent.onCancelSendLinkPop(false)
    },
    submitForm() {
      let uids = ''
      this.uidList.forEach((item) => {
        if (item.uid) uids = uids + ',' + item.uid
      })
      console.log(uids, uids.substring(1))
      if (!uids) return
      let param = {
        act_id: this.item.id,
        uids: uids.substring(1)
      }
      this.$store.dispatch('toSendLinkAction', param).then(() => {
        this.onCancelPop()
        this.$message({
          type: 'success',
          message: '发送成功!'
        })
      })
    }
  }
}
</script>
