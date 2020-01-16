import { Events } from "./eventPubSub";
import { LocaLStorageController } from "./localStorageController";

const FormGenerator = (function() {
  // cache DOM
  let body = document.querySelector("body");
  let createNewProjectButton = document.querySelector(".create-new-project-btn");
  createNewProjectButton.addEventListener("click", createNewProject);
  
  let toDoItemsSection = document.querySelector(".list-of-todo-items");
  toDoItemsSection.addEventListener("click", createToDoItem);

  Events.on("createEditTaskForm", createEditToDoItemForm);

  function createToDoItem(e) {
    if (e.target.classList.contains("create-new-todo-item-btn")) {
      if (document.getElementById("to-do-item-form") === null) {
        createToDoItemForm();
      }
    }
  }

  function createNewProject() {
    createModalForm();
  }
  
  function createModalForm() {
    // Create background
    let background = document.createElement("div");
    background.classList.add("modalFormBackground");
    body.style.overflow = "hidden";
    body.appendChild(background);
  
    // Create form
    let form = document.createElement("form");
    createInput("text", "project-name", "project-name", "Project Name");
  
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("btnContainer");
  
    // Create button
    let addProjectBtn = document.createElement("button");
    addProjectBtn.textContent = "Create";
    addProjectBtn.type ="submit";
    addProjectBtn.style.marginRight = "5px";
    btnContainer.appendChild(addProjectBtn);
  
    // Cancel button
    let cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.type = "button";
    cancelBtn.style.marginLeft = "5px";
    btnContainer.appendChild(cancelBtn);
    btnContainer.style.textAlign = "right";
  
    form.appendChild(btnContainer);
    
    background.appendChild(form);
  
    // Event Listener to create Project
    addProjectBtn.addEventListener("click", createProject);

    // Cancel out of form
    cancelBtn.addEventListener("click", removeModalForm);
  
    function createProject(e) {
      e.preventDefault();
      let projectName = document.querySelector("#project-name").value;

      // check valid input data
      if (!(projectName === "" || projectName.search(/^\s*$/) === 0)) {
        // create a new Project
        Events.emit("projectCreated", projectName);
        removeModalForm();
        addProjectBtn.removeEventListener("click", createProject);
      }
    }

    function removeModalForm() {
      body.removeChild(background);
      body.style.overflow = "visible";
      cancelBtn.removeEventListener("click", removeModalForm);
    }
  
    function createInput(inputType, inputId, inputName, inputPlaceholder) {
      let title_input = document.createElement("input");
      title_input.setAttribute("type", inputType);
      title_input.setAttribute("id", inputId);
      title_input.setAttribute("name", inputName);
      title_input.setAttribute("placeholder", inputPlaceholder);

      form.appendChild(title_input);
    }
  
  }

  function createToDoItemForm() {
    let currentProjectId = document.querySelector(".project-heading").dataset.projectId;
    let toDoItemForm = document.createElement("form");
    toDoItemForm.setAttribute("id", "to-do-item-form");
    createToDoInput("text", "title", "title", "Title");
    createToDoInput("text", "description", "description", "Description");
    createToDoInput("date", "due-date", "dueDate", "Due Date");
    createPriorityDropdown("priority", "priority");

    let btnContainer = document.createElement("div");
    btnContainer.classList.add("btnContainer");

    // Create button
    let addToDoBtn = document.createElement("button");
    addToDoBtn.textContent = "Create";
    addToDoBtn.type ="submit";
    addToDoBtn.style.marginRight = "5px";
    btnContainer.appendChild(addToDoBtn);
  
    // Cancel button
    let cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.type = "button";
    cancelBtn.style.marginLeft = "5px";
    btnContainer.appendChild(cancelBtn);
    btnContainer.style.textAlign = "right";

    toDoItemForm.appendChild(btnContainer);

    // Event Listener to create To Do Item
    addToDoBtn.addEventListener("click", createToDoTask);
    // Cancel out of form
    cancelBtn.addEventListener("click", removeToDoForm);

    toDoItemsSection.appendChild(toDoItemForm);

    function createToDoTask(e) {
      e.preventDefault();
      // getProjectName
      let title = document.querySelector("#title").value;
      let description = document.querySelector("#description").value;
      let dueDate = document.querySelector("#due-date").value;
      let priority = document.querySelector("#priority").value;

      // check valid input data
      if (!(title === "" || title.search(/^\s*$/) === 0) && (!(dueDate === "" || dueDate.search(/^\s*$/) === 0))) {
        // Event emit
        let toDoItemData = {
          currentProjectId, title, description, dueDate, priority
        };

        Events.emit("toDoItemCreated", toDoItemData);
        removeToDoForm();
        addToDoBtn.removeEventListener("click", createToDoTask);
      }
    }

    function removeToDoForm() {
      toDoItemForm.remove();
      cancelBtn.removeEventListener("click", removeToDoForm);
    }

    function createToDoInput(inputType, inputId, inputName, inputPlaceholder) {
      let title_label = document.createElement("label");
      title_label.textContent = inputPlaceholder;
      title_label.setAttribute("for", inputId);

      let title_input = document.createElement("input");
      title_input.setAttribute("type", inputType);
      title_input.setAttribute("id", inputId);
      title_input.setAttribute("name", inputName);
      title_input.setAttribute("placeholder", inputPlaceholder);
      
      toDoItemForm.appendChild(title_label);
      toDoItemForm.appendChild(title_input);
    }

    function createPriorityDropdown(inputId, inputName) {
      let title_label = document.createElement("label");
      title_label.textContent = "Priority";
      title_label.setAttribute("for", inputId);

      let title_input = document.createElement("select");
      title_input.setAttribute("id", inputId);
      title_input.setAttribute("name", inputName);

      let veryImportantOption = document.createElement("option");
      veryImportantOption.setAttribute("value", "Very Important");
      veryImportantOption.textContent = "Very Important";

      let importantOption = document.createElement("option");
      importantOption.setAttribute("value", "Important");
      importantOption.textContent = "Important";

      let normalOption = document.createElement("option");
      normalOption.setAttribute("value", "Normal");
      normalOption.textContent = "Normal";

      let notImportantOption = document.createElement("option");
      notImportantOption.setAttribute("value", "Not Important");
      notImportantOption.textContent = "Not Important";

      title_input.appendChild(notImportantOption);
      title_input.appendChild(normalOption);
      title_input.appendChild(importantOption);
      title_input.appendChild(veryImportantOption);
      
      toDoItemForm.appendChild(title_label);
      toDoItemForm.appendChild(title_input);
    }
  }

  function createEditToDoItemForm(taskData) {
    let taskIDNo = taskData.taskIDNo;
    let itemToEdit = document.querySelector(`[data-task-id="${taskIDNo}"]`);
    while (itemToEdit.firstChild) {
      itemToEdit.removeChild(itemToEdit.firstChild);
    }

    let toDoItemForm = document.createElement("form");
    toDoItemForm.classList.add("edit-to-do-item-form");
    createToDoInput("text", `edit-title-${taskIDNo}`, "edit-title", "Title");
    createToDoInput("text", `edit-description-${taskIDNo}`, "edit-description", "Description");
    createToDoInput("date", `edit-due-date-${taskIDNo}`, "edit-due-date", "Due Date");
    createPriorityDropdown(`edit-priority-${taskIDNo}`, "priority");

    itemToEdit.appendChild(toDoItemForm);

    let titleInput = document.getElementById(`edit-title-${taskIDNo}`);
    titleInput.value = taskData.title;

    let descriptionInput = document.getElementById(`edit-description-${taskIDNo}`);
    descriptionInput.value = taskData.description;

    let dueDateInput = document.getElementById(`edit-due-date-${taskIDNo}`);
    dueDateInput.value = taskData.dueDate;

    let priorityDropdown = document.getElementById(`edit-priority-${taskIDNo}`);
    priorityDropdown.value = taskData.priority;

    let btnContainer = document.createElement("div");
    btnContainer.classList.add("btnContainer");

    // Create button
    let addToDoBtn = document.createElement("button");
    addToDoBtn.textContent = "Edit Task";
    addToDoBtn.type ="submit";
    addToDoBtn.style.marginRight = "5px";
    btnContainer.appendChild(addToDoBtn);
  
    // Cancel button
    let cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.type = "button";
    cancelBtn.style.marginLeft = "5px";
    btnContainer.appendChild(cancelBtn);
    btnContainer.style.textAlign = "right";

    toDoItemForm.appendChild(btnContainer);

    // Event Listener to create To Do Item
    addToDoBtn.addEventListener("click", editToDoTask);
    // Cancel out of form
    cancelBtn.addEventListener("click", removeEditToDoForm);

    function editToDoTask(e) {
      e.preventDefault();
      let title = document.querySelector(`#edit-title-${taskIDNo}`).value;
      let description = document.querySelector(`#edit-description-${taskIDNo}`).value;
      let dueDate = document.querySelector(`#edit-due-date-${taskIDNo}`).value;
      let priority = document.querySelector(`#edit-priority-${taskIDNo}`).value;
      let priorityClass = convertPriorityClass(priority);

      // check valid input data
      if (!(title === "" || title.search(/^\s*$/) === 0) && (!(dueDate === "" || dueDate.search(/^\s*$/) === 0))) {
        let toDoItemData = {
          title, description, dueDate, priority, priorityClass, taskIDNo
        };

        Events.emit("toDoItemEdited", toDoItemData);
        removeEditToDoForm();
        addToDoBtn.removeEventListener("click", editToDoTask);
      }

      function convertPriorityClass(priorityString) {
        let alteredString = priorityString;
        return alteredString.replace(/\s/, "-").toLowerCase();
      }
    }

    

    function removeEditToDoForm() {
      toDoItemForm.remove();
      cancelBtn.removeEventListener("click", removeEditToDoForm);
      Events.emit("completeItemEdit", taskIDNo);
    }

    function createToDoInput(inputType, inputId, inputName, inputPlaceholder) {
      let title_label = document.createElement("label");
      title_label.textContent = inputPlaceholder;
      title_label.setAttribute("for", inputId);

      let title_input = document.createElement("input");
      title_input.setAttribute("type", inputType);
      title_input.setAttribute("id", inputId);
      title_input.setAttribute("name", inputName);
      title_input.setAttribute("placeholder", inputPlaceholder);
      
      toDoItemForm.appendChild(title_label);
      toDoItemForm.appendChild(title_input);
    }

    function createPriorityDropdown(inputId, inputName) {
      let title_label = document.createElement("label");
      title_label.textContent = "Priority";
      title_label.setAttribute("for", inputId);

      let title_input = document.createElement("select");
      title_input.setAttribute("id", inputId);
      title_input.setAttribute("name", inputName);

      let veryImportantOption = document.createElement("option");
      veryImportantOption.setAttribute("value", "Very Important");
      veryImportantOption.textContent = "Very Important";

      let importantOption = document.createElement("option");
      importantOption.setAttribute("value", "Important");
      importantOption.textContent = "Important";

      let normalOption = document.createElement("option");
      normalOption.setAttribute("value", "Normal");
      normalOption.textContent = "Normal";

      let notImportantOption = document.createElement("option");
      notImportantOption.setAttribute("value", "Not Important");
      notImportantOption.textContent = "Not Important";

      title_input.appendChild(notImportantOption);
      title_input.appendChild(normalOption);
      title_input.appendChild(importantOption);
      title_input.appendChild(veryImportantOption);
      
      toDoItemForm.appendChild(title_label);
      toDoItemForm.appendChild(title_input);
    }
  }

  return {
    createNewProject
  }
})();

export { FormGenerator };