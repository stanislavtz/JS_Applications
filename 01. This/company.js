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
            let currentDprt = {
                name: department,
                employees: []
            }
            
            this._departments.push(currentDprt)
        }

        let currentDprt = this._departments.find(d => d.name === department);
        currentDprt.employees.push({name: username, salary: salary, position: position});
        
        return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    bestDepartment() {
        let result = '';

        // calculating average sakary using forof method
        for (const department of this._departments) {
            let averageSalary = department.employees
                    .reduce((acc, empl) => {
                        acc += empl.salary;
                        return acc
                    }, 0) / department.employees.length;

                department['averageSalary'] = averageSalary;
        }

        //// calculating average sakary using forEach method
        // this._departments
        //     .forEach(department => {

        //         let averageSalary = department.employees
        //             .reduce((acc, empl) => {
        //                 acc += empl.salary;
        //                 return acc
        //             }, 0) / department.employees.length;

        //         department['averageSalary'] = averageSalary;
        //     });

        const sortedDepatments = this._departments
            .sort((a, b) => {
                if(a.averageSalary === b.averageSalary){
                    return a.name.localeCompare(b.name);
                }

                return b.averageSalary - a.averageSalary;
            });
        
        const bestDpr = sortedDepatments[0];

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
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
