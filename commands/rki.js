const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const https = require('https');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rki')
        .setDescription('Nennt dir die 7-Tage-Inzidenz nach RKI')
        .addStringOption((option) =>
            option
                .setName("landkreis")
                .setDescription("oder kreisfreie Stadt")
                .setRequired(true)),

    async execute(interaction) {
        https.get('https://rki.beichlers.de/api?city=' + encodeURIComponent(interaction.options.get('landkreis').value), (resp) => {
            let data = '';
            if (resp.statusCode === 200) {
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                resp.on('end', () => {
                    data = JSON.parse(data);

                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(data['BEZ'] + " " + data['GEN'])
                                .setColor(0)
                                .addFields(
                                    {
                                        name: "7 Tage Inzidenz",
                                        value: data['cases7_per_100k'].toFixed(2),
                                        inline: false
                                    }, {
                                        name: "Stand",
                                        value: data['last_update'] ? data['last_update'] : '?',
                                        inline: false
                                    }
                                )
                                .setFooter({text: "Quelle: https://services7.arcgis.com/ (RKI)"})
                        ]
                    })
                });
            } else if (resp.statusCode === 404) {
                return interaction.reply({

                    embeds: [
                        new EmbedBuilder()
                            .setTitle(interaction.options.get('landkreis').value + ' wurde nicht gefunden.')
                            .setColor("Red")
                    ]
                })
            }
        })
    },
};