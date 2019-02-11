<template>
  <div class="a-listpane" :style="'width:'+width">
    <button-pane
      v-if="commands"
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
  </div>
</template>


<script >
import ButtonPane from "./ButtonPane.vue";
import HasSelection from "../mixins/HasSelection.js";
import {HasCommands} from "../mixins/HasCommands.js";

export default {
  mixins:[HasSelection,HasCommands],
  props: ["table", "columns", "height","width","searchAble","filterText"],
  name: "ListPane",
  data() {
    return {
      searchText: null,
    };
  },
  methods: {
    cellFormatter:function name(row, col,val,i) {
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
  }
}
</script>


<style >
.el-table .cell {
  line-height: 15px;
}
</style>