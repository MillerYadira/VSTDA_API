const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

let todoItems = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

// Status message from server
app.get('/', (req, res) => {
    res.status(200).json({status: 'ok'});
});

// Read all Todo Items from list
app.get('/api/TodoItems', (req, res) => {
    res.status(200).json(todoItems);
});

// Read Single Todo Item from list
app.get('/api/TodoItems/:number', (req, res) => {
    const id = parseInt(req.params.number);
    const item = todoItems.find(todo => todo.todoItemId === id);

    if(item) {
        res.status(200).json(item);
    } else {
        res.json({error: 'Todo item not found'}).status(404);
    }
});

app.post('/api/TodoItems', (req, res) => {
    const newItem = {
        todoItemId: req.body.todoItemId,
        name: req.body.name,
        priority: req.body.priority,
        completed: req.body.completed
    };

    todoItems.push(newItem);
    res.status(201).json(newItem);
});

// Delete Single Todo Item from list
app.delete('/api/TodoItems/:number', (req, res) => {
    const id = parseInt(req.params.number);
    const itemIndex = todoItems.findIndex(todo => todo.todoItemId === id);

    if (itemIndex > -1) {
        const deletedItem = todoItems.splice(itemIndex, 1)[0];
        res.status(200).json(deletedItem);
    } else {
        res.status(404).json({ error: 'Todo item not found' });
    }
});

module.exports = app;
