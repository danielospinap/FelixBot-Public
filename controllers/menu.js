var mongoose = require('mongoose'),
    Menu = mongoose.model('Menu');
    Question = mongoose.model('Question');
    Option = mongoose.model('Option');

var questions;
var Member;
var channel;

function start(trigger, member) {
    // Question.findOneAndUpdate({keep:  { $eq: true}}, {keep: false}, function (err, doc) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(doc);
    // });

    Member = member;
    Menu.
        findOne({trigger: trigger}).
        populate({
            path: 'questions',
            populate: {path: 'options'}
        }).
        exec(function (err, mymenu) {
            if (err) {
                console.log(err);
            }
            channel = Member.guild.channels.get(mymenu.channel);
            questions = mymenu.questions;
            //console.log(member.guild.channels.get('436212991055364096').name);
            showMenu(mymenu);
        });
}

function showMenu(menu) {
    console.log(`${Member}`);
    sendQuestion(0);
}

function sendQuestion(questionIndex) {
    if (questionIndex < questions.length) {
        var statement = replaceStatementWithMember(questions[questionIndex].statement);
        channel.send(statement)
            .then(function(message) {
                addReactions(message, questionIndex, 0);
            })
            .catch();
    }
}

function replaceStatementWithMember(statement) {
    var statementParts = statement.split('@member');
    var newStatement = statementParts[0];

    for (var i = 1; i < statementParts.length; i++) {
        newStatement = newStatement + `${Member}` + statementParts[i];
    }
    return newStatement;
}

function addReactions(message, questionIndex, optionIndex) {
    if (optionIndex === 0) {
        identifyReaction(message, questionIndex);
    }

    if (optionIndex < questions[questionIndex].options.length) {
        var emoji = Member.guild.emojis.get(questions[questionIndex].options[optionIndex].emoji);
        if (!emoji) {
            emoji = questions[questionIndex].options[optionIndex].emoji;
        }
        message.react(emoji)
            .then(reaction => {
                addReactions(message, questionIndex, optionIndex+1);
            })
            .catch(console.log);
    }
}

function identifyReaction(message, questionIndex) {
    const filter = (reaction, user) => user.id === Member.id;
    const collector = message.createReactionCollector(filter, { time: 30000 });
    var myQuestion = questions[questionIndex];

    collector.on('collect', function(reaction) {
        for (var i = 0; i < myQuestion.options.length; i++) {
            if(reaction.emoji.id === myQuestion.options[i].emoji || reaction.emoji.name === myQuestion.options[i].emoji){
                collector.stop(`reacted with ${reaction.emoji.name}`);
                runAction(myQuestion.options[i].action, questionIndex, i);
            }
        }
    });
    collector.on('end', function (collected, reason) {
        console.log(reason);
        if (!questions[questionIndex].keep) {
            message.delete();
        }

        sendQuestion(questionIndex+1);
    });
}

function runAction(action, questionIndex, optionIndex) {
    if (action === 'addRole') {
        addRole(questionIndex, optionIndex);
    } else if (action === 'addAndRemoveRole') {
        addAndRemoveRole(questionIndex, optionIndex);
    }
}

function addRole(questionIndex, optionIndex) {
    roles = questions[questionIndex].options[optionIndex].params;

    for (var i = 0; i < roles.length; i++) {
        Member.addRole(Member.guild.roles.get(roles[i]));
    }
}

function addAndRemoveRole(questionIndex, optionIndex) {
    roles = questions[questionIndex].options[optionIndex].params;

    Member.addRole(Member.guild.roles.get(roles[0]));
    Member.removeRole(Member.guild.roles.get(roles[1]));
}


/*
function createMenu() {
/*    var newOption1 = new Option();
    newOption1.emoji = '🆗';
    newOption1.action = 'addAndRemoveRole';
    newOption1.params.push('Otako');
    newOption1.params.push('niu');
    newOption1.save(function (err, opt1) {
        if (err) {
            console.log(err);
        }
    });

}/*
    var newOption2 = new Option();
    newOption2.emoji = 'no';
    newOption2.action = 'nothing';
    //newOption2.params.push('Ultra master race');
    newOption2.save(function (err, opt2) {
        if (err) {
            console.log(err);
        }
    });
}

    var newQuestion = new Question();
    newQuestion.statement = '@member juegas Elsword?';
    newQuestion.save(function(err, question){
        if (err) {
            console.log(err);
        }
    });
}/*
    var newMenu = new Menu();
    newMenu.name = 'Bienvenida';
    newMenu.channel = 'canal bienvenida';
    newMenu.questions.push(newQuestion._id)
    newMenu.save(function (err, menu) {
        if (err) {
            console.log(err);
        }
        console.log(menu);
        console.log('\n\n\n\n\n');

        Menu.
            findOne({name: 'Bienvenida'}).
            populate({
                path: 'questions',
                populate: {path: 'options'}
            }).
            exec(function (err, mymenu) {
                if (err) {
                    console.log(err);

                }
                console.log(mymenu);
                console.log(mymenu.questions);
                console.log(mymenu.questions[0].options);


            })
    });
}

*/

/*
exports.create_a_task = function(req, res) {
    var new_task = new Task(req.body);
    new_task.save(function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  };
  */



module.exports = start;
