/* eslint-disable */
<style lang="less" scoped>
.addModule_container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 89;
  background-color: rgba(0, 0, 0, 0.5);
  .addModuleContent {
    width: 50%;
    min-height: 400px;
    height: auto;
    background-color: #ffffff;
    border-radius: 14px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 40px 40px 0;
    .typeClass {
      width: 100%;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-weight: 400;
      font-size: 20px;
    }
  }
}
</style>

<template>
  <div class="addModule_container">
    <div class="addModuleContent">
      <div class="typeClass">{{ type === 'add' ? '新增' : '编辑' }}</div>
      <el-form
        :model="formData"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称：">
          <el-input type="text" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="线上地址：">
          <el-input type="text" v-model="formData.link"></el-input>
        </el-form-item>
        <el-form-item label="测试地址：">
          <el-input type="text" v-model="formData.dev_link"></el-input>
        </el-form-item>
        <el-form-item label="活动时间：">
          <el-date-picker
            v-model="datetime"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </el-form-item>
        <br />
        <br />
        <el-form-item>
          <el-button @click="onCancelPop()">取消</el-button>
          <el-button type="primary" @click="submitForm()">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { dateFormat } from '../../services/transformTime'
export default {
  props: {
    item: null,
    type: null
  },
  data() {
    return {
      formData: {
        name: '',
        link: '',
        dev_link: '',
        start_time: '',
        end_time: ''
      },
      datetime: ''
    }
  },
  filters: {},
  components: {},
  computed: {},

  mounted() {
    if (this.item && this.type === 'edit') {
      this.formData = this.item
      this.datetime = [this.item.start_time * 1000, this.item.end_time * 1000]
    }
  },
  methods: {
    submitForm() {
      if (this.datetime && this.datetime[0] && this.datetime[1]) {
        this.formData.start_time =
          this.type === 'edit' ? this.datetime[0] : this.datetime[0].getTime() // 开始时间
        this.formData.end_time =
          this.type === 'edit' ? this.datetime[1] : this.datetime[1].getTime() // 截止时间
      }
      if (!this.formData.name) {
        return this.$message.error('请输入活动名称')
      }
      if (!this.formData.link) {
        return this.$message.error('请输入活动链接')
      }
      if (!this.formData.dev_link) {
        return this.$message.error('请输入测试链接')
      }
      if (!this.formData.start_time) {
        return this.$message.error('请输入活动开始时间')
      }
      if (!this.formData.end_time) {
        return this.$message.error('请输入活动结束时间')
      }
      this.addNewList()
    },
    onCancelPop() {
      this.$parent.onCancelAddModule(false)
    },
    addNewList() {
      let param = {
        name: this.formData.name,
        link: this.formData.link,
        dev_link: this.formData.dev_link,
        start_time: this.formData.start_time / 1000,
        end_time: this.formData.end_time / 1000
      }
      if (this.type === 'edit' && this.item.id) {
        param.id = this.item.id
      }
      this.$store
        .dispatch('saveDataAction', param)
        .then((res) => {
          if (res && res.success) {
            this.isShowIF = !this.isShowIF
            this.$message({
              message: '操作成功！',
              type: 'success'
            })
            this.$parent.getPageListData()
            this.onCancelPop()
          } else {
            this.isShowIF = !this.isShowIF
          }
        })
        .catch(() => {
          this.isShowIF = !this.isShowIF
        })
    }
  }
}
</script>
