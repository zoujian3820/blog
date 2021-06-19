- new Vue
  ```javascript
    class Vue{
      constructor(options){
        this.$options = options
        this.$data = options.data
        observe(this.$data)
        proxy(this)
        new Compile(options.el, this)
      }
    }
  ```
  - observe
    ```javascript
      function observe(data) {
        if(typeof data != 'object' || data == null) {
           return
        }
      }
      class Observer {
        constructor(){
          
        }
      }
    ```
