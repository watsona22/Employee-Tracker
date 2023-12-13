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
    db.query(`SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title AS job_title,
    department.dept_name,
    role.salary,
    manager.first_name,
    manager.last_name
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.dept_id = department.id
  JOIN manager ON employee.manager_id = manager.id;`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        setTimeout(askHR, 3000)

    })
}
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'Enter department name',
        }

    ]).then((answer) => {
        const userInput = answer.deptName;
        db.query(`INSERT INTO department (dept_name) 
    VALUES (?)`, [userInput], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Your department was added!");
            }
            setTimeout(askHR, 3000)
        });
    });
}
async function addRole() {
    try {
        const data = await inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary for this role?',
            },
            {
                type: 'input',
                name: 'roleDept',
                message: 'To what department does this role belong?',
            },
        ])
        const roleObject = { data };

        db.query(`INSERT INTO role (title, salary, dept_id) 
        VALUES (?, ?, ?)`, [roleObject.roleName, roleObject.roleSalary, roleObject.roleDept], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Your role was added!");
                setTimeout(askHR, 3000);
            }
        });
    } catch (error) {
        console.log(error);
    }
}
async function addEmployee() {
    try {
        const data = await inquirer.prompt([
            {
                type: 'input',
                name: 'first',
                message: 'What is the employee first name?',
            },
            {
                type: 'input',
                name: 'last',
                message: 'What is the employee last name?',
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'What is the employee role ID?',
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'What is the employee manager ID?',
            },
        ])
        const newEmployeeObject = { data };
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES (?, ?, ?, ?)`, [newEmployeeObject.first, newEmployeeObject.last, newEmployeeObject.roleId, newEmployeeObject.managerId],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("A new employee was added!");
                    setTimeout(askHR, 3000);
                }
            });
    } catch (error) {
        console.log(error);
    }
}

async function updateEmployeeRole() {
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

