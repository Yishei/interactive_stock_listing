// companies for the table.
let companiesOnTable = [];

// companies aval.
let companies = [{
    name: 'Amazon.com',
    price: 96.63,
    value: 0,
    amount:0,
    ticker: 'AMZN',
    logo:  './photos/AMZN.png',
}, {
    name: 'Apple Inc',
    price: 146.87,
    value: 0,
    amount: 0,
    ticker: 'AAPL',
    logo: './photos/AAPL.png',
}, {
    name: 'Microsoft Corp',
    price: 242.98,
    value: 0,
    amount: 0,
    ticker: 'MSFT',
    logo: './photos/MSFT.png',
}, {
    name: 'Alibaba Group',
    price: 69.77,
    value: 0,
    amount: 0,
    ticker: 'BABA',
    logo: './photos/BABA.png',
}, {
    name: 'Tasla Inc',
    price: 190.72,
    value: 0,
    amount: 0,
    ticker: 'TSLA',
    logo: './photos/TSLA.png',
}, {
    name: 'Meta Platforms Inc',
    price: 111.87,
    value: 0,
    amount: 0,
    ticker: 'META',
    logo: './photos/META.png',
}, {
    name: 'IBM',
    price: 141.23,
    value: 0,
    amount: 0,
    ticker: 'IBM',
    logo: './photos/IBM.png',
}, {
    name: 'Berkshire Hathaway Corp',
    price: 463695.00,
    value: 0,
    amount: 0,
    ticker: 'BRK.A',
    logo: './photos/BRK.A.png',
}, {
    name: 'Visa Inc',
    price: 210.99,
    value: 0,
    amount: 0,
    ticker: 'V',
    logo: './photos/V.png',
}, {
    name: 'JPMorgan Chase & Co',
    price: 132.54,
    value: 0,
    amount: 0,
    ticker: 'JPM',
    logo: './photos/JPM.jpg',
}, {
    name: 'Mastercard Inc',
    price: 341.27,
    value: 0,
    amount: 0,
    ticker: 'MA',
    logo: './photos/MA.png',
}, {
    name: 'Bank of America',
    price: 37.17,
    value: 0,
    amount: 0,
    ticker: 'BAC',
    logo: './photos/BAC.png',
},];

/*function showAddForm() {
    document.getElementById('buyStocks').style.display = 'block'
};



function buyStockj(index) {
    let newAmount;
    let greater;
    let isDecimal;
    let total;
    let finalMsg;
    let divElement = document.getElementById('yishei');
    let form = document.createElement('form');
    form.name = 'buyStocks';
    form.id = 'buyStocks';
    let formLable = document.createElement('label');
    form.append(formLable);
    formLable.for = 'buyStocks';
    formLable.innerText = `how much stocks of ${companies[index].name} do you whont to buy?`;
    let input = document.createElement('input');
    input.type = "number";
    input.placeholder= "amount";
    input.name= "amount";
    input.required = true;
    form.append(input);
    let submitButton = document.createElement('button');
    submitButton.id = 'submitBtn'
    submitButton.innerText = "Submit";
    submitButton.addEventListener('click', function() {
        submitAmount(index)
    });
    form.append(submitButton);
    divElement.append(form);
};

function submitAmount(index) {
    
    let formElement = document.getElementById('buyStocks');
    let fd = new FormData (formElement);
    let amount = fd.get('amount');
    let total = companies[index].price * amount;
    if (amount <= 0) {
        alert('if you whant to sell pleses go to the sell button');
        throw 'INVLID_INPUT';
    } else {
        document.getElementById('submitBtn').style.display = 'none';
        let label = document.createElement('label');
        label.for= 'deposit';
        label.innerText = `your total is ${currencyFormat(total)} pleses diposit`;
        formElement.append(label);
        let deposit = document.createElement('input');
        deposit.type= 'text';
        deposit.name= 'deposit';
        deposit.required = true;
        formElement.append(deposit);
        let submitBtn = document.createElement('button');
        submitBtn.innerText ='Sumbit';
        submitBtn.id = 'submitDeposit'
        submitBtn.addEventListener('click', function() {
            submitDiposit()
        });
        formElement.append(submitBtn);
    }

};*/