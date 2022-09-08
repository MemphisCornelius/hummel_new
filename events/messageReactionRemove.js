const selfAssingRole = require('./utils/selfAssignRole');

module.exports = {
    name: 'messageReactionRemove',
    once: false,
    execute(messageReaction, user) {
        if (messageReaction.message.id == '782366487435542558') {
            selfAssingRole(messageReaction, user, 'rem');
        }
    },
};