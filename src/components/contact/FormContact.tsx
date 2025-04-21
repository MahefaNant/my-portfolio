"use client";
import { motion } from "motion/react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { SubmitButton } from "./SubmitButton";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

interface FormData {
  name: string
  email: string
  message: string
}

export function FormContact () {


  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { t } = useTranslation("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
    
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const token = await recaptchaRef.current?.executeAsync();
      
      if (!token) {
        throw new Error("reCAPTCHA non validé");
      }

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken: token
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi");
      }

      toast.success(t("form.send-toast") || "Message envoyé avec succès !");
      setEmailSent(true); 
      reset();
      recaptchaRef.current?.reset();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(t("form.send-error") || "Erreur lors de l'envoi du message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return(
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
            placeholder={t("form.e-mail")}
            {...register("email", {
              required: t("form.e-mail"),
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
            {...register("message", { required: t("form.required") })}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
          )}
        </div>

        <SubmitButton 
          emailSent={emailSent}
          isSubmitting={isSubmitting}
          isValid={isValid}
          recaptchaRef={recaptchaRef}
        />

      </form>

    </motion.div>
  );
}