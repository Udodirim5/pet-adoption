const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();

async function start() {
    const weatherPromise = await fetch(
        "https://api.weather.gov/gridpoints/MFL/110,50/forecast"
    );
    const weatherData = await weatherPromise.json();
    const ourTemp = weatherData.properties.periods[0].temperature;

    document.querySelector("#temp-output").textContent = ourTemp;
}

start();

async function petsArea() {
    const petsPromise = await fetch(
        "https://learnwebcode.github.io/bootcamp-pet-data/pets.json"
    );
    const petData = await petsPromise.json();

    petData.forEach((pet) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector("h3").textContent = pet.name
        // clone.querySelector("#pet-age").textContent = pet.birthYear
        // clone.querySelector("#pet-description").textContent = pet.name
        // clone.querySelector("img").textContent = pet.photo


        wrapper.appendChild(clone)
    });

    document.querySelector(".list-of-pets").appendChild(wrapper);
}
petsArea();
