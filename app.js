const express = require('express');

// acquire dotenv file
const dotenv = require('dotenv');
dotenv.config();

// db config
const connect_to_db = require('./config/db');
connect_to_db();

const taskModel = require('./models/task')

// instantiate app
const app = express();



app.set('view engine', 'ejs');

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


// routes

app.get('/', async (req, res) => {
    const all_tasks = await taskModel.find()
    res.render('index', {'tasks': all_tasks})
})

app.post('/addtask', async (req, res) => {
    const{categories, description} = req.body;
    const newTask = await taskModel.create({
        category: categories,
        task: description,
        Status: 'Incomplete'
    });
    res.redirect('/');
})

app.post('/save-changes', async (req, res) => {
    if (Object.entries(req.body).length == 0) {
        return res.status(400).status({
            'message': 'nothing to update'
        });
    }
    const completedTasks = Object.keys(req.body);
    try {
        for (const element of completedTasks) {
            const result = await taskModel.findByIdAndUpdate(element, {
                Status: 'Complete'
            }).exec();
        }
    } catch (error) {
        res.status(400).json({
            'error': 'can not save changes.',
            'description': err
        })
    }

    res.redirect('/')
})

app.post('/clear-history', async (req, res) => {
    const all_tasks = await taskModel.find()
    for (const element of all_tasks) {
        if (element.Status == 'Complete') {
            await taskModel.findByIdAndDelete(element._id)
        }
    }
    res.redirect('/');
})

app.post('/filter-task',async (req, res) => {
    const filterCategory = req.body.categories;
    const result = await taskModel.find({
        category: filterCategory
    });

    if (Object.keys(result).length < 1) {
        return res.render('index', {
            tasks: [],
            filterMessage: 'No tasks found for this category.'
        });
    }else{
        return res.render('index', {
            tasks: result,
            filterMessage: null
        });
    };
})

app.listen(3000)