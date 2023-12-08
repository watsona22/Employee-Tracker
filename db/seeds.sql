INSERT INTO department (id, dept_name)
VALUES (001, "English"),
       (002, "Chemistry"),
       (003, "Web Development"),
  
       
INSERT INTO rolle (id, title, salary, dept_id)
VALUES (001, "Professor", 10, "English"),
       (002, "Adjunct", 7, "Web Development"),
       (003, "Professor", 12, "Chemistry"),

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Amber", "Watson", 25, 26),
       (002, "Bryce", "Watson", 35, 36),
       (003, "Ashley", "Love", 45, 46),
      