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



module.exports = router;