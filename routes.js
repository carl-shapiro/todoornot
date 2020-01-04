module.exports = function(app){
var Todo = require('./models/Todo');
var Category = require('./models/Category');
var ObjectId = require('mongoose').Types.ObjectId;


// define routes ============
// get all todos
app.get('/api/todos', function(req, res) {
    let query = {};
    //TODO: clean this up
    if(req.query.category != null && req.query.category != ""){
      query = { category: new ObjectId(req.query.category)};
    }
    // use mongoose to get all todos in the database
    Todo.find(query, function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        category: req.body.category,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

// create category and send back all categories after creation
app.post('/api/category', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Category.create({
        text : req.body.text
    }, function(err, category) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Category.find(function(err, categories) {
            if (err){
              res.send(err);
            }
            res.json(categories);
        });
    });
});
// get all categories
app.get('/api/categories', function(req, res) {

    // use mongoose to get all todos in the database
    Category.find(function(err, categories) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.json(categories); // return all todos in JSON format
    });
});
// application -------------------------------------------------------------
   app.get('*', function(req, res) {
       res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
   });
 }
