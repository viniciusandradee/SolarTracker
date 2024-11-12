import React, {
    createContext,
    PropsWithChildren,
    useEffect,
    useState,
} from "react";

import * as firebaseAuth from "firebase/auth";

import { auth, database } from "../../firebaseConfig";
import { AuthContextProps } from "@/types/context";
import { collection, addDoc } from "firebase/firestore";

import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<firebaseAuth.User | null>();

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "473468402381-4u08vs09oq8cqvfq4tbaa70pf41lqgeg.apps.googleusercontent.com",
    });

    const authentication = async (email: string, password: string) => {
        firebaseAuth.signInWithEmailAndPassword(auth, email, password);
    };

    const signOut = async () => {
        await firebaseAuth.signOut(auth);
    };

    const signInWithGoogle = async () => {
        try {
            const result = await promptAsync();
            if (result.type === "success" && result.authentication?.idToken) {
                const credential = GoogleAuthProvider.credential(result.authentication.idToken);
                await signInWithCredential(auth, credential);
            }
        } catch (error) {
            console.error("Erro ao autenticar com o Google:", error);
        }
    };


    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{authentication, signOut, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };