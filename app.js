// https://app.exchangerate-api.com/dashboard kullanılan api sayfası

const apiKey = "";  // your api key
const url = "https://v6.exchangerate-api.com/v6/" + apiKey;

//Elements
const currency_one = document.getElementById("currency_one");
const currency_two = document.getElementById("currency_two");
const datalistOptions = document.getElementById("datalistOptions");
//const datalistOptionsTwo = document.getElementById("datalistOptions");
const amount = document.getElementById("amount");
const buttonCalculate = document.getElementById("buttonCalculate");
const result = document.getElementById("result");

fetch(url + "/codes")
.then(res => res.json())
.then(data => {
    const items = data.supported_codes;
    let options;
    for(let item of items) {
        options += `<option value = ${item[0]}>${item[1]}</option>`;
    }
    //console.log(options);
    datalistOptions.innerHTML = options;
    
});

buttonCalculate.addEventListener("click", () => {
   const firstCurrency = currency_one.value;
   const secondCurrency = currency_two.value;
   //console.log(firstCurrency,secondCurrency);
   const sum = amount.value;

   fetch(url + "/latest/" + firstCurrency) // bu kısımlar api dökümantasyonunda yazıldığı gibi yapılmalı
        .then(res => res.json())
        .then(data => {
          //console.log(data);
            const hesaplananDeger = (data.conversion_rates[secondCurrency]*sum).toFixed(3);
            result.innerHTML = `
            <div class="card border-primary">
                <div class="card-body text-center" style="font-size:20px;">
                  ${sum} ${firstCurrency} = ${hesaplananDeger} ${secondCurrency}
                </div>
              </div>
            `;
            
            //data.conversion_rates[secondCurrency]*sum
        })
});