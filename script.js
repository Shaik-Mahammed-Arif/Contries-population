let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");
let countries;

function createCountry(country) {
    let responsiveDiv = document.createElement("div");
    responsiveDiv.classList.add("col-12", "col-md-5", "country-card", "d-flex", "flex-row");
    
    let countryFlag = document.createElement("img");
    countryFlag.classList.add("country-flag");
    countryFlag.setAttribute("src", country.flag);
    responsiveDiv.appendChild(countryFlag);
    
    let textDiv = document.createElement("div");
    textDiv.classList.add("ml-5");
    
    let countryName = document.createElement("h6");
    countryName.classList.add("country-name");
    countryName.textContent = country.name;
    
    let countryPopulation = document.createElement("p");
    countryPopulation.classList.add("country-population");
    countryPopulation.textContent = country.population;
    
    textDiv.appendChild(countryName);
    textDiv.appendChild(countryPopulation);
    
    responsiveDiv.appendChild(textDiv);
    resultCountriesEl.appendChild(responsiveDiv);
}

let options = {
    method: "GET"
};

spinnerEl.classList.remove("d-none"); // Show spinner

fetch("https://apis.ccbp.in/countries-data", options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        spinnerEl.classList.add("d-none"); // Hide spinner
        console.log(jsonData);
        countries = jsonData;
        for (let country of countries) {
            createCountry(country);
        }
    });

function fetchingCountries(event) {
    let searchInputValue = searchInputEl.value.toLowerCase();
    if (event.key === "Enter") {
        resultCountriesEl.textContent = "";
        let foundcountry=false;
        for (let country of countries) {
            let countryName = country.name.toLowerCase();
            if (countryName.includes(searchInputValue)) {
                createCountry(country);
                foundcountry=true;
            }
        }
            if(!foundcountry){
                
                    alert("No countries found with the entered search term.");
                
            }
        
    }
}

searchInputEl.addEventListener("keydown", fetchingCountries);
