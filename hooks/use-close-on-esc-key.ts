import { useEffect, useState } from "react";

const useCloseOnEscKey = (isModal = false) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        document.body.style.height = "auto";
        document.body.style.overflow = "auto";
      }
    };

    const handleClickOutside = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      if(!isModal){
      document.addEventListener("click", handleClickOutside);
      }
      document.body.style.height = "100dvh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "auto";
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen };
};

export default useCloseOnEscKey;
