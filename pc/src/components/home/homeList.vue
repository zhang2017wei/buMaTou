/* eslint-disable */
<style lang="less" scoped>
.homePage_container {
  width: 96%;
  margin: 20px auto;
  position: relative;
  .addLiBtn {
    position: absolute;
    top: -64px;
    right: 2%;
  }
  .listContent {
    max-height: 700px;
    overflow-y: auto;
  }
}
</style>

<template>
  <div class="homePage_container" v-loading="loading">
    <el-button
      type="primary"
      class="addLiBtn"
      @click="toAddNewLiData"
      v-if="showBtn"
      >新增</el-button
    >
    <div class="listContent" style="overflow-y: auto">
      <el-table :data="tableListData" style="width: 100%">
        <el-table-column label="序号" type="index" width="80">
          <span slot-scope="scope">{{
            scope.$index + 1 + limit * (page - 1)
          }}</span>
        </el-table-column>
        <el-table-column label="活动名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动ID" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="线上地址">
          <template slot-scope="scope">
            <span style="color: rgb(77, 179, 255); cursor: pointer">{{
              scope.row.link
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="测试地址">
          <template slot-scope="scope">
            <span style="color: rgb(77, 179, 255); cursor: pointer">{{
              scope.row.dev_link
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动时间">
          <template slot-scope="scope">
            <span>{{
              (scope.row.start_time * 1000) | setTime('MM/dd hh:mm:ss')
            }}</span>
            至
            <span>{{
              (scope.row.end_time * 1000) | setTime('MM/dd hh:mm:ss')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="toDetailPage(scope.$index, scope.row)"
              >配置
            </el-button>
            <el-button
              size="mini"
              type="danger"
              v-if="showBtn"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
            <el-button size="mini" @click="toSendLink(scope.$index, scope.row)"
              >发链接
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottomOption">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="limit"
        current-page.sync="1"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <AddModule v-if="isShowAddModule" :item="rowData" :type="type" />
    <SendLinkPop v-if="isShowSendLinkPop" :item="rowData" />
  </div>
</template>
<script>
import { setTime } from '../../services/transformTime'
import AddModule from './addModule'
import SendLinkPop from './sendLinkPop'
export default {
  data() {
    return {
      loading: false,
      limit: 10, // 每页显示数据条数
      page: 1, // 第几页
      total: 100,
      tableListData: null,
      isShowAddModule: false,
      isShowSendLinkPop: false,
      rowData: null,
      type: null,
      showBtn: window.location.href.indexOf('admin') > -1
    }
  },
  filters: {
    setTime
  },
  components: {
    AddModule,
    SendLinkPop
  },
  computed: {},

  mounted() {
    this.getPageListData()
  },
  methods: {
    getPageListData() {
      let param = {
        page: this.page,
        limit: this.limit
      }
      this.$store.dispatch('getListAction', param).then((res) => {
        if (res && res.success) {
          this.tableListData = res.list
        }
      })
    },
    handleEdit(index, row) {
      this.rowData = row
      this.onCancelAddModule(true, 'edit')
    },
    toAddNewLiData() {
      this.onCancelAddModule(true, 'add')
    },
    // 翻页
    handleCurrentChange(val) {
      this.page = val
      this.getPageListData()
    },
    handleSizeChange(val) {
      this.limit = val
      this.page = 1
      this.getPageListData()
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          this.$store
            .dispatch('deleteListAction', { id: row.id })
            .then((res) => {
              if (res && res.success) {
                this.loading = false
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.tableListData.splice(index, 1)
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    toSendLink(index, row) {
      this.rowData = row
      this.isShowSendLinkPop = true
    },
    onCancelSendLinkPop() {
      this.isShowSendLinkPop = false
    },
    toDetailPage(index, row) {
      this.$store.dispatch('setPageTextDataAction', null).then(() => {
        window.localStorage.setItem('saveListItemData', JSON.stringify(row))
        this.$router.push({ path: '/setting' })
      })
    },
    onCancelAddModule(data, type) {
      this.isShowAddModule = data
      this.type = type
    }
  }
}
</script>

<style lang="less">
.bottomOption {
  text-align: center;
  margin: 40px auto;
}
</style>
