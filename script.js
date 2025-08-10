let dashboardIcon = document.querySelector(".dashboard");
let incomesIcon = document.querySelector(".incomes");
let expensesIcon = document.querySelector(".expenses");
let investmentsIcon = document.querySelector(".investments");
let analyticsIcon = document.querySelector(".analytics");
// All Hider & Un-hider
let welcomeMessage = document.querySelector(".welcome-message");
let dashboardHider = document.querySelector(".dashboard-hider");

let incomesHider1 = document.querySelector(".incomes-container");
let incomesHider2 = document.querySelector(".edit-incomes-window");
let incomesHider3 = document.querySelector(".add-incomes-window");

let expensesHider1 = document.querySelector(".expenses-container");
let expensesHider2 = document.querySelector(".edit-expenses-window");
let expensesHider3 = document.querySelector(".add-expenses-window");

let investmentsHider1 = document.querySelector(".investments-container");
let investmentsHider2 = document.querySelector(".edit-investments-window");
let investmentsHider3 = document.querySelector(".add-investments-window");

let analyticsHider = document.querySelector(".graph-section");

function hideWelcomeMessage (){
    welcomeMessage.classList.add("hide");
}

function hideDashboard (){
    dashboardHider.classList.add("hide");
    document.querySelector(".dashboard").style.color = "";
    document.querySelector(".dashboard").style.fontWeight = "";
}
function unHideDashboard (){
    dashboardHider.classList.remove("hide");
    document.querySelector(".dashboard").style.color = "black";
    document.querySelector(".dashboard").style.fontWeight = "600";
}

function hideIncomes (){
    incomesHider1.classList.add("hide");
    document.querySelector(".incomes").style.color = "";
    document.querySelector(".incomes").style.fontWeight = "";
    blackOverlay.classList.add("hide");
    incomesHider2.classList.add("hide");
    incomesHider3.classList.add("hide");
}
function unHideIncomes (){
    incomesHider1.classList.remove("hide");
    document.querySelector(".incomes").style.color = "black";
    document.querySelector(".incomes").style.fontWeight = "600";
}

function hideExpenses (){
    expensesHider1.classList.add("hide");
    document.querySelector(".expenses").style.color = "";
    document.querySelector(".expenses").style.fontWeight = "";
    blackOverlay.classList.add("hide");
    expensesHider2.classList.add("hide");
    expensesHider3.classList.add("hide");
}
function unHideExpenses (){
    expensesHider1.classList.remove("hide");
    document.querySelector(".expenses").style.color = "black";
    document.querySelector(".expenses").style.fontWeight = "600";
}

function hideInvestments (){
    investmentsHider1.classList.add("hide");
    document.querySelector(".investments").style.color = "";
    document.querySelector(".investments").style.fontWeight = "";
    blackOverlay.classList.add("hide");
    investmentsHider2.classList.add("hide");
    investmentsHider3.classList.add("hide");
}
function unHideInvestments (){
    investmentsHider1.classList.remove("hide");
    document.querySelector(".investments").style.color = "black";
    document.querySelector(".investments").style.fontWeight = "600";
}

function hideAnalytics (){
    analyticsHider.classList.add("hide");
    document.querySelector(".analytics").style.color = "";
    document.querySelector(".analytics").style.fontWeight = "";
}
function unHideAnalytics (){
    analyticsHider.classList.remove("hide");
    document.querySelector(".analytics").style.color = "black";
    document.querySelector(".analytics").style.fontWeight = "600";
}

dashboardIcon.addEventListener("click", () => {
    hideWelcomeMessage();
    hideIncomes();
    hideExpenses();
    hideInvestments();
    hideAnalytics();
    unHideDashboard();
});
incomesIcon.addEventListener("click", () => {
    hideWelcomeMessage();
    hideDashboard();
    hideExpenses();
    hideInvestments();
    hideAnalytics();
    unHideIncomes();
});
expensesIcon.addEventListener("click", () => {
    hideWelcomeMessage();
    hideDashboard();
    hideIncomes();
    hideInvestments();
    hideAnalytics();
    unHideExpenses();
});
investmentsIcon.addEventListener("click", () => {
    hideWelcomeMessage();
    hideDashboard();
    hideIncomes();
    hideExpenses();
    hideAnalytics(); 
    unHideInvestments(); 
});
analyticsIcon.addEventListener("click", () => {
    hideWelcomeMessage();
    hideDashboard();
    hideIncomes();
    hideExpenses();
    hideInvestments(); 
    unHideAnalytics();  
});



