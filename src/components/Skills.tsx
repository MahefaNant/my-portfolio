/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  SiSymfony, SiNodedotjs, SiSpring, SiLaravel,SiDotnet,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript,
  SiMongodb, SiPostgresql, SiMysql,
  SiDocker, SiGit, SiGithubactions, SiIntellijidea, SiPostman,SiLinux,
  SiCanva, SiFigma, SiAppstore
} from "react-icons/si";
import { IoLogoGooglePlaystore } from "react-icons/io5";


export default function Skills() {

  const {t} = useTranslation("skills");

  const skillCategories = [
    {
      name: "Backend",
      color: "from-emerald-500 to-teal-600",
      skills: [
        { name: "Symfony", icon: SiSymfony },
        { name: "Laravel", icon: SiLaravel },
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Spring", icon: SiSpring },
        { name: "Asp.Net", icon: SiDotnet }
      ]
    },
    {
      name: "Frontend",
      color: "from-blue-500 to-indigo-600",
      skills: [
        { name: "React", icon: SiReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "TypeScript", icon: SiTypescript },
        { name: "JavaScript", icon: SiJavascript },
        { name: "Tailwind", icon: SiTailwindcss }
      ]
    },
    {
      name: t("bdd"),
      color: "from-amber-500 to-orange-600",
      skills: [
        { name: "MongoDB", icon: SiMongodb },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "MySQL", icon: SiMysql }
      ]
    },
    {
      name: t("ci-cd"),
      color: "from-purple-500 to-fuchsia-600",
      skills: [
        { name: "Docker", icon: SiDocker },
        { name: "GitHub Actions", icon: SiGithubactions },
      ]
    },
    {
      name: t("environment"),
      color: "from-rose-500 to-pink-600",
      skills: [
        { name: "VS Code", icon: SiIntellijidea },
        { name: "IntelliJ", icon: SiIntellijidea },
        { name: "Git", icon: SiGit },
        { name: "Postman", icon: SiPostman },
        { name: "WSL", icon: SiLinux }
      ]
    },
    {
      name: t("others"),
      color: "from-rose-500 to-pink-600",
      skills: [
        { name: "Canva", icon: SiCanva },
        { name: "Figma", icon: SiFigma },
        { name: "AppStore", icon: SiAppstore },
        { name: "PlayStore", icon: IoLogoGooglePlaystore },
      ]
    }
  ];


  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("section")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((category) => (
            <div key={category.name} className="flex items-center">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color} mr-2`} />
              <span className="text-sm">{category.name}</span>
            </div>
          ))}
        </div>

        <div className="space-y-16">
          {skillCategories.map((category) => (
            <div key={category.name} className="text-center">
              <h3 className="text-xl font-semibold mb-6">{category.name}</h3>
              <div className="flex flex-wrap justify-center gap-3 skill-grid">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true, margin: "20px" }}
                    className="skill-hexagon"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className={`hexagon-content bg-gradient-to-br ${category.color}`}>
                      <skill.icon className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2" />
                      <span className="text-xs font-medium">{skill.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}