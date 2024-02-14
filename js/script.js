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
        "https://clever-mousse-9b87ca.netlify.app/.netlify/functions/pets"
    );
    const petData = await petsPromise.json();

    petData.forEach((pet) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".pet-card").dataset.species = pet.species;

        clone.querySelector("h3").textContent = pet.name;
        clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear);
        clone.querySelector(".pet-description").textContent = pet.description;

        if (!pet.photo) pet.photo = "./img/fallback.jpg";

        clone.querySelector(".pet-card-photo img").src = pet.photo;
        clone.querySelector(
            ".pet-card-photo img"
        ).alt = `A ${pet.species} named ${pet.name}`;

        wrapper.appendChild(clone);
    });

    document.querySelector(".list-of-pets").appendChild(wrapper);
}
petsArea();
function createAgeText(birthYear) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    if (age == 1) {
        return `${age} year`;
    } else if (age > 1) {
        return `${age} years`;
    } else {
        return `Less than a year old!`;
    }
}

const allbtn = document.querySelectorAll(".pet-filter button");
allbtn.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Remove active class from any and all btn
        allbtn.forEach((btn) => btn.classList.remove("active"));

        // Add the active class to the specific btn that just got clicked
        e.target.classList.add("active");

        // Actually filter the pets down below
        const currentFilter = e.target.dataset.filter;
        document.querySelectorAll(".pet-card").forEach((card) => {
            if (currentFilter == card.dataset.species || currentFilter == "all") {
                card.style.display = "grid";
            } else {
                card.style.display = "none";
            }
        });
    });
});
