<template>
  <div class="a-listpane" :style="'width:'+width">
    <button-pane
      v-if="commands && !bottom_commands"
      :commands="commands"
      :searchInput="searchAble"
      @searchChanged="(value)=>{searchText=value}"
      @emitCommand="emitCommand"
    />
    <el-table
      :data="table.filter(row => filterBySearchText(row))"
      :height="height"
      size="mini"
      fit
      border
      highlight-current-row
      @current-change="setSelection"
      ref="tableView"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.key"
        :prop="column.key"
        :label="column.label"
        :resizable="column.resizeAble"
        :align="column.align"
        :sortable="column.sortAble"
        :formatter="cellFormatter"
      ></el-table-column>
    </el-table>
    <button-pane
      v-if="commands && bottom_commands"
      :commands="commands"
      :searchInput="searchAble"
      @searchChanged="(value)=>{searchText=value}"
      @emitCommand="emitCommand"
    />
  </div>
</template>


<script >
import ButtonPane from "./ButtonPane.vue";
import HasSelection from "../mixins/HasSelection.js";
import {HasCommands} from "../mixins/HasCommands.js";

export default {
  mixins:[HasSelection,HasCommands],
  props: ["table", "columns", "height","width","searchAble","bottom_commands","filterText"],
  name: "ListPane",
  data() {
    return {
      searchText: null,
    };
  },
  methods: {
    deleteSelectedRow(){
      if(this.selection==null) 
      return
      let index = this.table.indexOf(this.selection)
      this.table.splice(index,1);
      this.$refs.tableView.setCurrentRow(index);
    },
    copySelectedRow(){
      if(this.selection==null) 
      return
      let index = this.table.indexOf(this.selection)
      this.table.splice(index,0,Object.assign({}, this.selection));
    },
    addRow(row){
      let index = this.selection==null? 0 : this.table.indexOf(this.selection)
      this.table.splice(index,0,row);
    },
    cellFormatter:function name(row, col,val) {
      if(val instanceof Date){
        return val.toLocaleDateString();
      }
      return val;
    },
    filterBySearchText:function(row) {
      var pattern=this.filterText?this.filterText:this.searchText;
      if(!pattern) return true;
      var content;
      var found = false;
      pattern = pattern.toLowerCase();
      this.columns.forEach(col => {
           content = row[col.key];
           if(typeof(content)=='string'){
             if(content.toLowerCase().includes(pattern)){
               found=true;
               return;
             } 
           }  
      });
      return found;
    }
  },
  components:{
     ButtonPane
  },
}
</script>


<style >
.el-table .cell {
  line-height: 15px;
}
</style>