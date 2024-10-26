const users = [];

class User {
  constructor(name, balance) {
    this.name = name;
    this.balance = balance;
  }

  deposit = (userDeposit) => {
    this.balance += userDeposit;
    return `Money deposited. User Balance: ${this.balance}`;
  };

  withdraw = (userWithdraw) => {
    const myPromise = new Promise((resolve, reject) => {
      if (userWithdraw <= this.balance) {
        resolve("Success");
      } else {
        reject("Failure");
      }
    });

    return myPromise
      .then(() => {
        this.balance -= userWithdraw;
        return `${userWithdraw} withdrawn. New Balance: ${this.balance}`;
      })
      .catch(() => {
        return "Insufficient funds";
      });
  };
}

function addUser(userName, balance) {
  const newUser = new User(userName, balance);
  users.push(newUser);
  return `${newUser.name} added.`;
}

function displayUsers() {
  const area = document.getElementById("area");
  area.innerHTML = ""; // Clear previous output
  if (users.length === 0) {
    area.innerHTML = "No users available.";
  } else {
    users.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.textContent = `Name: ${user.name}, Balance: ${user.balance}`;
      area.appendChild(userDiv);
    });
  }
}

function chooseUser(userName) {
  return users.find((user) => user.name === userName);
}

function showUserDetails(userName) {
  const requiredUser = chooseUser(userName);
  const area = document.getElementById("area");
  area.innerHTML = "";
  if (requiredUser) {
    area.innerHTML = `User Name: ${requiredUser.name}, Balance: ${requiredUser.balance}`;
  } else {
    area.innerHTML = "User not found.";
  }
}

// Event Listeners for Buttons
document.getElementById("display").addEventListener("click", displayUsers);

document.getElementById("find").addEventListener("click", () => {
  const userName = document.getElementById("user-name").value;
  showUserDetails(userName);
});

document.getElementById("deposit").addEventListener("click", () => {
  const userName = document.getElementById("user-name").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const user = chooseUser(userName);
  const area = document.getElementById("area");
  if (user) {
    const message = user.deposit(amount);
    area.innerHTML = message;
  } else {
    area.innerHTML = "User not found.";
  }
});

document.getElementById("add").addEventListener("click", () => {
  const userName = document.getElementById("user-name").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const message = addUser(userName, amount);
  document.getElementById("area").innerHTML = message;
});

document.getElementById("withdraw").addEventListener("click", () => {
  const userName = document.getElementById("user-name").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const user = chooseUser(userName);
  const area = document.getElementById("area");
  if (user) {
    user.withdraw(amount).then((message) => {
      area.innerHTML = message;
    });
  } else {
    area.innerHTML = "User not found.";
  }
});
