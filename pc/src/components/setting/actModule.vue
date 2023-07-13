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
    .div {
      width: 80%;
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
    }
    .text_title {
      width: calc(100% - 60px);
      margin: 5px auto;
      font-size: 16px;
      font-weight: 700;
    }
    .text_P {
      width: calc(100% - 120px);
      margin: 3px auto;
    }
    .flex {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .infoCon45 {
    display: none;
  }
  .unionTeamInfo {
    width: 70%;
    margin: 0 auto;
    padding: 0 0 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img {
      width: 100px;
      height: 100px;
    }
    .name {
      font-size: 18px;
      margin-left: 20px;
    }
  }
  .lianLuoInfo {
    display: none;
  }

  .optionContent {
    margin: 30px auto 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .line {
    width: 100%;
    margin-top: 40px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #ffb000;
    font-size: 14px;
    color: #ffffff;
  }
}
</style>

<template>
  <div class="ruleContent">
    <div
      v-if="textData && textData.actModuleData && textData.actModuleData.length"
    >
      <div
        class="descContent"
        :class="'descContent' + (index + 1)"
        v-for="(item, index) in textData.actModuleData"
        :key="'key_ruler_' + index"
      >
        <div class="numNO">{{ index + 1 }}</div>
        <el-form
          status-icon
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="联盟ID">
            <el-input
              type="text"
              style="width: 400px"
              v-model="item.actID"
            ></el-input>
            <el-button
              type="primary"
              style="margin-left: 20px"
              @click="onSearchTeamInfo(item.actID, index)"
            >
              查询
            </el-button>
          </el-form-item>
          <div v-if="item.unionTeamInfo.logo || item.unionTeamInfo.name">
            <div :class="'unionTeamInfo' + (index + 1)">
              <div class="unionTeamInfo">
                <img :src="baseUrl + item.unionTeamInfo.logo" alt="" />
                <div class="name">{{ item.unionTeamInfo.name }}</div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="infoCon45" :class="'unionTeamInfo' + (index + 1)">
              <div class="unionTeamInfo">
                <img :src="baseUrl + item.unionTeamInfo.logo" alt="" />
                <div class="name">{{ item.unionTeamInfo.name }}</div>
              </div>
            </div>
          </div>

          <el-form-item label="活动标题">
            <el-input type="text" v-model="item.module_title"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接">
            <el-input type="text" v-model="item.link"></el-input>
          </el-form-item>
          <el-form-item label="活动名称">
            <el-input type="text" v-model="item.actTitle"></el-input>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-input type="text" v-model="item.time"></el-input>
          </el-form-item>
        </el-form>
        <div v-for="(data, idx2) in item.content" :key="'data_' + idx2">
          <div class="text_title div" v-if="data.title">
            <div
              class="editDiv"
              @click="editTxSubTitle(index, idx2, data.title)"
            >
              {{ data.title }}
            </div>
            <div
              class="span span1"
              @click="editTxSubTitle(index, idx2, data.title)"
            ></div>
          </div>
          <div v-for="(li, idx3) in data.data" :key="'ruler_' + idx3">
            <div class="text_P div" v-if="li.textP">
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
            <div class="text_P div" v-if="li.image">
              <el-input
                type="text"
                style="width: calc(100% + 140px)"
                v-model="li.image"
              ></el-input>
            </div>
            <div class="text_P" v-if="li.uid === '' || li.uid">
              <div class="flex">
                <el-input type="text" v-model="li.uid"></el-input>
                <el-button
                  type="primary"
                  style="margin-left: 20px"
                  @click="onGetUserInfo(li.uid, index)"
                >
                  查询
                </el-button>
              </div>
              <div v-if="item.liaisonInfo.icon || item.liaisonInfo.name">
                <div :class="'lianLuoInfo' + (index + 1)">
                  <div
                    class="unionTeamInfo"
                    style="width: 100%; margin-top: 10px"
                  >
                    <img :src="getHeadImageUrl(item.liaisonInfo.icon)" alt="" />
                    <div class="name">{{ item.liaisonInfo.name }}</div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="lianLuoInfo" :class="'lianLuoInfo' + (index + 1)">
                  <div
                    class="unionTeamInfo"
                    style="width: 100%; margin-top: 10px"
                  >
                    <img :src="getHeadImageUrl(item.liaisonInfo.icon)" alt="" />
                    <div class="name">{{ item.liaisonInfo.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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

    <div class="line">其它活动配置</div>
    <OtherActModule />

    <EditPop v-if="isShowEditPop" :popData="popData" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import EditPop from './editPop'
import OtherActModule from './otherActModule'

export default {
  data() {
    return {
      textData: null,
      indexF1: -1,
      indexF2: -1,
      indexF3: -1,
      popData: null,
      isShowEditPop: false,
      baseUrl: 'https://xs-image.yinjietd.com/',
      getHeadImageUrl(url) {
        const userDefaultIcon =
          'https://xs-image.oss-cn-hangzhou.aliyuncs.com/static/mini/guess/pkgGuess/images/user_icon_default.png'
        const baseUrl = 'https://xs-image.yinjietd.com/'
        url =
          url.indexOf('!head') === -1 && url.indexOf('webp') === -1
            ? `${url}!head150`
            : url
        if (!url) return userDefaultIcon
        if (url.indexOf('http') > -1) {
          return url
        }
        return baseUrl + url
      }
    }
  },
  filters: {},
  components: {
    EditPop,
    OtherActModule
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
    addTextP(index, idx2, idx3) {
      this.textData.actModuleData[index].content[idx2].data.splice(
        idx3 + 1,
        0,
        {
          textP: '请输入内容'
        }
      )
    },
    deleteTextP(index, idx2, idx3) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.textData.actModuleData[index].content[idx2].data.splice(idx3, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    onSaveData(data) {
      if (this.indexF3 >= 0) {
        this.textData.actModuleData[this.indexF1].content[this.indexF2].data[
          this.indexF3
        ].textP = data
        return
      }
      if (this.indexF2 >= 0) {
        this.textData.ruleData[this.indexF1].content[this.indexF2].text_title =
          data
        return
      }
      if (this.indexF1 >= 0) {
        this.textData.ruleData[this.indexF1].module_title = data
      }
    },
    onCancel() {
      this.isShowEditPop = false
    },

    onCreateNewAct(index) {
      let param = {
        actID: '',
        module_title: '',
        actTitle: '',
        unionTeamInfo: {
          name: '',
          logo: ''
        },
        liaisonInfo: {
          name: '',
          icon: ''
        },
        time: '',
        link: 'https://page.91hotplay.com',
        content: [
          {
            title: '活动内容',
            data: [
              {
                textP: '请输入相关内容'
              }
            ]
          },
          {
            title: '活动奖励',
            data: [
              {
                image: '请输入奖励资源图片链接'
              }
            ]
          },
          {
            title: '活动要求',
            data: [
              {
                textP: '请输入相关内容'
              }
            ]
          },
          {
            title: '活动联络员',
            data: [
              {
                uid: '请输入相关内容'
              }
            ]
          }
        ]
      }
      this.textData.actModuleData.splice(index + 1, 0, param)
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
          this.textData.actModuleData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '成功删除'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    onSearchTeamInfo(id, index) {
      if (!id) return this.$message.error('请输入联盟ID')
      this.$store.dispatch('unionInfoAction', { union_id: id }).then((res) => {
        if (res && res.success) {
          this.textData.actModuleData[index].unionTeamInfo.logo = res.data.logo
          this.textData.actModuleData[index].unionTeamInfo.name = res.data.name
          const _class = 'unionTeamInfo' + (index + 1)
          const dom = document.getElementsByClassName(_class)
          if (dom && dom[0]) {
            dom[0].style.display = 'block'
          }
        }
      })
    },
    onGetUserInfo(uid, index) {
      if (!uid) return this.$message.error('请输入uid')
      this.$store.dispatch('userInfoAction', { uid: uid }).then((res) => {
        if (res && res.success) {
          this.textData.actModuleData[index].liaisonInfo.icon = res.data.icon
          this.textData.actModuleData[index].liaisonInfo.name = res.data.name
          const _class = 'lianLuoInfo' + (index + 1)
          const dom = document.getElementsByClassName(_class)
          if (dom && dom[0]) {
            dom[0].style.display = 'block'
          }
        }
      })
    }
  }
}
</script>
