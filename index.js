const inquirer = require('inquirer');
const db = require('./db/connection');

async function askHR() {
    try {
        const data = await inquirer.prompt([
            {
                type: 'list',
                name: 'text',
                message: 'What would you like to do?',
                choices: ['View all departments',
                    'View all roles',
                    'View all employees',
                    'Add department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role'],
            },])

        switch (data.text) {
            case 'View all departments':
                viewDept()
                //table showing department names 
                //and department ids
                break;

            case 'View all roles':
                viewRole()
                //job title, role id, 
                //the department that role belongs to, 
                //and the salary for that role
                break;

            case 'View all employees':
                viewEmployee()
                //employee data, including employee ids, 
                //first names, last names, job titles, 
                //departments, salaries, and managers
                break;

            case 'Add department':
                addDept()
                //prompted to enter the name of the department 
                //and that department is added to the database
                break;

            case 'Add a role':
                addRole()
                //prompted to enter the name, salary, and department for the role 
                //and that role is added to the database
                break;

            case 'Add an employee':
                addEmployee()
                //prompted to enter the employee’s first name, last name, 
                //role, and manager, 
                //and that employee is added to the database
                break;
            case 'Update an employee role':
                updateEmployeeRole()
                //prompted to select an employee to update 
                //and their new role 
                //and this information is updated in the database
                break;

            default:
                console.log('Invalid choice');

        }
    } catch (err) {
        console.log(err)
    }
};

function viewDept() {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        setTimeout(askHR, 3000)
    })
}

function viewRole() {
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        setTimeout(askHR, 3000)

    })
}
function viewEmployee() {
    db.query(`SELECT employee.id, 
employee.first_name, 
employee.last_name,
employee.manager_id,
role.title,
role.dept_id,
role.salary,
 FROM employee
 JOIN role ON employee.role_id
 JOIN department ON role.dept_id;`, (err, result) => {

    })
    if (err) {
        console.log(err);
    }
    console.table(result);
    setTimeout(askHR, 3000)

}
function addDept() {
    db.query(`INSERT INTO department (dept_name) 
    VALUES (?) 
    WHERE department_id = ?;`)
    console.table(result);
    setTimeout(askHR, 3000)
}

function addRole() {
    db.query(`INSERT INTO role (title, salary, dept_id) 
    VALUES (?, ?, ?) 
    WHERE employee_id = ?;`, (err, result) => {
        if (err) {
            console.log(err);
            console.table(result);
            setTimeout(askHR, 3000)
        }
    })
    console.table(result);
    setTimeout(askHR, 3000)
}
function addEmployee() {
    db.query(`INSERT INTO role (title, salary, dept_id) 
    VALUES (?, ?, ?) 
    WHERE employee_id = ?;`, (err, result) => {
        if (err) {
            console.log(err);
            console.table(result);
            setTimeout(askHR, 3000)
        }
    })
}
function updateEmployeeRole() {
    // get choices for roles and 
    //employees out of the database inquirer takes choices in the form of 
    // { name: "to display", value: "to select under the hood" }
    // use inqirer to ask about the new employee 
    //then use the answers to insert into the database
    db.query(`INSERT INTO employee ? WHERE employee_id`, (err, result) => {
        "INSERT INTO employee first_name, last_name, role_id, manager_id SET ?"
        if (err) {
            console.log(err);
            console.table(result);
            setTimeout(askHR, 3000)
        }
    })
}


askHR();

