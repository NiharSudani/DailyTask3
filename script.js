function addExpense() {
    var date = document.getElementById('date').value;
    var category = document.getElementById('category').value;
    var amount = document.getElementById('amount').value;

    console.log('Date:', date, 'Category:', category, 'Amount:', amount);

    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ date: formatDate(date), category: category, amount: amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    var tableBody = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    var row = '<tr><td>' + formatDate(date) + '</td><td>' + category + '</td><td>' + amount + '</td></tr>';
    tableBody.insertAdjacentHTML('beforeend', row);

    resetForm();
    updateChart();
    return false;
}

function formatDate(date) {
    var d = new Date(date);
    var day = ('0' + d.getDate()).slice(-2);
    var month = ('0' + (d.getMonth() + 1)).slice(-2);
    var year = d.getFullYear();
    return `${day}-${month}-${year}`;
}

function resetForm() {
    document.getElementById('date').value = '';
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

function showExpenses() {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var tableBody = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows
    for (var i = 0; i < expenses.length; i++) {
        var expense = expenses[i];
        var row = '<tr><td>' + expense.date + '</td><td>' + expense.category + '</td><td>' + expense.amount + '</td></tr>';
        tableBody.insertAdjacentHTML('beforeend', row);
    }
    updateChart();
}

function updateChart() {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var categories = expenses.map(expense => expense.category);
    var amounts = expenses.map(expense => expense.amount);

    var ctx = document.getElementById('expenseChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expense Amount',
                data: amounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function downloadCSV() {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    var csv = 'Date,Category,Amount\n';

    expenses.forEach(function(expense) {
        csv += expense.date + ',' + expense.category + ',' + expense.amount + '\n';
    });

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'expenses.csv';
    hiddenElement.click();
}
