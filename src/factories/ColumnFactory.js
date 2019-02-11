export class ColumnConfig{
    constructor(){
      this.label;
      this.key;
      this.type;
      this.sortAble;
      this.resizeAble;
      this.align;
    }
  }


  export class ColumnFactory{
    constructor(){
        this.column=null;
        this.allResizeAble=true;
        this.allSortAble=true;
    }

    create(label, key=label.toLowerCase()){
        this.getColumn().label=label;
        this.getColumn().key=key;
        this.getColumn().type='text';
        return this;
    }   
    sort(val){
        this.getColumn().sortAble=val;
        return this;
    }   
    type(type){
        this.getColumn().sortAble=type;
        return this;
    }   
    alignCenter(){
        this.getColumn().align='center';
        return this;
    }   
    alignRight(){
        this.getColumn().align='right';
        return this;
    }   
    resize(){
        this.getColumn().resizeAble=true;
        return this;
    }   
    build(){
        let ret = this.column;
        this.column = null;
        return ret; 
    }

    allResizeAble(val){
        this.allResizeAble=val;
        return this;
    }
    allSortAble(val){
        this.allSortAble=val;
        return this;
    }
    getColumn(){
        if(!this.column){
            this.column = new ColumnConfig();
            this.column.resizeAble = this.allResizeAble;
            this.column.sortAble = this.allSortAble;
        } 
        return this.column;
    }
 }
 