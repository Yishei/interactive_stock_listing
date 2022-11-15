// function to create a table for the companies in the companies list.
function generateTable() {
    let tableBodyElement = document.getElementById('tb');
    tableBodyElement.innerHTML = null;
    for (let i = 0; i < companies.length; i++) {
        var company = companies[i];
        let value = `$${(companies[i].price * companies[i].amount).toFixed(2)}`;
        let trElement = document.createElement('tr');

        createAndAppendTd(trElement, company.ticker);
        createAndAppendTd(trElement, company.price);
        createAndAppendTd(trElement, company.amount);
        createAndAppendTd(trElement, value);

        let buttonTd = document.createElement('td');
        let btn = document.createElement('button');
        buttonTd.append(btn);

        btn.innerText = company.amount ? 'Buy More' : 'Buy';

        btn.addEventListener('click', function () {
            buyStock(i);
        });

        trElement.append(buttonTd);
        tableBodyElement.append(trElement);
    };
};

// function to create inner table elements and append the data.
function createAndAppendTd(trElement, innerText) {
    let tdElement = document.createElement('td');
    tdElement.innerHTML = innerText;
    trElement.append(tdElement);
};

// function to handle the Button event.
function buyStock(companyIndex) {
    let newAmount;
    let total;
    let dieposit;
    let greater;
    let finalMsg;
    newAmount = prompt(`How many stocks of ${companies[companyIndex].name} would you like to buy?`);
    newAmount = validateInput(newAmount);
    let notDecimal = (newAmount * 10) % 10;
    
    if (notDecimal != 0) {
        alert('Invalid input!');
        throw "INVALID_INPUT";
    };
    total = (companies[companyIndex].price * newAmount).toFixed(2);
    dieposit = prompt(`your total is $${total},
    please deposit.`);
    dieposit = validateInput(dieposit);
    greater = dieposit >= total;

    if (greater) {
        companies[companyIndex].amount += newAmount;
        let plural = (companies[companyIndex].amount) > 1 ? 'stocks' : 'stock';
        finalMsg = `you now own ${companies[companyIndex].amount}, ${companies[companyIndex].name} ${plural}.`;
        if (dieposit > total) {
            finalMsg += `\nhere you have $${(dieposit - total).toFixed(2)} change.`
        };
    }
    else {
        let less = (total - dieposit).toFixed(2);
        finalMsg = `$${less} is missing from the total,\nsorry maybe next time.`;
    };

    alert(finalMsg);
    generateTable();

};

// function to turn value to number and validate.
function validateInput(answer) {
    answer = Number(answer);

    if (isNaN(answer) || answer <= 0 ) {
        alert('Invalid input!');
        throw "INVALID_INPUT"
    };
    return answer;
};