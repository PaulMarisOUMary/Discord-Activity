import { DiscordSDK, DiscordSDKMock } from "@discord/embedded-app-sdk";
import { isEmbedded } from "../helper/helper";
import { getOverrideOrRandomSessionValue } from "./mock";

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
}
export default DiscordService;