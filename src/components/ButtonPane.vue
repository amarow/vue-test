<template>
  <el-row v-if="hasCommands(firstClassCommands) || hasCommands(secondClassCommands)" class="a-buttonbar">
      <el-col :span="searchInput?4:0" >
        <el-input placeholder="search" size="mini" v-model="searchText"></el-input>
      </el-col>
      <el-col :span="searchInput?20:24" class="a-buttons" >
          <el-dropdown v-if="hasCommands(secondClassCommands)" size="mini" @command="emitCommand">
            <el-button class="el-dropdown-link" size="mini" style="margin-right:4px;">More</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="command in secondClassCommands" :key="command.id" :command="command">{{command.label}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button v-for="command in firstClassCommands" :key="command.id" size="mini" @click="emitCommand(command)">{{command.label}}</el-button>
      </el-col>
    </el-row>
</template>

<script>
import {Command,HasCommands} from "../mixins/HasCommands.js";

export default {
  mixins:[HasCommands],
  props:[ "searchInput"],
  name: "ButtonPane",
  data() { 
    return {
      searchText:"",
    };
  },
  watch:{
    searchText:function(val ,oldVal) {
      this.$emit("searchChanged",this.searchText);
    }
  }
}
</script>

<style scoped>

  .a-buttons{
    text-align: end;
  }
  .el-button+.el-button{
    margin-left: 2px;
  }
  .a-buttonbar {
    padding: 2px;
    background: rgb(250,250,250);
  }
</style>

