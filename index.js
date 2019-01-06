var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var concat = require('concat-files');
var fs = require('fs');
var concat = require('concat-files');

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

app.post('/isFeedbackGiven', function(req, res, next) {

	var empId = req.body.empID;
  console.log(empId);
	 
	var stmt = "select emp_self from feedback_status where empId = ?";
	var stmt1 = "update feedback_status set emp_self = ? where empId = ?";
	var loggedIn = 1;
    var connection = get_connection();
    connection.query(stmt,empId,function(error, results, fields){

        if(results.length == 0) {
          console.log(results.length);
            res.send('Empty');
            return;
        }
        else if(results[0].emp_self === 0) {
            	console.log(results[0].emp_self, 'results[0].emp_self');
            	connection.query(stmt1,[loggedIn,empId], function(error, result, fields) {

        fs.appendFile(__dirname+'/reports/'+empId+'.txt', "Employee's feedback:" + '\n\n', function (err) {
              if (err) throw err;
              console.log("Employee's feedback is appended successfully.");
      }); 
            		console.log(result);
            		res.render('employeeDetails');
            		console.log(empId, loggedIn);
            });
           }
             if (results[0].emp_self === 1) {
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

          if(results.length == 0) {
            res.send('Empty');
          }
           else if(results[0].emp_self === 1 && results[0].emp_mgr === 0) {
              console.log(results[0].emp_self, 'results[0].emp_self');
              console.log(results[0].emp_mgr, 'results[0].emp_mgr');
              connection.query(stmt1,[loggedIn,subEmpId], function(error, result, fields) {

      fs.appendFile(__dirname+'/reports/'+subEmpId+'_manager.txt', '\n\n' + "Manager's feedback:" + '\n\n', function (err) {
              if (err) throw err;
              console.log("Manager's feedback is appended successfully.");
      }); 
                res.send('abc');
            });
           }
            else if (results[0].emp_mgr === 1) {
              //console.log(results[0].emp_mgr);
              res.send('Error');
            }
             else if (results[0].emp_self === 0) {
              //console.log(results[0].emp_self);
              res.send('NotDone');
            }
            else if(error) {
              console.log(error);
            }
      });
});

app.post('/insertTitle',function(req, res, next) {
	console.log(req.body.title);
  if(req.body.userAction == 'evalSelf') {
    console.log(__dirname);
      fs.appendFile(__dirname+'/reports/'+req.body.empID+'.txt','\n\n' + req.body.title + ':' + '\n \n', function (err) {
      if (err) throw err;
      console.log('Title is appended successfully.');
  }); 

}
  else if(req.body.userAction == 'evalSub') {

      console.log(req.body.empID, 'insertTitle');

        fs.appendFile(__dirname+'/reports/'+req.body.empID+'_manager.txt','\n\n' + req.body.title + ':' + '\n \n', function (err) {
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

      fs.appendFile(__dirname+'/reports/'+req.body.empID+'_manager.txt',req.body.header + ': ' + req.body.val + '\n', function (err) {
      if (err) throw err;
      console.log('File is created and data is appended successfully.');
    }); 
  }

});


app.get('/download/:id', function(req, res){

  var empId = req.params.id;
  console.log(empId);
  var file = __dirname + '/reports/'+empId+'-comparison.txt';
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

  var emp = req.body.empID+'.txt'
  var mgr = req.body.empID+'_manager.txt'

   var empN = req.body.empID;

  concat([
    __dirname+'/reports/'+emp,
    __dirname+'/reports/'+mgr,
  ], __dirname+'/reports/'+empN+'-comparison.txt', function(err) {
    if (err) throw err
    console.log('done');
  });


	console.log(req.body);

	 fs.writeFile(__dirname+'/reports/'+req.body.empID+'.json', JSON.stringify(req.body), function (err) {
  		if (err) throw err;
  		console.log('File is created successfully.');
 }); 

    res.send('abc');
});

app.listen(3000);