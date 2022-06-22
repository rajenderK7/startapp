import { createContext } from "react";
import type { User } from "firebase/auth";

interface UserContextI {
  user: User | undefined | null;
  username: string | null;
}

const defaultContext: UserContextI = {
  user: null,
  username: null,
};

const UserContext = createContext(defaultContext);

export default UserContext;
