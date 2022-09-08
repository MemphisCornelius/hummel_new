module.exports = function execute(reac, usr, aor) {
    let pronR = '';
    switch (reac.emoji.name) {
        case 'sieihr':
            pronR = '782370266847903764';
            break;
        case 'erihm':
            pronR = '782369738579116032';
            break;
        case 'name':
            pronR = '782370475384373279';
            break;
        case 'frag':
            pronR = '782370319905193994';
            break;
        case 'egal':
            pronR = '782372086717874218';
            break;
        case '🇸':
            pronR = '838122960283500575';
            break;
        case '🇩':
            pronR = '838123019829248040';
            break;
        case '🇽':
            pronR = '838122994324733972';
            break;
        case '🇪':
            pronR = '838123204668555274';
            break;
        case '🇦':
            pronR = '838123078704824342';
            break;

        default:
            pronR = 'noRole';
            break;
    }

    if (pronR !== 'noRole') {
        //get role from roleid
        const role = reac.message.guild.roles.cache.find(r => r.id === pronR);

        //get member from user
        const member = reac.message.guild.members.cache.find(member => member.id === usr.id);

        //add or remove role from member
        switch (aor) {
            case 'add':
                member.roles.add(role);
                break;
            case 'rem':
                member.roles.remove(role);
                break;
        }
    }
}