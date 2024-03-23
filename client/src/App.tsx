import { useRef } from 'react';

import DiscordService from './lib/discord/service';
import { appendVoiceChannelName, appendGuildAvatar } from './lib/discord/example';
import { isProduction } from './lib/helper/helper';

import rocketLogo from '@/assets/img/rocket.png'

import './App.css'

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  // Enable previewing the application in development mode without the need to test it within a Discord voice channel.
  if (isProduction()) {
    console.log("Using Discord SDK")
    const discord = new DiscordService()
    discord.setupSDK().then(async () => {
      console.log("Discord SDK is authenticated");

      await appendVoiceChannelName(discord, appRef);
      await appendGuildAvatar(discord, appRef);
    });
  } else {
    console.log("Not using SDK")
  }

  return (
    <div
      ref={appRef}
      className="container"
      >
      <img src={rocketLogo} className="logo" alt="Discord" />
      <h1>Hello world</h1>
    </div>
  )
}

export default App
