const selfAssingRole = require('./utils/selfAssignRole');

module.exports = {
    name: 'messageReactionAdd',
    once: false,
    execute(messageReaction, user) {
        if (messageReaction.message.id == '782366487435542558') {
            selfAssingRole(messageReaction, user, 'add');
        }
    },
};