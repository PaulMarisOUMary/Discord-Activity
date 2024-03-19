# Discord Activity

- Create a `.env` file on the root directory with:
```
VITE_DISCORD_CLIENT_ID=xxxxxxxxxx
DISCORD_CLIENT_SECRET=xxxxxxxxxx
```

1. Start Client
`cd client; npm run dev`

2. Create Tunnel
`cloudflared tunnel --url http://localhost:5173`
Update the Mapping URL with your Tunnel URL

3. Start Server
`cd server; npm run dev`