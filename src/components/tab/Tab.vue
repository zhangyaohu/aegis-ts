<template>
  <div class="mh-tab">
    <span
      v-for="(tab, index) in tabs"
      class="mh-tab__item"
			:class="{'active': currTab === tab.value}"
      @click="handleTabClick(tab)"
      :ref="`tab-pane_${tab.value}`"
      :key="index"
    >{{tab.label}}</span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
interface IProp {
  [key: string]: any
}
@Component({})
export default class Tab extends Vue {
  private currTab: string = ''

  @Prop()
  tabs?: Array<any>
  @Prop({required: true, default: ''})
  value?: string
  @Prop({default: 'top'})
  type?: string

    handleTabClick(tab: IProp) {
      let _this = this;
      _this.$emit("tab-click", tab);
    }

  @Watch('value', {immediate: true})
  function(newVal: any, oldVal: any) {
    if (newVal === oldVal) return;
    this.currTab = newVal;
  }

}
</script>
