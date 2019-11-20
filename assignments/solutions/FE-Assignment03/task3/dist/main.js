var Auth = /** @class */ (function () {
    function Auth(username, password) {
        this.username = username;
        this.password = password;
    }
    return Auth;
}());
var Database = /** @class */ (function () {
    function Database() {
        this.users = [];
    }
    Database.prototype.store = function (user) {
        this.users.push(user);
        this.displayUsers();
    };
    Database.prototype.displayUsers = function () {
        document.getElementById('users-view').innerHTML = '';
        this.users.forEach(function (aUser) {
            var userView = document.createElement('div');
            userView.className = 'a-user';
            var name = document.createElement('h2');
            name.innerHTML = "" + aUser.name;
            userView.appendChild(name);
            var age = document.createElement('p');
            age.innerHTML = "age: " + aUser.age + " years";
            userView.appendChild(age);
            var image = document.createElement('img');
            image.src = aUser.photo;
            userView.appendChild(image);
            document.getElementById('users-view').appendChild(userView);
        });
    };
    return Database;
}());
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
// Fictional database & authentication
var db = new Database();
var auth = new Auth("string", "string");
document.addEventListener('DOMContentLoaded', function () {
    var statusElem = document.querySelector('#users');
    var usersCounter = document.querySelector('#users-counter');
    var usersLoaded = 0;
    var selected = [];
    fetch('https://uinames.com/api/?amount=10&ext').then(function (response) {
        response.json().then(function (users) {
            selected = users.filter(function (user) { return user.age > 18; });
            statusElem.textContent = "Stealing complete.";
            usersCounter.textContent = selected.length + " users found";
        });
    });
    document.querySelector('.save-btn').addEventListener('click', function () {
        selected.forEach(function (user) { return db.store(user); });
        statusElem.textContent = "Importing complete.";
        document.querySelector('#users-imported').textContent = "" + selected.length;
        selected = [];
    });
});
