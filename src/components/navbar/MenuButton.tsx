import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { Separator } from "../ui/separator";

interface IMenuButtonProps {
    links: { name: string, href: string }[];
    activeSection: string;
    setActiveSection: (section: string) => void;
}

export function MenuButton({links, activeSection, setActiveSection}: IMenuButtonProps) {
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
            <DrawerFooter>
              {links.map((link) => {
                const section = link.href.substring(1);
                return (
                  <DrawerClose  key={link.name} asChild={true}>
                    <Link
                      href={link.href}
                      className={`text-center relative px-2 py-1 transition-colors hover:text-primary ${
                        activeSection === section ? "text-primary" : "text-foreground"
                      }`}
                      onClick={() => {
                        setActiveSection(section);

                      }
                      }
                    >
                      {link.name}
                      {activeSection === section && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-0 top-full h-0.5 w-full bg-primary"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </DrawerClose>
                  
                );
              })}
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}