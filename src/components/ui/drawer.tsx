"use client";
import { cn } from "@/lib/utils";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface DrawerContextProps {
  isMenuOpen: boolean;
  toggle?: () => void;
}

const DrawerContext = createContext<DrawerContextProps>({
  isMenuOpen: false,
});

const DrawerContextProvider = ({ children }: { children: ReactNode }) => {
  const toggle = useCallback(() => {
    setDrawerState((old) => {
      return { ...old, isMenuOpen: !old.isMenuOpen };
    });
  }, []);

  const [drawerState, setDrawerState] = useState<DrawerContextProps>({
    isMenuOpen: false,
    toggle: toggle,
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      if (innerWidth >= 992) {
        setDrawerState({
          isMenuOpen: false,
          toggle: toggle,
        });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle]);

  return (
    <DrawerContext.Provider value={drawerState}>
      {children}
    </DrawerContext.Provider>
  );
}

const DrawerContent = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {

  return (
    <div
      className={`grow w-full ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
}

const DrawerBackdrop = () => {
  const { isMenuOpen, toggle } = useContext(DrawerContext);
  // if (!isMenuOpen) {
  //   return null;
  // }
  return (
    <div
      onClick={toggle}
      // className="bg-black/70 fixed inset-0 z-40"
      className={cn(
        "bg-black fixed inset-0 z-40",
        `transition-opacity ease-out`,
        `${
          isMenuOpen
            ? "opacity-70 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`
      )}
    ></div>
  );
}

export {
  DrawerContext,
  DrawerContextProvider,
  DrawerContent,
  DrawerBackdrop,
}