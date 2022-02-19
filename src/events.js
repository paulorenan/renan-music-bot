const {player} = require(".");

module.exports = async () => {
  player.on("trackStart", async (queue, track) => {
    queue.metadata.channel.send(`Tocando agora: ${track.title}`);
  });
};
