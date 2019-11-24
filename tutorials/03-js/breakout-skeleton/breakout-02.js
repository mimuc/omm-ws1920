window.addEventListener('DOMContentLoaded', function () {

    console.log('Hello World!')

    // some data
    let planes = [
        "Embraer E190",
        {brand: "Airbus", model: "A220",type: "airplane"},
        {manufacturer: "Airbus", typpe: "A380",type: "airplane"}
    ]
    let cars = [
        {brand: "BMW", model: "i3",type:"car"},
        {brand: "Tesla", modl: "Model 3",type:"car"},
        {name: "Opel Astra"},
        {brad: "VW", type: "Golf",type:"car"},
    ]
    let vehicles = cars.concat(planes)

    // list all vehicles in a table
    const table = document.getElementsByTagName('table')[0]
    vehicles.forEach(car => {
        let tableRow = document.createElement('tr')

        let tdEl1 = document.createElement('td');
        tdEl1.innerHTML = car.brand
        tableRow.append(tdEl1)

        let tdEl2 = document.createElement('td');
        tdEl2.innerHTML = car.model
        tableRow.append(tdEl2)

        let tdEl3 = document.createElement('td');
        tdEl3.innerHTML = car.type
        tableRow.append(tdEl3)

        table.append(tableRow);
    })
});