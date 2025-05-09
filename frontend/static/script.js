
const fetchData = async () => {
  const response = await fetch("/api/data");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }   
    const data = await response.json();
    return data;
}

const createHeaderHtml = () => `
    <div class="header">
        <input type="text" class="data-input" id="input-name" placeholder="Name"></input>
        <input type="text" class="data-input" id="input-age" placeholder="Age"></input>
        <input type="text" class="data-input" id="input-pets" placeholder="Pets (separated by comma)"></input>
        <button class="add-button">Add</button>
    </div>
`;

const createPetListHtml = (pets) => `
    <ul class="pet-list">
        ${pets.map((pet) => `
            <li class="pet-item">
                <p class="pet-name">${pet}</p>
            </li>
        `).join('')}
    </ul>
`;

const createPersonHtml = (person) => `
    <div class="person-container">
        <div class="person-data">
            <p class="person-id">${person.id}</p>
            <div class="person-attributes">
                <p class="attribute-label">Name:</p>
                <p class="person-name">${person.name}</p>
            </div>
            <div class="person-attributes">
                <p class="attribute-label">Age:</p>
                <p class="person-age">${person.age}</p>
            </div>           
        </div>
        <div class="horizontal-line"></div>
        <p class="pets-title">Pets:</p>
        ${createPetListHtml(person.pets)}
    </div>
`;

const createAddButtonEvent = () => {
    const addButton = document.querySelector(".add-button");
    addButton.addEventListener("click", async () => {
        const nameInput = document.querySelector("#input-name");
        const ageInput = document.querySelector("#input-age");
        const petsInput = document.querySelector("#input-pets");

        if (!nameInput.value || !ageInput.value || isNaN(ageInput.value)) {
            alert("Please fill in all fields correctly.");
            return;
        }
        const petArray = petsInput.value !== "" ? petsInput.value.split(",").map(pet => pet.trim()) : [];
        
        const newPerson = {
            name: nameInput.value,
            age: Number(ageInput.value),
            pets: petArray
        };

        await fetch("/api/data/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPerson)
        });

        nameInput.value = "";
        ageInput.value = "";
        petsInput.value = "";
        createDOM(await fetchData());
    });
}

const addEvents = () => {
    createAddButtonEvent();
}

const createDOM = (data) => {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = "";
    let html = createHeaderHtml();
    html += '<div class="data-container">';
    html += data.map((person) => createPersonHtml(person)).join('');
    html += '</div>';
    rootElement.insertAdjacentHTML("beforeend", html);
    addEvents();
}

const loadEvent = async () => {
    const rawData = await fetchData();
    createDOM(rawData);
}

window.addEventListener("load", loadEvent);