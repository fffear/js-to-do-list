import { Events } from "./eventPubSub";

const FormGenerator = (function() {
  // cache DOM
  let body = document.querySelector("body");
  let createNewProjectButton = document.querySelector(".create-new-project-btn");
  createNewProjectButton.addEventListener("click", createNewProject);
  
  let toDoItemsSection = document.querySelector(".list-of-todo-items");
  toDoItemsSection.addEventListener("click", createToDoItem);

  function createToDoItem(e) {
    if (e.target.classList.contains("create-new-todo-item-btn")) {
      if (document.getElementById("to-do-item-form") === null) {
        createToDoItemForm();
      }
    }
  }

  function createNewProject() {
    createModalForm();
    console.log("Create New Project");
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
      if (projectName === "" || projectName.search(/^\s*$/) === 0) {
        console.log(false);
      } else {
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
    let currentProjectName = document.querySelector(".project-heading").textContent;
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
      console.log(dueDate);

      // check valid input data
      if (!(title === "" || title.search(/^\s*$/) === 0) && (!(dueDate === "" || dueDate.search(/^\s*$/) === 0))) {
        // Event emit
        let toDoItemData = {
          currentProjectName, title, description, dueDate, priority
        };
        console.log(toDoItemData);

        Events.emit("toDoItemCreated", toDoItemData);
        console.log("title and due date valid");
        removeToDoForm();
        addToDoBtn.removeEventListener("click", createToDoTask);
      }

      // if (projectName === "" || projectName.search(/^\s*$/) === 0) {
      //   console.log(false);
      // } else {
      //   create a new Project
      //   Events.emit("projectCreated", projectName);
      //   removeModalForm();
      //   addProjectBtn.removeEventListener("click", createProject);
      // }
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

  return {
    createNewProject
  }
})();

export { FormGenerator };