// Currency Code 



// Currency Getting Code

let currencySelecter = document.querySelector(".currency-selecter");
import { currencies } from "./currencies.js";

for (let code in currencies) {
    let option = document.createElement("option");
    option.value = code;
    option.textContent = currencies[code];
    currencySelecter.appendChild(option);
}

// Get currency from localStorage or defaulted  PKR

let selectedCurrency = localStorage.getItem('selectedCurrency') || "PKR";
currencySelecter.value = selectedCurrency;

currencySelecter.addEventListener("change", () => {
    selectedCurrency = currencySelecter.value;
    localStorage.setItem('selectedCurrency', selectedCurrency);
    
    updateAllCurrencies();
});

function updateAllCurrencies(){
    let allAmounts = document.querySelectorAll(".amount-of-activity");

    allAmounts.forEach(amountElement => {
        let fullText = amountElement.textContent.trim();
        let parts = fullText.split(" ");

        let numberOnly = parts[0]; 
        let formatted = Number(numberOnly.replace(/,/g, "")).toLocaleString();

        amountElement.textContent = `${formatted} ${selectedCurrency}`;
        
        calculatenetIncome();
        calculatenetExpense();
        calculatenetInvestment();
        remainingAmount();
        barsStatsUpdate();
    });
}



// Remaining or Current Balance Code



let remainingBalance = document.querySelector(".current-balance");
function remainingAmount(){
    let netIncome = document.querySelector(".total-income").textContent;
    let netExpense = document.querySelector(".total-expense").textContent;
    let netInvestment = document.querySelector(".total-investment").textContent;

    let income = Number(netIncome.replace(/,/g, ""));
    let expense = Number(netExpense.replace(/,/g, ""));
    let investment = Number(netInvestment.replace(/,/g, ""));

    let balance = income - (expense + investment);
    if(balance > -1e15 && balance <1e15){
       remainingBalance.textContent = `${selectedCurrency} ${balance.toLocaleString()}`;
    } else{
       remainingBalance.textContent = `Chawla na maar !!!`
    }

    
    if(balance < 0){
        alert("You are in Loss. Expenditures are more than Incomes...");
        document.querySelector(".current-balance-div").classList.add("current-balance-div-color");
    } else{
       document.querySelector(".current-balance-div").classList.remove("current-balance-div-color");
    }
}



// Complete Incomes Menu code



// Total Income Calculator

let netIncome = document.querySelector(".total-income");
let currencyOfNetIncome = document.querySelector(".currency-code-income");
function calculatenetIncome() {
    let amountsOfIncomesSlide = document.querySelectorAll(".incomes-amount");
    let total = 0;

    for (let singleAmount of amountsOfIncomesSlide) {
        let text = singleAmount.textContent.trim();  
        let parts = text.split(" ");                 
        let numberOnly = parts[0].replace(/,/g, ""); 
        let num = Number(numberOnly);

        if (!isNaN(num)) {
            total += num;
        }
    }
    
    netIncome.textContent = total.toLocaleString();
    currencyOfNetIncome.textContent = selectedCurrency;
    saveIncomesToLocalStorage();
}

// Save incomes to localStorage

function saveIncomesToLocalStorage() {
    let incomes = [];
    document.querySelectorAll(".incomes-slides .slide").forEach(slide => {
        incomes.push({
            name: slide.querySelector(".name-of-activity").textContent,
            amount: slide.querySelector(".amount-of-activity").textContent
        });
    });
    localStorage.setItem('incomes', JSON.stringify(incomes));
}

// Load incomes from localStorage

function loadIncomesFromLocalStorage() {
    let savedIncomes = JSON.parse(localStorage.getItem('incomes')) || [];
    let parent = document.querySelector(".incomes-slides");
    parent.innerHTML = '';
    
    savedIncomes.forEach(income => {
        let slide = document.createElement("div");
        slide.classList.add("slide");

        let nameElement = document.createElement("p");
        nameElement.classList.add("name-of-activity");
        nameElement.textContent = income.name;

        let amountElement = document.createElement("p");
        amountElement.classList.add("amount-of-activity", "incomes-amount");
        amountElement.textContent = income.amount;

        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("edit-del-btns");

        let editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            blackOverlay.classList.remove("hide");
            document.querySelector(".edit-incomes-window").classList.remove("hide");

            document.querySelector(".input-edit-incomes-window").value = nameElement.textContent;
            let fullText = amountElement.textContent.trim();
            let parts = fullText.split(" ");
            document.querySelector(".amount-edit-incomes-window").value = parts[0].replace(/,/g, "");

            currentlyEditingSlide = slide;
            currentlyEditingName = nameElement;
            currentlyEditingAmount = amountElement;
        });

        let delBtn = document.createElement("button");
        delBtn.classList.add("del-btn");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            slide.remove();
            calculatenetIncome();
            remainingAmount();
            barsStatsUpdate();
        });

        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(delBtn);

        slide.appendChild(nameElement);
        slide.appendChild(amountElement);
        slide.appendChild(buttonsDiv);

        parent.appendChild(slide);
    });
}

