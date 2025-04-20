/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { myInfos, socialLinks } from "@/constants/me";
import { useTranslation } from "react-i18next";

interface FormData {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    toast.success(t("form.send-toast"));
    reset();
  };

  const {t} = useTranslation("contact");

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("section")??""}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("coord.title")}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <a
                    href={`mailto:${myInfos.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-primary/10 text-primary"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p>
                      <a href={`mailto:${myInfos.email}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                        {myInfos.email}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={`tel:${myInfos.phone}`}
                    className="p-3 rounded-full bg-primary/10 text-primary"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("coord.phone")??""}</p>
                    <p>
                      <a href={`tel:${myInfos.phone}`} className="hover:underline">
                        {myInfos.phone}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t("coord.location")??""}</p>
                    <p>{myInfos.location}</p>
                  </div>
                </div>
              </div>

            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">{t("coord.social-media")??""}</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <Button key={index} variant="outline" size="icon" asChild={true}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  {t("form.name")}
                </label>
                <Input
                  id="name"
                  placeholder={t("form.name-pl")}
                  {...register("name", { required: t("form.required") })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("form.email")}
                  {...register("email", {
                    required: t("form.email"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Adresse email invalide",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder={t("form.message")}
                  {...register("message", { required: "Ce champ est requis" })}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                {t("form.send")??""}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}