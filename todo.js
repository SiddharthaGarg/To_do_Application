// fetching through json text api
// if (localStorage.getItem('todos') == null)
// {
//     let p =  fetch("https://jsonplaceholder.typicode.com/todos");
//     p.then((value) => {
//         // console.log(value.status);
//         // console.log(value.ok);
//         return value.json();
//     }).then((data)=>
//     {
//         // console.log(data);
//          localStorage.setItem('todos', JSON.stringify(data));
//     })
// }

window.addEventListener("load", (e) => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  activity_logs = JSON.parse(localStorage.getItem("activity_logs")) || [];

  const add_task = document.querySelector(".add_task");
  const add_tags = document.querySelector(".add_tags");
  const view_backlogs = document.querySelector(".view_backlogs");

  const filter_priority = document.querySelector(".filter_priority");
  const filter_category = document.querySelector(".filter_category");
  const filter_duedate = document.querySelector(".filter_duedate");
  const sort_type = document.querySelector(".sort_type");

  let tag_list = [];

  add_tags.addEventListener("click", (e) => {
    const tag_value = document.querySelector(".tags").value;
    tag_list.push(tag_value);
    document.querySelector(".tags").value = "";
  });

  add_task.addEventListener("click", (e) => {
    // console.log("add the new task");
    const categories = document.querySelector(".categories");
    const category_value = categories.options[categories.selectedIndex].value;
    const priorities = document.querySelector(".priority");
    const priority_value = priorities.options[priorities.selectedIndex].value;
    const due_date_value = document.querySelector(".due_date").value;

    if (document.querySelector("input").value !== "") {
      const todo = {
        userId: 1,
        // id: 1000,
        title: document.querySelector("input").value,
        completed: false,
        category: category_value,
        priority: priority_value,
        due_date: due_date_value,
        task_tags: tag_list,
      };

      const a_log = {
        userId: 1,
        timestamp: getDateTime(),
        type: "task_added",
        details: document.querySelector("input").value,
      };

      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));

      document.querySelector("input").value = "";
      filter_priority.value = "All";
      filter_category.value = "All";
      filter_duedate.value = "";
      sort_type.value = "None";

      tag_list = [];
      DisplayTodos();
    }
  });

  let priority_filter_value = "All";
  let category_filter_value = "All";
  let duedate_filter_value = "";
  filter_priority.addEventListener("change", (e) => {
    priority_filter_value = e.target.value;

    Filter(priority_filter_value, category_filter_value, duedate_filter_value);
  });

  filter_category.addEventListener("change", (e) => {
    category_filter_value = e.target.value;
    Filter(priority_filter_value, category_filter_value, duedate_filter_value);
  });

  filter_duedate.addEventListener("change", (e) => {
    duedate_filter_value = e.target.value;
    console.log(duedate_filter_value.type);
    Filter(priority_filter_value, category_filter_value, duedate_filter_value);
  });

  sort_type.addEventListener("change", (e) => {
    const sort_value = sort_type.options[sort_type.selectedIndex].value;
    Display_sorted_todos(sort_value);
  });

  view_backlogs.addEventListener("click", (e) => {
    // const tasks_container = document.querySelector(".tasks_container");
    //  tasks_container.style.display = 'none';
    DisplayBacklogs();

    const go_back = document.querySelector(".go_back");
    go_back.addEventListener("click", (e) => {
      // const backlogs_container = document.querySelector(".backlogs_container");
      // backlogs_container.style.display = 'none';
      //  tasks_container.style.display = 'flex';
      DisplayTodos();
    });
  });

  //Search functionality

  const search_bar = document.querySelector(".search_bar");
  search_bar.addEventListener("input", (e) => {
    console.log(e.target.value);
    const searchString = e.target.value;
    DisplaySearchItems(searchString);
  });

  DisplayTodos();
});

// function RenderBacklogs()
// {
//     const backlogs_container = document.querySelector(".backlogs_container");
//     backlogs_container.innerHTML = '';

//     backlogs_container.style.display = 'flex';
//     todos.forEach(todo => {
//         if (!todo.completed) {
//             const task_item = document.createElement("div");

//             const task_content = document.createElement("div");

//             const features = document.createElement("div");
//             const details = document.createElement("div");

//             const category = document.createElement("div");
//             const priority = document.createElement("div");
//             const due_date = document.createElement("div");

//             const tags = document.createElement("div");

