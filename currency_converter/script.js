document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const convertButton = document.getElementById('convert-button');
    const resultDiv = document.getElementById('result');

    const apiKey = '37c472d9be104796b1fadf226e57b6a8'; // Replace with your API key
    const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

    // Fetch currency data and populate dropdowns
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rates = data.rates;
            const currencies = Object.keys(rates);

            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                const optionTo = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.text = currency;
                optionTo.value = currency;
                optionTo.text = currency;
                fromCurrency.appendChild(optionFrom);
                toCurrency.appendChild(optionTo);
            });
        });

    // Convert currency
    convertButton.addEventListener('click', () => {
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (amount === '' || isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount.';
            return;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const rates = data.rates;
                const fromRate = rates[from];
                const toRate = rates[to];
                const convertedAmount = (amount / fromRate) * toRate;
                resultDiv.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
            });
    });
});
