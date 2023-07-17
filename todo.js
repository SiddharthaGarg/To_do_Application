


    if (localStorage.getItem('todos') == null)
    {
        let p =  fetch("https://jsonplaceholder.typicode.com/todos");
        p.then((value) => {
            // console.log(value.status);
            // console.log(value.ok);
            return value.json();
        }).then((data)=>
        {   
            // console.log(data);
             localStorage.setItem('todos', JSON.stringify(data));
        })
    }
window.addEventListener('load', (e) => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const add_task = document.querySelector(".add_task");


        add_task.addEventListener('click', (e) => {
        // console.log("add the new task");
        if (document.querySelector("input").value !== "") {
            const todo = {
                userId: 1,
                id: 1000,
                title: document.querySelector("input").value,
                completed: false
            }
        
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));

            document.querySelector("input").value = "";
            DisplayTodos();
        }
        
    })
    
    DisplayTodos();
})


function DisplayTodos()
{   
    const todoList = document.querySelector(".tasks_container");
    todoList.innerHTML = '';
    todos.forEach(todo => {

        const task_item = document.createElement("div")
        task_item.setAttribute("class", "task_item");

        const task_content = document.createElement("div");
        const actions = document.createElement("div");
        const edit_task = document.createElement("button");
        const delete_task = document.createElement("button");

        task_content.classList.add("task_content");     // another way to assign class to an element
        actions.classList.add("actions");
        edit_task.classList.add("edit_task");
        delete_task.classList.add("delete_task");

        task_content.innerHTML = `<input type ="text" value = "${todo.title}" readonly>`;
        edit_task.innerHTML = "Edit";
        delete_task.innerHTML = "Delete";

        task_item.appendChild(task_content);
        actions.appendChild(edit_task);
        actions.appendChild(delete_task);
        task_item.appendChild(actions);

        todoList.appendChild(task_item);


        edit_task.addEventListener('click', e => {
            // console.log('Edit task');
            const input = task_content.querySelector("input");
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                todo.title = e.target.value;
                e.target.setAttribute("readonly",true);
                localStorage.setItem('todos', JSON.stringify(todos));
                 DisplayTodos();
            })
           
        })

        delete_task.addEventListener('click', e => {
            todos = todos.filter(t => {
                return t != todo;
            })
            localStorage.setItem("todos",JSON.stringify(todos));
            DisplayTodos();
        })

        
    });
    
}