// Incomes Menu Code

let addIncomesBtn = document.querySelector(".add-incomes-btn");
let blackOverlay = document.querySelector(".overlay");
let addIncomesWindow = document.querySelector(".add-incomes-window");

addIncomesBtn.addEventListener("click", () => {
    blackOverlay.classList.remove("hide");
    addIncomesWindow.classList.remove("hide");
});

let currentlyEditingSlide = null;
let currentlyEditingName = null;
let currentlyEditingAmount = null;

function creatingIncomesSlide() {
    let nameValueIncomes = document.querySelector(".input-add-incomes-window").value.trim();
    let rawAmountIncomes = document.querySelector(".amount-add-incomes-window").value.trim();

    if (nameValueIncomes === "" || isNaN(rawAmountIncomes) || rawAmountIncomes === "") {
        alert("Enter Valid Values...");
        blackOverlay.classList.remove("hide");
        addIncomesWindow.classList.remove("hide");
        return;
    } else {
        let incomesSlide = document.createElement("div");
        incomesSlide.classList.add("slide");

        let parentOfIncomesSlide = document.querySelector(".incomes-slides");
        parentOfIncomesSlide.appendChild(incomesSlide);

        let incomesNameOfActivity = document.createElement("p");
        incomesNameOfActivity.classList.add("name-of-activity");

        let incomesAmountOfActivity = document.createElement("p");
        incomesAmountOfActivity.classList.add("amount-of-activity", "incomes-amount");

        let incomeBtnsEditDel = document.createElement("div");
        incomeBtnsEditDel.classList.add("edit-del-btns");

        incomesSlide.appendChild(incomesNameOfActivity);
        incomesSlide.appendChild(incomesAmountOfActivity);
        incomesSlide.appendChild(incomeBtnsEditDel);

        let incomesEditBtn = document.createElement("button");
        incomesEditBtn.classList.add("edit-btn");
        incomesEditBtn.textContent = "Edit";

        incomesEditBtn.addEventListener("click", () => {
            blackOverlay.classList.remove("hide");
            document.querySelector(".edit-incomes-window").classList.remove("hide");

            document.querySelector(".input-edit-incomes-window").value = incomesNameOfActivity.textContent;
            let fullText = incomesAmountOfActivity.textContent.trim();
            let parts = fullText.split(" ");
            document.querySelector(".amount-edit-incomes-window").value = parts[0].replace(/,/g, "");

            currentlyEditingSlide = incomesSlide;
            currentlyEditingName = incomesNameOfActivity;
            currentlyEditingAmount = incomesAmountOfActivity;
        });

        let incomesDelBtn = document.createElement("button");
        incomesDelBtn.classList.add("del-btn");
        incomesDelBtn.textContent = "Delete";

        incomesDelBtn.addEventListener("click", () => {
            incomesSlide.remove();
            
            calculatenetIncome();
            remainingAmount();
            barsStatsUpdate();
        });

        incomeBtnsEditDel.appendChild(incomesEditBtn);
        incomeBtnsEditDel.appendChild(incomesDelBtn);

        incomesNameOfActivity.textContent = nameValueIncomes;
        let amountValueIncomes = Number(rawAmountIncomes).toLocaleString();
        incomesAmountOfActivity.textContent = `${amountValueIncomes} ${selectedCurrency}`;

        document.querySelector(".input-add-incomes-window").value = "";
        document.querySelector(".amount-add-incomes-window").value = "";

    }
}

