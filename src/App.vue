<template>
<el-container id="app">
   <el-header id="header">
     <img src="background.png" width="100%"/>
     <p style="position: absolute; top: -5px; left: 40px; color:red; font-size:25px">dbh</p>
   </el-header>
   <el-main>
<el-tabs >
    <el-tab-pane label="Star Wars API" ><swapi/></el-tab-pane>
    <el-tab-pane label="Locale Persons" ><person/></el-tab-pane>
  </el-tabs>
   </el-main>
</el-container>
</template>

<script>
   import person from './Person.vue';
   import swapi from './Swapi.vue'

  export default {
  name: 'App',
  components: {
    person,
    swapi,
  }
}
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
  height: 910px;
  background: rgb(250, 250, 250);
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#header{
  overflow: hidden;
}
</style>

