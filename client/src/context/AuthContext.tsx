import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';

import DiscordService from '@/lib/discord/service';
import { DiscordAuthResponse } from '@/lib/discord/types';

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
            const discord = new DiscordService();
            const sdk = discord.sdk;
            await sdk.ready();

            const { code } = await sdk.commands.authorize({
                client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
                response_type: 'code',
                state: '',
                prompt: 'none',
                // More info on scopes here: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
                scope: [
                    // "applications.builds.upload",
                    // "applications.builds.read",
                    // "applications.store.update",
                    // "applications.entitlements",
                    // "bot",
                    'identify',
                    // "connections",
                    // "email",
                    // "gdm.join",
                    'guilds',
                    // "guilds.join",
                    'guilds.members.read',
                    // "messages.read",
                    // "relationships.read",
                    // 'rpc.activities.write',
                    // "rpc.notifications.read",
                    // "rpc.voice.write",
                    'rpc.voice.read',
                    // "webhook.incoming",
                ],
            });

            const response = await fetch('/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code,
                }),
            });
            const { access_token } = await response.json();

            const newAuth: DiscordAuthResponse = await sdk.commands.authenticate({
                access_token,
            });

            setAuth({ ...newAuth });
        };

        if (!settingUp.current) {
            settingUp.current = true;
            setUpDiscordSdk();
        }
    }, []);

    return auth;
}