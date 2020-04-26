<template>
  <page-template>
    <template slot="page-header">SQL绑定变量</template>
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
          placeholder="请输入查找条件"
          v-model="searchStr"
          class="mh-inline"
          inputClass="mh-input__search"
          style="padding: 0px 10px 0px 0px;"
        />
      </span>
      <button class="btn-primary" @click="pageIndex = 1;queryList()">
        <i class="icon el-icon-search"></i>
        <span class="text">搜索</span>
      </button>
    </template>
    <template slot="page-table">
      <mh-table :data-source="dataSource" :loading="loading">
        <template slot-scope="scope" slot="history">
          <a class="a-link" @click="watchHistroy(scope.data)">查看历史</a>
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
  </page-template>
</template>

<script lang="ts">
import SqlBindApi from "@/views/sql-bind/sqlBindApi";
// import Drawer from "@/views/components/Drawer/Drawer";
import { formatDateTime } from "@/views/utils/utils";
import Mixins from "@/mixins/Mixins.vue";
import { Component, Vue } from "vue-property-decorator";
interface IProp {
  [key: string]: any;
}

@Component({
  name: "SqlBindPage",
  mixins: [Mixins]
  // components: {
  //   "mh-drawer": Drawer
  // },
})
export default class SqlBindPage extends Vue {
  private name: string = "";
  private showDrawer: boolean = false;
  private historyParam: IProp = {};
  private pageIndex: number = 1;
  private pageSize: number = 10;
  private loading: boolean = false;
  private total: number = 0;
  private selectVal: string = "service";
  private searchStr: string = "";
  private conditionNameList: Array<any> = [
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
        getHeaderContent: "gmt_create",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("service", item),
        getHeaderContent: "service",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("sql_text", item),
        getHeaderContent: "sql_text",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("sql_cnt", item),
        getHeaderContent: "sql_cnt",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("sql_delta", item),
        getHeaderContent: "sql_delta",
        tooltip: true
      },
      {
        getContent: (item: IProp) => this.getField("history", item),
        getHeaderContent: "history",
        tooltip: true,
        type: "slot",
        slotName: "history"
      }
    ]
  };
  mounted() {
    let _this = this;
    _this.queryList();
  }

  toggleTab(tab: IProp) {
    let _this = this;
    _this.currSelectTab = tab.value;
  }
  get itemList () {
    let _this =this;
    return _this.$store.state.db.sqlBind;
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
    SqlBindApi.queryList(_this.getCondition()).then((resp: IProp) => {
      _this
        .updateTableList({
          tableName: "sqlBind",
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
      normalFields = ["service", "sql_text", "sql_cnt", "sql_delta", "history"];
    if (normalFields.includes(field)) return item[field];
    if (field === "gmt_create")
      return formatDateTime(item[field], "yyyy-MM:dd hh:mm:ss");
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

  //查看历史
  watchHistroy(param: IProp) {}
}
</script>

