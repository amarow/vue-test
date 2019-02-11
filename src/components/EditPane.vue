<template>
<div :style="'width:'+width">
  <el-form :label-position="labelPosition" :label-width="labelWidth" size="mini" :model="model">
   <el-row v-for="row in rows" :key="row.count" :gutter="gutter">
     <el-col v-for="input in row.inputs" :span="input.span" :offset="input.offset" :key="input.key">
      <el-form-item :label="input.label" :style="'margin-bottom:'+input.bottomSpace+';'" > 
        <el-input       v-if="input.type=='text'"         v-model="model[input.key]" :placeholder="input.placeHolder"/>
        <el-input       v-if="input.type=='area'"         v-model="model[input.key]" :placeholder="input.placeHolder" type="textarea"/>
        <el-checkbox    v-else-if="input.type=='boolean'" v-model="model[input.key]" :placeholder="input.placeHolder"/>
        <proxy-field    v-else-if="input.type=='lookup'"  v-model="model[input.key]" :placeholder="input.placeHolder" :table="input.table" :columns="input.columns"/>
        <el-date-picker v-else-if="input.type=='date'"    v-model="model[input.key]" :placeholder="input.placeHolder" style="width:100%;"/>
        <el-select      v-else-if="input.type=='select'"  v-model="model[input.key]" :placeholder="input.placeHolder" filterable style="width:100%;">
          <el-option v-for="row in input.table" :key="input.table.indexOf(row)" :label="row.guiRep()" :value="row.guiRep()" ></el-option>
        </el-select> 
        <hr             v-else-if="input.type=='hr'"  />
      </el-form-item>
     </el-col>
   </el-row> 
  </el-form>
  <button-pane :commands="commands" @emitCommand="emitCommand"/>  
</div>    
</template>

<script>
import ButtonPane from "./ButtonPane.vue";
import ProxyField from "./ProxyField.vue";
import {HasCommands} from "../mixins/HasCommands.js";

class Row{
  constructor(count){
   this.count=count;
   this.inputs=[];
  }
}

export default {
  mixins:[HasCommands],
  props:[ "model","inputs","labelPosition","labelWidth","gutter","width"],
  name: "EditPane",
  computed: {
    rows(){
      var rows = [];  var row = null
      for (let index = 0; index < this.inputs.length; index++) {
        const input = this.inputs[index];
        if (row == null || input.type=='row') {
           row = new Row(index);
           rows.push(row);
        } else {
          row.inputs.push(input);
        }
      }
      return rows;  
    }
  },
  components:{
      ButtonPane, 
      ProxyField
  }
}
</script>

<style >
.el-input__inner{
  padding: 0 5px;
}
hr{
    height: 2px;
    background-color: #ccc;
    border: none;
    margin: 0.85em auto;
}

</style>

