import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { IProject } from "../Projects";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface ImagesLookProps {
    lightboxOpen: boolean;
    setLightboxOpen: Dispatch<SetStateAction<boolean>>;
    currentProject: IProject | null;
    currentImageIndex: Record<number, number>;
    setCurrentImageIndex: Dispatch<SetStateAction<Record<number, number>>>;
    prevImage: (id: number) => void;
    nextImage: (id: number) => void;
}

export function ImagesLook({lightboxOpen, setLightboxOpen, currentProject, currentImageIndex, setCurrentImageIndex, prevImage, nextImage}: ImagesLookProps) {

  const {t}  = useTranslation("common");

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  return(
    <AnimatePresence>
      {lightboxOpen && currentProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full max-w-6xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors z-10"
            >
              <X size={32} />
            </button>

            <div className="relative w-full h-full aspect-video bg-black rounded-lg overflow-hidden">
              {currentProject.images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: currentImageIndex[currentProject.id] === idx ? 1 : 0,
                    zIndex: currentImageIndex[currentProject.id] === idx ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={img}
                    alt={`${currentProject.title} - Image ${idx + 1}`}
                    fill={true}
                    className="object-contain"
                    unoptimized={true}
                  />
                </motion.div>
              ))}
            </div>

            {currentProject.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage(currentProject.id);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors z-10"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage(currentProject.id);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors z-10"
                >
                  <ChevronRight size={32} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {currentProject.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(prev => ({ ...prev, [currentProject.id]: idx }));
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentImageIndex[currentProject.id] === idx 
                          ? "bg-primary w-6" 
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="mt-4 text-white text-center">
              <h3 className="text-xl font-bold">{currentProject.title}</h3>
              <p className="text-sm opacity-80">
                  Image {currentImageIndex[currentProject.id] + 1} {t("of")} {currentProject.images.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}