window.addEventListener('DOMContentLoaded', function () {
    console.log('Hello World!');
    var type;
    (function (type) {
        type["car"] = "car";
        type["airplane"] = "airplane";
    })(type || (type = {}));
    var brand;
    (function (brand) {
        brand["airbus"] = "Airbus";
        brand["tesla"] = "Tesla";
        brand["vw"] = "VW";
    })(brand || (brand = {}));
    // some data
    var planes = [
        { brand: "Embraer", model: "E190", type: type.airplane },
        { brand: brand.airbus, model: "A220", type: type.airplane },
        { brand: brand.airbus, model: "A380", type: type.airplane }
    ];
    var cars = [
        { brand: "BMW", model: "i3", type: type.car },
        { brand: brand.tesla, model: "Model 3", type: type.car },
        { brand: "Opel Astra", model: "", type: type.car },
        { brand: brand.vw, model: "Golf", type: type.car },
    ];
    var vehicles = cars.concat(planes);
    // list all vehicles in a table
    var table = document.getElementsByTagName('table')[0];
    vehicles.forEach(function (car) {
        var tableRow = document.createElement('tr');
        var tdEl1 = document.createElement('td');
        tdEl1.innerHTML = car.brand;
        tableRow.append(tdEl1);
        var tdEl2 = document.createElement('td');
        tdEl2.innerHTML = car.model;
        tableRow.append(tdEl2);
        var tdEl3 = document.createElement('td');
        tdEl3.innerHTML = car.type;
        tableRow.append(tdEl3);
        table.append(tableRow);
    });
});
