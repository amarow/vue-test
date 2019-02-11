export var HasCommands = {
  props: ["commands"],
  methods:{
    emitCommand:function(command) {
      this.$emit("emitCommand",command);
    },
    hasCommands: function (commands) {
      return commands && commands.length > 0 ;
    },
  },
  computed: {
    secondClassCommands:function() {
      return this.commands.filter(data => data.secondClassCommand);
    },  
    firstClassCommands:function() {
      return this.commands.filter(data => !data.secondClassCommand);
    }  
  },
}
