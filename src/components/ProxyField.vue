<template>
  <el-popover  placement="bottom" trigger="click" v-model="visible" visible-arrow="">
  <list-pane
      :table="table"
      :columns="columns"
      :filter-text="inputValue"
      @selectionChanged="listSelectionChanged"
    />
  <el-input slot="reference" v-model="inputValue" prefix-icon="el-icon-search" placeholder="search"/>
</el-popover>
</template>

<script>
import ListPane from "./ListPane.vue";

export default {
  props: ["table","columns","value"],
  name: 'ProxyField',
  data() {
    return {
      inputValue:null,
      visible: false,
    };
  },
  components: {
    ListPane
  },
  methods: {
    listSelectionChanged: function(selection) {
      if(selection){
        this.inputValue = selection.guiRep();
        this.visible = false;
      }
    },
  },
  watch:{
   inputValue:function(val ) {
     this.$emit("input",val);
   },
   value(value){
       this.inputValue=value;
   }
  }
}

</script>

<style>
  .el-popover{
    padding: 0px;
  }
</style>
