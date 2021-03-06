const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const color = require("../../../json/Color.json")

let cooldown = new Set();

module.exports = {
  data: new SlashCommandBuilder().setName("bot-info").setDescription("Quieres saber mas sobre mi usa este comando"),

  async run(client, interaction) {
    if (cooldown.has(interaction.member.id)) {
      interaction.reply("Estas en cooldown");

      return;
    }

    cooldown.add(interaction.member.id);
    setTimeout(() => {
      cooldown.delete(interaction.member.id);
    }, 5000);

    const botEmbed = new MessageEmbed()
    .setTitle("Bot info")
    .addField("๐|ID", `${client.user.id}`)
    .addField("๐ค|Nombre", `${client.user.username}`)
    .addField("๐ค|Tag", `#${client.user.discriminator}`)
    .addField("๐ค|Color", `#${color.BotColor}`)
    .addField("๐ฎโโ๏ธ|Creador", `alwes#4585`)
    .addField("๐ผ|Agradecimientos", `GatoUsualโจ#4660`)
    .addField("๐โ๐ฆบ|Servers", `${client.guilds.cache.size}`, true)
    .addField("๐|Creacion", `<t:${Math.floor(client.user.createdAt / 1000)}>`, true)
    .addField("๐จโ๐ง|Support", `[Aqui](https://discord.gg/uV78S3KmBh)`, true)
    .addField("โ |Comandos", `${client.slashCommands.size}`, true)
    .addField("๐ป|Memoria", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .setColor(color.BotColor)
    .setTimestamp();

    interaction.reply({ embeds: [botEmbed] });
  },
};