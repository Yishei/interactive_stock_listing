// function to create a table for the companies in the companies list.
function generateTable() {
    let totalValue = 0;
    let totalStocks = 0;
    let tableBodyElement = document.getElementById('tb');
    tableBodyElement.innerHTML = null;
    for (let i = 0; i < companies.length; i++) {
        var company = companies[i];
        company.value = Number(company.price * company.amount);
        
        totalValue += company.value;
        totalStocks+= company.amount;
        let trElement = document.createElement('tr');
        createAndAppendTd(trElement, company.ticker);
        createAndAppendTd(trElement, company.price);
        createAndAppendTd(trElement, numberFormat(company.amount));
        createAndAppendTd(trElement, currencyFormat(company.value));
        let pic = document.createElement('img');
        pic.src = company.logo;
        trElement.append(pic);
        
        // button to buy stocks.
        let buttonTd = document.createElement('td');
        let btn1 = document.createElement('button');
        btn1.id = "buy";
        buttonTd.append(btn1);

        btn1.innerText = company.amount ? 'Buy More' : 'Buy';

        btn1.addEventListener('click', function () {
            buyStock(i);
        });

        trElement.append(buttonTd);
        
        // button to remove a stock from the list.
        let removeBtnTd = document.createElement('td');
        let btn2 = document.createElement('button');
        btn2.id ="remove";
        removeBtnTd.append(btn2);

        btn2.innerText = `Remove\n${company.name}`;

        btn2.addEventListener('click', function() {
            removeItem(i);
        })

        trElement.append(removeBtnTd);
        tableBodyElement.append(trElement);
        
    };
    // make a total row.
    let totalTr = document.createElement('tr');
    totalTr.id = "totalRow";
    createAndAppendTd(totalTr, 'Total Value');
    createAndAppendTd(totalTr, '');
    createAndAppendTd(totalTr, numberFormat(totalStocks));
    createAndAppendTd(totalTr, currencyFormat(totalValue));
    createAndAppendTd(totalTr, '');
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
function buyStock(index) {
    let newAmount;
    let greater;
    let isDecimal;
    let total;
    let finalMsg;
    newAmount = prompt(`How many stocks of ${companies[index].name} would you like to buy?`);
    newAmount = validateInput(newAmount);
    isDecimal = (newAmount * 10) % 10;
    
    if (isDecimal) {
        alert('Invalid input!');
        throw "INVALID_INPUT";
    };
    total = companies[index].price * newAmount;
    deposit = prompt("your total is " + currencyFormat(total) +",\nplease deposit.");
    deposit = validateInput(deposit);
    greater = (deposit >= total);

    if (greater) {
        companies[index].amount += newAmount;
        let plural = (companies[index].amount) > 1 ? 'stocks' : 'stock';
        finalMsg = "You now own " +numberFormat(companies[index].amount) + ", " +companies[index].name + " " + plural + "!";
        if (deposit > total) {
            finalMsg += `\nhere you have ${currencyFormat(deposit - total)} change.`
        };
    }
    else {
        let less = total - deposit;
        finalMsg = `${currencyFormat(less)} is missing from the total,\nsorry maybe next time.`;
    };

    alert(finalMsg);
    generateTable();

};

function removeItem(index) {
    companies.splice(index, 1);
    generateTable();
}

// function to turn Input to number and validate.
function validateInput(answer) {
    answer = Number(answer);

    if (isNaN(answer) || answer <= 0 ) {
        alert('Invalid input!');
        throw "INVALID_INPUT"
    };
    return answer;
};


function currencyFormat(value) {
    let niceValue;
    if (value) {
        niceValue = value = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);
    } else {
        niceValue = "$0";
    }
    return niceValue
}

function numberFormat(value) {
    let niceNumber;
    if (value) {
        niceNumber = value = Intl.NumberFormat('en-US', { maximumSignificantDigits: 3}).format(value);
    } else {
        niceNumber = 0;
    }
    return niceNumber
};


