import { User } from "firebase/auth";

type AuthContextProps = {
  user?: User | null;
  isAuthenticated: boolean;
  authentication: (email: string, password: string) => void;
  registerWithEmail: (email: string, password: string) => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
};

export { AuthContextProps };