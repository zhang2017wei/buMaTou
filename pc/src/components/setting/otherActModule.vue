/* eslint-disable */
<style lang="less" scoped>
.ruleContent {
  .descContent {
    margin-top: 20px;
    padding: 20px 40px 20px 20px;
    background-color: rgba(0, 0, 0, 0.13);
    border: 1px solid #eeeeee;
    border-radius: 20px;
    position: relative;
    .numNO {
      padding: 5px 20px;
      background-color: #409eff;
      display: inline-block;
      font-size: 20px;
      font-weight: 600;
      border-radius: 20px 0 0 0;
      position: absolute;
      top: 0;
      left: 0;
      color: #ffffff;
    }
    .optionContent {
      margin: 30px auto 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

<template>
  <div class="ruleContent">
    <div
      v-if="textData && textData.otherActData && textData.otherActData.length"
    >
      <div
        class="descContent"
        :class="'descContent' + (index + 1)"
        v-for="(item, index) in textData.otherActData"
        :key="'key_otherActData_' + index"
      >
        <div class="numNO">{{ index + 1 }}</div>
        <el-form
          status-icon
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="联盟ID">
            <el-input type="text" v-model="item.actName"></el-input>
          </el-form-item>
          <el-form-item label="活动标题">
            <el-input type="text" v-model="item.actType"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接">
            <el-input type="text" v-model="item.actReward"></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input type="text" v-model="item.actCall"></el-input>
          </el-form-item>
        </el-form>
        <div class="optionContent">
          <el-button type="primary" @click="onCreateNewAct(index)">
            新增一条
          </el-button>
          <el-button type="danger" @click="onDeleteThisAct(index)">
            删除本条
          </el-button>
        </div>
      </div>
    </div>
    <div v-else style="margin: 20px auto">
      <el-button type="primary" @click="onCreateNewAct(0)">
        新增一条
      </el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      textData: null,
      popData: null
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
    setTimeout(() => {
      this.textData = this.pageTextData
    }, 300)
  },
  methods: {
    onCreateNewAct(index) {
      let param = {
        actName: '联盟名称',
        actType: '活动类型',
        actReward: '活动奖励',
        actCall: '联系方式(ID)'
      }
      this.textData.otherActData.splice(index + 1, 0, param)
      this.$message({
        type: 'success',
        message: '已成功添加一条'
      })
    },
    onDeleteThisAct(index) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.textData.otherActData.splice(index, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
