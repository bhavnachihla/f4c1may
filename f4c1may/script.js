async function fetchDataAsyncAwait() {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Fetch data using .then
function fetchDataThen() {
    return fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
        .then(response => response.json())
        .catch(error => console.error("Error fetching data:", error));
}

// Render data in table
function renderTable(data) {
    const tableBody = document.getElementById("cryptoTableBody");
    tableBody.innerHTML = "";

    data.forEach(crypto => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${crypto.symbol}</td>
            <td>${crypto.name}</td>
            <td>${crypto.current_price}</td>
            <td>${crypto.market_cap}</td>
            <td>${crypto.total_volume}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
document.getElementById("searchButton").addEventListener("click", function() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredData = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(searchTerm) || crypto.symbol.toLowerCase().includes(searchTerm));
    renderTable(filteredData);
});

// Sort by market cap
document.getElementById("sortMarketCapButton").addEventListener("click", function() {
    const sortedData = cryptoData.slice().sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
});

// Sort by percentage change
document.getElementById("sortChangeButton").addEventListener("click", function() {
    const sortedData = cryptoData.slice().sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
});

// Initialize data and render table
let cryptoData;

(async () => {
    // Fetch data using async/await
    cryptoData = await fetchDataAsyncAwait();
    renderTable(cryptoData);
})();

