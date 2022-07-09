
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

exports.ShowRegistration = (req, res) => {
	return res.render('index.ejs');
}
exports.Create = async (req, res) => {
	if (!req.body.email || !req.body.username || !req.body.password || !req.body.passwordConf) {
		res.send();
	}
	else {
		if (req.body.password === req.body.passwordConf) {
			let Users = {};
			Users.email = req.body.email;
			Users.username = req.body.username;
			Users.password = req.body.password;
			// console.log(Users);
			// localStorage.setItem('allusers',Users);
			// JSON.parse((localStorage.getItem("allusers")))
			localStorage.setItem('allusers', JSON.stringify(Users));
			// console.log(JSON.parse((localStorage.getItem("allusers"))));

			// localStorage.setItem('pw', pw.value);
			// const users = new User(req.body);
			// try {
			// 	await users.save();
			res.send({
				"Success": "Success"
			});
			// } catch (error) {
			// 	res.status(500).send(error);
			// }
		}
		else {
			res.send({
				"Success": "password is not matched"
			});
		}
	}
}
exports.ShowLogin = (req, res) => {
	return res.render('login.ejs');
}
exports.CheckLogin = async (req, res) => {

	let data = JSON.parse((localStorage.getItem("allusers")));
	// let a =	localStorage.getItem("allusers")
	let email = data.email
	let password = data.password
	if (email = req.body.email) {
		if (password == req.body.password) {

			res.send({
				"Success": "Success!"
			});
		} else {
			res.send({
				"Success": "Wrong password!"
			});
		}
	}
	else {
		res.send({
			"Success": "This Email Is not regestered!"
		});
	}
}
exports.Dashboard = (req, res) => {
		return res.render('data.ejs');
}
exports.LogOut = (req, res) => {
	if (req.session) {
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/login');
			}
		});
	}
}

exports.AddTask = (req, res) => {
	if (req.body != undefined) {
		console.log(JSON.stringify(req.body))

		let taskArr = JSON.parse((localStorage.getItem("alltask"))) 
		 if( JSON.parse((localStorage.getItem("alltask"))) == undefined  ||  JSON.parse((localStorage.getItem("alltask"))) == null){
			taskArr=[]
		 }
		// let taskArr =[];
		let tasks = {};
		tasks.task = req.body.task;
		tasks.desciption = req.body.desciption;
		tasks.status = req.body.status;
		tasks.id = 2

		taskArr.push(tasks);

		localStorage.setItem('alltask', JSON.stringify(taskArr));
		console.log(JSON.parse((localStorage.getItem("alltask"))))
		res.send("hy");
	}
}

exports.TaskList = (req, res) => {
	let taskData = JSON.parse((localStorage.getItem("alltask")))
	res.send(taskData);
}

