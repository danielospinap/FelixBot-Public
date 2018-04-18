var mongoose = require('mongoose'),
    Menu = mongoose.model('Menu');
    Question = mongoose.model('Question');
    Option = mongoose.model('Option');

function start() {
    console.log('holi');
    createMenu();
}

function createMenu() {
    var newOption1 = new Option();
    newOption1.emoji = '🆗';
    newOption1.action = 'addAndRemoveRole';
    newOption1.params.push('Otako');
    newOption1.params.push('niu');
    newOption1.save(function (err, opt1) {
        if (err) {
            console.log(err);
        }
    });


    var newOption2 = new Option();
    newOption2.emoji = 'no';
    newOption2.action = 'nothing';
    newOption2.save(function (err, opt2) {
        if (err) {
            console.log(err);
        }
    });

    var newQuestion = new Question();
    newQuestion.statement = 'pregunta1';
    newQuestion.options.push(newOption1._id);
    newQuestion.options.push(newOption2._id);
    newQuestion.save(function(err, question){
        if (err) {
            console.log(err);
        }
    });
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
