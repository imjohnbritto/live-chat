import { createContext, FC, ReactNode } from 'react';
import { AuthUser } from 'server/types/user';

type AuthUserContextType = {
  authUser: AuthUser;
};

//@ts-ignore
export const AuthUserContext = createContext<AuthUserContextType>();

export const AuthUserProvider: FC<{
  children: ReactNode;
  authUser: AuthUser;
}> = ({ children, authUser }) => {
  const value = {
    authUser
  };

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  );
};
