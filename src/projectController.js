import { Projects, Project } from "./factories/factoryFunctions";
import { Events } from "./eventPubSub";
import { LocalStorageController } from "./localStorageController";

const ProjectController = (function(projects, projectClass) {
  Events.on("projectCreated", add);
  Events.on("projectDeleted", remove);

  function add(project) {
    let newProject = projectClass(project);
    projects.addProject(newProject);

    if (LocalStorageController.storageAvailable('localStorage')) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }

  function remove(projectID) {
    let projectToDelete = projects.findProjectByNo(Number(projectID));
    removeTasksFromAllItemsWith(projectID);
    projects.removeProject(projectToDelete);

    if (LocalStorageController.storageAvailable('localStorage')) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }

  function removeTasksFromAllItemsWith(deletedProjectId) {
    let allItems = projects.list[0];
    for (let i = 0; i < allItems.toDoList.length; i++) {
      if (allItems.toDoList[i].projectIDNo == deletedProjectId) {
        allItems.toDoList.splice(i, 1);
        i--;
      }
    }
  }
})(Projects, Project);

export { ProjectController };