var express = require('express');
var router = express.Router();
var user = require('../Controllers/user.controller');

router.get('/', user.ShowRegistration);
router.post('/', user.Create);
router.get('/login', user.ShowLogin);
router.post('/login', user.CheckLogin);
router.get('/dashboard', user.Dashboard);
router.get('/logout', user.LogOut);

router.post('/addTask', user.AddTask);
router.get('/tasklist', user.TaskList);

router.post('/deleteTask', user.DeleteTask);
router.post('/movetask', user.MoveTask);
router.post('/allMovetask', user.AllMovetask);



module.exports = router;