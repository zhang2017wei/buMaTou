/* eslint-disable */
<style lang="less" scoped>
.tab_container {
  width: 100%;
  padding-top: 20px;
  .descContent {
    .div {
      margin: 0;
      padding-right: 140px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
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
        right: 60px;
        background: url('../../assets/image/icon_edit.png') 0 0 no-repeat;
        background-size: 20px;
      }
      .span2 {
        /*right: 60px;*/
        /*background: url("../../assets/image/icon_add.png") 0 0 no-repeat;*/
        /*background-size: 20px;*/
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
    .text_title {
      width: calc(100% - 60px);
      margin: 0 auto;
    }
    .text_P {
      width: calc(100% - 120px);
      margin: 0 auto;
    }
  }
}
</style>

<template>
  <div class="tab_container" v-if="showPage">
    <div class="tab_content">
      <div
        class="descContent"
        v-for="(item, index) in pageData"
        :key="'key_1_' + index"
      >
        <div class="div" v-if="item.value">
          <div class="editDiv" @click="editTxTitle(index, item.value)">
            {{ item.value }}
          </div>
          <div class="span span1" @click="editTxTitle(index, item.value)"></div>
          <!--<div class="span span2"></div>-->
          <div class="span span3" @click="deleteTitle(index)"></div>
        </div>
      </div>
    </div>
    <EditPop v-if="isShowEditPop" :popData="popData" />
  </div>
</template>
<script>
import EditPop from './editPop'
import { mapGetters } from 'vuex'
export default {
  props: {
    activeIndex: null
  },
  data() {
    return {
      pageData: null,
      popData: null,
      showPage: false,
      isShowEditPop: false,
      saveIndex: null
    }
  },
  filters: {},
  components: {
    EditPop
  },
  computed: {
    ...mapGetters({
      pageTextData: 'pageTextData'
    })
  },
  watch: {
    activeIndex(oldV, newV) {
      this.loadPage()
    }
  },

  async mounted() {
    setTimeout(() => {
      this.loadPage()
    }, 300)
  },
  methods: {
    async loadPage() {
      let _data = this.pageTextData
      // if(!_data) return this.loadPage();
      this.pageData = await this.getNewArr(_data, this.activeIndex)
      this.showPage = true
    },
    editTxTitle(index, text) {
      this.isShowEditPop = true
      this.popData = text
      this.saveIndex = index
    },
    deleteTitle(index) {
      this.saveIndex = index
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // this.pageData[index].value = ''
          this.onSaveData('')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getNewArr(data, index) {
      let obj
      if (index === 0 && data.tab1) obj = data.tab1
      if (index === 1 && data.tab2) obj = data.tab2
      if (index === 2 && data.tab3) obj = data.tab3
      if (index === 3 && data.tab4) obj = data.tab4
      if (index === 4 && data.tab5) obj = data.tab5
      let arr = []
      if (!obj) return
      for (let i = 0; i < Object.keys(obj).length; i++) {
        arr.push({
          key: Object.keys(obj)[i],
          value: obj[Object.keys(obj)[i]]
        })
      }
      return arr
    },
    async onSaveData(data) {
      this.pageData[this.saveIndex].value = data
      const _obj = this._onSetObj(this.pageData)
      let _data = this.pageTextData
      if (this.activeIndex === 0) _data.tab1 = _obj
      if (this.activeIndex === 1) _data.tab2 = _obj
      if (this.activeIndex === 2) _data.tab3 = _obj
      if (this.activeIndex === 3) _data.tab4 = _obj
      if (this.activeIndex === 4) _data.tab5 = _obj
      this.$store.dispatch('setPageTextDataAction', _data)
    },
    onCancel() {
      this.isShowEditPop = false
    },
    _onSetObj(arr) {
      return arr.reduce((obj, item) => ((obj[item.key] = item.value), obj), {})
    }
  }
}
</script>
