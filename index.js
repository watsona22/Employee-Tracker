const inquirer = require('inquirer');
const db = require('./db/connection');
//function to create initial prompt for user to indicate what they want to do
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
        //switch statement to run options based on conditions
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
//function to select all values from department and display. Timeout set for 3 seconds so that users can choose from initial options
function viewDept() {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        setTimeout(askHR, 3000)
    })
};
//function to select all values from role and display
function viewRole() {
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
        setTimeout(askHR, 3000)
    })
};
//function to select specified values from joined tables: employee, role, and department
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
};
//function to insert new department name
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
};
//function to add new role name
function addRole() {
    inquirer.prompt([
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

    ]).then((data) => {
        const roleObject = data;
        db.query(`INSERT INTO role (title, salary, dept_id) 
        VALUES (?, ?, ?)`, [roleObject.roleName, roleObject.roleSalary, roleObject.roleDept], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("A new role was added!");
            }
            setTimeout(askHR, 3000);
        });
    });
};
//function to add new employee and associated values
function addEmployee() {
    inquirer.prompt([
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
    ]).then((data) => {
        const newEmployeeObject = { data };
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES (?, ?, ?, ?)`, [newEmployeeObject.first, newEmployeeObject.last, newEmployeeObject.roleId, newEmployeeObject.managerId],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("A new employee was added!");
                }
                setTimeout(askHR, 3000);
            });
    });
};
//function to update existing employees
function updateEmployeeRole() {
    function employeeList(callback) {
        db.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee',
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }
            });
    }
    //https://github.com/SBoudrias/Inquirer.js/issues/842
    employeeList((result) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'text',
                message: 'Which employee would you like to update?',
                choices: result.map(employee => `${employee.first_name} ${employee.last_name}`),
            }
        ]).then((data) => {
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
            //uses the find method on the result array to recall the employee first and last name from the data object
            const selectedEmployee = result.find(employee => `${employee.first_name} ${employee.last_name}` === data.text);
            const updateEmployeeObject = { data };
            db.query(`UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?`,
                [updateEmployeeObject.first_name, updateEmployeeObject.last_name, updateEmployeeObject.role_id, updateEmployeeObject.manager_id, selectedEmployee.id],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("A new employee was added!");
                    }
                    setTimeout(askHR, 3000);
                });
        });
    });
};
askHR();