document.addEventListener("DOMContentLoaded", () => {
    let incomesEditSaveBtn = document.querySelector(".save-edit-incomes-window");
    incomesEditSaveBtn.addEventListener("click", () => {
        if (!currentlyEditingSlide) return;

        let nameEditValueIncomes = document.querySelector(".input-edit-incomes-window").value.trim();
        let rawEditAmountIncomes = document.querySelector(".amount-edit-incomes-window").value.trim();

        if (nameEditValueIncomes === "" || isNaN(rawEditAmountIncomes) || rawEditAmountIncomes === "") {
            alert("Enter Valid Values...");
            blackOverlay.classList.remove("hide");
            document.querySelector(".edit-incomes-window").classList.remove("hide");
            return;
        }

        currentlyEditingName.textContent = nameEditValueIncomes;
        let amountEditValueIncomes = Number(rawEditAmountIncomes).toLocaleString();
        currentlyEditingAmount.textContent = `${amountEditValueIncomes} ${selectedCurrency}`;

        calculatenetIncome();
        remainingAmount();
        barsStatsUpdate();

        blackOverlay.classList.add("hide");
        document.querySelector(".edit-incomes-window").classList.add("hide");

        currentlyEditingSlide = null;
        currentlyEditingName = null;
        currentlyEditingAmount = null;
    });
});

let IncomesEditCross = document.querySelector(".upper-section-edit-incomes-cross");
IncomesEditCross.addEventListener("click", () => {
    blackOverlay.classList.add("hide");
    document.querySelector(".edit-incomes-window").classList.add("hide");
});

let incomesAddSaveBtn = document.querySelector(".save-add-incomes-window");
incomesAddSaveBtn.addEventListener("click", () => {
    blackOverlay.classList.add("hide");
    addIncomesWindow.classList.add("hide");
    creatingIncomesSlide();       
    calculatenetIncome();
    remainingAmount();
    barsStatsUpdate();
});

let IncomesAddCross = document.querySelector(".upper-section-incomes-cross");
IncomesAddCross.addEventListener("click", () => {
    blackOverlay.classList.add("hide");
    addIncomesWindow.classList.add("hide");
});



// Complete Expenses Menu Code



// Total Expense Calculator

let netExpense = document.querySelector(".total-expense");
let currencyOfNetExpense = document.querySelector(".currency-code-expense");
function calculatenetExpense() {
    let amountsOfExpensesSlide = document.querySelectorAll(".expenses-amount");
    let total = 0;

    for (let singleAmount of amountsOfExpensesSlide) {
        let text = singleAmount.textContent.trim();  
        let parts = text.split(" ");                 
        let numberOnly = parts[0].replace(/,/g, ""); 
        let num = Number(numberOnly);

        if (!isNaN(num)) {
            total += num;
        }
    }

    netExpense.textContent = total.toLocaleString();
    currencyOfNetExpense.textContent = selectedCurrency;
    saveExpensesToLocalStorage();
}

// Save expenses to localStorage

function saveExpensesToLocalStorage() {
    let expenses = [];
    document.querySelectorAll(".expenses-slides .slide").forEach(slide => {
        expenses.push({
            name: slide.querySelector(".name-of-activity").textContent,
            amount: slide.querySelector(".amount-of-activity").textContent
        });
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load expenses from localStorage

function loadExpensesFromLocalStorage() {
    let savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let parent = document.querySelector(".expenses-slides");
    parent.innerHTML = '';
    
    savedExpenses.forEach(expense => {
        let slide = document.createElement("div");
        slide.classList.add("slide");

        let nameElement = document.createElement("p");
        nameElement.classList.add("name-of-activity");
        nameElement.textContent = expense.name;

        let amountElement = document.createElement("p");
        amountElement.classList.add("amount-of-activity", "expenses-amount");
        amountElement.textContent = expense.amount;

        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("edit-del-btns");

        let editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            blackOverlay.classList.remove("hide");
            document.querySelector(".edit-expenses-window").classList.remove("hide");

            document.querySelector(".input-edit-expenses-window").value = nameElement.textContent;
            let fullText = amountElement.textContent.trim();
            let parts = fullText.split(" ");
            document.querySelector(".amount-edit-expenses-window").value = parts[0].replace(/,/g, "");

            currentlyEditingSlideExpenses = slide;
            currentlyEditingNameExpenses = nameElement;
            currentlyEditingAmountExpenses = amountElement;
        });

        let delBtn = document.createElement("button");
        delBtn.classList.add("del-btn");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            slide.remove();
            calculatenetExpense();
            remainingAmount();
            barsStatsUpdate();
        });

        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(delBtn);

        slide.appendChild(nameElement);
        slide.appendChild(amountElement);
        slide.appendChild(buttonsDiv);

        parent.appendChild(slide);
    });
}

// Expenses Menu Code

let addExpensesBtn = document.querySelector(".add-expenses-btn");
let addExpensesWindow = document.querySelector(".add-expenses-window");

