import { useState, useEffect } from "react";

const useDocumentReadyState = (): boolean => {
  const [isDocumentReady, setIsDocumentReady] = useState<boolean>(false);

  useEffect(() => {
    const handleStateChange = () => {
      if (undefined !== window.document && document.readyState === "complete") {
        setIsDocumentReady(true);
      }
    };

    if (undefined !== window.document && document.readyState === "complete") {
      setIsDocumentReady(true);
    } else {
      document.addEventListener("readystatechange", handleStateChange);
    }

    return () => {
      document.removeEventListener("readystatechange", handleStateChange);
    };
  }, []);

  return isDocumentReady;
};

export default useDocumentReadyState;