
var express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors')
var app = express()

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'se',
});

app.use(cors())

app.use(bodyParser.json());

app.post('/se/login', (req, res) => {
    const { username, password } = req.body;

    connection.query(
        'SELECT n.firstname, n.lastname, p.positionName FROM nurse n INNER JOIN position p ON n.positionID = p.positionID WHERE n.usename = ? AND n.password = ?',
        [username, password],
        (error, results, fields) => {
            if (error) {
                console.error('Error during authentication:', error);
                return res.status(500).json({ success: false, message: 'Internal server error' });
            }

            if (results.length > 0) {
                const nurse = results[0];
                res.json({ success: true, message: 'Login successful', nurse });
            } else {
                res.json({ success: false, message: 'Invalid username or password' });
            }
        }
    );
});



app.get('/se/nurse', function (req, res, next) {
    connection.query(
        'SELECT nurseID, firstname, lastname FROM `nurse`',
        function (err, results, fields) {
            res.json(results)
        }
    );
})

app.get('/se/schedule', function (req, res, next) {
    connection.query(
        'SELECT * FROM assign NATURAL JOIN nurse NATURAL JOIN schedule',
        function (err, results, fields) {
            res.json(results)
        }
    );
})

app.get('/se/schedule/:date', function (req, res, next) {
    const date = req.params.date
    connection.query(
    'SELECT nurseID, firstname, lastname, shift, date FROM nurse NATURAL JOIN assign NATURAL JOIN schedule WHERE date like ?', [`%${date}%`],
        function (err, results, fields) {
            res.json(results)
        }
    );

})

app.get('/se/schedule/:date/:shift', function (req, res, next) {
    const date = req.params.date;
    const shift = req.params.shift;
    connection.query(
        'SELECT nurseID, firstname, lastname, shift, date FROM nurse NATURAL JOIN assign NATURAL JOIN schedule WHERE date LIKE ? AND shift LIKE ?', 
        [`%${date}%`, `%${shift}%`],
        function (err, results, fields) {
            if (err) {
                console.error('Error fetching data: ', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.json(results);
        }
    );
});

app.get('/se/schedule/select/:id/:date', function (req, res, next) {
    const id = req.params.id;
    const date = req.params.date;
    connection.query(
        'SELECT nurseID, firstname, lastname, shift, date FROM nurse NATURAL JOIN assign NATURAL JOIN schedule WHERE nurseID LIKE ? AND date LIKE ?;', 
        [id, `%${date}%`],
        function (err, results, fields) {
            if (err) {
                console.error('Error fetching data: ', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.json(results);
        }
    );
});

app.get('/se/nurse/schedule', function (req, res, next) {
    connection.query(
        `SELECT a.assignID, n.firstname, n.lastname, s.shift, s.date AS schedule_date, s2.shift AS shift2, s2.date AS schedule_date2, a.remark
        FROM nurse n
        JOIN assign a ON n.nurseID = a.nurseID
        JOIN schedule s ON a.scheduleID = s.scheduleID
        LEFT JOIN schedule s2 ON a.scheduleID2 = s2.scheduleID
        LEFT JOIN statusAssign sa ON a.statusAssignID = sa.statusAssignID
        WHERE a.statusAssignID IS NULL;`,
        function (err, results, fields) {
            if (err) {
                console.error('Error fetching data: ', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.json(results);
        }
    );
});

app.post('/se/update/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const { statusAssignId } = req.body;
  
    try {
      // Execute the SQL query directly using the connection
      connection.query(
        'UPDATE assign SET statusAssignID = ? WHERE assignID = ?',
        [statusAssignId, itemId],
        (error, results) => {
          if (error) {
            console.error('Error updating StatusAssignId:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
            return;
          }
          console.log('StatusAssignId updated successfully');
          res.status(200).json({ success: true, message: 'StatusAssignId updated successfully' });
        }
      );
    } catch (error) {
      console.error('Error updating StatusAssignId:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });
  
  
  


app.listen(2000, function () {
    console.log('CORS-enabled web server listening on port 2000')
})