addExpensesBtn.addEventListener("click", () => {
    blackOverlay.classList.remove("hide");
    addExpensesWindow.classList.remove("hide");
});

let currentlyEditingSlideExpenses = null;
let currentlyEditingNameExpenses = null;
let currentlyEditingAmountExpenses = null;

function creatingExpensesSlide() {
    let nameValueExpenses = document.querySelector(".input-add-expenses-window").value.trim();
    let rawAmountExpenses = document.querySelector(".amount-add-expenses-window").value.trim();

    if (nameValueExpenses === "" || isNaN(rawAmountExpenses) || rawAmountExpenses === "") {
        alert("Enter Valid Values...");
        blackOverlay.classList.remove("hide");
        addExpensesWindow.classList.remove("hide");
        return;
    } else {
        let expensesSlide = document.createElement("div");
        expensesSlide.classList.add("slide");

        let parentOfExpensesSlide = document.querySelector(".expenses-slides");
        parentOfExpensesSlide.appendChild(expensesSlide);

        let expensesNameOfActivity = document.createElement("p");
        expensesNameOfActivity.classList.add("name-of-activity");

        let expensesAmountOfActivity = document.createElement("p");
        expensesAmountOfActivity.classList.add("amount-of-activity", "expenses-amount");

        let expensesBtnsEditDel = document.createElement("div");
        expensesBtnsEditDel.classList.add("edit-del-btns");

        expensesSlide.appendChild(expensesNameOfActivity);
        expensesSlide.appendChild(expensesAmountOfActivity);
        expensesSlide.appendChild(expensesBtnsEditDel);

        let expensesEditBtn = document.createElement("button");
        expensesEditBtn.classList.add("edit-btn");
        expensesEditBtn.textContent = "Edit";

        expensesEditBtn.addEventListener("click", () => {
            blackOverlay.classList.remove("hide");
            document.querySelector(".edit-expenses-window").classList.remove("hide");

            document.querySelector(".input-edit-expenses-window").value = expensesNameOfActivity.textContent;
            let fullText = expensesAmountOfActivity.textContent.trim();
            let parts = fullText.split(" ");
            document.querySelector(".amount-edit-expenses-window").value = parts[0].replace(/,/g, "");

            currentlyEditingSlideExpenses = expensesSlide;
            currentlyEditingNameExpenses = expensesNameOfActivity;
            currentlyEditingAmountExpenses = expensesAmountOfActivity;
        });

        let expensesDelBtn = document.createElement("button");
        expensesDelBtn.classList.add("del-btn");
        expensesDelBtn.textContent = "Delete";

        expensesDelBtn.addEventListener("click", () => {
            expensesSlide.remove();
            calculatenetExpense();
            remainingAmount();
            barsStatsUpdate();
        });

        expensesBtnsEditDel.appendChild(expensesEditBtn);
        expensesBtnsEditDel.appendChild(expensesDelBtn);

        expensesNameOfActivity.textContent = nameValueExpenses;
        let amountValueExpenses = Number(rawAmountExpenses).toLocaleString();
        expensesAmountOfActivity.textContent = `${amountValueExpenses} ${selectedCurrency}`;

        document.querySelector(".input-add-expenses-window").value = "";
        document.querySelector(".amount-add-expenses-window").value = "";
        
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let expensesEditSaveBtn = document.querySelector(".save-edit-expenses-window");
    expensesEditSaveBtn.addEventListener("click", () => {
        if (!currentlyEditingSlideExpenses) return;

        let nameEditValueExpenses = document.querySelector(".input-edit-expenses-window").value.trim();
        let rawEditAmountExpenses = document.querySelector(".amount-edit-expenses-window").value.trim();

        if (nameEditValueExpenses === "" || isNaN(rawEditAmountExpenses) || rawEditAmountExpenses === "") {
            alert("Enter Valid Values...");
            blackOverlay.classList.remove("hide");
            document.querySelector(".edit-expenses-window").classList.remove("hide");
            return;
        }

        currentlyEditingNameExpenses.textContent = nameEditValueExpenses;
        let amountEditValueExpenses = Number(rawEditAmountExpenses).toLocaleString();
        currentlyEditingAmountExpenses.textContent = `${amountEditValueExpenses} ${selectedCurrency}`;

        calculatenetExpense();
        remainingAmount();
        barsStatsUpdate();

        blackOverlay.classList.add("hide");
        document.querySelector(".edit-expenses-window").classList.add("hide");

        currentlyEditingSlideExpenses = null;
        currentlyEditingNameExpenses = null;
        currentlyEditingAmountExpenses = null;
    });
});

