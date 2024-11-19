import React, {
    createContext,
    PropsWithChildren,
    useEffect,
    useState,
} from "react";

import * as firebaseAuth from "firebase/auth";

import { auth, database } from "../../firebaseConfig";
import { AuthContextProps } from "@/types/context";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { AuthSessionResult } from "expo-auth-session";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<firebaseAuth.User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '473468402381-7v8i9ld37vrgns96a9v3s6iv0ess9pig.apps.googleusercontent.com',
        redirectUri: Platform.select({
            ios: 'https://auth.expo.io/@viniciusandradee/solartracker',
            android: 'https://auth.expo.io/@viniciusandradee/solartracker',
            default: 'http://localhost:8081',
        }),
    });

    const authentication = async (email: string, password: string) => {
        try {
            const userCredential = await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Erro ao autenticar:", error);
        }
    };


    const registerWithEmail = async (email: string, password: string) => {
        try {
            const userCredential = await firebaseAuth.createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);

            const userDocRef = doc(database, "users", userCredential.user.uid);
            await setDoc(userDocRef, {
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
        if (result?.type === "success") {
            const { id_token } = result.params;
            const credential = GoogleAuthProvider.credential(id_token);
            try {
                const userCredential = await signInWithCredential(auth, credential);
                setUser(userCredential.user);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Erro ao fazer login com o Google:", error);
            }
        } else {
            console.error("Login com Google não concluído:", result);
        }
        return result;
    };

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then((userCredential) => {
                    setUser(userCredential.user);
                    setIsAuthenticated(true);
                })
                .catch((error) => {
                    console.error("Erro ao fazer login com o Google:", error);
                });
        }
    }, [response]);

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsAuthenticated(!!user);
        });
        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider value={{ isAuthenticated, authentication, registerWithEmail, signOut, handleGoogleLogin, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };