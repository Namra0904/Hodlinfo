async function fetchCryptoData() {
  try {
    const response = await fetch("http://localhost:5000/api/getData");
    const data = await response.json();

    const tableBody = document.getElementById("crypto-table");
    tableBody.innerHTML = "";

    data.forEach((crypto, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>
                            <div class="platform-cell">
                              
                                ${crypto.name}
                            </div>
                        </td>
                        <td>₹${crypto.last}</td>
                        <td>₹${crypto.buy} / ₹${crypto.sell}</td>
                        <td class="hide-mobile">${crypto.volume}</td>
                        <td>${crypto.base_unit}</td>
                    `;
      tableBody.appendChild(row);
    });
    const bestPrice = data.reduce(
      (min, crypto) => Math.min(min, crypto.buy),
      Infinity
    );
    document.getElementById(
      "best-price-value"
    ).textContent = `₹${bestPrice.toFixed(2)}`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchCryptoData);

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}
