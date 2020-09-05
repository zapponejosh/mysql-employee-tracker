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
                roles.title AS Role,
                roles.salary,
                department.name AS Department
            FROM 
                roles
            LEFT JOIN 
                department
                ON roles.department_id = department.id
            ORDER BY
                salary DESC
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
    // viewAllEmployeesByManager
    // viewDepartmentBudgets

    // addEmployee
    // addRole
    // addDepartment

    // updateRole
    // updateEmployeeManager

    // removeEmployee
    // removeDepartment
    // removeRole

    
    
  

}

// testing queries
let test = new DB(connection)

async function testMe() {
    const employees = await test.viewDepartments()
    console.log(employees)
}

testMe()


module.exports = new DB(connection)

