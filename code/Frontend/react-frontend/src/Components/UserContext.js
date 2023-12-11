import React, { createContext, useContext, useState, useMemo } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [userType, setUserType] = useState(null);
  // UserContext.Provider wraps the application and provides user-related values like username, userType, and functions to set them.
  // useUser is a hook that can be used in any component to access the user data stored in the UserContext.
  const memoizedValue = useMemo(
    () => ({ username, setUsername, userType, setUserType }),
    [username, setUsername, userType, setUserType]
  );
  return (
    <UserContext.Provider value={memoizedValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
