
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
			
			localStorage.setItem('allusers', JSON.stringify(Users));
			
			res.send({
				"Success": "Success"
			});
			
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
		tasks.id = Math.floor(Math.random() * 10000)

		taskArr.push(tasks);

		localStorage.setItem('alltask', JSON.stringify(taskArr));
		console.log(JSON.parse((localStorage.getItem("alltask"))))
		res.send(taskArr);
	}
}

exports.TaskList = (req, res) => {
	let taskData = JSON.parse((localStorage.getItem("alltask")))
	res.send(taskData);
}

exports.DeleteTask = (req, res) => {
	if(req.body.id != undefined){
		const taskData = JSON.parse((localStorage.getItem("alltask")));

		taskData.forEach(function (value, i) {
			if(value.id == req.body.id){
			taskData.splice(i,1)
			}
		});
		localStorage.removeItem("alltask");
		localStorage.setItem('alltask', JSON.stringify(taskData));
		res.send(taskData)
		
	}
}
exports.AllMovetask = (req, res) => {
	const taskData = JSON.parse((localStorage.getItem("alltask")));
	let reqArr  = req.body
	for (let key in reqArr) {
		if('selectTa[]' == key){
			reqArr[key].forEach(element => {
				taskData.forEach(function (value, i) {
					if(value.id == element){
						if(value.status ==  1){
							value.status = 2;
						}
						else if(value.status == 2){
							value.status = 1;
						}
					}
				});
			});
		}
	  }
	  localStorage.removeItem("alltask");
	  localStorage.setItem('alltask', JSON.stringify(taskData));
	  res.send(taskData)

}

	exports.MoveTask = (req, res) => {
		if(req.body.id != undefined){
			const taskData = JSON.parse((localStorage.getItem("alltask")));
			taskData.forEach(function (value, i) {
				if(value.id == req.body.id){
					console.log(value.status)
					if(value.status ==  1){
						value.status = 2;
					}
					else{
						value.status = 1;
					}
					console.log(value.status)
				}
			});
			localStorage.removeItem("alltask");
			localStorage.setItem('alltask', JSON.stringify(taskData));
			res.send(taskData)
		}
	}
	
