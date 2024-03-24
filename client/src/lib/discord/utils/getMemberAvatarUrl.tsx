import discord from '@/lib/discord/service';
import { Types } from '@discord/embedded-app-sdk';
import { IMember } from '../types/member';

interface GetMemberAvatarArgs {
    member: IMember | null;
    user: Partial<Types.User>;
    cdn?: string;
    size?: number;
}

export function getMemberAvatarUrl({
    member,
    user,
    cdn = `https://cdn.discordapp.com`,
    size = 256,
}: GetMemberAvatarArgs): string {
    const sdk = discord.sdk;

    if (member?.avatar != null && sdk.guildId != null) {
        return `${cdn}/guilds/${sdk.guildId}/users/${user.id}/avatars/${member.avatar}.png?size=${size}`;
    }
    if (user.avatar != null) {
        return `${cdn}/avatars/${user.id}/${user.avatar}.png?size=${size}`;
    }

    const defaultAvatarIndex = Math.abs(Number(user.id) >> 22) % 6;
    return `${cdn}/embed/avatars/${defaultAvatarIndex}.png?size=${size}`;
}