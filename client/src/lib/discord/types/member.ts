export interface IMember {
    avatar: string | null,
    communication_disabled_until: string | null,
    flags: number,
    joined_at: string,
    nick: string | null,
    pending: boolean,
    premium_since: string | null,
    roles: string[],
    unusual_dm_activity_until: string | null,
    user: {
        id: string,
        username: string,
        avatar: string,
        discriminator: string,
        public_flags: number,
        premium_type: number,
        flags: number,
        banner: string,
        accent_color: number,
        global_name: string,
        avatar_decoration_data: {
            asset: string,
            sku_id: string
        },
        banner_color: string
    },
    mute: boolean,
    deaf: boolean,
    bio: string,
    banner: string
}