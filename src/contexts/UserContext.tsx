import { useState, createContext, ReactNode } from "react";

type UserProviderProps = {
  children: ReactNode;
};

type UserContextType = {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserContext = createContext<UserContextType>({
  isAdmin: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsAdmin: () => {},
});

const UserProvider = ({ children }: UserProviderProps) => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <UserContext.Provider value={{ isAdmin: isAdmin, setIsAdmin: setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
