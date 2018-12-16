var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

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


function get_connection() {
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'Anasuya13',
      database : 'employee_feedback'
    });
    connection.connect();
    return connection;
}

var empAction;

app.get('/', function(req,res) {
		res.render('initQuestion');
});

app.get('/employeeDetails', function(req, res, next) {
	res.render('employeeDetails');
});


app.get('/employeeDetails/:id', function(req, res, next) {
	empAction = req.params.id;
	console.log(empAction);
	res.render('employeeDetails');
});

app.post('/feedbackBy', function(req, res, next) {
  empAction = req.body.userAction;
  empId = req.body.empID;

console.log(empId);

  if(empAction == 'evalSelf') {

    fs.appendFile(__dirname+'/reports/'+req.body.empID+'.txt', 'Feedback of the employee \n', function (err) {
      if (err) throw err;
        console.log('Header is appended successfully.');
     }); 
  }

  else if(empAction == 'evalSub') {

      fs.appendFile('/reports/'+req.body.empID+'_manager.txt', "Feedback of the employee's _manager", + '\n', function (err) {
      if (err) throw err;
      console.log('Header is appended successfully.');
    }); 
  }
});


app.post('/isFeedbackGiven', function(req, res, next) {

	var empId = req.body.empID;
	 
	var stmt = "select emp_self from feedback_status where empId = ?";
	var stmt1 = "update feedback_status set emp_self = ? where empId = ?";
	var loggedIn = 1;
    var connection = get_connection();
    connection.query(stmt,empId,function(error, results, fields){
            if(results[0].emp_self === 0) {
            	console.log(results[0].emp_self, 'results[0].emp_self');
            	connection.query(stmt1,[loggedIn,empId], function(error, result, fields) {
            		console.log(result);
            		res.render('employeeDetails');
            		console.log(empId, loggedIn);
            });
           }
            else if (results[0].emp_self === 1) {
            	res.send('Error');
            }
    	});
});

app.post('/employeeDetails', function(req, res, next) {

  var subEmpId = req.body.subEmpId;
   
  var stmt = "select emp_self,emp_mgr from feedback_status where empId = ?";
  var stmt1 = "update feedback_status set emp_mgr= ? where empId = ?";
  var loggedIn = 1;
    var connection = get_connection();
    connection.query(stmt,subEmpId,function(error, results, fields){
            if(results[0].emp_self === 1 && results[0].emp_mgr === 0) {
              console.log(results[0].emp_self, 'results[0].emp_self');
              console.log(results[0].emp_mgr, 'results[0].emp_mgr');
              connection.query(stmt1,[loggedIn,subEmpId], function(error, result, fields) {
                console.log(result);
                res.send('abc');
                console.log(subEmpId, loggedIn);
            });
           }
            else if (results[0].emp_mgr === 1) {
              res.send('Error');
            }
      });
});

app.post('/insertTitle',function(req, res, next) {
	console.log(req.body.title);
  if(req.body.userAction == 'evalSelf') {

      fs.appendFile(__dirname+'/reports/'+req.body.empID+'.txt', req.body.title + ':' + '\n \n', function (err) {
      if (err) throw err;
      console.log('Title is appended successfully.');
  }); 

}
  else if(req.body.userAction == 'evalSub') {

        fs.appendFile(__dirname+'/reports/'+req.body.empID+'_manager.txt', req.body.title + ':' + '\n \n', function (err) {
        if (err) throw err;
        console.log('Title is appended successfully.');
    }); 
  }

});


app.post('/individualSummary',function(req, res, next) {
	console.log(req.body.header);
	console.log(req.body.val);

  if(req.body.userAction == 'evalSelf') {

      fs.appendFile(__dirname+'/reports/'+req.body.empID+'.txt', req.body.header + ': ' + req.body.val + '\n', function (err) {
      if (err) throw err;
      console.log('File is created and data is appended successfully.');
    }); 
  }

  else if (req.body.userAction == 'evalSub') {

      fs.appendFile(__dirname+'/reports/'+req.body.empID+'_manager.txt', req.body.header + ': ' + req.body.val + '\n', function (err) {
      if (err) throw err;
      console.log('File is created and data is appended successfully.');
    }); 
  }

});


app.get('/download/:id', function(req, res){

  var empId = req.params.id;
  console.log(empId);
  var file = __dirname + '/reports/'+empId+'.txt';
  console.log(file, 'fileName');
  res.download(file);
});


app.post('/newLine',function(req, res, next) {

	 fs.appendFile(req.body.empID+'.txt', '\n \n', function (err) {
  		if (err) throw err;
  		console.log('New line is appended successfully.');
 }); 

});

app.post('/summary',function(req, res, next) {

	console.log(req.body);

	 fs.writeFile(req.body.empID+'.json', JSON.stringify(req.body), function (err) {
  		if (err) throw err;
  		console.log('File is created successfully.');
 }); 

    res.send('abc');
});

app.listen(3000);