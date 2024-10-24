import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState(() => {
    const storedUser = sessionStorage.getItem('userInfo');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const storeUserInfo = (user) => {
    setUserInformation(user);
    sessionStorage.setItem('userInfo', JSON.stringify(user));
  };

  return (
    <UserContext.Provider value={{ userInformation, storeUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
