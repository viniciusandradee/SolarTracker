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

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { AuthSessionResult } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<firebaseAuth.User | null>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '473468402381-4u08vs09oq8cqvfq4tbaa70pf41lqgeg.apps.googleusercontent.com',
    });

    const authentication = async (email: string, password: string) => {
        firebaseAuth.signInWithEmailAndPassword(auth, email, password);
    };

    const registerWithEmail = async (email: string, password: string) => {
        try {
            const userCredential = await firebaseAuth.createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            await addDoc(collection(database, "users"), {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
            });
        } catch (error) {
            console.error("Erro ao registrar com e-mail e senha:", error);
        }
    };

    const signOut = async () => {
        await firebaseAuth.signOut(auth);
    };

    const handleGoogleLogin = async (): Promise<AuthSessionResult> => {
        const result = await promptAsync();
        if (result?.type === 'success') {
            const { id_token } = result.params;
            const credential = GoogleAuthProvider.credential(id_token);
            await signInWithCredential(auth, credential);
            setUser (auth.currentUser );
            setIsAuthenticated(true);
        } else {
            console.error("Erro ao fazer login com o Google:", result);
        }
        return result;
    };

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then((userCredential) => {
                    setUser (userCredential.user);
                    setIsAuthenticated(true);
                })
                .catch((error) => {
                    console.error("Erro ao fazer login com o Google:", error);
                });
        }
    }, [response]);

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
            setUser (user);
            setIsAuthenticated(!!user);
        });
        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider value={{isAuthenticated, authentication, registerWithEmail, signOut, handleGoogleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };