window.addEventListener('DOMContentLoaded', function () {

    console.log('Hello World!');

    abstract class Vehicle {

        constructor(public brand: string, public model: string) {}

        abstract get type(): string;
    }
    class Airplane extends Vehicle{
        get type(): string{
            return "airplane";
        }
    }
    class Car extends Vehicle{
        get type(): string{
            return "car";
        }
    }

    // some data
    let planes: Airplane[] = [
        new Airplane("Embraer", "E190"),
        new Airplane( "Airbus", "A220"),
        new Airplane( "Airbus", "A380")
    ]
    let cars: Car[] = [
        new Car("BMW",  "i3",),
        new Car("Tesla", "Model 3"),
        new Car("Opel", "Astra"),
        new Car("VW", "Golf"),
    ]
    let vehicles : Vehicle[] = cars.concat(planes)

    // list all vehicles in a table
    const table = document.getElementsByTagName('table')[0]
    vehicles.forEach(vehicle => {
        let tableRow = document.createElement('tr')

        let tdEl1 = document.createElement('td');
        tdEl1.innerHTML = vehicle.brand
        tableRow.append(tdEl1)

        let tdEl2 = document.createElement('td');
        tdEl2.innerHTML = vehicle.model
        tableRow.append(tdEl2)

        let tdEl3 = document.createElement('td');
        tdEl3.innerHTML = vehicle.type
        tableRow.append(tdEl3)

        table.append(tableRow);
    })
});