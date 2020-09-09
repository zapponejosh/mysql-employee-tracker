-- departments
INSERT INTO department (name)
VALUES ('Administration');

INSERT INTO department (name)
VALUES ('Accounting');

INSERT INTO department (name)
VALUES ('Sales');

INSERT INTO department (name)
VALUES ('Warehouse');

-- ROLES
-- admin
INSERT INTO roles (title, salary, department_id)
VALUES ('Manager', 75000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ('Co-manager', 75000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ('Receptionist', 30000.00, 1);

-- leads
INSERT INTO roles (title, salary, department_id)
VALUES ('Accounting lead', 50000.00, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ('Senior sales person', 50000.00, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ('Warehouse supervisor', 50000.00, 4);

-- peasants
INSERT INTO roles (title, salary, department_id)
VALUES ('Accountant', 42000.00, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales person', 45000.00, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ('Warehouse lackey', 40000.00, 4);


-- managers
INSERT INTO employees (first_name, last_name, role_id)
VALUES ('Michael', 'Scott', 1);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ('Jim', 'Halpert', 2);

-- employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Stanley', 'Hudson', 8, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Oscar', 'Martinez', 4, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Phyllis', 'Vance', 8, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Andy', 'Bernard', 8, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Ryan', 'Howard', 3, 2);