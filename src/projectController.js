import { Projects, Project } from "./factories/factoryFunctions";
import { Events } from "./eventPubSub";

const ProjectController = (function(projects, projectClass) {
  Events.on("projectCreated", add);
  Events.on("projectDeleted", remove);

  function add(project) {
    projects.addProject(projectClass(project));
    console.log(projects);
  }

  function remove(targetProject) {
    console.log("Does this even work?");
    let projectToDelete = projects.findProject(targetProject);

    projects.removeProject(projectToDelete);
    console.log(projects);

    // projects.list.find(function(project, index) {
    //   if (project === projectToDelete) {
    //     projects.splice(index, 1);
    //     console.log(projects);
    //     return;
    //     // Event listener to update Project list
    //   }
    // });
  }
})(Projects, Project);

export { ProjectController };