let expensesEditCross = document.querySelector(".upper-section-edit-expenses-cross");
expensesEditCross.addEventListener("click", () => {
    blackOverlay.classList.add("hide");
    document.querySelector(".edit-expenses-window").classList.add("hide");
});

let expensesAddSaveBtn = document.querySelector(".save-add-expenses-window");
expensesAddSaveBtn.addEventListener("click", () => {
    blackOverlay.classList.add("hide");
    addExpensesWindow.classList.add("hide");
    creatingExpensesSlide();
    calculatenetExpense();
    remainingAmount();
    barsStatsUpdate();
});

let expensesAddCross = document.querySelector(".upper-section-expenses-cross");
expensesAddCross.addEventListener("click", () => {
    blackOverlay.classList.add("hide");
    addExpensesWindow.classList.add("hide");
});



// Complete Investments Menu Code



// Total Investments Calculator

let netInvestment = document.querySelector(".total-investment");
let currencyOfNetInvestment = document.querySelector(".currency-code-investment");
function calculatenetInvestment() {
    let amountsOfInvestmentSlide = document.querySelectorAll(".investments-amount");
    let total = 0;

    for (let singleAmount of amountsOfInvestmentSlide) {
        let text = singleAmount.textContent.trim();  
        let parts = text.split(" ");                 
        let numberOnly = parts[0].replace(/,/g, ""); 
        let num = Number(numberOnly);

        if (!isNaN(num)) {
            total += num;
        }
    }

    netInvestment.textContent = total.toLocaleString();
    currencyOfNetInvestment.textContent = selectedCurrency;
    saveInvestmentsToLocalStorage();
}

// Save investments to localStorage
function saveInvestmentsToLocalStorage() {
    let investments = [];
    document.querySelectorAll(".investments-slides .slide").forEach(slide => {
        investments.push({
            name: slide.querySelector(".name-of-activity").textContent,
            amount: slide.querySelector(".amount-of-activity").textContent
        });
    });
    localStorage.setItem('investments', JSON.stringify(investments));
}

// Load investments from localStorage
function loadInvestmentsFromLocalStorage() {
    let savedInvestments = JSON.parse(localStorage.getItem('investments')) || [];
    let parent = document.querySelector(".investments-slides");
    parent.innerHTML = '';
    
    savedInvestments.forEach(investment => {
        let slide = document.createElement("div");
        slide.classList.add("slide");

        let nameElement = document.createElement("p");
        nameElement.classList.add("name-of-activity");
        nameElement.textContent = investment.name;

        let amountElement = document.createElement("p");
        amountElement.classList.add("amount-of-activity", "investments-amount");
        amountElement.textContent = investment.amount;

        let buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("edit-del-btns");

        let editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            blackOverlay.classList.remove("hide");
            document.querySelector(".edit-investments-window").classList.remove("hide");

            document.querySelector(".input-edit-investments-window").value = nameElement.textContent;
            let fullText = amountElement.textContent.trim();
            let parts = fullText.split(" ");
            document.querySelector(".amount-edit-investments-window").value = parts[0].replace(/,/g, "");

            currentlyEditingSlideInvestments = slide;
            currentlyEditingNameInvestments = nameElement;
            currentlyEditingAmountInvestments = amountElement;
        });

        let delBtn = document.createElement("button");
        delBtn.classList.add("del-btn");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            slide.remove();
            calculatenetInvestment();
            remainingAmount();
            barsStatsUpdate();
        });

        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(delBtn);

        slide.appendChild(nameElement);
        slide.appendChild(amountElement);
        slide.appendChild(buttonsDiv);

        parent.appendChild(slide);
    });
}

// Investments Menu Code

let addInvestmentsBtn = document.querySelector(".add-investments-btn");
let addInvestmentsWindow = document.querySelector(".add-investments-window");

addInvestmentsBtn.addEventListener("click", () => {
    blackOverlay.classList.remove("hide");
    addInvestmentsWindow.classList.remove("hide");
});

let currentlyEditingSlideInvestments = null;
let currentlyEditingNameInvestments = null;
let currentlyEditingAmountInvestments = null;

