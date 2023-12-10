const inquirer = require('inquirer');

//view dept name and ids
switch (data.text) {
    case 'View all departments':
        viewDept(question);
        const question = data.text
        if (question === 'View all departments')
            db.query(`SELECT * FROM employee_db`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
            })
        break;

    case 'View all roles':
        viewRole();
        //job title, role id, 
        //the department that role belongs to, 
        //and the salary for that role
        break;

    case 'View all employees':
        viewEmployee();
        //employee data, including employee ids, 
        //first names, last names, job titles, 
        //departments, salaries, and managers
        break;

    case 'Add department':
        addDept();
        //prompted to enter the name of the department 
        //and that department is added to the database
        break;

    case 'Add a role':
        addRole();
        //prompted to enter the name, salary, and department for the role 
        //and that role is added to the database
        break;

    case 'Add an employee':
        addEmployee();
        //prompted to enter the employee’s first name, last name, 
        //role, and manager, 
        //and that employee is added to the database
        break;

    case 'Update an employee role':
        addEmployeeRole();
        //prompted to select an employee to update 
        //and their new role 
        //and this information is updated in the database
        break;

    default:
        console.log('Invalid choice');
}

async function askLogo() {
    try {
        const data = await inquirer.prompt([
            {
                type: 'list',
                name: 'text',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add a role', 'Add an employee', 'Update an employee role'],
            },])
    }
}
