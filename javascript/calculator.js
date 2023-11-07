function fetchDataAndPopulateDropdown() {   //This function is used to fetch data from the json file and pass it into the next function.
    fetch('../json/bevs2.0.json')
        .then(response => response.json())
        .then(data => {
            populateDropdown(data);
        })
        .catch(error => {
            console.error('Error fetching JSON data: ', error);
        });
}


function populateDropdown(data) {
    const selectElement = document.getElementById('beverageSelect');

    data.beverages.forEach(beverage => {
        const option = document.createElement('option');
        option.value = beverage.id;
        option.textContent = beverage.name;

        if (beverage['caffeine'] !== undefined) {
            option.setAttribute('data-caffeine', beverage['caffeine']);
        }

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


function displayRecommendedCaffeineAmount(){
    const selectElement = document.getElementById('beverageSelect');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const caffeineAmount = parseInt(selectedOption.getAttribute('data-caffeine'));
    const reccomendedAmount = Math.floor(200/caffeineAmount);

    if (!isNaN(reccomendedAmount) && reccomendedAmount > 0){
        const resultElement = document.getElementById('result2');
        resultElement.textContent = `Your reccomended amount of beverages is ${reccomendedAmount} ${selectedOption.textContent}(s) today.`;
    }
    else{
        console.error('Invalid caffeine amount');
    }
}

function displayMaximumCaffeineAmount(){
    const selectElement = document.getElementById('beverageSelect');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const caffeineAmount = parseInt(selectedOption.getAttribute('data-caffeine'));
    const maxCaffeineAmount = Math.floor(400/caffeineAmount);

    if(!isNaN(maxCaffeineAmount && maxCaffeineAmount > 0)){
        const resultElement = document.getElementById('result3')
        resultElement.textContent = `Your maximum amount of beverages is ${maxCaffeineAmount} ${selectedOption.textContent}(s) today.`;
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
            period = timeToWakeUp >= 13 ? (period === 'AM' ? 'PM' : 'AM') : period; //
            timeToWakeUp = timeToWakeUp > 12 ? timeToWakeUp - 12 : timeToWakeUp; //If timeToWakeUp is greater than 12, the part after '?' is executed
        }
        const resultElement = document.getElementById('result4');
        resultElement.textContent = `You should drink your beverage at ${timeToWakeUp} ${period} or later.`
    }
}

document.addEventListener('DOMContentLoaded',populaterforBTTSDC) // When the page loads, populate the dropdown

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