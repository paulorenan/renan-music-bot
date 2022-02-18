const { Client } = require("discord.js");
const { Player } = require("discord-player");

const client = new Client({
  restTimeOffset: 0,
  shards: "auto",
  intents: 641,
});

const player = new Player(client, {
  leaveOnEmpty: true,
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmptyCooldown: 5000,
  autoSelfDeaf: true,
  initialVolume: 50,
  bufferingTimeout: 3000,
});

module.exports = {
  client,
  player,
}; // a