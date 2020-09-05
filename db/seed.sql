-- departments
INSERT INTO department (name)
VALUES ('administration');

INSERT INTO department (name)
VALUES ('accounting');

INSERT INTO department (name)
VALUES ('sales');

INSERT INTO department (name)
VALUES ('warehouse');

-- ROLES
-- admin
INSERT INTO roles (title, salary, department_id)
VALUES ('manager', 75000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ('co-manager', 75000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ('receptionist', 30000.00, 1);

-- leads
INSERT INTO roles (title, salary, department_id)
VALUES ('accounting lead', 50000.00, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ('sales lead', 50000.00, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ('warehouse lead', 50000.00, 4);

-- peasants
INSERT INTO roles (title, salary, department_id)
VALUES ('accountant', 42000.00, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ('sales-person', 45000.00, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ('warehouse-lackey', 40000.00, 4);


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