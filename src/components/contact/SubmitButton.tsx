import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { RefObject } from "react";
import { useTranslation } from "react-i18next";

interface ISubmitButtonProps {
    recaptchaRef: RefObject<ReCAPTCHA>;
    isSubmitting: boolean;
    isValid: boolean;
    emailSent: boolean;
}

export function SubmitButton({recaptchaRef,isSubmitting,isValid,emailSent}: ISubmitButtonProps) {
  const { t } = useTranslation("contact");

  return(
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        size="invisible"
        badge="inline"
      />

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || !isValid || emailSent}
      >
        {emailSent ? (
          <span className="flex items-center gap-2 text-green-600">
            {t("form.email-send") || "Envoyé !"}
            <Send className="h-4 w-4" />
          </span>
        ) : isSubmitting ? (
          <span className="flex items-center gap-2">
            <span>{t("form.send-loading") || "Envoi en cours..."}</span>
            <Send className="h-4 w-4 animate-spin" />
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {t("form.send") || "Envoyer"}
            <Send className="h-4 w-4" />
          </span>
        )}
      </Button>
    </>
  );
}