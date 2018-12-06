(function () {

    new Vue({
        el: "#todo-app",
        data: {
            newTodoItem: '',
            todoItems: []
        },
        computed: {
            //未完成的数量
            activeCount() {
                return this.todoItems.filter(item => !item.completed).length;
            },
            //已完成数量
            completedCount() {
                return this.todoItems.filter(item => item.completed).length;
            },
            showTodo() {
                return this.todoItems.length > 0;
            },
            allDone: {
                get() {
                    return this.activeCount === 0;
                },
                set(value) {
                    console.info(value)
                    this.todoItems.map(item => {
                        item.completed = value
                    })
                }
            }
        },
        created: function () {
            this.initData();
        },
        methods: {
            initData() {
                var that = this;
                axios.get('http://localhost:8080/springboot/items/')
                    .then(response => {this.todoItems = response.data});
            },
            updateData() {
                axios.post('http://localhost:8080/springboot/items/update',this.todoItems)
                .then();
            },
            deleteData(item) {
                axios.post('http://localhost:8080/springboot/items/delete',item)
                .then();
            },
            addTodoItem(event) {
                if (!this.newTodoItem) {
                    return;
                }
                this.todoItems.unshift({
                    title: this.newTodoItem,
                    completed: false,
                    edited: false
                })
                // this.updateData();
                this.newTodoItem = '';
            },
            removeTodoItem(item) {
                var index = this.todoItems.indexOf(item);
                this.todoItems.splice(index, 1);
                axios.post('http://localhost:8080/springboot/items/delete',item)
                .then();
            },
            removeCompletedItems() {
                this.todoItems = this.todoItems.filter(item => !item.completed);
            },
            cancelEditItem(item) {
                item.edited = false;
            },
            doneEditItem(item, index) {
                item.edited = false;
                this.updateData();

            },
            editTodoItem(item) {
                item.edited = true;
            }

        },
        // 指令集合
        directives: {
            focus: {
                update(el) {
                    el.focus()
                }
            }
        },
        // 属性观察
        
        watch: {
            /*
            todoItems: {
                deep: true,
                handler(newValue, oldValue) {
                axios.post('http://localhost:8080/springboot/items/update',newValue)
                .then();
            　}
            }
            */
            completedCount: {
            handler(newValue, oldValue) {
                axios.post('http://localhost:8080/springboot/items/update',this.todoItems)
                .then();
            　}
            }
        }
    
        });

})();