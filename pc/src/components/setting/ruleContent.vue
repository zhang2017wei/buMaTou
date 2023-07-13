/* eslint-disable */
<style lang="less" scoped>
.ruleContent {
  .descContent {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    margin: 10px auto;
    .div {
      width: 90%;
      margin: 10px 0;
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
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
        .span {
          display: block;
        }
      }
    }
    .title1 {
      font-weight: 700;
      font-size: 20px;
    }
    .text_title {
      width: calc(100% - 80px);
      margin-left: 40px;
      font-weight: 500;
      font-size: 14px;
      color: black;
    }
    .text_P {
      width: calc(100% - 140px);
      margin-left: 80px;
    }
  }
}
</style>

<template>
  <div class="ruleContent">
    <div v-if="textData && textData.ruleData">
      <!--<el-form label-width="100px" class="fromDiv">
        <el-form-item :label="text2">
          <el-input type="setting" class="input" v-model="text1"></el-input>
        </el-form-item>
      </el-form>-->
      <div
        class="descContent"
        :class="'descContent' + (index + 1)"
        v-for="(item, index) in textData.ruleData"
        :key="'key_ruler_' + index"
      >
        <div class="title1 div" v-if="item.module_title">
          <div class="editDiv" @click="editTxTitle(index, item.module_title)">
            {{ item.module_title }}
          </div>
          <div
            class="span span1"
            @click="editTxTitle(index, item.module_title)"
          ></div>
          <div class="span span2" @click="addNewTitle(index)"></div>
          <div class="span span3" @click="deleteTitle(index)"></div>
        </div>
        <div v-for="(data, idx2) in item.content" :key="'data_' + idx2">
          <div class="text_title div" v-if="data.text_title">
            <div
              class="editDiv"
              @click="editTxSubTitle(index, idx2, data.text_title)"
            >
              {{ data.text_title }}
            </div>
            <div
              class="span span1"
              @click="editTxSubTitle(index, idx2, data.text_title)"
            ></div>
            <div class="span span2" @click="addNewSubTitle(index, idx2)"></div>
            <div class="span span3" @click="deleteSubTitle(index, idx2)"></div>
          </div>
          <div v-for="(li, idx3) in data.descText" :key="'ruler_' + idx3">
            <div class="text_P div">
              <div
                class="editDiv"
                @click="editTextP(index, idx2, idx3, li.textP)"
              >
                {{ li.textP }}
              </div>
              <div
                class="span span1"
                @click="editTextP(index, idx2, idx3, li.textP)"
              ></div>
              <div
                class="span span2"
                @click="addTextP(index, idx2, idx3)"
              ></div>
              <div
                class="span span3"
                @click="deleteTextP(index, idx2, idx3)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditPop v-if="isShowEditPop" :popData="popData" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import EditPop from './editPop'

export default {
  data() {
    return {
      textData: null,
      addLi1: {
        module_title: '请输入标题',
        content: [
          {
            text_title: '请输入副标题',
            descText: [
              {
                textP: '请输入内容'
              }
            ]
          }
        ]
      },
      addLi2: {
        text_title: '请输入副标题',
        descText: [
          {
            textP: '请输入内容'
          }
        ]
      },
      indexF1: -1,
      indexF2: -1,
      indexF3: -1,
      popData: null,
      isShowEditPop: false
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

  mounted() {
    setTimeout(() => {
      this.textData = this.pageTextData
    }, 300)
  },
  methods: {
    deleteTitle(index) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.textData.ruleData.splice(index, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addNewTitle(index) {
      this.textData.ruleData.splice(index + 1, 0, this.addLi1)
    },
    editTxTitle(index, text) {
      this.isShowEditPop = true
      this.indexF1 = index
      this.indexF2 = -1
      this.indexF3 = -1
      this.popData = text
    },

    deleteSubTitle(index, idx2) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.textData.ruleData[index].content.splice(idx2, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addNewSubTitle(index, idx2) {
      this.textData.ruleData[index].content.splice(idx2 + 1, 0, this.addLi2)
    },
    editTxSubTitle(index, idx2, text) {
      this.isShowEditPop = true
      this.indexF1 = index
      this.indexF2 = idx2
      this.indexF3 = -1
      this.popData = text
    },

    editTextP(index, idx2, idx3, text) {
      this.isShowEditPop = true
      this.indexF1 = index
      this.indexF2 = idx2
      this.indexF3 = idx3
      this.popData = text
    },
    deleteTextP(index, idx2, idx3) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.textData.ruleData[index].content[idx2].descText.splice(idx3, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addTextP(index, idx2, idx3) {
      this.textData.ruleData[index].content[idx2].descText.splice(idx3 + 1, 0, {
        textP: '请输入内容'
      })
    },

    onSaveData(data) {
      let _data = JSON.stringify(this.textData)
      _data = JSON.parse(_data)
      if (this.indexF3 >= 0) {
        _data.ruleData[this.indexF1].content[this.indexF2].descText[
          this.indexF3
        ].textP = data
        this.textData = _data
        this.$store.dispatch('setPageTextDataAction', _data)
        return
      }
      if (this.indexF2 >= 0) {
        _data.ruleData[this.indexF1].content[this.indexF2].text_title = data
        this.textData = _data
        this.$store.dispatch('setPageTextDataAction', _data)
        return
      }
      if (this.indexF1 >= 0) {
        _data.ruleData[this.indexF1].module_title = data
        this.textData = _data
        this.$store.dispatch('setPageTextDataAction', _data)
      }
    },
    onCancel() {
      this.isShowEditPop = false
    }
  }
}
</script>
