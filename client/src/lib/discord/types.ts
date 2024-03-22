export type DiscordAuthResponse = {
    access_token: string;
    user: {
        username: string;
        discriminator: string;
        id: string;
        public_flags: number;
        avatar?: string | null | undefined;
        global_name?: string | null | undefined;
    };
    scopes: (
        -1 | "identify" | "email" | "connections" | "guilds" | "guilds.join" |
        "guilds.members.read" | "gdm.join" | "rpc" | "rpc.notifications.read" |
        "rpc.voice.read" | "rpc.voice.write" | "rpc.video.read" | "rpc.video.write" |
        "rpc.screenshare.read" | "rpc.screenshare.write" | "rpc.activities.write" |
        "bot" | "webhook.incoming" | "messages.read" | "applications.builds.upload" |
        "applications.builds.read" | "applications.commands" | "applications.commands.update" |
        "applications.commands.permissions.update" | "applications.store.update" |
        "applications.entitlements" | "activities.read" | "activities.write" |
        "relationships.read" | "voice" | "dm_channels.read" | "role_connections.write"
    )[];
    expires: string;
    application: {
        id: string;
        description: string;
        name: string;
        icon?: string | null | undefined;
        rpc_origins?: string[] | undefined;
    };
} | null;