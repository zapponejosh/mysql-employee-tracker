// require connection

// create DB class with methods for all db queries
const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection
    }
    //DB queries organized by CRUD
    // viewAllEmployees
    viewAllEmployees() {
        return this.connection.query(
            `
            SELECT
                employees.id,
                employees.first_name AS "First Name",
                employees.last_name AS "Last Name",
                roles.title AS Role,
                roles.salary AS Salary,
                department.name AS Department,
                CONCAT(m.first_name, ' ', m.last_name) AS Manager
            FROM 
                employees
            LEFT JOIN 
                roles 
                ON employees.role_id = roles.id
            LEFT JOIN
                department
                ON roles.department_id = department.id
            LEFT JOIN
                employees m
                ON employees.manager_id = m.id
            `
        )
    }
    // viewRoles
    viewRoles() {
        return this.connection.query(
            `
            SELECT
                roles.id,
                roles.title AS Role,
                roles.salary,
                department.name AS Department
            FROM 
                roles
            LEFT JOIN 
                department
                ON roles.department_id = department.id
            ORDER BY
                department.name
            `
        )
    }
    // viewDepartments
    viewDepartments() {
        return this.connection.query(
            `
            SELECT
                department.name AS Departments
            FROM department
            `
        )
    }
    // viewAllEmployeesByDepartment
    viewByDepartment(department) {
        return this.connection.query(
            `
            SELECT
                employees.id,
                employees.first_name AS "First Name",
                employees.last_name AS "Last Name",
                roles.title AS Role,
                roles.salary AS Salary,
                department.name AS Department,
                CONCAT(m.first_name, ' ', m.last_name) AS Manager
            FROM 
                employees
            LEFT JOIN 
                roles 
                ON employees.role_id = roles.id
            LEFT JOIN
                department
                ON roles.department_id = department.id
            LEFT JOIN
                employees m
                ON employees.manager_id = m.id
            WHERE department.name = '${department}';
            `
        )
    }

    // viewManagers
    viewManagers() {
        return this.connection.query(
            `
            SELECT
                CONCAT(employees.first_name, ' ', employees.last_name) AS Manager
            FROM 
                employees 
            WHERE 
                manager_id IS NULL OR role_id IN (1,2)
            `
        )
    }

    // viewAllEmployeesByManager
    viewByManager(manager) {
        return this.connection.query(
            `
            SELECT
                employees.id,
                employees.first_name AS "First Name",
                employees.last_name AS "Last Name",
                roles.title AS Role,
                roles.salary AS Salary,
                department.name AS Department
            FROM 
                employees
            LEFT JOIN 
                roles 
                ON employees.role_id = roles.id
            LEFT JOIN
                department
                ON roles.department_id = department.id
            LEFT JOIN
                employees m
                ON employees.manager_id = m.id
            WHERE  CONCAT(m.first_name, ' ', m.last_name) = "${manager}" OR m.id = "${manager}"
            `
        )
    }

    // viewDepartmentBudgets

    // addEmployee
    addEmployee(details) {
        let sql; 
        // manager
        if (details.length === 3) {
            sql = `INSERT INTO 
                    employees (first_name, last_name, role_id) 
                VALUES (?, ?, ?)`
            // not a manager 
        } else {
            sql = `INSERT INTO 
                    employees (first_name, last_name, role_id, manager_id) 
                VALUES (?, ?, ?, ?)`
        }

        return this.connection.query(
            sql,
            (details)
        )    
    }

    findRoleId(roleName) {
        return this.connection.query(
            `
            SELECT 
                roles.id
            FROM 
                roles
            WHERE roles.title = '${roleName}'
            `
        )
    }

    findManagerId(manager) {
        return this.connection.query(
            `
            SELECT 
                employees.id
            FROM 
                employees
            WHERE  CONCAT(employees.first_name, ' ', employees.last_name) = "${manager}";
            `
        )
    }

    findDepartmentId(department) {
        return this.connection.query(
            `
            SELECT
                department.id
            FROM
                department
            WHERE department.name = "${department}"
            `
        )
    }
    // addRole
    addRole(details) {
        return this.connection.query(
            `
            INSERT INTO 
                roles (title, salary, department_id)
            VALUES 
                (?, ?, ?);
            `,
            (details)
        )    
    }
    // addDepartment
    addDepartment(name) {
        return this.connection.query(
            `
            INSERT INTO
                department (name)
            VALUES
                (?)
            `
        , [name]
        )
    }

    findEmployeeId(name) {
        return this.connection.query(
            `
            SELECT 
                employees.id
            FROM 
                employees
            WHERE
                CONCAT(employees.first_name, ' ', employees.last_name) = "${name}"
            `
        )
    }
    // updateRole
    updateRole(empId, roleId) {
        return this.connection.query(
            `
            UPDATE 
                employees 
            SET 
                employees.role_id = ?
            WHERE
                employees.id = ?
            `
            , [roleId, empId]
        )
    }


    // return employee ids of employees of manager
    getSubIds(manId) {
        return this.connection.query(
            `
            SELECT 
                employees.id
            FROM 
                employees
            WHERE
                employees.manager_id = ${manId}
            `
        )
    }

    // updateEmployeeManager
    findManagerId(name) {
        return this.connection.query(
            `
            SELECT
                employees.id
            FROM 
                employees 
            WHERE 
                CONCAT(employees.first_name, ' ', employees.last_name) = "${name}"
            `
        )
    }

    queryUpdateManager(employeeId, managerId) {
        return this.connection.query(
            `
            UPDATE employees 
            SET 
                employees.manager_id = ?
            WHERE
                employees.id = ?
            `
            , [managerId, employeeId]
        )
    }

    // removeEmployee
    queryRemoveEmployee(employeeId) {
        return this.connection.query(
            `
            DELETE FROM 
                employees
            WHERE
                employees.id = ?

            `
            , [employeeId]
        )
    }

    // removeDepartment
    // removeRole



    
}

// testing queries
// let test = new DB(connection)

// async function testMe() {
//     const employees = await test.viewByDepartment('admin')
//     console.log(employees)
// }

// testMe()


module.exports = new DB(connection)

