/* eslint-disable */
<style lang="less" scoped>
.rewardContainer {
  width: 100%;
  height: auto;
  padding: 10px;
  .rewardPage {
    .rewardBox {
      .rewardTitle {
        cursor: pointer;
        padding-right: 140px;
        position: relative;
        margin: 10px auto;
        .editDiv {
          width: 100%;
          height: 100%;
          padding: 10px;
        }
        .span {
          width: 20px;
          height: 20px;
          position: absolute;
          padding: 4px;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
          line-height: 20px;
          font-size: 20px;
          font-weight: bolder;
          display: none;
        }
        .span1 {
          right: 10px;
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
        &:hover {
          background-color: rgba(0, 0, 0, 0.06);
          .span {
            display: block;
          }
        }
      }
      .rewardContent {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .contentLi {
          width: 200px;
          background-color: #f9f5ea;
          border-radius: 20px;
          padding: 10px 0;
          margin-left: 10px;
          cursor: pointer;
          &:hover {
            .imgBox {
              .icon {
                transform: translate(-50%, -50%) scale(1.1);
              }
            }
          }
          .imgBox {
            width: 150px;
            height: 150px;
            position: relative;
            margin: 0 auto;
            border: 1px solid #ffb000;
            border-radius: 10px;
            overflow: hidden;
            .icon {
              width: 80%;
              height: auto;
              max-height: 100%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            .label {
              display: inline-block;
              padding: 4px 10px;
              background-color: #ffb000;
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          .rewardName {
            text-align: center;
          }
          .rewardDesc {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="rewardContainer">
    <div class="rewardPage" v-if="pageData">
      <div
        class="rewardBox"
        v-for="(item, index) in pageData"
        :key="'r_ke_' + index"
      >
        <div class="rewardTitle" v-if="item.title">
          <div class="editDiv" @click="editTxTitle(item.title, index)">
            {{ item.title }}
          </div>
          <div class="span span1" @click="editTxTitle(item.title, index)"></div>
        </div>
        <div class="rewardContent">
          <div
            class="contentLi"
            v-for="(li, idx) in item.data"
            @click="toEditRewardPop(li, idx, index)"
            :key="'li_key_' + idx"
          >
            <div class="imgBox">
              <img :src="li.icon" alt="" class="icon" />
              <div class="label" v-if="li.label">
                {{ li.label }}
              </div>
            </div>
            <div class="rewardName" v-if="li.name">
              {{ li.name }}
            </div>
            <div class="rewardDesc" v-if="li.desc">
              {{ li.desc }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditTextPop v-if="isShowEditPop" :popData="popData" />
    <EditReward v-if="isShowRewardPop" :item="rewardItem" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import EditTextPop from './editPop'
import EditReward from './editReward'
export default {
  props: {
    activeIndex: null
  },
  data() {
    return {
      pageData: null,
      saveIndex: null,
      popData: null,
      rewardItem: null,
      isShowRewardPop: false,
      isShowEditPop: false,
      saveRewardIndex: null
    }
  },
  filters: {},
  components: {
    EditTextPop,
    EditReward
  },
  computed: {
    ...mapGetters({
      pageTextData: 'pageTextData'
    })
  },

  watch: {
    activeIndex(oldV, newV) {
      this._onLoadPage()
    }
  },

  mounted() {
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
      if (this.activeIndex === 0) this.pageData = _data.rewardData1
      if (this.activeIndex === 1) this.pageData = _data.rewardData2
      if (this.activeIndex === 2) this.pageData = _data.rewardData3
      if (this.activeIndex === 3) this.pageData = _data.rewardData4
      if (this.activeIndex === 4) this.pageData = _data.rewardData5
    },
    editTxTitle(data, index) {
      this.isShowEditPop = true
      this.saveIndex = index
      this.popData = data
    },
    onSaveData(data) {
      this.pageData[this.saveIndex].title = data
      let _data = this.pageTextData
      if (this.activeIndex === 0) _data.rewardData1[this.saveIndex].title = data
      if (this.activeIndex === 1) _data.rewardData2[this.saveIndex].title = data
      if (this.activeIndex === 2) _data.rewardData3[this.saveIndex].title = data
      if (this.activeIndex === 3) _data.rewardData4[this.saveIndex].title = data
      if (this.activeIndex === 4) _data.rewardData5[this.saveIndex].title = data
      this.$store.dispatch('setPageTextDataAction', _data)
    },
    onCancel() {
      this.isShowEditPop = false
    },
    toEditRewardPop(data, idx, index) {
      this.isShowRewardPop = true
      this.rewardItem = data
      this.saveRewardIndex = idx
      this.saveIndex = index
    },
    closeRewardPop(data) {
      this.isShowRewardPop = data
    },
    onSetRewardData(data) {
      this.pageData[this.saveIndex].data[this.saveRewardIndex] = data
      let _data = this.pageTextData
      if (this.activeIndex === 0)
        _data.rewardData1[this.saveIndex].data[this.saveRewardIndex] = data
      if (this.activeIndex === 1)
        _data.rewardData2[this.saveIndex].data[this.saveRewardIndex] = data
      if (this.activeIndex === 2)
        _data.rewardData3[this.saveIndex].data[this.saveRewardIndex] = data
      if (this.activeIndex === 3)
        _data.rewardData4[this.saveIndex].data[this.saveRewardIndex] = data
      if (this.activeIndex === 4)
        _data.rewardData5[this.saveIndex].data[this.saveRewardIndex] = data
      this.$store.dispatch('setPageTextDataAction', _data)
    }
  }
}
</script>
