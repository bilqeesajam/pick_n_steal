const {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    deleteEmployee,
    updateEmployee
} = require('./db');

async function runTests() {
    console.log('Adding new employee...');
    let all = await addEmployee(
        'Sarah',
        'Lee',
        'sarah.lee@example.com',
        '555-1111',
        'Finance',
        66000.00
    );
    console.log(all);

    console.log('\n Updating employee...');
    const updated = await updateEmployee(
        1,
        'John',
        'Doe',
        'john.doe@newmail.com',
        '555-1234',
        'Engineering',
        90000.00
    );
    console.log(updated);

    console.log('\n Deleting employee...');
    all = await deleteEmployee(1);
    console.log(all);

    console.log('\n Final List of Employees:');
    console.log(await getAllEmployees());
}

runTests();