function creatingInvestmentsSlide() {
    let nameValueInvestments = document.querySelector(".input-add-investments-window").value.trim();
    let rawAmountInvestments = document.querySelector(".amount-add-investments-window").value.trim();

    if (nameValueInvestments === "" || isNaN(rawAmountInvestments) || rawAmountInvestments === "") {
        alert("Enter Valid Values...");
        blackOverlay.classList.remove("hide");
        addInvestmentsWindow.classList.remove("hide");
        return;
    } else {
        let investmentsSlide = document.createElement("div");
        investmentsSlide.classList.add("slide");

        let parentOfInvestmentsSlide = document.querySelector(".investments-slides");
        parentOfInvestmentsSlide.appendChild(investmentsSlide);

        let investmentsNameOfActivity = document.createElement("p");
        investmentsNameOfActivity.classList.add("name-of-activity");

        let investmentsAmountOfActivity = document.createElement("p");
        investmentsAmountOfActivity.classList.add("amount-of-activity", "investments-amount");

        let investmentsBtnsEditDel = document.createElement("div");
        investmentsBtnsEditDel.classList.add("edit-del-btns");

        investmentsSlide.appendChild(investmentsNameOfActivity);
        investmentsSlide.appendChild(investmentsAmountOfActivity);
        investmentsSlide.appendChild(investmentsBtnsEditDel);

        let investmentsEditBtn = document.createElement("button");
        investmentsEditBtn.classList.add("edit-btn");
        investmentsEditBtn.textContent = "Edit";

        investmentsEditBtn.addEventListener("click", () => {
            blackOverlay.classList.remove("hide");
            document.querySelector(".edit-investments-window").classList.remove("hide");

            document.querySelector(".input-edit-investments-window").value = investmentsNameOfActivity.textContent;
            let fullText = investmentsAmountOfActivity.textContent.trim();
            let parts = fullText.split(" ");
            document.querySelector(".amount-edit-investments-window").value = parts[0].replace(/,/g, "");

            currentlyEditingSlideInvestments = investmentsSlide;
            currentlyEditingNameInvestments = investmentsNameOfActivity;
            currentlyEditingAmountInvestments = investmentsAmountOfActivity;
        });

        let investmentsDelBtn = document.createElement("button");
        investmentsDelBtn.classList.add("del-btn");
        investmentsDelBtn.textContent = "Delete";

        investmentsDelBtn.addEventListener("click", () => {
            investmentsSlide.remove();
            calculatenetInvestment();
            remainingAmount();
            barsStatsUpdate();
        });

        investmentsBtnsEditDel.appendChild(investmentsEditBtn);
        investmentsBtnsEditDel.appendChild(investmentsDelBtn);

        investmentsNameOfActivity.textContent = nameValueInvestments;
        let amountValueInvestments = Number(rawAmountInvestments).toLocaleString();
        investmentsAmountOfActivity.textContent = `${amountValueInvestments} ${selectedCurrency}`;

        document.querySelector(".input-add-investments-window").value = "";
        document.querySelector(".amount-add-investments-window").value = "";
        
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let investmentsEditSaveBtn = document.querySelector(".save-edit-investments-window");
    investmentsEditSaveBtn.addEventListener("click", () => {
        if (!currentlyEditingSlideInvestments) return;

        let nameEditValueInvestments = document.querySelector(".input-edit-investments-window").value.trim();
        let rawEditAmountInvestments = document.querySelector(".amount-edit-investments-window").value.trim();

        if (nameEditValueInvestments === "" || isNaN(rawEditAmountInvestments) || rawEditAmountInvestments === "") {
            alert("Enter Valid Values...");
            blackOverlay.classList.remove("hide");
            document.querySelector(".edit-investments-window").classList.remove("hide");
            return;
        }

        currentlyEditingNameInvestments.textContent = nameEditValueInvestments;
        let amountEditValueInvestments = Number(rawEditAmountInvestments).toLocaleString();
        currentlyEditingAmountInvestments.textContent = `${amountEditValueInvestments} ${selectedCurrency}`;

        calculatenetInvestment();
        remainingAmount();
        barsStatsUpdate();

        blackOverlay.classList.add("hide");
        document.querySelector(".edit-investments-window").classList.add("hide");

        currentlyEditingSlideInvestments = null;
        currentlyEditingNameInvestments = null;
        currentlyEditingAmountInvestments = null;
    });
});

let investmentsEditCross = document.querySelector(".upper-section-edit-investments-cross");
investmentsEditCross.addEventListener("click", () => {
    blackOverlay.classList.add("hide");
    document.querySelector(".edit-investments-window").classList.add("hide");
});

