"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

interface DrawerContextProps {
  isMenuOpen: boolean;
  toggle?: () => void;
}

export const DrawerContext = createContext<DrawerContextProps>({
  isMenuOpen: false,
});

export function DrawerContextProvider({ children }: { children: ReactNode }) {
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
      if (innerWidth >= 1024) {
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
