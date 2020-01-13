class Auth {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }
}

class Database {
    private users: User[]

    constructor() {
        this.users = []
    }

    public store(user: User) {
        this.users.push(user)
        this.displayUsers()


    }

    public displayUsers() {
        document.getElementById('users-view').innerHTML = '';
        this.users.forEach(aUser => {
            const userView = document.createElement('div');
            userView.className = 'a-user';

            const name = document.createElement('h2');
            name.innerHTML = `${aUser.name}`;
            userView.append(name);

            const age = document.createElement('p');
            age.innerHTML = `age: ${aUser.age} years`;
            userView.append(age);

            const image = document.createElement('img');
            image.src = aUser.photo;
            userView.append(image);

            document.getElementById('users-view').append(userView);
        });
    }
}

class User {
    public name: string
    public surname: string
    public age: number
    public photo: string
}

// Fictional database & authentication
let db = new Database()
let auth = new Auth("string", "string")

document.addEventListener('DOMContentLoaded', () => {
    const statusElem = document.querySelector<HTMLDivElement>('#users');
    const usersCounter = document.querySelector<HTMLDivElement>('#users-counter');

    let selected: User[] = [];

    fetch('https://uinames.com/api/?amount=10&ext').then(response => {
        response.json().then((users: User[]) => {
            usersCounter.textContent = String(users.length);
            selected = users.filter(user => user.age > 18);
        });
    });

    document.querySelector('.save-btn').addEventListener('click', () => {
        selected.map(user => db.store(user));
    });
});