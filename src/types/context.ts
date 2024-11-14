import { User } from "firebase/auth";
import { AuthSessionResult } from "expo-auth-session";


type AuthContextProps = {
  user?: User | null;
  isAuthenticated: boolean;
  authentication: (email: string, password: string) => void;
  registerWithEmail: (email: string, password: string) => void;
  signOut: () => void;
  handleGoogleLogin: () => Promise<AuthSessionResult>;
};

export { AuthContextProps };