//             task_item.classList.add("task_item");
//             task_content.classList.add("task_content");
//             features.classList.add("features");
//             details.classList.add("details");
//             tags.classList.add("tags");

//             task_content.innerHTML = `<input type ="text" value = "${todo.title}" readonly>`;

//             category.innerHTML = todo.category;
//             priority.innerHTML = todo.priority;
//             due_date.innerHTML = todo.due_date;

//             let tags_list = [];
//             tags_list = todo.task_tags;
//             tags_list.forEach((tag) => {
//                 const tag_value = document.createElement("span");
//                 tag_value.innerHTML = "# " + tag;
//                 tags.appendChild(tag_value);
//             })

//             details.appendChild(category);
//             details.appendChild(priority);
//             details.appendChild(due_date);

//             features.appendChild(details);
//             features.appendChild(tags);

//             task_item.appendChild(task_content);
//             task_item.appendChild(features);

//             backlogs_container.appendChild(task_item);
//         }

//     })

//     const go_back = document.createElement("button");
//             go_back.type = "button";
//             go_back.classList.add("go_back");
//             go_back.innerHTML = "Go Back";
//             backlogs_container.appendChild(go_back);

// }
function getDateTime() {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  return dateTime;

  // console.log(dateTime)
}
function helper(todo, todoList) {
  // console.log(todo.category);
  // console.log(todo.priority);
  // console.log(todo.due_date);
  // console.log(todo.task_tags);

  const task_item = document.createElement("div");
  task_item.setAttribute("class", "task_item");

  const checkbox = document.createElement("label");
  const input = document.createElement("input");
  const task_content = document.createElement("div");
  const features = document.createElement("div");

  const actions = document.createElement("div");
  const edit_task = document.createElement("button");
  const delete_task = document.createElement("button");
  const add_sub_task = document.createElement("button");

  const details = document.createElement("div");
  const category = document.createElement("div");
  const priority = document.createElement("div");
  const due_date = document.createElement("div");

  const tags = document.createElement("div");

  checkbox.classList.add("is_task_completed");
  task_content.classList.add("task_content");
  features.classList.add("features");
  details.classList.add("details"); // another way to assign class to an element
  actions.classList.add("actions");
  edit_task.classList.add("edit_task");
  delete_task.classList.add("delete_task");
  add_sub_task.classList.add("add_sub_task");
  tags.classList.add("tags");

  input.type = "checkbox";
  input.checked = todo.completed;

  task_content.innerHTML = `<input type ="text" value = "${todo.title}" readonly>`;
  category.innerHTML = todo.category;
  priority.innerHTML = todo.priority;
  due_date.innerHTML = todo.due_date;
  edit_task.innerHTML = "Edit";
  delete_task.innerHTML = "Delete";
  add_sub_task.innerHTML = "+";

  let tags_list = [];
  tags_list = todo.task_tags;
  // if (tags_list != undefined)
  // {
  tags_list.forEach((tag) => {
    const tag_value = document.createElement("span");
    tag_value.innerHTML = "# " + tag;
    tags.appendChild(tag_value);
  });
  //  }

  checkbox.appendChild(input);
  task_item.appendChild(checkbox);
  task_item.appendChild(task_content);

  actions.appendChild(edit_task);
  actions.appendChild(delete_task);
  actions.appendChild(add_sub_task);
  task_item.appendChild(actions);

  details.appendChild(category);
  details.appendChild(priority);
  details.appendChild(due_date);

  features.appendChild(actions);
  features.appendChild(details);
  features.appendChild(tags);
  task_item.appendChild(features);

  todoList.appendChild(task_item);

  if (todo.completed) {
    task_item.classList.add("task_completed");
  }

  input.addEventListener("click", (e) => {
    todo.completed = e.target.checked;
    localStorage.setItem("todos", JSON.stringify(todos));
    if (todo.completed) {
      // backlogs.remove(todo);
      task_item.classList.add("task_completed");
    } else {
      // backlogs.push(todo);
      task_item.classList.remove("task_completed");
    }
    // DisplayTodos();
  });

  edit_task.addEventListener("click", (e) => {
    // console.log('Edit task');
    const input = task_content.querySelector("input");
    input.removeAttribute("readonly");
    input.focus();
    input.addEventListener("blur", (e) => {
      todo.title = e.target.value;
      e.target.setAttribute("readonly", true);
      localStorage.setItem("todos", JSON.stringify(todos));

      //  DisplayTodos();
    });
  });

  // delete_task.addEventListener('click', e => {
  //     todos = todos.filter(t => {
  //         return t != todo;
  //     })
  //     localStorage.setItem("todos", JSON.stringify(todos));
  //     DisplayTodos();
  // })

  // if (!todo.completed) {
  //     backlogs.push(todo);
  // }

  return delete_task;
}

