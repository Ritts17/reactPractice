import React, { useState } from 'react';
import projectsData from './projectsData';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      <h1>My Projects</h1>
      <p>Here are some of my featured projects.</p>
      
      <div className="projects-grid">
        {projectsData.projectList.map((project) => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => handleProjectClick(project.id)}
            style={{ cursor: 'pointer', padding: '20px', margin: '10px', border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal" style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div className="modal-content" style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '8px', 
            maxWidth: '600px', 
            width: '90%' 
          }}>
            <h2>{projectsData.projectDetails[selectedProject].name}</h2>
            <p>{projectsData.projectDetails[selectedProject].details}</p>
            <button onClick={closeModal} style={{ marginTop: '20px' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;