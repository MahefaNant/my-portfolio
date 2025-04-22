import { useState, useEffect } from "react";

const useDocumentReadyState = (): boolean => {
  const [isDocumentReady, setIsDocumentReady] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.document) {
      const handleStateChange = () => {
        if (document.readyState === "complete") {
          setIsDocumentReady(true);
        }
      };

      if (document.readyState === "complete") {
        setIsDocumentReady(true);
      } else {
        document.addEventListener("readystatechange", handleStateChange);
      }

      return () => {
        document.removeEventListener("readystatechange", handleStateChange);
      };
    }
  }, []);

  return isDocumentReady;
};

export default useDocumentReadyState;
