var mongoose = require('mongoose'),
    Menu = mongoose.model('Menu');
    Question = mongoose.model('Question');
    Option = mongoose.model('Option');

var questions;
var Member;
var channel;

function start(trigger, member) {
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
            //.catch();
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
            //.catch(console.log);
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
                runAction(myQuestion.options[i]);
            }
        }
    });
    collector.on('end', function (collected, reason) {
        console.log(reason);
        if (reason === 'time' && questions[questionIndex].default) {

            Question.findOne({_id: questions[questionIndex].id}).
            populate('default').
            exec(function (err, q) {
                runAction(q.default);
            });

        }
        if (!questions[questionIndex].keep) {
            message.delete();
        }

        sendQuestion(questionIndex+1);
    });
}

function runAction(option) {
    action = option.action;
    if (action === 'addRole') {
        addRole(option.params);
    } else if (action === 'addAndRemoveRole') {
        addAndRemoveRole(option.params);
    }
}

function addRole(roles) {
    for (var i = 0; i < roles.length; i++) {
        Member.addRole(Member.guild.roles.get(roles[i]));
    }
}

function addAndRemoveRole(roles) {
    Member.addRole(Member.guild.roles.get(roles[0]));
    Member.removeRole(Member.guild.roles.get(roles[1]));
}

module.exports = start;
