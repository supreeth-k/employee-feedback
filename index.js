var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')

var fs = require('fs');

var exphbs  = require('express-handlebars');
var app = express();

var jsonParser = bodyParser.json()
app.use(jsonParser);
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/css', express.static(path.join(__dirname, '/css')));
app.use('/js', express.static(path.join(__dirname, '/js')));
app.use('/libs', express.static(path.join(__dirname, '/libs')));
app.use('/html', express.static(path.join(__dirname, '/html')));
app.use('/img', express.static(path.join(__dirname, '/img')));

app.get('/', function(req,res) {
		res.render('initQuestion');
});

// app.get('/employeeDetails', function(req, res, next) {
// 	res.render('employeeDetails');
// });

app.get('/employeeDetails/:id', function(req, res, next) {
	res.render('employeeDetails', {action:'evalEmpDetails(this);'});
});

// app.get('/employeeDetails', function(req, res, next) {
// 	res.render('employeeDetails');
// });


app.get('/trans', function(req, res, next) {
	console.log(req.params);
	res.send('transparency');
});

app.get('/transparency', function(req, res, next) {
	console.log(req.body);
	res.render('transparency');
});

// app.post('/individualSummary',function(req, res, next) {
// 	console.log(req.body.header);
// 	console.log(req.body.val);

// 	 fs.appendFile(req.body.empID+'.json', req.body.header + ': ' + req.body.val + '\n', function (err) {
//   		if (err) throw err;
//   		console.log('File is created and data is appended successfully.');
//  }); 

//     res.send('abc');
// });

// app.post('/summary',function(req, res, next) {

// 	console.log(req.body);

// 	 fs.writeFile(req.body.empID+'.json', JSON.stringify(req.body), function (err) {
//   		if (err) throw err;
//   		console.log('File is created successfully.');
//  }); 

//     res.send('abc');
// });


app.listen(3000);