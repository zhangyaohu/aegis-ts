<template>
  <page-template>
    <template slot="page-header">段空间预警</template>
    <template slot="page-toolbar">
      <span class="mh-search">
        <el-select v-model="selectVal" class="mh-search__select">
          <el-option
            v-for="(item, index) in conditionNameList"
            :key="index"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
        <mh-input
          placeholder="请输入段名(表名|索引名)"
          v-model="searchStr"
          class="mh-inline"
          inputClass="mh-input__search"
          style="padding: 0px 10px 0px 0px;"
        />
      </span>
      <button class="btn-primary" @click="pageIndex = 1; queryList()">
        <i class="icon el-icon-search"></i>
        <span class="text">搜索</span>
      </button>
    </template>
    <template slot="page-table">
      <mh-table :data-source="dataSource" :loading="loading">
        <template slot="history" slot-scope="scope">
          <a class="a-link" @click="handleWatchHistroy(scope.data)">查看历史</a>
        </template>
      </mh-table>
      <div class="page-pagination">
        <pagination
          :total="total"
          v-show="total > 0"
          :currentPage="pageIndex"
          @size-change="handleSizeChange"
          :pageSize="pageSize"
          @change="handleCurrentChange"
        ></pagination>
      </div>
    </template>
    <template slot="page-footer">
      <mh-drawer :visiable="showDrawer" :param="historyParam" @close="showDrawer = false">
        <template slot="header">
          <span class="mh-drawer__title">历史详情</span>
        </template>
        <template slot="body">
          <span class="mh-search" style="padding: 10px 0px;">
            <el-select v-model="selectHistoryVal" class="mh-search__select">
              <el-option
                v-for="(item, index) in conditionNameList"
                :key="index"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
            <mh-input
              placeholder="请输入段名(表名|索引名)"
              v-model="searchHistoryStr"
              class="mh-inline"
              inputClass="mh-input__search"
              style="padding: 0px 10px 0px 0px;"
            />
          </span>
          <button class="btn-primary" @click="pageHistoryIndex = 1; queryHistoryList()">
            <i class="icon el-icon-search"></i>
            <span class="text">搜索</span>
          </button>
          <mh-table :data-source="historyDataSource" :loading="historyLoading"></mh-table>
          <div class="page-pagination">
            <pagination
              :total="historyTotal"
              v-show="historyTotal > 0"
              :currentPage="pageHistoryIndex"
              @size-change="handleHistorySizeChange"
              :pageSize="pageHistroySize"
              @change="handleHistoryCurrentChange"
            ></pagination>
          </div>
        </template>
      </mh-drawer>
    </template>
  </page-template>
</template>

<script lang="ts">
import SectionSpaceApi from "@/views/section-space/sectionSpaceApi";
// import Drawer from "@/views/components/Drawer/Drawer";
import { formatDateTime } from "@/views/utils/utils";
import Mixins from "@/mixins/Mixins.vue";
import { Component, Vue } from 'vue-property-decorator'
interface IProp{
  [key: string]: any
}
@Component({
  name: "TableSpacePage",
  mixins: [Mixins],
  // components: {
  //   "mh-drawer": Drawer
  // },
})
export default class TableSpacePage extends Vue {

  private name: string = ''
  private showDrawer: boolean = false
  private historyParam: IProp = {}
  private pageIndex: number = 1
  private pageSize: number = 10
  private loading: boolean = false
  private sortDirection: string =  '-'
  private sortBy: string = 'gmt_create'
  private selectVal: string = 'service'
  private searchStr: string = ''
  private total: number = 0
  private searchHistoryStr: string = ''
  private selectHistoryVal: string = 'service'
  private pageHistoryIndex: number = 1
  private pageHistroySize: number = 10
  private conditionNameList: IProp = [
        {
          label: "实例名",
          value: "service"
        },
        {
          label: "段名",
          value: "segment_name"
        }
      ]
  private dataSource: IProp = {
        getItemList: () => this.itemList,
        type: "",
        handleSelection: this.handleSelect,
        handleSort: this.handleSort,
        fields: [
          {
            getContent: (item: IProp) => this.getField("gmt_create", item),
            getHeaderContent: "更新时间",
            tooltip: true
          },
          {
            getContent: (item: IProp) => this.getField("service", item),
            getHeaderContent: "实例名",
            tooltip: true
          },
          {
            getContent: (item: IProp) => this.getField("owner", item),
            getHeaderContent: "创建者",
            tooltip: true
          },
          {
            getContent: (item: IProp) => this.getField("segment_name", item),
            getHeaderContent: "段名",
            tooltip: true
          },
          {
            getContent: (item: IProp) => this.getField("partition_name", item),
            getHeaderContent: "分区名",
            tooltip: true
          },
          {
            getContent: (item: IProp) => this.getField("used_space", item),
            getHeaderContent: "使用(MB)",
            tooltip: true
          },
          {
            getContent: (item: IProp) => this.getField("diff_space", item),
            getHeaderContent: "增量(MB)",
            tooltip: true,
            sortable: true,
            field: "diff_space"
          },
          {
            getContent: (item: IProp) => this.getField("last_ddl_time", item),
            getHeaderContent: "最后DDL时间(%)",
            tooltip: true,
            sortable: true,
            field: "last_ddl_time"
          },
          {
            getHeaderContent: "历史数据",
            type: "slot",
            tooltip: true,
            slotName: "history"
          }
        ]
      }
    private  historyTotal: number = 0
    private  historyLoading: boolean = false
    private  historyPeriod: Date = new Date()
    private  historyDataSource: IProp = {
        getItemList: () => this.historyItemList,
        type: "",
        handleSort: this.handleHistorySort,
        fields: [
          {
            getContent: (item: IProp) => this.getField("gmt_create", item),
            getHeaderContent: "更新时间",
            tooltip: true
          },
          {
            getContent: (item: IProp) => this.getField("service", item),
            getHeaderContent: "实例名",
            tooltip: true
          },
          {
            getContent: (item: IProp) => this.getField("owner", item),
            getHeaderContent: "创建者",
            tooltip: true
          },
          {
            getContent: (item: IProp) => this.getField("segment_name", item),
            getHeaderContent: "段名",
            tooltip: true
          },
          {
            getContent: (item: IProp) => this.getField("partition_name", item),
            getHeaderContent: "分区名",
            tooltip: true
          },
          {
            getContent: (item: IProp) => this.getField("used_space", item),
            getHeaderContent: "使用(MB)",
            tooltip: true
          },
          {
            getContent: (item: IProp) => this.getField("diff_space", item),
            getHeaderContent: "增量(MB)",
            tooltip: true,
            sortable: true,
            field: "diff_space"
          },
          {
            getContent: (item: IProp) => this.getField("last_ddl_time", item),
            getHeaderContent: "最后DDL时间(%)",
            tooltip: true,
            sortable: true,
            field: "last_ddl_time"
          }
        ]
      }

