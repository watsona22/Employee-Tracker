INSERT INTO department (id, dept_name)
VALUES (011, "English"),
       (012, "Chemistry"),
       (013, "Web Development");
         
INSERT INTO role (id, title, salary, dept_id)
VALUES (001, 'Professor', 10.0, 011),
       (002, 'Adjunct', 7.0, 013),
       (003, 'Tenured', 12.0, 012);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (222, "Amber", "Watson", 25, 26),
       (223, "Bryce", "Watson", 35, 36),
       (224, "Ashley", "Love", 45, 46);
      