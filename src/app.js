import { Client } from 'tmi.js';
import { cursing } from './cursing';

const client = new Client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [ process.env.CHANNEL_NAME ]
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
  CheckCursing(tags, message, channel)
  if(self || !message.startsWith(process.env.PREFIX)) return;
  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();
  if(command === '명령어') {
    client.say(channel, "!명령어");
  }
})

function CheckCursing(tags, message, channel) {
  let CursingSendMessage= false

  CursingSendMessage = cursing.some(c => message.includes(c.toLowerCase()))

  if (CursingSendMessage) {
    client.say(channel, `@${tags.username}, 욕설이 감지되었습니다.`)
    client.deletemessage(channel, tags.id)
  }
}