  get itemList(): Array<any>{
    let _this = this;
    return _this.$store.state.db.tableSpace;
  }

  get historyItemList(): Array<any>{
    let _this = this;
    return _this.$store.state.db.sectionSpaceHistory;
  }

  mounted() {
    let _this = this;
    _this.queryList();
  }

    toggleTab(tab: IProp) {
      let _this = this;
      _this.currSelectTab = tab.value;
    }

    getCondition() {
      let _this = this;
      return {
        limit: _this.pageSize,
        start: (_this.pageIndex - 1) * _this.pageSize,
        sort: `${_this.sortDirection}${_this.sortBy}`,
        [_this.selectVal]: _this.searchStr.trim()
      };
    }

    getHistoryCondition(param: IProp ) {
      let _this = this;
      return {
        limit: _this.pageSize,
        start: (_this.pageIndex - 1) * _this.pageSize,
        sort: `${_this.sortDirection}${_this.sortBy}`,
        service: param && param.service ? param.service : '',
        starttime: formatDateTime(new Date(
          new Date(param.gmt_create).getTime() - 30 * 24 * 60 * 60 * 1000
        ), "yyyy-MM-dd hh:mm:ss"),
        endtime: formatDateTime(param.gmt_create, "yyyy-MM-dd hh:mm:ss"),
        [_this.selectHistoryVal]: _this.searchHistoryStr.trim()
      };
    }

    //查询列表
    queryList() {
      let _this = this;
      _this.loading = true;
      SectionSpaceApi.queryList(_this.getCondition()).then((resp: IProp) => {
        _this
          .updateTableList({
            tableName: "tableSpace",
            list: resp.data
          })
          .then(() => {
            _this.total = resp.total;
            _this.loading = false;
          })
          .catch(() => {
            _this.loading = false;
          });
      });
    }

    //填充表数据
    getField(field: string, item: IProp) {
      let _this = this,
        normalFields = [
          "owner",
          "service",
          "partition_name",
          "diff_space",
          "used_space",
          "segment_name"
        ];
      if (normalFields.includes(field)) return item[field];
      if (field === "gmt_create" || field === "last_ddl_time")
        return formatDateTime(item[field], "yyyy-MM-dd hh:mm:ss");
    }

    //查看历史回调
    handleWatchHistroy(param: IProp) {
      let _this = this;
      _this.showDrawer = true;
      _this.historyParam = param;
      _this.queryHistoryList();
    }

    queryHistoryList() {
      let _this = this;
      _this.historyLoading = true;
      SectionSpaceApi.queryList(_this.getHistoryCondition(_this.historyParam)).then((resp: IProp) => {
        _this
          .updateTableList({
            tableName: "sectionSpaceHistory",
            list: resp.data
          })
          .then(() => {
            _this.historyTotal = resp.total;
            _this.historyLoading = false;
          })
          .catch(() => {
            _this.historyLoading = false;
          });
      });
    }

    //改变每页条数
    handleSizeChange(size: number) {
      let _this = this;
      if (size === _this.pageSize) return;
      _this.pageSize = size;
      _this.pageIndex = 1;
      _this.queryList();
    }
    //改变当前页数
    handleCurrentChange(pageIndex: number) {
      let _this = this;
      if (pageIndex === _this.pageIndex) return;
      _this.pageIndex = pageIndex;
      _this.queryList();
    }
    //处理排序
    handleSort(item: IProp) {
      let _this = this;
      //设置排序方向desc为降序,否则为升序
      (_this.sortDirection = item.order === "descending" ? "-" : "+"),
        //设置排序字段
        (_this.sortBy = item.prop);
      _this.queryList();
    }

    //改变历史数据页码
    handleHistorySizeChange(size: number) {
     let _this = this;
      if (size === _this.pageHistroySize) return;
      _this.pageHistroySize = size;
      _this.pageHistoryIndex = 1;
      _this.queryHistoryList();
    }
    //改变历史数据当前页
    handleHistoryCurrentChange(pageIndex: number) {
     let _this = this;
      if (pageIndex === _this.pageHistoryIndex) return;
      _this.pageHistoryIndex = pageIndex;
      _this.queryHistoryList();
    }
    //处理排序
    handleHistorySort(item: IProp) {
      let _this = this;
      //设置排序方向desc为降序,否则为升序
      (_this.sortDirection = item.order === "descending" ? "-" : "+"),
        //设置排序字段
        (_this.sortBy = item.prop);
      _this.queryHistoryList();
    }
};
</script>

