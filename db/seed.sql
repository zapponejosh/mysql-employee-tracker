-- departments
INSERT INTO department (name)
VALUES ('food');

INSERT INTO department (name)
VALUES ('clothing');

INSERT INTO department (name)
VALUES ('home improvement');

-- leads
INSERT INTO roles (title, salary, department_id)
VALUES ('department lead', 50000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ('department lead', 50000.00, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ('department lead', 50000.00, 3);

-- stockers for each dep
INSERT INTO roles (title, salary, department_id)
VALUES ('food dep stocker', 25000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ('clothing dep stocker', 25000.00, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ('home dep stocker', 25000.00, 3);

-- managers
INSERT INTO employees (first_name, last_name, role_id)
VALUES ('Michael', 'Scott', 1);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ('Jim', 'Halpert', 2);

-- stockers
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Stanley', 'Hudson', 4, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Oscar', 'Martinez', 4, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Phyllis', 'Vance', 5, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Andy', 'Bernard', 6, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Ryan', 'Howard', 6, 2);