<template>
  <page-template>
    <template slot="page-header">SQL区段报表</template>
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
      <helper-trigger
        content="execs/lgrds/phrds(=0/<=1k/<=10k/>10k); cpu/elapsed/sorts(=0/<=1/<=10/>10) "
      />
    </template>
    <template slot="page-table">
      <mh-table :data-source="dataSource" :loading="loading"></mh-table>
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
  </page-template>
</template>

<script lang="ts">
import SqlReportApi from "@/views/sql-report/sqlReportApi";
// import Drawer from "@/views/components/Drawer/Drawer";
import { formatDateTime } from "@/views/utils/utils";
import Mixins from "@/mixins/Mixins.vue";
import { Component, Vue } from "vue-property-decorator";
interface IProp {
  [key: string]: any;
}
@Component({
  name: "SqlReportPage",
  mixins: [Mixins]
  // components: {
  //     "mh-drawer": Drawer
  //   },
})
export default class SqlReportPage extends Vue {
  private name: string = "";
  private showDrawer: boolean = false;
  private historyParam: IProp = {};
  private pageIndex: number = 1;
  private pageSize: number = 10;
  private loading: boolean = false;
  private searchStr: string = "";
  private selectVal: string = "service";
  private total: number = 0;
  private conditionNameList: IProp = [
    {
      label: "实例名",
      value: "service"
    }
  ];
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
        getHeaderContent: "实例",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("total", item),
        getHeaderContent: "total",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("fscan", item),
        getHeaderContent: "fsc",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("execs", item),
        getHeaderContent: "exec",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("lgrds", item),
        getHeaderContent: "buff",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("phrds", item),
        getHeaderContent: "disk",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("rows", item),
        getHeaderContent: "rows",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("elapsed", item),
        getHeaderContent: "elap",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("sorts", item),
        getHeaderContent: "sort",
        tooltip: true
      }
    ]
  };

  mounted() {
    let _this = this;
    _this.queryList();
  }

  get itemList() {
    let _this = this;
    return _this.$store.state.db.sqlReport
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
      [_this.selectVal]: _this.searchStr.trim()
    };
  }
  //查询列表
  queryList() {
    let _this = this;
    _this.loading = true;
    SqlReportApi.queryList(_this.getCondition()).then((resp: IProp) => {
      _this
        .updateTableList({
          tableName: "sqlReport",
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
        "service",
        "total",
        "fscan",
        "rows",
        "execs",
        "lgrds",
        "disk",
        "elapsed",
        "sorts",
        "phrds"
      ];
    if (normalFields.includes(field)) return item[field];
    if (field === "gmt_create")
      return formatDateTime(item[field], "yyyy-MM:dd hh:mm:ss");
  }
  //查看历史回调
  handleWatchHistroy(param: IProp) {
    let _this = this;
    _this.historyParam = param;
    _this.showDrawer = true;
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
}
</script>

