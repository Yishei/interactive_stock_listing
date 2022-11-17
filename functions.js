// function to create a table for the companies in the companies list.
function generateTable() {
    let totalValue = 0;
    let tableBodyElement = document.getElementById('tb');
    tableBodyElement.innerHTML = null;
    for (let i = 0; i < companies.length; i++) {
        var company = companies[i];
        company.value = Number(company.price * company.amount);
        
        totalValue += company.value;
        let trElement = document.createElement('tr');
        console.log(typeof(displayValue) );
        createAndAppendTd(trElement, company.ticker);
        createAndAppendTd(trElement, company.price);
        createAndAppendTd(trElement, Intl.NumberFormat('en-US', { maximumSignificantDigits: 3}).format(company.amount));
        createAndAppendTd(trElement, Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(company.value));

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
    // make a total row.
    let totalTr = document.createElement('tr');
    totalTr.id = "totalRow";
    createAndAppendTd(totalTr, 'Total Value');
    createAndAppendTd(totalTr, '');
    createAndAppendTd(totalTr, '');
    createAndAppendTd(totalTr, Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalValue));
    createAndAppendTd(totalTr, '');

    tableBodyElement.append(totalTr);
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
    let Decimal = (newAmount * 10) % 10;
    
    if (Decimal) {
        alert('Invalid input!');
        throw "INVALID_INPUT";
    };
    total = companies[companyIndex].price * newAmount;
    dieposit = prompt(`your total is ${Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(total)},
    please deposit.`);
    dieposit = validateInput(dieposit);
    greater = dieposit >= total;

    if (greater) {
        companies[companyIndex].amount += newAmount;
        let plural = (companies[companyIndex].amount) > 1 ? 'stocks' : 'stock';
        finalMsg = `you now own ${Intl.NumberFormat('en-US', { maximumSignificantDigits: 3}).format(companies[companyIndex].amount)}, ${companies[companyIndex].name} ${plural}.`;
        if (dieposit > total) {
            finalMsg += `\nhere you have ${Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(dieposit - total)} change.`
        };
    }
    else {
        let less = total - dieposit;
        finalMsg = `$${Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(less)} is missing from the total,\nsorry maybe next time.`;
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
