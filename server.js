const inquirer = require('inquirer')
const mysql = require('mysql2')

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db',
  },
  console.log(`Connected to the movies_db database.`)
)

inquirer
  .prompt([
    {
      type: 'list',
      name: 'purpose',
      message: `Welcome to Employee Tracker 2.0! What would you like to do?`,
      choices: [
        `View all departments`,
        `View all roles`,
        `View all employees`,
        `Add a new department`,
        `Add a new role`,
        `Add a new employee`,
        `Update an employee's role`,
        `Update an employee's manager`,
        `View employees by manager`,
        `View employees by department`,
        `Delete departments`,
        `Delete roles`,
        `Delete employees`,
        `View the total utilized budget of a department`,
      ],
    },
  ])
  .then(answers => {
    let sql = ''
    let params = []

    switch (answers.purpose) {
      case `View all departments`:
        sql = 'SELECT * FROM departments'
        db.query(sql, params, (err, rows) => {
          err ? console.error(err) : console.table(rows)
        })
        break

      case `View all roles`:
        sql = 'SELECT * FROM roles'
        db.query(sql, params, (err, rows) => {
          err ? console.error(err) : console.table(rows)
        })
        break

      case `View all employees`:
        sql = 'SELECT * FROM employees'
        db.query(sql, params, (err, rows) => {
          err ? console.error(err) : console.table(rows)
        })
        break

      case `Add a new department`:
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'dept_name',
              message: 'What is the department name?',
            },
          ])
          .then(answers => {
            params = [answers.dept_name]
            sql = 'INSERT INTO departments (department_name) VALUES (?)'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case `Add a new role`:
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'role_title',
              message: 'What is the role title?',
            },
            {
              type: 'input',
              name: 'role_salary',
              message: 'What is the role salary?',
            },
            {
              type: 'input',
              name: 'department_id',
              message: 'What is the role department id?',
            },
          ])
          .then(answers => {
            params = [
              answers.role_title,
              answers.role_salary,
              answers.department_id,
            ]
            sql =
              'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case `Add a new employee`:
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'first_name',
              message: `What is the employee's first name?`,
            },
            {
              type: 'input',
              name: 'last_name',
              message: `What is the employee's last name?`,
            },
            {
              type: 'input',
              name: 'role_id',
              message: `What is the employee's role id?`,
            },
            {
              type: 'input',
              name: 'manager_id',
              message: `What is the employee's manager id?`,
            },
          ])
          .then(answers => {
            params = [
              answers.first_name,
              answers.last_name,
              answers.role_id,
              answers.manager_id,
            ]
            sql =
              'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case `Update an employee's role`:
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'employee_id',
              message: `What is the employee's id?`,
            },
            {
              type: 'input',
              name: 'role_id',
              message: `What is the employee's new role id?`,
            },
          ])
          .then(answers => {
            params = [answers.role_id, answers.employee_id]
            sql = 'UPDATE employees SET role_id = ? WHERE id = ?'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case `Update an employee's manager`:
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'employee_id',
              message: `What is the employee's id?`,
            },
            {
              type: 'input',
              name: 'manager_id',
              message: `What is the employee's new manager id?`,
            },
          ])
          .then(answers => {
            params = [answers.manager_id, answers.employee_id]
            sql = 'UPDATE employees SET manager_id = ? WHERE id = ?'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case `View employees by manager`:
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'manager_id',
              message: `What is the manager's id?`,
            },
          ])
          .then(answers => {
            params = [answers.manager_id]
            sql = 'SELECT * FROM employees WHERE manager_id = ?'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case `View employees by department`:
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'department_id',
              message: `What is the department's id?`,
            },
          ])
          .then(answers => {
            params = [answers.department_id]
            sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.department_name 
              FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.department_id = departments.id 
              WHERE departments.id = ?`
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case `Delete departments`:
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'department_id',
              message: `What is the department's id?`,
            },
          ])
          .then(answers => {
            params = [answers.department_id]
            sql = 'DELETE FROM departments WHERE id = ?'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case `Delete roles`:
        inquirer

          .prompt([
            {
              type: 'input',
              name: 'role_id',
              message: `What is the role's id?`,
            },
          ])
          .then(answers => {
            params = [answers.role_id]
            sql = 'DELETE FROM roles WHERE id = ?'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case `Delete employees`:
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'employee_id',
              message: `What is the employee's id?`,
            },
          ])
          .then(answers => {
            params = [answers.employee_id]
            sql = 'DELETE FROM employees WHERE id = ?'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case `View the total utilized budget of a department`:
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'department_id',
              message: `What is the department's id?`,
            },
          ])
          .then(answers => {
            params = [answers.department_id]
            sql =
              'SELECT SUM(salary) AS "Total Salaries in Department" FROM roles WHERE department_id = ?'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      default:
        console.log('Error')
        break
    }
  })
