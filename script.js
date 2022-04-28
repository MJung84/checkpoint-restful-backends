/* DOM-Aufbau
<main class="card-container">
 <div class="card">
        <img
          class="picture"
          id="picture"
          src="https://randomuser.me/api/portraits/men/0.jpg"
          alt=""
        />
        <h2 class="name" id="name">Max Mustermann</h2>
        <p class="title" id="title">bla bla bei blub blub</p>
        <p class="connections" id="connections">2 mutual connections</p>
        <button class="button" id="button">Connect</button>
      ...
</main>
*/

//getting connections

let count = JSON.parse(localStorage.getItem("invitations")) || 0;

function loadConnections() {
  const pendingInvitations = document.querySelector(".pending-invitations");

  console.log(count);

  if (count === null || count === 0) {
    pendingInvitations.innerText = "No Pending Invitations";
  } else {
    pendingInvitations.innerText = count + " Pending Invitations";
  }
}

//getting connections end

// creating Cards

const url = "https://dummy-apis.netlify.app/api/contact-suggestions?count=8";

let persons = [];

function render() {
  let cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";

  for (let i = 0; i < persons.length; i++) {
    const person = persons[i];
    const name =
      person.name.title + " " + person.name.first + " " + person.name.last;
    const connections = person.mutualConnections + " mutual connections";

    const markup = `
        <img
          class="picture"
          id="picture"
          src=${person.picture}
          alt=""
        />
        <h3 class="name" id="name">${name}</h3>
        <p class="title" id="title">${person.title}</p>
        <p class="connections" id="connections">${connections}</p>
        <button class="button" id="button">Connect</button>
        `;

    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.innerHTML = markup;
    cardContainer.append(newDiv);
  }
}

// creating Cards end

//updating Connections

function updateConnections() {
  const connectButtons = document.querySelectorAll(".button");

  connectButtons.forEach(function (button) {
    button.addEventListener("click", function connect() {
      const button = event.target;

      if (button.innerText === "Connect") {
        count++;
        button.innerText = "Pending";
        localStorage.setItem("invitations", count);
        console.log(count);
      } else {
        count--;
        button.innerText = "Connect";
        localStorage.setItem("invitations", count);
        console.log(count);
      }
      loadConnections();
    });
  });
}

//updating Connections end

function loadData() {
  fetch(url)
    .then(function (response) {
      console.log("Response erhalten");
      return response.json();
    })
    .then(function (data) {
      persons = data;
      render();
      loadConnections();
      updateConnections();
    });
}

loadData();
