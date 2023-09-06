INSERT INTO departments (department_name) 
VALUES  ('Management'),
        ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (title, salary, department_id) 
VALUES  ('CEO', 500000, 1),
        ('Sales Lead', 100000, 2),
        ('Salesperson', 80000, 2),
        ('Lead Engineer', 150000, 3),
        ('Software Engineer', 120000, 3),
        ('Accountant', 125000, 4),
        ('Legal Team Lead', 250000, 5),
        ('Lawyer', 190000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Christopher', 'Wallace', 1, NULL),
        ('Sean', 'Combs', 2, 1),
        ('Calvin', 'Broadus', 3, 2),
        ('Marshall', 'Mathers', 4, 1),
        ('Andre', 'Young', 5, 4),
        ('Kendrick', 'Duckworth', 6, 4),
        ('Aubrey', 'Graham', 7, 1),
        ('Shawn', 'Carter', 8, 7);