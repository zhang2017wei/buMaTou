/* eslint-disable */
<style lang="less" scoped>
.rewardContainer {
  width: 100%;
  height: auto;
  padding: 10px;
  .rewardPage {
    .rewardBox {
      .rewardContent {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .contentLi {
          width: 200px;
          background-color: #f9f5ea;
          border-radius: 20px;
          padding: 10px 0;
          margin: 10px;
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
      <div class="rewardBox">
        <div class="rewardContent">
          <div
            class="contentLi"
            v-for="(item, index) in pageData"
            @click="toEditRewardPop(item, index)"
            :key="'li_key_' + index"
          >
            <div class="imgBox">
              <img :src="item.icon" alt="" class="icon" />
            </div>
            <div class="rewardName" v-if="item.name">
              {{ item.name }}
            </div>
            <div class="rewardDesc" v-if="item.price">
              {{ item.price }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditReward v-if="isShowRewardPop" type="circle" :item="rewardItem" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import EditReward from './editReward'

export default {
  data() {
    return {
      pageData: null,
      rewardItem: null,
      isShowRewardPop: false,
      saveRewardIndex: null
    }
  },
  filters: {},
  components: {
    EditReward
  },
  computed: {
    ...mapGetters({
      pageTextData: 'pageTextData'
    })
  },

  watch: {},

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
      this.pageData = _data.circleData
    },
    toEditRewardPop(data, idx) {
      this.isShowRewardPop = true
      this.rewardItem = data
      this.saveRewardIndex = idx
    },
    closeRewardPop(data) {
      this.isShowRewardPop = data
    },
    onSetRewardData(data) {
      console.log('------')
      data.iconLight = data.showIcon
      console.log(data)
      this.pageData[this.saveRewardIndex] = data
      let _data = this.pageTextData
      console.log('222.。。。', _data)
      this.$store.dispatch('setPageTextDataAction', _data)
    }
  }
}
</script>
