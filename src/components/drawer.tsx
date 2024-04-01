"use client";
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

export default function DrawerBackdrop() {
  const { isMenuOpen, toggle } = useContext(DrawerContext);
  if (!isMenuOpen) {
    return null;
  }
  return (
    <div
      onClick={toggle}
      className="bg-black/40 absolute start-0 top-0 right-0 bottom-0 z-40"
    ></div>
  );
}
