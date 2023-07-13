/* eslint-disable */
<style lang="less" scoped>
.editReward_container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.56);
  .pop_content {
    width: 60%;
    min-height: 300px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border-radius: 20px;
    border-top: 1px solid #ffffff;
    .rewardEditContent {
      width: 90%;
      height: auto;
      margin: 30px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .rewardLi {
        width: 45%;
        height: 100%;
        text-align: center;
        .title {
          font-weight: 600;
          font-size: 14px;
        }
        .imgBox {
          border: 1px solid #ffb000;
          width: 200px;
          height: 200px;
          margin: 10px auto;
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          img {
            width: 90%;
            height: auto;
            max-height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .label {
            display: inline-block;
            padding: 2px 14px;
            background-color: #ffb000;
            position: absolute;
            top: 0;
            right: 0;
            color: #ffffff;
          }
        }
      }
    }
    .fromContent {
      width: 90%;
      margin: 0 auto;
    }
    .optionContent {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 20px;
    }
  }
}
.tipText {
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  color: red;
  font-weight: 700;
  font-size: 20px;
}
</style>

<template>
  <div class="editReward_container">
    <div class="pop_content" v-if="item">
      <div class="rewardEditContent">
        <div class="rewardLi">
          <div class="title">
            {{ type === 'circle' ? '未点亮图标' : '展示图' }}
          </div>
          <div class="imgBox">
            <img :src="item.icon" alt="" />
            <!--<el-form>
              <el-form-item label="上传素材">
                <el-upload
                        class="avatar-uploader"
                        action=""
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="handleFileUploaderChange"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>-->
            <div class="label" v-if="item.label">{{ item.label }}</div>
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="desc" v-if="item.desc">{{ item.desc }}</div>
        </div>
        <div class="rewardLi">
          <div class="title">
            {{ type === 'circle' ? '点亮图标' : '预览图' }}
          </div>
          <div class="imgBox">
            <img :src="item.showIcon || item.icon" alt="" />
            <div class="label" v-if="item.label">{{ item.label }}</div>
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="desc" v-if="item.desc">{{ item.desc }}</div>
        </div>
      </div>
      <div class="tipText">素材图一定要先压缩再上传!!!</div>
      <div class="fromContent">
        <el-form label-width="100px">
          <el-form-item
            :label="type === 'circle' ? '未点亮链接' : '展示图链接'"
          >
            <el-input
              type="text"
              class="giftName"
              v-model="item.icon"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="type === 'circle' ? '已点亮链接' : '预览图链接'"
          >
            <el-input
              type="text"
              class="giftName"
              v-model="item.showIcon"
            ></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input
              type="text"
              class="giftName"
              v-model="item.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述" v-if="type !== 'circle'">
            <el-input
              type="text"
              class="giftName"
              v-model="item.desc"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述" v-if="type === 'circle'">
            <el-input
              type="text"
              class="giftName"
              v-model="item.price"
            ></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-input
              type="text"
              class="giftName"
              v-model="item.label"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="optionContent">
        <el-button plain @click="_onCancel()">取消</el-button>
        <el-button type="primary" @click="_onSaveText()">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: null,
    type: null
  },
  data() {
    return {
      // item: this.item
      imageUrl: '',
      formData: ''
    }
  },
  filters: {},
  components: {},
  computed: {},

  mounted() {},
  methods: {
    async handleFileUploaderChange(file) {
      await this.beforeAvatarUpload(file)

      const self = this
      let reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function (event) {
        /* var _formdata = new FormData();
          _formdata.append("file", event);
          this.formData = _formdata;
          this.formData.append("start_time", "42353534534");
          console.log("kkkkk", this.formData)*/

        console.log('....event.....', event)
        // let img_base64 = this.result;
        // self._onUploadImg(img_base64);
      }
    },
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const isJPG = testmsg === 'png' || testmsg === 'jpeg' || testmsg === 'jpg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG/JPEG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    _onSaveText() {
      this.$parent.onSetRewardData(this.item)
      this._onCancel()
    },
    _onCancel() {
      this.$parent.closeRewardPop(false)
    }
  }
}
</script>
