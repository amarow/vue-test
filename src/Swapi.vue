<template>
  <el-container id="app" > 
    <el-main>
      <el-row>
          <list-pane
            height="400"
            :table="table"
            :searchAble="true"
            :columns="listerConfig.columns"
            :commands="listerConfig.comands"
            @selectionChanged="listSelectionChanged"
            @emitCommand="handleCommand"
            ref="myListPane"
          />
          <edit-pane
            labelPosition="right"
            labelWidth="7em"
            :gutter=15
            :inputs="editorConfig.inputs"
            :commands="editorConfig.commands"
            :model="person"
            @emitCommand="handleCommand"
            ref="myEditPane"
          />
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import ListPane from "./components/ListPane.vue";
import EditPane from "./components/EditPane.vue";
import { FormFactory } from "./factories/FormFactory";
import { CommandFactory } from "./factories/CommandFactory";
import { ColumnFactory } from "./factories/ColumnFactory";
import axios from 'axios';


var form = new FormFactory(4).defaultBottomSpace("8px").allLabelEndWithColon();
var command = new CommandFactory();
var column = new ColumnFactory();

class Person{
  constructor(){
    this.name="NEW";
    this.birth_date="";
    this.gender="";
    this.hair_color="";
    this.eye_color="";
  }
}

export default {
  name: "app",
  data() {
    return {
      person: new Person(),
      table: [],

      // *******  Lister Configuration ***********/
      listerConfig:{
        columns:[
          column.create("Name").alignCenter().build(),
          column.create("Birth Year","birth_year").build(),
          column.create("Gender").build(),
          column.create("Hair Color","hair_color").build(),
          column.create("Eye Color","eye_color").build(),
        ],
        comands:[
          command.create("Copy").callback(()=>this.$refs.myListPane.copySelectedRow()).build(),
          command.create("Delete").callback(()=>this.$refs.myListPane.deleteSelectedRow()).build(),
          command.create("New").secondClass().callback(()=>this.$refs.myListPane.addRow(new Person())).build()
        ]
      }, 

      // *******  Editor Configuration ***********/
      editorConfig :{
        inputs: [
          form.newRow(),
          form.space().bottomSpace("10px").build(),
          form.newRow(),
            form.textInput("name").span(4).build(),
            form.textInput("gender").span(4).build(),
          form.newRow(),
            form.textInput("hair_color").span(4).build(),
            form.textInput("eye_color").span(4).build(),
          form.newRow(),
            form.textInput("birth_year").span(4).build(),
        ],
        commands: [
          command.create("Load").callback(this.loadPeople).build(),
        ],
      },
    };
  },
  methods: {
    handleCommand: function(command) {
      command.execute({ 
        selection:this.person, 
        table:this.table
        });
    },
    listSelectionChanged: function(selection) {
      this.person = selection ? selection : new Person();
    },
		loadPeople() {
      axios.get('https://swapi.co/api/people/?format=json')
      .then((response)=>{
        this.table = response.data.results;
      })
      .catch((error)=>{
        this.$notify.error({ title: 'Error', message: 'error callin SWAPI:'+error });
      })  
		}
  },
  components: {
    ListPane,
    EditPane
  }
};
</script>

<style>
.el-select-dropdown__item{
    font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.el-popover{
    font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.el-date-picker {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.el-dropdown-menu__item {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
}
#app {
  height: 900px;
  background: rgb(250, 250, 250);
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
