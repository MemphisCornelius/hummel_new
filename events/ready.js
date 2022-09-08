module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        //fetch message for pronoun roles
        client.channels.fetch('464080013675724804').then(channel => channel.messages.fetch('1017452520194461706'));

        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};