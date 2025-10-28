const form = document.getElementById("expense-form");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

let expenses = [];
let total = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const expense = {
    id: Date.now(),
    title: title.value,
    amount: parseFloat(amount.value),
    category: category.value,
  };

  expenses.push(expense);
  total += expense.amount;

  updateUI();

  title.value = "";
  amount.value = "";
});

function updateUI() {
  expenseList.innerHTML = "";
  expenses.forEach((exp) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${exp.title} - ₹${exp.amount} <span>(${exp.category})</span>
      <button class="delete-btn" onclick="deleteExpense(${exp.id})">X</button>
    `;
    expenseList.appendChild(li);
  });

  totalDisplay.textContent = total.toFixed(2);
}

function deleteExpense(id) {
  const exp = expenses.find((e) => e.id === id);
  if (exp) total -= exp.amount;
  expenses = expenses.filter((e) => e.id !== id);
  updateUI();
}
