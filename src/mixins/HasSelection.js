var HasSelection = {
  data() { 
    return {
      selection:null,
    };
  },
  methods: {
    setSelection:function (selection) {
      this.selection = selection;
      this.$emit("selectionChanged",this.selection)
    },
    getSelection:function () {
      return this.selection;
    }
  }
}

export default HasSelection;
