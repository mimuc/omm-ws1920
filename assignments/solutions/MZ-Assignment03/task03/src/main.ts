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
    this.users = [];
  }

  public store(user: User) {
    this.users.push(user);
  }

  public displayUsers() {
    document.getElementById("users-view").innerHTML = "";
    this.users.forEach(aUser => {
      const userView = document.createElement("div");
      userView.className = "a-user";

      const name = document.createElement("h2");
      name.innerHTML = `${aUser.name}`;
      userView.append(name);

      const age = document.createElement("p");
      age.innerHTML = `age: ${aUser.age} years`;
      userView.append(age);

      const image = document.createElement("img");
      image.src = aUser.photo;
      userView.append(image);

      document.getElementById("users-view").append(userView);
    });
    document.getElementById("users-imported").textContent = `${this.users.length}`;
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

document.addEventListener("DOMContentLoaded", () => {
  let usersLoaded = 0;
  let selected: User[] = [];

  fetch("https://uinames.com/api/?amount=10&ext")
    .then(res => res.json())
    .then((users: User[]) => {
      selected = users.filter(el => el.age > 18);

      document.getElementById("users").style.display = "none";
      document.getElementById("users-counter").textContent = `${selected.length} users found`;
    });

  document.querySelector(".save-btn").addEventListener("click", () => {
    selected.forEach(el => db.store(el));
    db.displayUsers();
  });
});
