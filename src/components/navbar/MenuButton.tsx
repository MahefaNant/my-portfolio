import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Separator } from "../ui/separator";

interface IMenuButtonProps {
    links: { name: string, href: string }[];
    activeSection: string;
    setActiveSection: (section: string) => void;
    handleClick: (section: string) => void;
}

export function MenuButton({links, activeSection, setActiveSection, handleClick}: IMenuButtonProps) {
  return(
    <div className="block sm:hidden">
      <Drawer>
        <DrawerTrigger asChild={true}>
          <Button variant={"link"}>
            <Menu size={20} /> 
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Mahefa</DrawerTitle>
              <DrawerDescription>Navigation</DrawerDescription>
            </DrawerHeader>
            <Separator className="my-4" />
            <div className="p-4 flex flex-col gap-4">
              {links.map((link) => {
                const section = link.href.substring(1);
                return (
                  <DrawerClose key={link.name} asChild={true}>
                    <button
                      className={`text-left relative px-2 py-1 transition-colors hover:text-primary ${
                        activeSection === section ? "text-primary" : "text-foreground"
                      }`}
                      onClick={() => {
                        setActiveSection(section);
                        handleClick(section);
                      }}
                    >
                      {link.name}
                      {activeSection === section && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-0 top-full h-0.5 w-full bg-primary"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  </DrawerClose>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}