function DisplaySearchItems(searchString) {
  const todoList = document.querySelector(".tasks_container");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    // let found = false;

    if (
      todo.title.includes(searchString) ||
      todo.task_tags.includes(searchString, 0)
    ) {
      const delete_task = helper(todo, todoList);
      delete_task.addEventListener("click", (e) => {
        console.log("delete task");
        todos = todos.filter((t) => {
          return t != todo;
        });
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplaySearchItems(searchString);
      });
    }
  });
}
function DisplayBacklogs() {
  const todoList = document.querySelector(".tasks_container");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    if (!todo.completed) {
      const delete_task = helper(todo, todoList);

      // const delete_task = document.querySelector(".delete_task");
      delete_task.addEventListener("click", (e) => {
        console.log("delete task");
        todos = todos.filter((t) => {
          return t != todo;
        });
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayBacklogs();
      });

      // if (!todo.completed)
      // {
      //     backlogs.push(todo);
      //  }
    }
  });

  const go_back = document.createElement("button");
  go_back.type = "button";
  go_back.classList.add("go_back");
  go_back.innerHTML = "Go Back";
  todoList.appendChild(go_back);

  go_back.addEventListener("click", (e) => {
    // const backlogs_container = document.querySelector(".backlogs_container");
    // backlogs_container.style.display = 'none';
    //  tasks_container.style.display = 'flex';
    DisplayTodos();
  });
}

function Filter(
  priority_filter_value,
  category_filter_value,
  duedate_filter_value
) {
  // console.log("filter applied : " + priority_filter_value + " " + category_filter_value + " " + duedate_filter_value);

  const todoList = document.querySelector(".tasks_container");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    let priority = priority_filter_value;
    let category = category_filter_value;
    let due_date = duedate_filter_value;
    if (priority_filter_value == "All") priority = todo.priority;
    if (category_filter_value == "All") category = todo.category;
    if (duedate_filter_value == "") due_date = todo.due_date;
    if (
      todo.priority == priority &&
      todo.category == category &&
      todo.due_date <= due_date
    ) {
      const delete_task = helper(todo, todoList);

      // const delete_task = document.querySelector(".delete_task");
      delete_task.addEventListener("click", (e) => {
        console.log("delete task");
        todos = todos.filter((t) => {
          return t != todo;
        });
        localStorage.setItem("todos", JSON.stringify(todos));
        Filter(priority_filter_value);
      });
    }
  });
}

function Display_sorted_todos(sort_value) {
  if (sort_value == "None") {
    DisplayTodos();
  } else {
    console.log("sorting applied");
    const todoList = document.querySelector(".tasks_container");
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      if (todo.priority == "High") {
        const delete_task = helper(todo, todoList);
        delete_task.addEventListener("click", (e) => {
          console.log("delete task");
          todos = todos.filter((t) => {
            return t != todo;
          });
          localStorage.setItem("todos", JSON.stringify(todos));
          Display_sorted_todos(sort_value);
        });
      }
    });
    todos.forEach((todo) => {
      if (todo.priority == "Medium") {
        const delete_task = helper(todo, todoList);
        delete_task.addEventListener("click", (e) => {
          console.log("delete task");
          todos = todos.filter((t) => {
            return t != todo;
          });
          localStorage.setItem("todos", JSON.stringify(todos));
          Display_sorted_todos(sort_value);
        });
      }
    });
    todos.forEach((todo) => {
      if (todo.priority == "Low") {
        const delete_task = helper(todo, todoList);
        delete_task.addEventListener("click", (e) => {
          console.log("delete task");
          todos = todos.filter((t) => {
            return t != todo;
          });
          localStorage.setItem("todos", JSON.stringify(todos));
          Display_sorted_todos(sort_value);
        });
      }
    });
  }
}
function DisplayTodos() {
  // backlogs = [];
  const todoList = document.querySelector(".tasks_container");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const delete_task = helper(todo, todoList);

    // const delete_task = document.querySelector(".delete_task");
    delete_task.addEventListener("click", (e) => {
      console.log("delete task");
      todos = todos.filter((t) => {
        return t != todo;
      });
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });

    // if (!todo.completed)
    // {
    //     backlogs.push(todo);
    //  }
  });
}
