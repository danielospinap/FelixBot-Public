var channel = "";
var stringsInicio = [];
var numPregunta = 0;

function inicio(member, strings) {
    stringsInicio = strings;
    channel = member.guild.channels.find('name', 'bienvenidos-bebes-de-luz');
    if (!channel) {
        console.log("No se encontró el canal.");
        return;
    }
    saludoInicial(member);
}

function saludoInicial(member) {
    var saludo = stringsInicio[0].saludo;
    var saludoPartes = saludo.split("@member");
    var salida = saludoPartes[0] + member + saludoPartes[1];
    var msg = channel.send(salida).then(msg => {agregarReacciones(member, msg)});
}

function agregarReacciones(member, msg) {
        msg.react(channel.guild.emojis.find('name', 'yes'));
        msg.react(channel.guild.emojis.find('name', 'no'));
        indentificarReaccion(member, msg);
}

function indentificarReaccion(member, msg){
    console.log("llego el mensaje");
    const filter =(reaction) => reaction.emoji.name === "yes" || reaction.emoji.name === "no";
    const collector = msg.createReactionCollector(filter, { time: 30000 });

    collector.on('collect', reaction => {
        reaction.fetchUsers().then(users => {
            var user = users.find('id', member.id);
            if(user != null){
                console.log(user.username + ' reacted with emoji ' + reaction.emoji.name);
                collector.stop();

                msg.delete();
                asignaRol(member, reaction.emoji.name);
            }
        });
    });
}

function milfsVSlolis(member) {
    channel.send(member + stringsInicio[1].milfsvslolis).then(msg => {
        agregarReacciones(member, msg);
    });
}

function geuvsgu(member) {
    channel.send(member + stringsInicio[2].geuvsgu).then(msg => {
        agregarReacciones(member, msg);
    });
}

function assvsoppai(member) {
    channel.send(member + stringsInicio[3].assvsoppai).then(msg => {
        agregarReacciones(member, msg);
    });
}

function imoutolover(member) {
    channel.send(member + stringsInicio[4].imoutolover).then(msg => {
        agregarReacciones(member, msg);
    });
}

function hentaiaddict(member) {
    channel.send(member + stringsInicio[5].hentaiaddict).then(msg => {
        agregarReacciones(member, msg);
    });
}

function astolfobestowaifu(member) {
    channel.send(member + stringsInicio[6].astolfobestowaifu).then(msg => {
        agregarReacciones(member, msg);
    });
}

function hailmoe(member) {
    channel.send(member + stringsInicio[7].hailmoe).then(msg => {
        agregarReacciones(member, msg);
    });
}

function pc(member) {
    channel.send(member + stringsInicio[8].pc).then(msg => {
        agregarReacciones(member, msg);
    });
}

function lol(member) {
    channel.send(member + stringsInicio[9].lol).then(msg => {
        agregarReacciones(member, msg);
    });
}

function tera(member) {
    channel.send(member + stringsInicio[10].tera).then(msg => {
        agregarReacciones(member, msg);
    });
}

function blackdesert(member) {
    channel.send(member + stringsInicio[11].blackdesert).then(msg => {
        agregarReacciones(member, msg);
    });
}

function wow(member) {
    channel.send(member + stringsInicio[12].wow).then(msg => {
        agregarReacciones(member, msg);
    });
}

function overwatch(member) {
    channel.send(member + stringsInicio[13].overwatch).then(msg => {
        agregarReacciones(member, msg);
    });
}

function csgo(member) {
    channel.send(member + stringsInicio[14].csgo).then(msg => {
        agregarReacciones(member, msg);
    });
}

function elsword(member) {
    channel.send(member + stringsInicio[15].elsword).then(msg => {
        agregarReacciones(member, msg);
    });
}

function minecraft(member) {
    channel.send(member + stringsInicio[16].minecraft).then(msg => {
        agregarReacciones(member, msg);
    });
}

function fin(member) {
    channel.send(member + " eso es todo, pásala bien en el server :uwu:\nRecuerda \
    poner el spam de los bots en donde corresponde :thisnigga: \n No dudes en preguntar \
    cualquier cosa a los miembros, puedes usar el @everyone cuando quieras :awww:");
}

function asignaRol(member, respuesta) {
    if(numPregunta == 0) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'Trap Lover'));
        } else if (respuesta === "no") {
            member.addRole(member.guild.roles.find('name', 'Trap Hater'));
        }
        numPregunta = numPregunta + 1;
        milfsVSlolis(member);
    } else if (numPregunta == 1) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'Milf Hunter'));
        } else if (respuesta === "no") {
            member.addRole(member.guild.roles.find('name', 'Loli Hunter'));
        }
        numPregunta = numPregunta + 1;
        geuvsgu(member);
    } else if (numPregunta == 2) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'Se dice Ge-U'));
        } else if (respuesta === "no") {
            member.addRole(member.guild.roles.find('name', 'Se dice GU'));
        }
        numPregunta = numPregunta + 1;
        assvsoppai(member);
    } else if (numPregunta == 3) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'Oppai Guy'));
        } else if (respuesta === "no") {
            member.addRole(member.guild.roles.find('name', 'Ass man'));
        }
        numPregunta = numPregunta + 1;
        imoutolover(member);
    } else if (numPregunta == 4) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'Imouto Lover'));
        }
        numPregunta = numPregunta + 1;
        hentaiaddict(member);
    } else if (numPregunta == 5) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'Hentai Addict'));
        }
        numPregunta = numPregunta + 1;
        astolfobestowaifu(member);
    } else if (numPregunta == 6) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'Astolfo besto waifu'));
        }
        numPregunta = numPregunta + 1;
        hailmoe(member);
    } else if (numPregunta == 7) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'Hail Moe UwU'));
        }
        numPregunta = numPregunta + 1;
        pc(member);
    } else if (numPregunta == 8) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'PC a Carbón + Hamster'));
        } else if (respuesta === "no") {
            member.addRole(member.guild.roles.find('name', 'Ultra master race'));
        }
        numPregunta = numPregunta + 1;
        lol(member);
    } else if (numPregunta == 9) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'League of Legends'));
        }
        numPregunta = numPregunta + 1;
        tera(member);
    } else if (numPregunta == 10) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'TERA'));
        }
        numPregunta = numPregunta + 1;
        blackdesert(member);
    } else if (numPregunta == 11) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'Black Desert'));
        }
        numPregunta = numPregunta + 1;
        wow(member);
    } else if (numPregunta == 12) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'WoW'));
        }
        numPregunta = numPregunta + 1;
        overwatch(member);
    } else if (numPregunta == 13) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'Overwaifu'));
        }
        numPregunta = numPregunta + 1;
        csgo(member);
    } else if (numPregunta == 14) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'C(amper de mierda)S:GO'));
        }
        numPregunta = numPregunta + 1;
        elsword(member);
    } else if (numPregunta == 15) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'Elsword'));
        }
        numPregunta = numPregunta + 1;
        minecraft(member);
    } else if (numPregunta == 16) {
        if (respuesta === "yes") {
            member.addRole(member.guild.roles.find('name', 'RataCraft'));
        }
        numPregunta = numPregunta + 1;
        fin(member);
    }
}

module.exports = inicio;
