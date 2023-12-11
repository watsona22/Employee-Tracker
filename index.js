const inquirer = require('inquirer');
const question = data.text
const router = require('express').Router();

switch (data.text) {
    case 'View all departments':
        viewDept(question);
        if (question === 'View all departments')
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
            })
        //table showing department names 
        //and department ids
        break;


    case 'View all roles':
        viewRole(question);
        if (question === 'View all roles')
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
            })
        //job title, role id, 
        //the department that role belongs to, 
        //and the salary for that role
        break;

    case 'View all employees':
        viewEmployee(question);
        if (question === 'View all employees')
            db.query(`SELECT  FROM`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
            })
        //employee data, including employee ids, 
        //first names, last names, job titles, 
        //departments, salaries, and managers
        break;

    case 'Add department':
        addDept(question);
        if (question === 'Add department')
            router.put('/department', (req, res) => {
                data.update(
                    {
                        dept_name: req.body.dept_name,
                    })
                    .then((updatedDepartment) => {
                        res.json(updatedDepartment);
                    })
                    .catch((err) => res.json(err));
            });
        //prompted to enter the name of the department 
        //and that department is added to the database
        break;

    case 'Add a role':
        addRole();
        if (question === 'Add a role')
            router.put('/role', (req, res) => {
                data.update(
                    {
                        title: req.body.title,
                        salary: req.body.salary,
                        dept_name: req.body.dept_name,
                    })
                    .then((updatedRole) => {
                        res.json(updatedRole);
                    })
                    .catch((err) => res.json(err));
            });
        //prompted to enter the name, salary, and department for the role 
        //and that role is added to the database
        break;

    case 'Add an employee':
        addEmployee();
        if (question === 'Add an employee')
            router.put('/employee', (req, res) => {
                data.update(
                    {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        title: req.body.title,
                        manager_id: req.body.manager_id,
                    })
                    .then((updatedEmployee) => {
                        res.json(updatedEmployee);
                    })
                    .catch((err) => res.json(err));
            });
        //prompted to enter the employee’s first name, last name, 
        //role, and manager, 
        //and that employee is added to the database
        break;
    case 'Update an employee role':
        addEmployeeRole();
        if (question === 'Update an employee role')
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
            })
        router.get('/', (req, res) => {
            const roleId = employee.role_id;
            data.findAll().then((roleId) => {
                res.json(roleId);
            });
        });
        router.put('/employee-role', (req, res) => {
            data.update(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    role_id: req.body.role_id,
                    manager_id: req.body.manager_id,
                },
                {
                    where: {
                        id: req.params.id,
                    }
                })
                .then((updatedEmployeeRole) => {
                    res.json(updatedEmployeeRole);
                })
                .catch((err) => res.json(err));
        });
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

    } catch (err) {
        console.log(err)
    }
};
askLogo();
module.exports = router;
