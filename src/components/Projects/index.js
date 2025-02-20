import React, { useState, useEffect, useRef } from "react";
import { Container, Wrapper, Title } from "./ProjectsStyle";
import ProjectCard from "../Cards/ProjectCards";
import { supabase } from "../../supabaseClient";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// Add these animation variants at the top after your imports
const popUpVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

// Add these animation variants at the top
const mobileNavVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

// Add these before the Projects component definition

// Add this animation variant
const categoryVariants = {
  enter: {
    x: 50,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    x: -50,
    opacity: 0,
  },
};

// Update the ProjectsContainer styling
// const ProjectsContainer = styled(motion.div)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-wrap: wrap;
//   gap: 28px;
//   padding: 20px;

//   @media (max-width: 768px) {
//     gap: 16px;
//     padding: 10px;
//   }
// `;

// Update the CardContainer styling
const CardContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  padding: 20px;
  max-width: 1350px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 16px;
  }
`;

// Update the ToggleButtonGroup styling
const ToggleButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: ${({ theme }) => theme.card};
  border: 1.5px solid ${({ theme }) => theme.primary + "40"};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 16px;
  padding: 8px;
  margin: 28px auto;
  max-width: 800px;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    width: 90%;
    padding: 12px;
    justify-content: space-between;
    gap: 8px;
  }
`;

// Add this after your existing styled components
// const ScrollIndicator = styled.div`
//   display: none;

//   @media (max-width: 768px) {
//     display: block;
//     position: absolute;
//     right: 0;
//     top: 50%;
//     transform: translateY(-50%);
//     width: 24px;
//     height: 100%;
//     background: linear-gradient(
//       to right,
//       transparent,
//       ${({ theme }) => theme.bg}
//     );
//     pointer-events: none;
//   }
// `;

// Add these styled components after your existing ones
// const ScrollArrow = styled.button`
//   display: none;

//   @media (max-width: 768px) {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background: ${({ theme }) => theme.primary + "15"};
//     border: none;
//     color: ${({ theme }) => theme.primary};
//     font-size: 20px;
//     font-weight: 600;
//     cursor: pointer;
//     padding: 8px;
//     width: 36px;
//     height: 36px;
//     border-radius: 10px;
//     transition: all 0.3s ease;
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     ${({ direction }) => (direction === "left" ? "left: 0;" : "right: 0;")}
//     opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
//     pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};

//     &:hover {
//       background: ${({ theme }) => theme.primary + "30"};
//       transform: translateY(-50%) scale(1.1);
//     }

//     &:active {
//       transform: translateY(-50%) scale(0.95);
//     }
//   }
// `;

// Add the NavigationArrow component
const NavigationArrow = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primary + "15"};
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary + "30"};
  }

  @media (max-width: 768px) {
    font-size: 20px;
    width: 36px;
    height: 36px;
  }
`;

// Update the MobileArrow styling
// const MobileArrow = styled.button`
//   display: none;

//   @media (max-width: 768px) {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background: ${({ theme }) => `${theme.primary}15`};
//     border: none;
//     color: ${({ theme }) => theme.primary};
//     font-size: 20px;
//     font-weight: 600;
//     cursor: pointer;
//     padding: 8px;
//     width: 36px;
//     height: 36px;
//     border-radius: 10px;
//     transition: all 0.3s ease;

//     &:hover {
//       background: ${({ theme }) => `${theme.primary}30`};
//       transform: scale(1.1);
//     }

//     &:active {
//       transform: scale(0.95);
//     }
//   }
// `;

// Update the ToggleButton styling
const ToggleButton = styled(motion.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  background: ${({ active, theme }) =>
    active ? theme.primary : "transparent"};
  color: ${({ active, theme }) => (active ? theme.white : theme.primary)};
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }

  // ...existing hover effects...
`;

// Update the Divider styling
const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 20px;
    align-self: center;
  }
`;

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState("All");
  const [projects, setProjects] = useState([]);
  const toggleGroupRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Add this handleMobileNavigation function
  const handleMobileNavigation = (direction) => {
    const categories = [
      "All",
      ...new Set(projects.map((project) => project.category)),
    ];
    const currentIndex = categories.indexOf(toggle);
    let newIndex;

    if (direction === "right") {
      newIndex = (currentIndex + 1) % categories.length;
    } else {
      newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = categories.length - 1;
    }

    setToggle(categories[newIndex]);
  };

  // Update the containerVariants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Update the itemVariants
  // const itemVariants = {
  //   hidden: {
  //     y: 20,
  //     opacity: 0,
  //     scale: 0.95,
  //   },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       type: "spring",
  //       stiffness: 300,
  //       damping: 20,
  //       duration: 0.4,
  //     },
  //   },
  // };

  // Add the titleVariants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*,members(*),associations(*)");
      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        console.log("Project data:", data); // Check the structure
        setProjects(data);
      }
    };
    fetchProjects();
  }, []);

  // Add this inside your Projects component, before the return statement
  const checkScroll = () => {
    if (toggleGroupRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = toggleGroupRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // const scroll = (direction) => {
  //   if (toggleGroupRef.current) {
  //     const scrollAmount = 200;
  //     toggleGroupRef.current.scrollBy({
  //       left: direction === "left" ? -scrollAmount : scrollAmount,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  useEffect(() => {
    const toggleGroup = toggleGroupRef.current;
    if (toggleGroup) {
      toggleGroup.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => toggleGroup.removeEventListener("scroll", checkScroll);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container id="projects">
      <Wrapper>
        <Title
          as={motion.h1}
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Projects
        </Title>
        <ToggleButtonGroup ref={toggleGroupRef}>
          {isMobile ? (
            <>
              <NavigationArrow
                as={motion.button}
                variants={mobileNavVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleMobileNavigation("left")}
              >
                &lt;
              </NavigationArrow>
              <AnimatePresence mode="wait">
                <ToggleButton
                  as={motion.button}
                  key={toggle}
                  variants={categoryVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  active={true}
                >
                  {toggle}
                </ToggleButton>
              </AnimatePresence>
              <NavigationArrow
                as={motion.button}
                variants={mobileNavVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleMobileNavigation("right")}
              >
                &gt;
              </NavigationArrow>
            </>
          ) : (
            <>
              {[
                "All",
                ...new Set(projects.map((project) => project.category)),
              ].map((category, index) => (
                <React.Fragment key={category}>
                  <ToggleButton
                    as={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    active={toggle === category}
                    onClick={() => setToggle(category)}
                  >
                    {category}
                  </ToggleButton>
                  {index !== projects.length && <Divider />}
                </React.Fragment>
              ))}
            </>
          )}
        </ToggleButtonGroup>
        <CardContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          {projects
            .filter(
              (project) => toggle === "All" || project.category === toggle
            )
            .map((project) => (
              <motion.div
                key={project.id}
                variants={popUpVariants}
                layout
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <ProjectCard
                  project={project}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              </motion.div>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;
