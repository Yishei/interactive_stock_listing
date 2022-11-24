// function to create a table for the companies in the companies list.
function generateTable() {
    let totalValue = 0;
    let totalStocks = 0;
    let tableBodyElement = document.getElementById('tb');
    tableBodyElement.innerHTML = null;
    for (let i = 0; i < companies.length; i++) {
        let company = companies[i];

        company.value = company.price * company.amount;
        totalValue += company.value;
        totalStocks+= company.amount;

        let trElement = document.createElement('tr');

        // create the logo on the table.
        let picTd = document.createElement('td');
        let pic = document.createElement('img');
        pic.src = company.logo;
        picTd.append(pic);
        trElement.append(picTd);

        // add the company Ticker, Price, and Value.
        createAndAppendTd(trElement, company.ticker);
        createAndAppendTd(trElement, currencyFormat(company.price));
        createAndAppendTd(trElement, numberFormat(company.amount));
        createAndAppendTd(trElement, currencyFormat(company.value));
        
        
        // add a button to buy stocks.
        let btn1 = btnTd_BtnAndAppand(trElement, 'buy');
        btn1.innerText = company.amount ? 'Buy More' : 'Buy';
        btn1.addEventListener('click', function () {
            generateForm(i)});
            
        // add a button to remove a stock from the table\array.
        let btn2 = btnTd_BtnAndAppand(trElement, 'remove');
        btn2.innerText = `Remove\n${company.name}`;
        btn2.addEventListener('click', function() {
            removeItem(i);
        });

        tableBodyElement.append(trElement);
    };
    // make a total row.
    let totalTr = document.createElement('tr');
    totalTr.id = "totalRow";
    createAndAppendTd(totalTr, 'Total Value');
    createAndAppendTd(totalTr, '');
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


function removeItem(index) {

    companies.splice(index, 1);
    generateTable();
};

// function to turn Input to number and validate.
function validateInput(answer) {
    answer = Number(answer);

    if (isNaN(answer) || answer <= 0 ) {
        alert('Invalid input!');
        throw "INVALID_INPUT"
    };
    return answer;
};

// function to format currency to USD.
function currencyFormat(value) {
    let niceValue;
    if (value) {
        niceValue = value = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);
    } else {
        niceValue = "$0";
    }
    return niceValue
}

// function to format amount.
function numberFormat(value) {
    let niceNumber;
    if (value) {
        niceNumber = value = Intl.NumberFormat('en-US', { maximumSignificantDigits: 3}).format(value);
    } else {
        niceNumber = 0;
    }
    return niceNumber
};

// fonction to add a botton and its TD to a TR and create an id for it.
function btnTd_BtnAndAppand(trElement, id){
    let buttonTd = document.createElement('td');
    let btn = document.createElement('button');
    btn.id = id;
    buttonTd.append(btn);
    trElement.append(buttonTd);
    return btn
};


function generateForm(index) {
    let i = index;
    document.getElementById('table').style.display = 'none';
    let form = document.getElementById('form');
    form.style.display = 'block';
    form.innerHTML = null;
    let lable = document.createElement('label');
    lable.for = 'qty';
    lable.innerHTML = `How much stocs of ${companies[i].name} do you want to buy?`;
    form.append(lable);

    let logo = document.createElement('img');
    logo.src = companies[i].logo;
    form.append(logo);
    let div1 = document.createElement('div');
    form.append(div1);
    let input1 = document.createElement('input');
    input1.type = 'number';
    input1.placeholder = 'Qty';
    input1.name = 'qty';
    input1.id = 'qty';
    input1.required = true;
    input1.addEventListener('input', function () {
        let qty = document.getElementById('qty').value;
        displayTotal(qty, i);
    })
    div1.append(input1);
    let div2 = document.createElement('div');
    form.append(div2);
    let totalP = document.createElement('p');
    totalP.id = 'totalMsg';
    div2.append(totalP);
    let input2 = document.createElement('input');
    input2.type = 'number';
    input2.placeholder = '$';
    input2.name = 'diposit';
    input2.id = 'deposit';
    input2.required = true;
    div2.append(input2);
    let div3 = document.createElement('div');
    form.append(div3);
    let submitBtn = document.createElement('button');
    submitBtn.type = 'button';
    submitBtn.id = 'submitBtn';
    submitBtn.innerHTML = "Submit";
    submitBtn.addEventListener('click', function () {
        submit(i);
    })
    div3.append(submitBtn);
};


function displayTotal(qty, index) {
    let msg = document.getElementById('totalMsg');
    if (((qty * 10) % 10) || qty <= 0) {
        form.reset();
        msg.innerHTML = "Please enter a Valid number"
        msg.style.color = 'red';
    } else {
        let total = (companies[index].price * qty);
        msg.innerHTML = `Your Total is ${currencyFormat(total)}`;
        msg.style.color = 'black';
    }

};


function submit(index) {
    let i = index;
    let form = document.getElementById('form');
    let msg = document.getElementById('totalMsg');
    let formData = new FormData(form);
    let qty = formData.get('qty');
    qty = Number(qty);
    
    let diposit = formData.get('diposit');
    let price = companies[i].price;
    let totalPrice = price * qty;
    let totalQtysale;
    let change;
    if (diposit < totalPrice ) {
        
        if (diposit <= 0) {
            msg.innerHTML = 'Please diposit a Valid amount';
        } else {
            totalQtysale = (diposit / price).toFixed();
            msg.innerHTML = `With this amount you can anly buy ${numberFormat(totalQtysale)}`;
            form.reset();
        };
    } else {
        if (!companies[i].amount) {
            companiesOwn.push(companies[i]);
            console.table(companiesOwn);
        }
        companies[i].amount += qty;
        change = (diposit == totalPrice ? 0 : (diposit - totalPrice));
        finalMsg(qty, totalPrice, change, i);

        generateTable();
        form.reset();
    };
};


function finalMsg(qty, total, change, index) {
    let finaDiv = document.getElementById('finalSale');
    document.getElementById('form').style.display = 'none';
    finaDiv.style.display = 'block';
    let msg =  `You bought ${numberFormat(qty)} stocks of ${companies[index].name}
for the amount of ${currencyFormat(total)} and you have ${currencyFormat(change)} change!`;
    let pElement = document.getElementById('finalSale');
    pElement.innerHTML = msg;
    let okBtn = document.createElement('button');
    okBtn.innerHTML = "OK";
    okBtn.id = 'ok';
    okBtn.addEventListener('click', function(){
        finaDiv.style.display = 'none';
        document.getElementById('table').style.display = 'block';
    });
    finaDiv.append(okBtn);
};

