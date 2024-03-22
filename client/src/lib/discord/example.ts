import { RefObject } from "react";

import DiscordService from "./service";

export async function appendVoiceChannelName(discord: DiscordService, appRef: RefObject<HTMLDivElement>) {
    const sdk = discord.sdk;

    let activityChannelName = 'Unknown';

    // Requesting the channel in GDMs (when the guild ID is null) requires
    // the dm_channels.read scope which requires Discord approval.
    if (sdk.channelId != null && sdk.guildId != null) {
        // Over RPC collect info about the channel
        const channel = await sdk.commands.getChannel({channel_id: sdk.channelId});
        if (channel.name != null) {
        activityChannelName = channel.name;
        }
    }

    // Update the UI with the name of the current voice channel
    const textTagString = `Activity Channel: "${activityChannelName}"`;
    const textTag = document.createElement('p');
    textTag.innerHTML = textTagString;
    appRef.current?.appendChild(textTag);
}

export async function appendGuildAvatar(discord: DiscordService, appRef: RefObject<HTMLDivElement>) {
    const sdk = discord.sdk;
    const auth = discord.auth;

    // 1. From the HTTP API fetch a list of all of the user's guilds
    const guilds = await fetch(`https://discord.com/api/v10/users/@me/guilds`, {
        headers: {
        // NOTE: we're using the access_token provided by the "authenticate" command
        Authorization: `Bearer ${auth?.access_token}`,
        'Content-Type': 'application/json',
        },
    }).then((response) => response.json());

    // 2. Find the current guild's info, including it's "icon"
    const currentGuild = guilds.find((g: any) => g.id === sdk.guildId);

    // 3. Append to the UI an img tag with the related information
    if (currentGuild != null) {
        const guildImg = document.createElement('img');
        guildImg.setAttribute(
        'src',
        // More info on image formatting here: https://discord.com/developers/docs/reference#image-formatting
        `https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.webp?size=128`
        );
        guildImg.setAttribute('width', '128px');
        guildImg.setAttribute('height', '128px');
        guildImg.setAttribute('style', 'border-radius: 50%;');
        appRef.current?.appendChild(guildImg);
    }
}