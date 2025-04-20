import { motion } from "motion/react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Image as ImageIcon, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { IProject } from "../Projects";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";


interface IProjectCardProps {
    project: IProject;
    index: number;
    setCurrentProject: Dispatch<SetStateAction<IProject | null>>;
    setLightboxOpen: (open: boolean) => void;
    currentImageIndex: Record<number, number>;
    setCurrentImageIndex: Dispatch<SetStateAction<Record<number, number>>>;
    prevImage: (id: number) => void;
    nextImage: (id: number) => void;
}

export function ProjectCard({project,index,setCurrentImageIndex,setLightboxOpen, currentImageIndex, setCurrentProject, prevImage, nextImage}: IProjectCardProps) {

  const {t} = useTranslation("common");
  

  const openLightbox = (project: IProject) => {
    setCurrentProject(project);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  return(
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full flex flex-col group">
        <CardHeader 
          className="relative p-0 overflow-hidden cursor-pointer"
          onClick={() => openLightbox(project)}
        >
          <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
            {project.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentImageIndex[project.id] === idx ? 1 : 0,
                  zIndex: currentImageIndex[project.id] === idx ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={img}
                  alt={`${project.title} - Image ${idx + 1}`}
                  fill={true}
                  className="object-cover"
                  unoptimized={true}
                />
              </motion.div>
            ))}
                
            {project.images.length > 1 && (
              <>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage(project.id);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage(project.id);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                    
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(prev => ({ ...prev, [project.id]: idx }));
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex[project.id] === idx 
                          ? "bg-primary w-4" 
                          : "bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
                
            {project.isPrivate && (
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm z-10">
                {t("private-pr") ?? ""}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs px-2 py-1 bg-muted rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 p-6 pt-0">
          {project.githubUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              asChild={true}
              className="group/button"
            >
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4 group-hover/button:scale-110 transition-transform" />
                Code
              </a>
            </Button>
          )}
          {project.liveUrl ? (
            <Button 
              size="sm" 
              asChild={true}
              className="group/button"
            >
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4 group-hover/button:scale-110 transition-transform" />
                {t("see")}
              </a>
            </Button>
          ) : (
            <>
              <Button 
                size="sm" 
                asChild={true}
                className="group/button"
                disabled={true}
              >
                <a
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Lock className="mr-2 h-4 w-4 group-hover/button:scale-110 transition-transform" />
                  {t("private")}
                </a>
              </Button>
            </>
          )}
          {project.images.length > 1 && (
            <div className="ml-auto flex items-center text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4 mr-1" />
              <span>{project.images.length}</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}