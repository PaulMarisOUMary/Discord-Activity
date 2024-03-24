import { DiscordSDK, DiscordSDKMock } from "@discord/embedded-app-sdk";
import { isEmbedded } from "../helper/helper";
import { getOverrideOrRandomSessionValue } from "./mock";
import { DiscordAuthResponse } from "./types/responses";

class DiscordService {
    sdk: DiscordSDK | DiscordSDKMock;

    constructor() {
        if (isEmbedded()) {
            this.sdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
        } else {
            const mockUserId = getOverrideOrRandomSessionValue('user_id');
            const mockGuildId = getOverrideOrRandomSessionValue('guild_id');
            const mockChannelId = getOverrideOrRandomSessionValue('channel_id');

            this.sdk = new DiscordSDKMock(
                import.meta.env.VITE_DISCORD_CLIENT_ID,
                mockGuildId,
                mockChannelId
            )

            const discriminator = String(mockUserId.charCodeAt(0) % 5);

            this.sdk._updateCommandMocks({
                authenticate: async () => {
                    return await {
                        access_token: 'mock_token',
                        user: {
                            username: mockUserId,
                            discriminator,
                            id: mockUserId,
                            avatar: null,
                            public_flags: 1,
                        },
                        scopes: [],
                        expires: new Date(2112, 1, 1).toString(),
                        application: {
                            description: 'mock_app_description',
                            icon: 'mock_app_icon',
                            id: 'mock_app_id',
                            name: 'mock_app_name',
                        },
                    };
                },
            });
        }
    }

    async authorize() {
        const { code } = await this.sdk.commands.authorize({
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
        return code;
    }

    async authenticate(code: string) {
        const response = await fetch('/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
            }),
        });

        const { access_token }: { access_token: string} = await response.json();

        const auth: DiscordAuthResponse = await this.sdk.commands.authenticate({
            access_token,
        });

        return auth;
    }
}

const discord = new DiscordService();

export default discord;