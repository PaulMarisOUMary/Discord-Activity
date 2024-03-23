import { DiscordSDK } from "@discord/embedded-app-sdk";
import { DiscordAuthResponse } from "./types";

class DiscordService {
    sdk: DiscordSDK;
    auth?: DiscordAuthResponse;

    constructor() {
        this.sdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
    }

    async setupSDK() {
        await this.sdk?.ready();

        console.log("Discord SDK is ready");
    
        // Authorize with Discord Client
        const { code } = await this.sdk.commands.authorize({
            client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
            response_type: "code",
            state: "",
            prompt: "none",
            scope: [
                "identify",
                "guilds",
            ],
        });
    
        // Retrieve an access_token from your activity's server
        const response = await fetch("/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code,
            }),
        });
        const { access_token } = await response.json();
    
        // Authenticate with Discord client (using the access_token)
        this.auth = await this.sdk.commands.authenticate({
            access_token,
        });
    
        if (this.auth == null) {
            throw new Error("Authenticate command failed");
        }
    }
}
export default DiscordService;