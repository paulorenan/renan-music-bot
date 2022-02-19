const {player} = require(".");

module.exports = async (client, msg, args, command) => {
  if (command === "tocar") {
    const channel = msg.member.voice.channel;
    if (!channel) return msg.channel.send("Você não está em um canal de voz!");

    const search_music = args.join(" ");
    if (!search_music) return msg.channel.send("Você não especificou uma música!");

    const queue = player.createQueue(msg.guild.id, {
      metadata: {
        channel: msg.channel,
      },
    });

    try {
      if (!queue.connection) await queue.connect(channel);
    } catch (err) {
      queue.destroy();
      return await msg.reply({
        content: "Não foi possível conectar ao canal de voz!",
        ephemeral: true,
      })
    }

    const song = await player.search(search_music, {
      requestBy:msg.author,
    }).then((x) => x.tracks[0]);
    client.user.setActivity(song.title, { type: "LISTENING" });
    if (!song) return msg.channel.send(`Não foi possível encontrar a música ${search_music}.`);
    queue.play(song);

    msg.channel.send({content: `Buscando música ${song.title}...`});
  } else if (command === "pular") {
    const queue = player.getQueue(msg.guild.id);
    queue.skip();
    msg.channel.send("Pulando a música atual...");
  } else if (command === "parar") {
    const queue = player.getQueue(msg.guild.id);
    queue.stop();
    msg.channel.send("Parando a música atual...");
  } else if (command === "pausar") {
    const queue = player.getQueue(msg.guild.id);
    queue.setPaused(true);
    msg.channel.send("Pausando a música atual...");
  } else if (command === "resumir") {
    const queue = player.getQueue(msg.guild.id);
    queue.setPaused(false);
    msg.channel.send("Resumindo a música atual...");
  }
};