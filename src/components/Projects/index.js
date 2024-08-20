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
          {toggle === 'Jenkins' ?
            <ToggleButton active value="Jenkins" onClick={() => setToggle('Jenkins')}>Jenkins</ToggleButton>
            :
            <ToggleButton value="Jenkins" onClick={() => setToggle('Jenkins')}>Jenkins</ToggleButton>
          }
          <Divider />
          {toggle === 'Docker' ?
            <ToggleButton active value="Docker" onClick={() => setToggle('Docker')}>Docker</ToggleButton>
            :
            <ToggleButton value="Docker" onClick={() => setToggle('Docker')}>Docker</ToggleButton>
          }
          <Divider />
          {toggle === 'Kubernetes' ?
            <ToggleButton active value="Kubernetes" onClick={() => setToggle('Kubernetes')}>Kubernetes</ToggleButton>
            :
            <ToggleButton value="Kubernetes" onClick={() => setToggle('Kubernetes')}>Kubernetes</ToggleButton>
          }
          <Divider />
          {toggle === 'Microsoft Azure' ?
            <ToggleButton active value="Microsoft Azure" onClick={() => setToggle('Microsoft Azure')}>Microsoft Azure</ToggleButton>
            :
            <ToggleButton value="Microsoft Azure" onClick={() => setToggle('Microsoft Azure')}>Microsoft Azure</ToggleButton>
          }
          <Divider />
          {toggle === 'GitHub Action' ?
            <ToggleButton active value="GitHub Action" onClick={() => setToggle('GitHub Action')}>GitHub Action</ToggleButton>
            :
            <ToggleButton value="GitHub Action" onClick={() => setToggle('GitHub Action')}>GitHub Action</ToggleButton>
          }
          <Divider />
          {/* {toggle === 'Excel Dashboard' ?
            <ToggleButton active value="Excel Dashboard" onClick={() => setToggle('Excel Dashboard')}>Excel Dashboard</ToggleButton>
            :
            <ToggleButton value="Excel Dashboard" onClick={() => setToggle('Excel Dashboard')}>Excel Dashboard</ToggleButton>
          } */}
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