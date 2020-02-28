class Company {
    constructor() {
        this._departments = [];
    }

    addEmployee(username, salary, position, department) {
        if(!username || !salary || !position || !department){
            throw new Error("Invalid input!");
        }

        if(salary < 0) {
            throw new Error("Invalid input!");
        }
        
        if (!this._departments.map(x => x.name).includes(department)) {
            this._departments.push({name: department, employees: []})
        }

        let currentDprt = this._departments.find(d => d.name === department);
        currentDprt.employees.push({name: username, salary: salary, position: position});
        
        return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    bestDepartment() {
        const sortedDepatments = this.calculateAverageSalaries(this._departments)
            .sort((a, b) => {
                if(a.averageSalary === b.averageSalary){
                    return a.name.localeCompare(b.name);
                }
                
                return b.averageSalary - a.averageSalary;
            });
            
            const bestDpr = sortedDepatments[0];
            
            let result = '';            
            result += `Best Department is: ${bestDpr.name}\n`;
            result += `Average salary: ${bestDpr.averageSalary.toFixed(2)}\n`;
            
            result += `${bestDpr.employees
                .sort((a, b) => {
                    if(a.salary === b.salary) {
                        return a.name.localeCompare(b.name)
                    }
                    
                    return b.salary - a.salary;
                })
                .map(x => `${x.name} ${x.salary} ${x.position}`)
                .join('\n').trim()
            }`;
            
        return result;
    }

    calculateAverageSalaries(departments) {
        for (const department of departments) {
            let averageSalary = department.employees
                .reduce((acc, empl) => {
                    acc += empl.salary;
                    return acc;
                }, 0) / department.employees.length;
            department['averageSalary'] = averageSalary;
        }

        return departments;
    }
}