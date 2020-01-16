import { Projects } from "./factories/factoryFunctions";
import { Events } from "./eventPubSub";

let Mustache = require('mustache');

// Display all projects in the DOM
let ProjectView = (function(projects) {
  let projectNames = [];
  let allTasksName = [];
  let allTasksTemplate = document.getElementById("all-tasks-template").innerHTML;
  let projectTemplate = document.getElementById("projects-template").innerHTML;
  let projectList = document.getElementById("projects");

  document.addEventListener("click", deleteProject);

  Events.on("projectCreated", renderNewProject);

  function deleteProject(e) {
    if (e.target.className === "del") {
      projectList.removeChild(e.target.parentNode.parentNode);
      Events.emit("projectDeleted", e.target.parentNode.parentNode.dataset.projectId);
    }
  }

  function extractProjectName(projects, namesArray) {
    namesArray.length = 0;
    projects.forEach(function(item) {
      namesArray.push({ name: item.name,
                        id: item.id
                      });
    });
  }

  function renderNewProject() {
    projectNames.length = 0;
    extractProjectName(projects.slice(-1), projectNames);

    let data = { projectNames };

    let newProject = Mustache.render(projectTemplate, data);

    projectList.innerHTML += newProject; 
  }

  function render() {
    extractProjectName(projects.slice(1), projectNames);
    extractProjectName(projects.slice(0, 1), allTasksName);

    let allTasks = { allTasksName };
    let data = { projectNames };

    let allTasksItem = Mustache.render(allTasksTemplate, allTasks);
    let listOfProjects = Mustache.render(projectTemplate, data);

    projectList.innerHTML = allTasksItem;
    projectList.innerHTML += listOfProjects; 
  } 

  return { render };
})(Projects.list);

export { ProjectView };