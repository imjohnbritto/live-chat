import { useEffect, useState } from "react";
import { loggedInUser } from "./helper";
import { AuthUser } from "@server/types/user";

const useLoggedInUser = () => {
  const [userData, setUserData] = useState<AuthUser | null>(loggedInUser());
  useEffect(() => {
    setUserData(loggedInUser());
  }, []);

  return userData;
};

export default useLoggedInUser;
