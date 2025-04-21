/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectCard } from "./projects/ProjectCard";
import { ImagesLook } from "./projects/ImagesLook";
import { useTranslation } from "react-i18next";
import PortfolioFeatureCard from "./projects/PortfolioFeatureCard";

export interface IProject {
  id: number;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPrivate?: boolean;
}

export default function Projects() {

  const {t} = useTranslation("projects");

  const projects: IProject[] = [
    {
      id: 3,
      title: t("pr-3.title"),
      description: t("pr-3.description"),
      tags: ["Next.js", "Typescript", "Docker", "Github", "MongoDB"],
      images: ["/static/images/oa/oa1.png", "/static/images/oa/oa2.png", "/static/images/oa/oa3.png", "/static/images/oa/oa4.png", "/static/images/oa/oa5.png", "/static/images/oa/oa6.png"],
      isPrivate: true
    },
    {
      id: 2,
      title: t("pr-2.title"),
      description: t("pr-2.description"),
      tags: ["React Native", "Typescript", "Azuracast","sqlite"],
      images: ["/static/images/hopefy.png"],
      liveUrl: "https://play.google.com/store/apps/details?id=com.hopefy.radiomg",
      isPrivate: true
    },
    {
      id: 1,
      title: t("pr-1.title"),
      description: t("pr-1.description"),
      tags: ["Asp.net", "C#", "Api", "Postgresql"],
      images: ["/static/images/os/os1.png", "/static/images/os/os2.png", "/static/images/os/os3.png", "/static/images/os/os4.png", "/static/images/os/os5.png", "/static/images/os/os6.png"],
      isPrivate: true
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>(
    projects.reduce((acc, project) => ({ ...acc, [project.id]: 0 }), {})
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<IProject | null>(null);

  

  const nextImage = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [projectId]: (prev[projectId] + 1) % project.images.length
      }));
    }
  };

  const prevImage = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [projectId]: (prev[projectId] - 1 + project.images.length) % project.images.length
      }));
    }
  };


  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 justify-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("section")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
              setCurrentImageIndex={setCurrentImageIndex}
              setLightboxOpen={setLightboxOpen}
              currentImageIndex={currentImageIndex}
              setCurrentProject={setCurrentProject}
              prevImage={prevImage}
              nextImage={nextImage}
            />
          ))}
        </div>

        <PortfolioFeatureCard />

      </div>

      <ImagesLook 
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        lightboxOpen={lightboxOpen}
        setLightboxOpen={setLightboxOpen}
        currentProject={currentProject}
        nextImage={nextImage}
        prevImage={prevImage}
      />
      
    </section>
  );
}