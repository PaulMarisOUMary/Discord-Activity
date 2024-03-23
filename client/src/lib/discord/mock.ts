import { queryParams } from "../helper/helper";

enum SessionStorageQueryParam {
    user_id = 'user_id',
    guild_id = 'guild_id',
    channel_id = 'channel_id',
}

export function getOverrideOrRandomSessionValue(queryParam: `${SessionStorageQueryParam}`) {
    const overrideValue = queryParams.get(queryParam);
    if (overrideValue != null) {
        return overrideValue;
    }

    const currentStoredValue = sessionStorage.getItem(queryParam);
    if (currentStoredValue != null) {
        return currentStoredValue;
    }

    // Set queryParam to a random 8-character string
    const randomString = Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem(queryParam, randomString);
    return randomString;
}