document.addEventListener("DOMContentLoaded", () => {
    //Button adds new task
    const addButton = document.querySelector("#addBtn");
    //Task input field
    const addInput = document.querySelector("#task");

    //SVG icons for buttons
    const removeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"/></svg>` ;
    const completeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>` ;
    
    //Add task to the to do list if text is present
    addButton.addEventListener("click", function(){
        let newTask = document.getElementById("task").value;
        //If the input field is NOT empty then
        if(newTask){
            //Adds task to Todo List
            addTaskTodo(newTask);
            //Reset input field
            document.getElementById("task").value = "";
        }
    });
    
    //If user presses enter on input field, add task to Todo List
    addInput.addEventListener("keypress", function(e){
        if (13 === e.keyCode){
            let newTask = document.getElementById("task").value;

            if(newTask){
                //Same as above, see Line 24
                addTaskTodo(newTask);
                document.getElementById("task").value = "";
            }
        }
    });

    function addTaskTodo(text){
        //This is where our tasks will go
        let list = document.getElementById("todo");
        //Create a new list item for the task
        let task = document.createElement("li");
        //Set the inner text of the new task to what the user put in the input field
        task.innerText = text;
        
        //cContainer for the buttons (complete/delete) for new task
        let buttons = document.createElement("div");
        buttons.classList.add("buttons")

        // Create complete and delete buttons
        let remove = document.createElement("button");
        remove.classList.add('remove');
        remove.innerHTML = removeSVG;
        remove.addEventListener("click", removeTask);

        let complete = document.createElement("button");
        complete.classList.add("complete");
        complete.innerHTML = completeSVG;
        complete.addEventListener("click", completeTask);

        buttons.appendChild(remove);
        buttons.appendChild(complete);

        task.appendChild(buttons);
        task.classList.add("list-item")

        list.insertBefore(task, list.childNodes[0]);
    }

    function completeTask(){
        //Grab the 'li' (button-> div -> li)
        let task = this.parentNode.parentNode;
        //Grab the 'ul' (li -> ul)
        let parent = task.parentNode;
        //Grab the parent (ul) id
        let parentID = parent.id;

        //Ternary operator format: (condition) ? expressionIfTrue : expressionIfFalse
        //If the parent's ('ul') id is todo, complete the task. If id is completed, re-add to todo list.
        let target = (parentID === "todo") ? document.getElementById("completed") : document.getElementById("todo");
        parent.removeChild(task);
        target.insertBefore(task, target.childNodes[0]);
    }

    function removeTask(){
        let task = this.parentNode.parentNode;
        let parent = task.parentNode;

        parent.removeChild(task);
    }
});