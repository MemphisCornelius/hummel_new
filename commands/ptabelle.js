const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ptabelle')
        .setDescription('Gibt dir die Deklinationstabelle für ein bestimmtes Pronomen')
        .addRoleOption((option) => option.setName("rolle").setDescription("Pronomenrolle").setRequired(true)),

    async execute(interaction) {
        let rollenname = interaction.guild.roles.cache.get(interaction.options.get('rolle').value).name;
        let existiert = false;
        let pronomen = [];
        let plural = false;
        console.log(rollenname);


        if (rollenname.includes("Pronomen:")) {
            existiert = true;

            if (rollenname.includes("er")) {
                pronomen = ["er", "sein", "ihm", "ihn"];
            } else if (rollenname.includes("sie")) {
                pronomen = ["sie", "ihr", "ihr", "sie"];
            } else if (rollenname.includes("sier")) {
                pronomen = ["sier", "sies", "siem", "sien"];
            } else if (rollenname.includes("ese")) {
                pronomen = ["ese", "eses", "ese", "ese"];
            } else if (rollenname.includes("dey")) {
                pronomen = ["dey", "deren", "denen/dey/dem", "dey/dem"];
            } else if (rollenname.includes("xier")) {
                pronomen = ["xier", "xieser", "xiem", "xien"];
            } else if (rollenname.includes("they")) {
                pronomen = ["they", "their", "them", "them"];
            } else if (rollenname.includes("die")) {
                pronomen = ["die", "deren", "denen", "die"];
            }
        }

        if (existiert) {
            return interaction.reply({
                content: ' ',
                embeds: [
                    new EmbedBuilder().setTitle("Rollenname").setColor("white").addFields({

                            name: '__**Deklination**__',
                            value: `Nominativ: ${pronomen[0]}
                                        Genitiv: ${pronomen[1]}
                                        Dativ: ${pronomen[2]}
                                        Akkusativ: ${pronomen[3]}`
                        },
                        {
                            name: `__**Beispielsätze:**__`,
                            value: `**${pronomen[0].charAt(0).toUpperCase() + pronomen[0].slice(1)}** ${plural ? 'sind' : 'ist'} so süß.
                                    Ist das **${pronomen[1]}** Hund?
                                    Ich bin **${pronomen[2]}** erst kürzlich begegnet.
                                    Ich verstehe **${pronomen[3]}** so gut`
                        }
                    )
                ]
            });

        } else {
            return interaction.reply({
                embeds:
                    [new EmbedBuilder().setColor("Red").setTitle("Zu dieser Rolle exestiert keine Deklinationstabelle")]
            });
        }
    },
};