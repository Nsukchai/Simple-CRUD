const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


const mysql = require('mysql2');
const port = 3000;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'test'
})

connection.connect((err) =>{
    if (err) throw err;
    console.log('Connect to MySQL');
});

//create
app.post('/test', (req, res) => {
    const {
        Title, FirstName, LastName, Address, 
        NationalID, Gender, DateOfBirth, Size, Grade, ParentCustomerID
    } = req.body;
    
    if (!Title || !FirstName || !LastName || !Address || !NationalID ||
        !Gender || !DateOfBirth || !Size || !Grade) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `INSERT INTO customers2 (
        Title, FirstName, LastName, Address, NationalID, Gender,
        DateOfBirth, Size, Grade, ParentCustomerID
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [Title, FirstName, LastName, Address, NationalID, Gender, DateOfBirth, Size, Grade, ParentCustomerID];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('Record created:', result);
        res.json(result);
    });
});


//read 
app.get('/test', (req,res)=>{
    connection.query('select * from customers2',(err,result)=>{
        if (err) throw err;
        res.json(result);
    }) 
})
app.get('/test/:CustomerID', (req, res) => {
    const CustomerID = req.params.CustomerID;

    const query = 'SELECT * FROM customers2 WHERE CustomerID = ?';
    connection.query(query, [CustomerID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(results[0]);
    });
});


// Update
app.put('/test/:CustomerID', (req, res) => {
    const CustomerID = req.params.CustomerID;
    const {
        Title, FirstName, LastName, Address, 
        NationalID, Gender, DateOfBirth, Size, Grade, ParentCustomerID
    } = req.body;
    console.log(req.body)
    if (!Title || !FirstName || !LastName || !Address || !NationalID ||
        !Gender || !DateOfBirth || !Size || !Grade) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `UPDATE customers2 SET 
        Title = ?, FirstName = ?, LastName = ?, Address = ?, NationalID = ?, Gender = ?, 
        DateOfBirth = ?, Size = ?, Grade = ?, ParentCustomerID = ? 
        WHERE CustomerID = ?`;

    const values = [Title, FirstName, LastName, Address, NationalID, Gender, DateOfBirth, Size, Grade, ParentCustomerID, CustomerID];

    connection.query(query, values, (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Record updated successfully' });
    });
});

// Delete
app.delete('/test/:CustomerID', (req, res) => {
    const { CustomerID } = req.params;
    connection.query('DELETE FROM customers2 WHERE CustomerID = ?', [CustomerID], (err) => {
        if (err) throw err;
        res.json({ message: `CustomerID ${CustomerID} deleted successfully` });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
// Allow requests from this origin
app.use(cors({
    origin: 'http://127.0.0.1:5500' 
}));
