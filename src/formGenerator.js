import { Events } from "./eventPubSub";

const FormGenerator = (function() {
  // cache DOM
  let body = document.querySelector("body");
  let createNewProjectButton = document.querySelector(".create-new-project-btn");
  createNewProjectButton.addEventListener("click", createNewProject);
  console.log(this);

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

  return {
    createNewProject
  }
})();

export { FormGenerator };