class Auth {
  username: string;
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

class Database {
  private users: User[];

  constructor() {
    this.users = []
  }

  public store(user: User) {
  // TODO: complete the following code to store the given user into
  // this.users, then render the given user via this.displayUsers().
    this.users.push(user);
    this.displayUsers();
    document.getElementById('users-imported').innerHTML = this.users.length.toString();
  }

  public displayUsers(){
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
  public name: string;
  public surname: string;
  public age: number;
  public photo: string;
}

// Fictional database & authentication
let db = new Database();
let auth = new Auth("string", "string");

document.addEventListener('DOMContentLoaded', () => {
  let usersLoaded = 0;
  let selected: User[] = [];
  fetch('https://uinames.com/api/?amount=10&ext').then(response => {
    response.json().then((users) => {
      // TODO: handle the response and parse it into User class, then select
      // all adults (age > 18) and save them in selected array.
      for (let entry of users) {
        if (entry.age > 18) {
          let user = new User();
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

  document.querySelector('.save-btn').addEventListener('click', () => {
    // TODO: store all selected users into database.
    for (let user of selected) {
      db.store(user);
    }
  });
});
