"use client";
import { User } from "@/lib/models";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthenticationContextType {
  user?: User;
}

const AuthenticationContext = createContext<AuthenticationContextType>({
  user: undefined,
});

const AuthenticationContextProvider = ({
  user,
  children,
}: {
  user?: User;
  children: ReactNode;
}) => {
  const [authState, setAuthState] = useState<AuthenticationContextType>({});

  useEffect(() => {
    setAuthState({ user: user });
  }, [user]);

  return (
    <AuthenticationContext.Provider value={authState}>
      {children}
    </AuthenticationContext.Provider>
  );
};
