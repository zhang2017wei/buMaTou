/* eslint-disable */
<style lang="less" scoped>
.server_list_container {
  width: 100%;
  height: 100%;
  .tableContent {
  }
}
</style>

<template>
  <div class="server_list_container">
    <div class="content">
      <el-table class="tableContent" :data="actList" style="width: 100%">
        <el-table-column label="序号" type="index" width="80">
          <span slot-scope="scope">{{ scope.$index + 1 }}</span>
        </el-table-column>
        <el-table-column label="活动名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template slot-scope="scope">
            <span>{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动ID">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="封面图" width="200">
          <template slot-scope="scope">
            <img
              :src="scope.row.icon"
              style="width: 100%; height: auto; max-height: 200px"
              alt=""
            />
          </template>
        </el-table-column>

        <el-table-column label="活动时间">
          <template slot-scope="scope">
            <span>{{ (scope.row.start_time * 1000) | setTime }}</span> 至
            <span>{{ (scope.row.end_time * 1000) | setTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <EditPop :act_id="act_id" v-if="isShowEditPop" />
  </div>
</template>
<script>
import { setTime } from '../../services/transformTime'
import EditPop from './editPop'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      actList: null,
      isShowEditPop: false,
      act_id: null
    }
  },
  filters: {
    setTime
  },
  components: {
    EditPop
  },
  watch: {},
  computed: {
    ...mapGetters({
      pageTextData: 'pageTextData'
    })
  },

  mounted() {
    this._onGetServerListData()
  },
  methods: {
    _onGetServerListData() {
      let _id = this.pageTextData && this.pageTextData.serverActId
      if (!_id) return
      this.$store
        .dispatch('getServerAcAction', { act_ids: _id })
        .then((res) => {
          if (res && res.success) {
            this.actList = res.serverActList
          }
        })
    },
    handleEdit(index, row) {
      this.act_id = row.id
      this.isShowEditPop = true
    },
    onCancelPopFun(data) {
      this.isShowEditPop = data
      this._onGetServerListData()
    },
    handleDelete(index, row) {
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      this.actList.splice(index, 1)
      /*this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store
            .dispatch('deleteListAction', { id: row.id })
            .then((res) => {
              if (res && res.success) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.actList.splice(index, 1)
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })*/
    }
  }
}
</script>
