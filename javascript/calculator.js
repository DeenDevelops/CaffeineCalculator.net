let beveragesData = [];

function fetchDataAndPopulateDropdown() {
    fetch('../json/bevs2.0.json')
        .then(response => response.json())
        .then(data => {
            // Assuming the data is an object with a 'beverages' array in it
            beveragesData = data.beverages; // or just 'data' if the array is not nested
            populateDropdown(beveragesData); // Pass the array to populateDropdown
        })
        .catch(error => {
            console.error('Error fetching JSON data: ', error);
        });
}

function filterBeverages() {
    const searchValue = document.getElementById('beverageSearch').value.toLowerCase();
    if (Array.isArray(beveragesData)) { // Make sure that beveragesData is an array
        const filteredData = beveragesData.filter(beverage => 
            beverage.name.toLowerCase().includes(searchValue)
        );
        populateDropdown(filteredData); // Call populateDropdown with the filtered data
    } else {
        console.error('beveragesData is not an array:', beveragesData);
    }
}

function populateDropdown(data) {
    const selectElement = document.getElementById('beverageSelect');
    selectElement.innerHTML = ''; // Clear existing options
    data.forEach(beverage => {
        const option = document.createElement('option');
        option.value = beverage.id; // Make sure each beverage has an 'id' field
        option.textContent = beverage.name; // Make sure each beverage has a 'name' field
        option.setAttribute('data-caffeine', beverage.caffeine); // Assuming 'caffeine' is the property in your JSON data
        selectElement.appendChild(option);
    });
}


function displayCaffeineAmount() {
    const selectElement = document.getElementById('beverageSelect');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const caffeineAmount = parseInt(selectedOption.getAttribute('data-caffeine'));

    if (!isNaN(caffeineAmount)) {
        const resultElement = document.getElementById('result');
        resultElement.textContent = `Caffeine Amount: ${caffeineAmount} mg`;
    } else {
        console.error('Invalid caffeine amount');
    }
}


function displayRecommendedCaffeineAmount() {
    const selectElement = document.getElementById('beverageSelect');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const caffeineAmount = parseInt(selectedOption.getAttribute('data-caffeine'));
    const recommendedAmount = Math.floor(200 / caffeineAmount);

    const resultElement = document.getElementById('result2');

    if (!isNaN(caffeineAmount)) {
        if (recommendedAmount > 0) {
            resultElement.textContent = `Your recommended amount of beverages is ${recommendedAmount} ${selectedOption.textContent}(s) today.`;
        } else {
            resultElement.textContent = `This beverage is very high in caffeine and cannot be recommended.`;
        }
    } else {
        console.error('Invalid caffeine amount');
    }
}


function displayMaximumCaffeineAmount() {
    const selectElement = document.getElementById('beverageSelect');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const caffeineAmount = parseInt(selectedOption.getAttribute('data-caffeine'));
    const maxCaffeineAmount = Math.floor(400 / caffeineAmount);

    if (!isNaN(maxCaffeineAmount) && maxCaffeineAmount > 0) {
        const resultElement = document.getElementById('result3');
        resultElement.textContent = `Your maximum amount of beverages is ${maxCaffeineAmount} ${selectedOption.textContent}(s) today.`;
    } 
    else if(maxCaffeineAmount == 0){
        const resultElement = document.getElementById('result3');
        resultElement.textContent = `This beverage is very high in caffeine and does not have a maximum recommendation.`
    }
    else {
        console.error('Invalid caffeine amount or no beverages allowed');
    }
}


function populaterforBTTSDC(){
    const timeSelect = document.getElementById('timeSelect');
    if (timeSelect.options.length === 0){
        for (let i = 1; i <=12; i++){
            timeSelect.appendChild(new Option(i,i)); //what is new Option???
        }
    }
}

function bestTimeToStartDrinkingCaffeine(){
    const timeAm = document.getElementById('amSelect');
    //const timePm = document.getElementById('pmSelect');
    let timeNum = document.getElementById('timeSelect');
    let timeOfDay = timeNum.options[timeNum.selectedIndex];
    let timeToWakeUp = parseInt(timeOfDay.value)
    let period = timeAm.checked ? 'AM' : 'PM'; //This will check if the time is AM or PM

    if(!isNaN(timeToWakeUp)){
        timeToWakeUp = timeToWakeUp + 2; //User selected
        if (timeToWakeUp >= 12){
            period = timeToWakeUp >= 12 ? (period === 'AM' ? 'PM' : 'AM') : period; 
            timeToWakeUp = timeToWakeUp > 12 ? timeToWakeUp - 12 : timeToWakeUp; //If timeToWakeUp is greater than 12, the part after '?' is executed
        }
        const resultElement = document.getElementById('result4');
        resultElement.textContent = `You should drink your beverage at ${timeToWakeUp} ${period} or later.`
    }
}

function initializeApp() {
    fetchDataAndPopulateDropdown();
    populaterforBTTSDC();
    document.getElementById('beverageSearch').addEventListener('input', filterBeverages);
}

document.addEventListener('DOMContentLoaded', initializeApp);

function BeverageFormSubmit(event) { // Function that calls all other functions on button press.
    event.preventDefault();
    displayCaffeineAmount();
    displayRecommendedCaffeineAmount();
    displayMaximumCaffeineAmount();
    bestTimeToStartDrinkingCaffeine();
}

document.getElementById('beverageForm').addEventListener('submit', BeverageFormSubmit);

// Call the fetch and populate function when the page loads
fetchDataAndPopulateDropdown();

// Populate the function with int
bestTimeToStartDrinkingCaffeine();