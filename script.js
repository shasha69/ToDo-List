// Modularize js file using IIFE

var todoList= (function(){
    console.log("working");
    let tasks = [];
    const taskList = document.getElementById('list');
    const taskCounter = document.getElementById('task-counter');
    const addTakeInput = document.getElementById('add');
    
    // Getting data from server using Fetch API
    var a=10;
    async function fetchData() {
    
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            tasks = data.splice(0, 10);
            renderList()
        } catch (error) {
            console.log(error);
        }
    
    
    
    
        // fetch('https://jsonplaceholder.typicode.com/todos')
        // .then(function(response){
        //     return response.json();
        // }).then(function(data){
        //     tasks=data.splice(0, 10);
        //     renderList();
    
        // }).catch(function(error){
        //     console.log('error', error);
        // })
    
    }
    
    // Delete task funtion to delete element
    
    function deleteTask(taskId) {
    
        let newTasks = tasks.filter(function (task) {
            return task.id !== Number(taskId);
        });
    
        tasks = newTasks;
        renderList();
        showNotification('task deleted successfully');
    
    };
    
    // Add function to add task
    
    function addTask(task) {
        if (task) {
    
            // fetch('https://jsonplaceholder.typicode.com/todos',{
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(task),
            // })
            //     .then(function (response) {
            //         return response.json();
            //     }).then(function (data) {
            //         tasks.push(task);
            //         renderList();
            //         showNotification('task added succesafully');
    
            //     }).catch(function (error) {
            //         console.log('error', error);
            //     })
    
            tasks.push(task);
            renderList();
            showNotification('task added succesafully');
            return;
        }
        showNotification('tast not added successfully')
    }
    
    // Mark as completed function to show task is completed or not
    
    function markTaskAscompleted(taskId) {
        const task = tasks.filter(function (task) {
            return task.id === Number(taskId);
        });
    
        if (task.length > 0) {
            const currTask = task[0];
    
            currTask.completed = !currTask.completed;
            renderList();
            showNotification('task completed successfully');
            return;
        }
        showNotification('could not completed the task');
    }
    
    // Add to Dom function to show data on the web page
    
    function addTaskToDom(task) {
        const li = document.createElement('li');
    
        li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
            <label for="${task.id}">${task.title}</label>
            <img src="media/icons8-remove-50.png" class="delete" data-id="${task.id}" />
            `;
    
        taskList.append(li);
    }
    
    // Render function to render whole data after add or delete or complete task
    
    function renderList() {
    
        taskList.innerHTML = "";
    
        for (let i = 0; i < tasks.length; i++) {
            addTaskToDom(tasks[i]);
        }
    
        taskCounter.innerHTML = tasks.length;
    };
    
    // Notification function to show alerlt on web to add or deleted a task
    
    function showNotification(title) {
        alert(title);
    }
    
    // Handle input funtion for manage the user input 
    
    function handleInputPress(e) {
        if (e.key === 'Enter') {
            const title = e.target.value;
            // console.log("title", title);
    
            if (!title) {
                showNotification('task title can not be empty');
                return;
            }
    
            const task = {
                title,
                id: Date.now(),
                completed: false
            }
    
    
            e.target.value = '';
            addTask(task);
        }
    }
    
    // event listener for click on web page
    
    function handleEventListner(e) {
    
        const target = e.target;
        console.log(target);
    
        if (target.className === 'delete') {
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        }
        else if (target.className === 'custom-checkbox') {
            const taskId = target.id;
            markTaskAscompleted(taskId);
            return;
        }
    }
    
    function intializeApp() {
        fetchData();
        document.addEventListener('click', handleEventListner);
        addTakeInput.addEventListener('keyup', handleInputPress);
    }
    // initializing function for first time
    intializeApp();
    return{
        initialize: intializeApp,
        a:a
    }

})()





