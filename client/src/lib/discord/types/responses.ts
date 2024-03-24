import discord from "../service";
import type {AsyncReturnType} from 'type-fest';

export type TAuthenticateResponse = AsyncReturnType<typeof discord.sdk.commands.authenticate>;