class Company {
    constructor() {
        this.departments = [];
    }

    addEmployee(username, salary, position, department) {
        if (!(username && salary && position && department)) {
            throw new Error('Invalid input!');
        }

        if (Number(salary) <= 0) {
            throw new Error('Invalid input!');
        }

        let current = this.departments.find(d => d.name === department);

        if (!current) {
            current = {
                name: department,
                employees: []
            }

            this.departments.push(current);
        }

        const newEmloyee = {
            username,
            salary,
            position
        }

        current.employees.push(newEmloyee);
        return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    bestDepartment() {
        let result = [];
        this.departments.forEach(d => {
            const totalDepartmentSalary = d.employees
                .map(e => e.salary)
                .reduce((a, b) => +a + +b);

            d.averageSalary = totalDepartmentSalary / d.employees.length;
            d.employees
                .sort((a, b) => a.username.localeCompare(b.username))
                .sort((a, b) => b.salary - a.salary);
        });

        const sorted = this.departments.sort((a, b) => b.averageSalary - a.averageSalary);
        const bestDepartment = sorted[0];

        result.push(`Best Department is: ${bestDepartment.name}`);
        result.push(`Average salary: ${bestDepartment.averageSalary.toFixed(2)}`);
        result.push(bestDepartment.employees.map(emp => `${emp.username} ${emp.salary} ${emp.position}`).join('\n'));

        return result.join('\n');
    }
}