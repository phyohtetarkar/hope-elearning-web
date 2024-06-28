"use client";
import { User } from "@/lib/models";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthenticationContextType {
  user?: User | null | undefined;
}

const AuthenticationContext = createContext<AuthenticationContextType>({
  user: undefined,
});

const AuthenticationContextProvider = ({
  user,
  children,
}: {
  user?: User | null | undefined;
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

export { AuthenticationContext, AuthenticationContextProvider };
