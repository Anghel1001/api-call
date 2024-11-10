const apiUrl = "https://www.gov.uk/bank-holidays.json";
const tableBody = document.getElementById("tableBody");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let holidays = [];
let currentPage = 0;
const itemsPerPage = 5;

async function fetchBankHolidays() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Network response was not ok");
    
    const data = await response.json();
    holidays = data["england-and-wales"].events;  
    renderPage();
  } catch (error) {
    console.error("Error fetching data:", error);
    tableBody.innerHTML = "<tr><td colspan='2'>Error loading data</td></tr>";
  }
}

function renderPage() {
  tableBody.innerHTML = ""; 
  
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedHolidays = holidays.slice(start, end);
  
  paginatedHolidays.forEach(holiday => {
    const row = `<tr><td>${holiday.date}</td><td>${holiday.title}</td></tr>`;
    tableBody.innerHTML += row;
  });

  prevButton.disabled = currentPage === 0;
  nextButton.disabled = end >= holidays.length;
}

prevButton.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    renderPage();
  }
});

nextButton.addEventListener("click", () => {
  if ((currentPage + 1) * itemsPerPage < holidays.length) {
    currentPage++;
    renderPage();
  }
});

fetchBankHolidays();
