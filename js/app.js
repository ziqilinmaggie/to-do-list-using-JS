//problem: user interaction doesn't proovide desired result;
//solution:Add interactivity so the user can manage daily tasks


var taskInput = document.getElementById("new-task"); //new task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //complete-tasks

var createNewTaskElement = function(taskString){
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deletedButton = document.createElement("button");
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deletedButton.innerText ="Delete";
  deletedButton.className = "delete";
  label.innerText = taskString;
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deletedButton);
  
  return listItem;
}

//add a new task
var addTask = function(){
  var listItem = createNewTaskElement(taskInput.value);
  
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
  
  taskInput.value = "";
  
}

//edit an existing task
var editTask = function(){
console.log("edit");
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  
  if(containsClass){
      label.innerText = editInput.value;
  }else{
    editInput.value = label.innerText;
  }
  
  listItem.classList.toggle("editMode");
}

//delete an existing task
var deleteTask = function(){
console.log("delete");
  var listItem = this.parentNode;//"this" is checkbox
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//mark a task as complete
var taskCompleted = function(){
console.log("completed");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskIncomplete);
}

//mark a task as incomplete
var taskIncomplete = function(){
  console.log("incomplete");
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
    console.log("bind!");
    var checkBox =taskListItem.querySelector("input[type=checkbox]") ;
    var editButton =taskListItem.querySelector("button.edit");
    var deleteButton =taskListItem.querySelector("button.delete");
  //select it's children
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete addButton 
  deleteButton.onclick = deleteTask;
  //bind taskCompleted to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function(){
  console.log("AJAX request");
}

//set the click handler to the addTask function
//addButton.onclick = addTask; (won't work, use event listener)
//addButton.onclick = ajaxRequest;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


//cycle over incomleteTaskHolder ul list items
  for(var i=0; i<incompleteTasksHolder.children.length; i++){
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }
  //for each list item
    //bind event to list item's children (taskcompleted)
 
//cycle over comleteTaskHolder ul list items
  for(var i=0; i<completedTasksHolder.children.length; i++){
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }
  //for each list item
    //bind event to list item's children (taskIncompleted) 















