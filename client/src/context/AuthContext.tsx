import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

import discord from '@/lib/discord/service';
import { TAuthenticateResponse } from '@/lib/discord/types/responses';

import LoadingComp from '@/components/loading/loading';
import { IMember } from '@/lib/discord/types/member';
import { Types } from '@discord/embedded-app-sdk';


export type TAuthenticatedContext = TAuthenticateResponse & { user: Partial<Types.User>} & { member: IMember | null};

const AuthContext = createContext<TAuthenticatedContext>({
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
    member : null
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
    const [auth, setAuth] = useState<TAuthenticatedContext | null>(() => {
        // Check if auth context exists in local storage
        // const storedAuth = localStorage.getItem("discord-activity-auth");
        // storedAuth ? console.log("AuthCtx: using local storage", storedAuth) : console.log("AuthCtx: using auth")
        
        // return storedAuth ? JSON.parse(storedAuth) : null;
        return null
    });
    const settingUp = useRef(false);

    useEffect(() => {
        const setUpDiscordSdk = async () => {
            await discord.sdk.ready();

            const code = await discord.authorize();
            const newAuth = await discord.authenticate(code);

            const member = await discord.getMember(newAuth.access_token);

            localStorage.setItem("discord-activity-auth", JSON.stringify(newAuth));

            setAuth({ ...newAuth, member: member });
        };

        if (!settingUp.current) {
            settingUp.current = true;
            setUpDiscordSdk();
        }
    }, []);

    return auth;
}