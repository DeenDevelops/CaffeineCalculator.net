fetch('../json/bevs2.0.json')
    .then(response => response.json())
    .then(data => {
        const selectElement = document.getElementById('beverageSelect');

        data.beverages.forEach(beverage => {
            const option = document.createElement('option');
            option.value = beverage.id;
            option.textContent = beverage.name;

            // Debugging output to check "data-caffeine" attribute
            console.log(`Option: ${beverage.name}, Data-Caffeine: ${beverage['caffeine']}`);
            
            // Check if the "data-caffeine" attribute is set in the JSON data
            if (beverage['caffeine'] !== undefined) {
                option.setAttribute('data-caffeine', beverage['caffeine']);
            }

            selectElement.appendChild(option);
        });
        
    })
    .catch(error => {
        console.error('Error fetching JSON data: ', error);
    });

//Block of code that listens for submit element and parses for an int value of caffeine
document.getElementById('beverageForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const selectElement = document.getElementById('beverageSelect');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    
    // Debugging output to check "data-caffeine" attribute before parsing
    console.log('Selected Option:', selectedOption);
    
    // Access the caffeine attribute from the selected option
    const caffeineAmount = parseInt(selectedOption.getAttribute('data-caffeine'));

    // Check if the caffeineAmount is a valid number
    if (!isNaN(caffeineAmount)) {
        const resultElement = document.getElementById('result');
        resultElement.textContent = `Caffeine Amount: ${caffeineAmount} mg`;
    } else {
        console.error('Invalid caffeine amount');
    }
});

// Existing code for form submission
// ...

document.getElementById('beverageForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from being submitted

    // Get the numerical input value
    const weightInput = document.getElementById('weightInput').value;

    // Check if the input is a valid number
    if (!isNaN(weightInput)) {
        // Perform your calculations or processing here
        console.log('Valid numerical input:', weightInput);
    } else {
        // Display an error message or handle invalid input
        console.error('Invalid numerical input');
    }
});

