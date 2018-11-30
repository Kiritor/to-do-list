(function () {

    new Vue({
        el: "#todo-app",
        data: {
            newTodoItem: '',
            todoItems: [{
                title: '写博客',
                completed: true
            }]
        },
        computed: {
            //未完成的数量
            activeCount() {
                return this.todoItems.filter(item => !item.completed).length;
            },
            allDone: {
                get() {
                    return this.activeCount === 0;
                },
                set(value) {
                    console.info(this.todoItems)
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
                    completed: false
                })
                this.newTodoItem = '';
            },
            removeTodoItem(item) {
                var index = this.todoItems.indexOf(item);
                this.todoItems.splice(index, 1);
            }

        }
    });

})();