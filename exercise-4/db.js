require('dotenv').config();
const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

conn.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);  
    } // else {
    //     console.log('Connected to database');
    // }
});

const db = conn.promise();

// Get all employees
async function getAllEmployees() {
    const [rows] = await db.query('SELECT * FROM employees');
    return rows;
}

// Get single employee by ID
async function getEmployeeById(employee_id) {
    const [rows] = await db.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id]);
    return rows[0];
}

// Add a new employee
async function addEmployee(first_name, last_name, email, phone_number, department, salary) {
    await db.query(
        'INSERT INTO employees (first_name, last_name, email, phone_number, department, salary) VALUES (?, ?, ?, ?, ?, ?)',
        [first_name, last_name, email, phone_number, department, salary]
    );
    return await getAllEmployees();
}

// Delete an employee by ID
async function deleteEmployee(employee_id) {
    await db.query('DELETE FROM employees WHERE employee_id = ?', [employee_id]);
    return await getAllEmployees();
}

// Update an employee by ID
async function updateEmployee(employee_id, first_name, last_name, email, phone_number, department, salary) {
    await db.query(
        'UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone_number = ?, department = ?, salary = ? WHERE employee_id = ?',
        [first_name, last_name, email, phone_number, department, salary, employee_id]
    );
    return await getEmployeeById(employee_id);
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    deleteEmployee,
    updateEmployee
};
