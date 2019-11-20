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
        // TODO: complete the following code to store the given user into
        // this.users, then render the given user via this.displayUsers().
        this.users.push(user);
        this.displayUsers();
        document.getElementById('users-imported').innerHTML = this.users.length.toString();
    };
    Database.prototype.displayUsers = function () {
        document.getElementById('users-view').innerHTML = '';
        this.users.forEach(function (aUser) {
            var userView = document.createElement('div');
            userView.className = 'a-user';
            var name = document.createElement('h2');
            name.innerHTML = "" + aUser.name;
            userView.append(name);
            var age = document.createElement('p');
            age.innerHTML = "age: " + aUser.age + " years";
            userView.append(age);
            var image = document.createElement('img');
            image.src = aUser.photo;
            userView.append(image);
            document.getElementById('users-view').append(userView);
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
    var usersLoaded = 0;
    var selected = [];
    fetch('https://uinames.com/api/?amount=10&ext').then(function (response) {
        response.json().then(function (users) {
            // TODO: handle the response and parse it into User class, then select
            // all adults (age > 18) and save them in selected array.
            for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                var entry = users_1[_i];
                if (entry.age > 18) {
                    var user = new User();
                    user.age = entry.age;
                    user.name = entry.name;
                    user.photo = entry.photo;
                    user.surname = entry.surname;
                    selected.push(user);
                }
                usersLoaded += 1;
            }
            document.getElementById('users-counter').innerHTML = usersLoaded.toString();
        });
    });
    document.querySelector('.save-btn').addEventListener('click', function () {
        // TODO: store all selected users into database.
        for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
            var user = selected_1[_i];
            db.store(user);
        }
    });
});
