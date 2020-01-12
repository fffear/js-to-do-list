import { Projects, Project } from "./factories/factoryFunctions";
import { Events } from "./eventPubSub";

const ProjectController = (function(projects, projectClass) {
  Events.on("projectCreated", add);
  Events.on("projectDeleted", remove);

  function add(project) {
    let newProject = projectClass(project);
    projects.addProject(newProject);
    console.log("This came from project controller");
    console.log(newProject.id);
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