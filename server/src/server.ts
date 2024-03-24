import { app } from "./app"

import { Request, Response } from 'express';
import dotenv from "dotenv";
import { OAuth2TokenResponse } from "./types";

dotenv.config({ path: "../.env" });

const port = app.get("port");

app.post("/api/token", async (req: Request, res: Response) => {

    // Exchange the code for an access_token
    const response = await fetch(`https://discord.com/api/oauth2/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: process.env.VITE_DISCORD_CLIENT_ID!,
            client_secret: process.env.DISCORD_CLIENT_SECRET!,
            grant_type: "authorization_code",
            code: req.body.code,
        }),
    });

    // Retrieve the access_token from the response
    const { access_token } : OAuth2TokenResponse = await response.json();

    // Return the access_token to our client as { access_token: "..."}
    res.send({ access_token });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
