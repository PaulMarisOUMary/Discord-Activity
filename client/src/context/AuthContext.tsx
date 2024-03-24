import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

import discord from '@/lib/discord/service';
import { DiscordAuthResponse } from '@/lib/discord/types/responses';

import LoadingComp from '@/components/loading/loading';

const AuthContext = createContext<DiscordAuthResponse>({
    user: {
        id: '',
        username: '',
        discriminator: '',
        avatar: null,
        public_flags: 0,
    },
    access_token: '',
    scopes: [],
    expires: '',
    application: {
        rpc_origins: undefined,
        id: '',
        name: '',
        icon: null,
        description: '',
    },
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const authenticatedContext = useAuthContextSetup();

    if (authenticatedContext == null) {
        return <LoadingComp />;
    }

    return <AuthContext.Provider value={authenticatedContext}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}

function useAuthContextSetup() {
    const [auth, setAuth] = useState<DiscordAuthResponse | null>(null);
    const settingUp = useRef(false);

    useEffect(() => {
        const setUpDiscordSdk = async () => {
            await discord.sdk.ready();

            const code = await discord.authorize();
            const newAuth = await discord.authenticate(code);


            setAuth({ ...newAuth });
        };

        if (!settingUp.current) {
            settingUp.current = true;
            setUpDiscordSdk();
        }
    }, []);

    return auth;
}