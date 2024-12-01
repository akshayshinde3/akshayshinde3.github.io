import React from 'react'
import { useState } from 'react'
import { Container, Wrapper, Title, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'


const Projects = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');
  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <ToggleButtonGroup >
          {toggle === 'all' ?
            <ToggleButton active value="all" onClick={() => setToggle('all')}>All</ToggleButton>
            :
            <ToggleButton value="all" onClick={() => setToggle('all')}>All</ToggleButton>
          }
          <Divider />
{toggle === 'CI/CD' ? (
  <ToggleButton active value="CI/CD" onClick={() => setToggle('CI/CD')}>CI/CD</ToggleButton>
) : (
  <ToggleButton value="CI/CD" onClick={() => setToggle('CI/CD')}>CI/CD</ToggleButton>
)}
<Divider />
{toggle === 'containerization and orchestration' ? (
  <ToggleButton active value="containerization and orchestration" onClick={() => setToggle('containerization and orchestration')}>containerization and orchestration</ToggleButton>
) : (
  <ToggleButton value="containerization and orchestration" onClick={() => setToggle('containerization and orchestration')}>containerization and orchestration</ToggleButton>
)}
<Divider />
{toggle === 'Cloud Automation & Monitoring' ? (
  <ToggleButton active value="Cloud Automation & Monitoring" onClick={() => setToggle('Cloud Automation & Monitoring')}>Cloud Automation & Monitoring</ToggleButton>
) : (
  <ToggleButton value="Cloud Automation & Monitoring" onClick={() => setToggle('Cloud Automation & Monitoring')}>Cloud Automation & Monitoring</ToggleButton>
)}
<Divider />

        </ToggleButtonGroup>
        <CardContainer>
          {toggle === 'all' && projects
            .map((project) => (
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
          {projects
            .filter((item) => item.category == toggle)
            .map((project) => (
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects