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
            completedCount(){
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
        methods: {
            addTodoItem(event) {

                if (!this.newTodoItem) {
                    return;
                }

                this.todoItems.unshift({
                    title: this.newTodoItem,
                    completed: false,
                    edited: false
                })
                this.newTodoItem = '';
            },
            removeTodoItem(item) {
                var index = this.todoItems.indexOf(item);
                this.todoItems.splice(index, 1);
            },
            removeCompletedItems() {
                this.todoItems = this.todoItems.filter(item => !item.completed);
            },
            cancelEditItem(item) {
                item.edited = false;
            },
            doneEditItem(item,index) {
                item.edited = false;

            },
            editTodoItem(item) {
                item.edited = true;
            }

        }
    });

})();