let investmentsAddSaveBtn = document.querySelector(".save-add-investments-window");
investmentsAddSaveBtn.addEventListener("click", () => {
    blackOverlay.classList.add("hide");
    addInvestmentsWindow.classList.add("hide");
    creatingInvestmentsSlide();
    calculatenetInvestment();
    remainingAmount();
    barsStatsUpdate();
});

let investmentsAddCross = document.querySelector(".upper-section-investments-cross");
investmentsAddCross.addEventListener("click", () => {
    blackOverlay.classList.add("hide");
    addInvestmentsWindow.classList.add("hide");
});



// Complete Analytics Menu Code



let financeData = {
    income: 0,
    expenses: 0,
    investments: 0,
    current: 0
};

function updateFinanceData() {
    let curr = document.querySelector(".current-balance").textContent;
    let text = curr.split(" ");
    let num = text[1].replace(/,/g, "");

    financeData.income = Number(document.querySelector(".total-income").textContent.replace(/,/g, ""));
    financeData.expenses = Number(document.querySelector(".total-expense").textContent.replace(/,/g, ""));
    financeData.investments = Number(document.querySelector(".total-investment").textContent.replace(/,/g, ""));
    financeData.current = Number(num);
}

function updateBar(clas, value) {
    if (financeData.income > 1e15 || financeData.expenses > 1e15 || financeData.investments > 1e15 || financeData.current > 1e15) {
        document.querySelector(clas).style.height = "0";
        return;
    }
    let allZero = financeData.income === 0 && 
                   financeData.expenses === 0 && 
                   financeData.investments === 0 && 
                   financeData.current === 0;

    let max;
    if (allZero) {
        max = 100; 
    } else {
        max = Math.max(
            financeData.income,
            financeData.expenses,
            financeData.investments,
            financeData.current
        ) * 1.3;
    }

    let heightPercent = Math.max((value / max) * 100, 0);
    let bar = document.querySelector(clas);

    bar.style.height = `${heightPercent}%`;
    
    let barWidth = parseFloat(window.getComputedStyle(document.querySelector(".bar")).width);
    let BARWIDTH = barWidth >= 70;

    if(heightPercent > 15 && financeData.income <=10000000 && financeData.expenses <=10000000 && financeData.investments <=10000000 && financeData.current <=10000000 && BARWIDTH){
       bar.querySelector(".bar-label").classList.remove("hide");
       bar.querySelector(".bar-label").textContent = `${selectedCurrency} ${value.toLocaleString()}`; 
    } else{
       bar.querySelector(".bar-label").classList.add("hide"); 
    }
}

function updateStats() {
    let expensesRate = financeData.income > 0 ? Math.round((financeData.expenses / financeData.income) * 100) : 0;
    let investmentRate = financeData.income > 0 ? Math.round((financeData.investments / financeData.income) * 100) : 0;
    let currentAmount = financeData.income - (financeData.expenses + financeData.investments);

    if(financeData.income < 1e15 && financeData.expenses < 1e15 && financeData.investments < 1e15 && financeData.current < 1e15){
        document.querySelector(".net-income").textContent = `${selectedCurrency} ${financeData.income.toLocaleString()}`;
        document.querySelector(".expense-rate").textContent = `${expensesRate}%`;
        document.querySelector(".investment-rate").textContent = `${investmentRate}%`;
        document.querySelector(".current-amount").textContent = `${selectedCurrency} ${currentAmount.toLocaleString()}`;
    } else{
        document.querySelector(".net-income").textContent = `Aukat me reh !!!`;
        document.querySelector(".expense-rate").textContent = `Aukat me reh !!!`;
        document.querySelector(".investment-rate").textContent = `Aukat me reh !!!`;
        document.querySelector(".current-amount").textContent = `Aukat me reh !!!`;
    }
    
}

function barsStatsUpdate() {
    updateFinanceData();
    updateBar(".income-bar", financeData.income);
    updateBar(".expense-bar", financeData.expenses);
    updateBar(".investment-bar", financeData.investments);
    updateBar(".current-bar", financeData.current);
    updateStats();
}



// Loads all Menus when page is loaded



document.addEventListener("DOMContentLoaded", () => {

    // Load currency 

    selectedCurrency = localStorage.getItem('selectedCurrency') || "PKR";
    currencySelecter.value = selectedCurrency;
    
    // Load all menus

    loadIncomesFromLocalStorage();
    loadExpensesFromLocalStorage();
    loadInvestmentsFromLocalStorage();
    
    // Re-Add calculations 
    
    calculatenetIncome();
    calculatenetExpense();
    calculatenetInvestment();
    remainingAmount();
    barsStatsUpdate();
});