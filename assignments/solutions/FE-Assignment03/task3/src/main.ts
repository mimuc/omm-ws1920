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
    this.users.push(user);
    this.displayUsers();
  }

  public displayUsers(){
    document.getElementById('users-view').innerHTML = '';
    this.users.forEach(aUser => {
      const userView = document.createElement('div');
      userView.className = 'a-user';

      const name = document.createElement('h2');
      name.innerHTML = `${aUser.name}`;
      userView.appendChild(name);

      const age = document.createElement('p');
      age.innerHTML = `age: ${aUser.age} years`;
      userView.appendChild(age);

      const image = document.createElement('img');
      image.src = aUser.photo;
      userView.appendChild(image);

      document.getElementById('users-view').appendChild(userView);
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

  let usersLoaded = 0;
  let selected: User[] = [];
  fetch('https://uinames.com/api/?amount=10&ext').then(response => {
    response.json().then((users: User[]) => {
      selected = users.filter(user => user.age > 18);
      statusElem.textContent = `Stealing complete.`;
      usersCounter.textContent = `${selected.length} users found`;
    });
  });

  document.querySelector('.save-btn').addEventListener('click', () => {
    selected.forEach(user => db.store(user));
    statusElem.textContent = `Importing complete.`;
    document.querySelector<HTMLSpanElement>('#users-imported').textContent = `${selected.length}`;
    selected = [];
  });
});
