/* eslint-disable */
<style lang="less" scoped>
.editPop_container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.56);
  .pop_content {
    width: 40%;
    height: 300px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border-radius: 20px;
    .inputContent {
      text-align: center;
      .textArea {
        width: 80%;
        margin: 40px auto;
      }
    }
    .optionContent {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

<template>
  <div class="editPop_container">
    <div class="pop_content">
      <div class="inputContent">
        <el-input
          class="textArea"
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="textArea"
        >
        </el-input>
      </div>
      <div class="optionContent">
        <el-button plain @click="_onCancel()">取消</el-button>
        <el-button type="primary" @click="_onSaveText(textArea)"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    popData: null
  },
  data() {
    return {
      textArea: this.popData
    }
  },
  filters: {},
  components: {},
  computed: {},

  mounted() {},
  methods: {
    _onSaveText(data) {
      this.$parent.onSaveData(data)
      this._onCancel()
    },
    _onCancel() {
      this.$parent.onCancel()
    }
  }
}
</script>
