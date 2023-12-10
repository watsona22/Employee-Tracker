SELECT
  employee.first_name,
  employee.last_name,
  role.title AS job_title,
  department.dept_name,
  role.salary
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.dept_id = department.id;
