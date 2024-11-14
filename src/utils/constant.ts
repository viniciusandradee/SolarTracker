import * as Google from "expo-auth-session/providers/google";

export const googleConfig = {
    clientId: '473468402381-4u08vs09oq8cqvfq4tbaa70pf41lqgeg.apps.googleusercontent.com',
};

export const useGoogleAuth = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: googleConfig.clientId,
    });

    return { request, response, promptAsync };
};