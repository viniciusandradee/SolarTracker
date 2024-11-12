import { User } from "firebase/auth";

type AuthContextProps = {
  //user?: User | null;
  authentication: (email: string, password: string) => void;
  signInWithGoogle: () => Promise<void>;
  //createUser: (email: string, password: string) => void;
  signOut: () => void;
};

export { AuthContextProps };