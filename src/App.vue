<template>
  <el-container id="app" > 
    <el-aside width="200px" style="background-color: rgb(240, 240, 240)">
    <el-menu >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>Navigator One</template>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-setting"></i>Navigator Two</template>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>Navigator Three</template>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <!-- <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Tom</span>
    </el-header>
   -->
    <el-main>
      <el-row>
        <!-- <el-col :span="14"> -->
          <list-pane
            height="400"
            :table="table"
            :searchAble="true"
            :columns="listerConfig.columns"
            :commands="listerConfig.comands"
            @selectionChanged="listSelectionChanged"
            @emitCommand="handleCommand"
          />
        <!-- </el-col> -->
        <!-- <el-col :span="10"> -->
          <edit-pane
            labelPosition="right"
            labelWidth="7em"
            :gutter=15
            :inputs="editorConfig.inputs"
            :commands="editorConfig.commands"
            :model="person"
            @emitCommand="handleCommand"
          />
        <!-- </el-col> -->
      </el-row>
    </el-main>
  </el-container>
  </el-container>
</template>

<script>
import ListPane from "./components/ListPane.vue";
import EditPane from "./components/EditPane.vue";
import { Person, PersonService } from "./model/Person.js";
import { AdressService } from "./model/Adress.js";
import { FormFactory } from "./factories/FormFactory";
import { CommandFactory } from "./factories/CommandFactory";
import { ColumnFactory } from "./factories/ColumnFactory";


var form = new FormFactory(4).defaultBottomSpace("8px").allLabelEndWithColon();
var command = new CommandFactory();
var column = new ColumnFactory();

export default {
  name: "app",
  data() {
    return {
      person: new Person(),
      table: new PersonService().createPersons(100),

      // *******  Lister Configuration ***********/
      listerConfig:{
        columns:[
          column.create("Id").alignCenter().build(),
          column.create("First").build(),
          column.create("Second").build(),
          column.create("Paid").alignRight().build(),
          column.create("Nickname").build(),
          column.create("City").build(),
          column.create("Birthday").type('date').build()
        ],
        comands:[
          command.create("Copy").callback(args=>{
            args.table.splice(args.table.indexOf(args.selection),0,args.selection.copy(),)
           }).build(),
           command.create("Delete").callback(args=>{
             args.table.splice(args.table.indexOf(args.selection),1);
           }).build(),
           command.create("New").secondClass().callback(args=>{
             args.table.splice(args.table.indexOf(args.selection),0,new Person());
           }).build()
        ]
      }, 

      // *******  Editor Configuration ***********/
      editorConfig :{
        inputs: [
          form.newRow(),
          form.space().bottomSpace("10px").build(),
          form.newRow(),
            form.textInput("Id").span(4).build(),
            form.checkbox("Male").span(2).build(),
            form.dateInput("Date of Birth", "birthday").build(),
          form.newRow(),
            form.hr("Adress").span(24).build(),
            form.textInput("First").build(),
            form.lookup("Second")
                      .columns([column.create("Id").alignCenter().sort(false).build(), 
                                column.create("First").sort(false).build(),
                                column.create("Second").sort(false).build()])
                      .table( new PersonService().createPersons(10) ).build(),
          form.newRow(),
            form.textInput("City").build(),
            form.textInput("Street").build(),
            form.textInput("Country").build(),
          form.hr("Other").span(24).build(),
            form.textInput("Income", "paid").build(),
          form.newRow(),
            form.selectInput("Nickname")
                    .table( new PersonService().createPersons(10) ).build(),
            form.selectInput("Adress")
                    .table( new AdressService().createAdresses(10) ).build(),
          form.newRow(),
            form.textArea("Comment").span(24).build(),

        ],
        commands: [
          command.create("Save").build(),
          command.create("Send").build(),
          command.create("Edit").secondClass().build()
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
