//Budget Controller
var budgetController = ((() => { 
    class Expense {
        constructor(id, description, value){ //create a class to allow an easy creater for new expenses
            this.id = id;
            this.description = description;
            this.value = Math.abs(value);
            this.percentage = -1;
            this.calcPercentage = (totalIncome => {
                if (totalIncome > 0){
                    this.percentage = ((this.value / totalIncome) * 100).toFixed(1);
                } else {
                    this.percentage = -1;
                };
            });
            this.getPercentage = (() => {
                return this.percentage;
            });
        };
    }; //Class for expense items

    class Income {
        constructor(id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
        };
    };//Class for income items
    
    let data = {
        allItems : {
            exp : [],
            inc : [],
        },
        totals : {
            exp : 0,
            inc : 0,
        },
        budget : 0,
        percentage : -1,
    }; //Data storage for both income and expenses
    
     const calculateTotal = (type => {
        let sum = 0;
        data.allItems[type].forEach(cur => sum += cur.value);//creating the sum of all items inside an array
        data.totals[type] = sum;
    });
    
    return {
        addItem: ((type, des, val) =>{ 
            let newItem, ID;
            //Create new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            } else {
                ID = 0;
            };
            //Create new item based off 'inc' or 'exp' type
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc'){
                newItem = new Income(ID, des, val);

            };
            //Push it into data structure
            data.allItems[type].push(newItem);
            //Return the new element
            return newItem;           
        }),
        
        deleteItem: ((type, ID) =>{ 
            let ids, index;
            ids = data.allItems[type].map(current => current.id); 
            index = ids.indexOf(ID);
            if (index !== -1){
                data.allItems[type].splice(index, 1);
            };
        }),
        
        calculateBudget: (() => {
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //calculate the budget (income - expenses)
            data.budget = data.totals.inc - data.totals.exp; 
            //calculate the percent of income spent
            if (data.totals.inc > 0){
                data.percentage = ((data.totals.exp / data.totals.inc) * 100).toFixed(1);
            };
            if (data.budget < 0){
                setTimeout((() => {
                    alert(`Over budget by ${data.budget * -1} .`);
                }), 100);
            };
        }),
        
        calculatePercentages : (() => {
            for (const cur of data.allItems.exp){
                cur.calcPercentage(data.totals.inc);
            };
        }),
        
        getPercentages: (() => {
            var allPerc = data.allItems.exp.map(((cur) => {
               return cur.getPercentage();
            }));
            return allPerc;
        }),
        
        getBudget: (() => {
          return {
            budget : data.budget,
            totalIncome : data.totals.inc,
            totalExpenses : data.totals.exp,
            percentage : data.percentage,
          };  
        }),
    };
}))();
//UI Controller
const UIController = ((() => {
    
    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        inputContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensePercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
    }; //storage of all query selector and like events
    
    const formatNumber = ((num, type) => {        
        let numSplit, int, dec;
        num = Math.abs(num);
        num = num.toFixed(2); // exactly 2 decimal points
        numSplit = num.split('.');
        int = numSplit[0];
        int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        dec = numSplit[1];
        return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;
    });

    return {
        getInput : (() =>{
          return {
            type : document.querySelector(DOMstrings.inputType).value, //will return either inc or exp 
            description : document.querySelector(DOMstrings.inputDescription).value,
            value : parseFloat(document.querySelector(DOMstrings.inputValue).value),
          };
        }),
        
        addListItem: ((obj, type) => {
            let html, newHTML, element;
            //Create HTML string with placeholder text
            if (type === 'inc'){
                element = DOMstrings.inputContainer;            
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix">                <div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //Replace placeholder text with actual data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));
            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        }),
         
        deleteListItem : ((selectorID) => (document.getElementById(selectorID)).parentNode.removeChild(document.getElementById(selectorID))),
        
        clearFields: (() => {
            let fieldsArray;
            fieldsArray = [...document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue)];
            fieldsArray.forEach((current, index, array) => current.value = "");
            fieldsArray[0].focus();
        }),
        
        displayBudget: ((obj) => {
            let type;
            if (obj.budget !== 0){
                obj.budget > 0 ? type = 'inc' : type = 'exp';
                document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            } else {
                document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget.toFixed(2);
            };
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExpenses, 'exp');
            if (obj.percentage > 0){
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
            document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            };
        }),
        
        displayPercentages : ((percentages) => {
            let fields = [...document.querySelectorAll(DOMstrings.expensePercentageLabel)];
            fields.forEach((cur, index) => {
            if (percentages[index] > 0){
                    cur.textContent = percentages[index] + '%';
                } else {
                    cur.textContent = '---';
                };
            });
        }),
        
        displayMonth: (() => {
            const now = new Date();
            const months = ['January', 'Febuary', 'March', 'April', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = now.getMonth();
            const year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = `${months[month]} ${year}`;
        }),
        
        changeType: (() =>{
            let fields = [...document.querySelectorAll(`${DOMstrings.inputType},${DOMstrings.inputDescription},${DOMstrings.inputValue}`)];
                fields.forEach(cur => cur.classList.toggle('red-focus'));
                document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        }),
        
        getDomstrings: (() => {
            return DOMstrings;
        }),
    };    
}))();
//Global App controller
const controller = (((budgetCtrl, UICtrl) => {
    
    const setUpEventListeners = (() => {
        var DOM = UICtrl.getDomstrings();        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', ((event) =>{
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            };
        }));
        document.querySelector(DOM.container).addEventListener('click', cntrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType)
    }); //event listeners for btns 
    
    const updateBudget = (() => {
        budgetController.calculateBudget();
        let budget = budgetCtrl.getBudget();
        UICtrl.displayBudget(budget);
    });
    
    const updatePercentages = (() => {
        budgetCtrl.calculatePercentages();
        var percentages = budgetCtrl.getPercentages();
        UICtrl.displayPercentages(percentages);
    });
    
    const ctrlAddItem = (() => {
        let input, newItem;   
        // 1. get the field input data
        input = UICtrl.getInput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0){
            // 2. add item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. add the new item to the UI
            UICtrl.addListItem(newItem, input.type);
            // 4. clear the fields
            UICtrl.clearFields();
            // 5. Calculate and update budget
            updateBudget();
        }
        else { //Part 4 of Toy Problem 1
            switch(true){
                case input.description === "" && isNaN(input.value):
                    alert('Data required: all fields are empty.');
                    break;
                case input.description === "":
                    alert('Data required: description for income/expense');
                    break;
                case input.description >= 0 || input.description <0:
                    alert('Description requires at least 1 letter');
                    break;
                case isNaN(input.value):
                    alert('Data required: value for income/expense');
                    break;
                case input.value === 0:
                    alert('Income/expense cannot be 0');
                    break;
                };
        };
        // 6. Update the percentage
        updatePercentages();
    });//coding for adding an item to the page
    
    const cntrlDeleteItem = ((event) => {
        let itemID, splitID, clickValue, clickVal, clickDes, newDes, newVal, changeTarget, eventTarget, numSplit, int, dec, isNumber;
        isNumber = newVal >= 0 || newVal < 0;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        clickValue = event.target.classList.value;
        clickDes = event.target.parentNode.id;
        clickVal = event.target.parentNode.parentNode.id;    
        
        if(itemID) {
            splitID = itemID.split('-');
            let [type, ID] = [splitID[0], (parseInt(splitID[1]))];
            // Delete item from data structure
            budgetCtrl.deleteItem(type, ID);
            // Delete item from UI
            UICtrl.deleteListItem(itemID);
            // Update and show new budget
            updateBudget();        
            //Update the percentage
            updatePercentages();
        }
        // Define what is being changed. Set counters for null, empty strings and NaN entries in if/else statements
        switch (true){
            case clickValue === 'item__description':
                newDes = prompt('What would you like to change this description to?');
                if (newDes === ''){
                    newDes = prompt('Please enter a new description');
                    if (newDes === '' || newDes === null){return false};
                } else if(newDes === null){return false};
                document.getElementById(clickDes).firstElementChild.innerHTML = newDes;
                break;
            case clickValue === 'item__value':
                newVal = parseInt(prompt('What would you like to change the value to? Note: use \'-\' to indicate an expense.'));
                if (newVal >= 0 || newVal < 0){
                } else {
                    newVal = parseInt(prompt('Please enter a new value. Note: use \'-\' to indicate an expense.'));
                    if (newVal >= 0 || newVal < 0){
                    } else {return false};
                };
                // Redefine and create the item
                newVal < 0 ? type = 'exp' : type = 'inc';
                clickVal = event.target.parentNode.parentNode.id;
                splitID = clickVal.split('-');
                let [typePrevious, ID] = [splitID[0], (parseInt(splitID[1]))];
                carryDes = event.target.parentNode.parentNode.childNodes[0].innerHTML;
                newItem = budgetCtrl.addItem(type, carryDes, newVal);
                // Add item to correct new list
                UICtrl.addListItem(newItem, type);
                // Clear fields
                UICtrl.clearFields();
                // Delete the previous item
                budgetCtrl.deleteItem(typePrevious, ID);
                UICtrl.deleteListItem(clickVal);
                // Calculate and update budget
                updateBudget();
                updatePercentages();
                break;
        };
    }); 
    
    return {
        init: (() => {
            console.log('Application has started.');
            setUpEventListeners();
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget : 0,
                totalIncome : 0,
                totalExpenses : 0,
                percentage : -1,
                });
        }),
    }; //Items that are public (mainly controller.init)
}))(budgetController, UIController); //allowing controller IIFE to access and use the other two IIFEs

controller.init(); //calls init function to allow instant start to program