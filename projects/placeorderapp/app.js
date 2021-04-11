import {
    getData,
    getId,
    writeToLS,
    getfromLS
} from './utilities.js'

//Query Selectors
const container = getId('form-container');
const output = getId('output');
const output2 = getId('output-one');


//addeventlistener

document.addEventListener('DOMContentLoaded', getOrder)

let foodOrder = [];
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

//functions


//functions to generate order
function addOrder(ev) {
    ev.preventDefault(); //to stop the form submitting
    let order = {
        created: new Date().toLocaleDateString(undefined, options),
        name: getId('name').value,
        orderDescription: getId('order').value,
        size: getId('size').value,
        quantity: getId('quantity').value
    }

    if (getId('name').value == '' || getId('order').value == '' || getId('size').value == '' || getId('quantity').value == '') {
        console.log("empty field")
    } else {
        foodOrder.push(order);
        savelocalorders(order);
        generateList(order);
        document.forms[0].reset(); // to clear the form for the next entries
    }
}


//functions to save orders to local storage
function savelocalorders(order) {
    let orders;
    if (getfromLS('orders') === null) {
        orders = [];
    } else {
        orders = JSON.parse(getfromLS('orders'));
    }
    orders.push(order);
    writeToLS('orders', JSON.stringify(orders));
}

//functions to create form oders from a json data
function createFormOrder() {
    let formOrder = document.createElement('form');
    formOrder.setAttribute('id', "menu-form")

    let nameContainer = document.createElement('div');
    let NameInput = document.createElement('input');
    NameInput.setAttribute('type', 'text');
    NameInput.setAttribute('id', 'name');
    NameInput.setAttribute('placeholder', 'Name');

    nameContainer.appendChild(NameInput);

    let OrderContainer = document.createElement('div');
    let orderInput = document.createElement('select');
    orderInput.setAttribute('id', 'order')

    let option0 = document.createElement('option');
    option0.setAttribute("selected", "true");
    option0.setAttribute("disabled", "disabled");
    option0.innerHTML = "Choose Order";

    orderInput.appendChild(option0);
    getData("food").then(function (data) {

        let newFood = data.foods;
        return newFood.map(function (foods) {

            let option = document.createElement('option');
            option.value = foods.name;
            option.innerHTML = foods.name;

            orderInput.appendChild(option);
            OrderContainer.appendChild(orderInput);
            //form.insertBefore(select, formOrder[1]);

        })
    });

    let SizeContainer = document.createElement('div');
    let SizeInput = document.createElement('select');
    SizeInput.setAttribute('id', 'size');

    let option1 = document.createElement('option');
    option1.setAttribute("selected", "true");
    option1.setAttribute("disabled", "disabled");
    option1.innerHTML = "Choose Size";

    let option2 = document.createElement('option');
    option2.value = "Medium";
    option2.innerHTML = "Medium";

    let option3 = document.createElement('option');
    option3.value = "Large";
    option3.innerHTML = "Large";


    let option4 = document.createElement('option');
    option4.value = "1 Liter";
    option4.innerHTML = "1 Liter";


    SizeInput.appendChild(option1);
    SizeInput.appendChild(option2);
    SizeInput.appendChild(option3);
    SizeInput.appendChild(option4);
    SizeContainer.appendChild(SizeInput);

    let quantityContainer = document.createElement('div');

    let quantityInput = document.createElement('input');
    quantityInput.setAttribute('id', 'quantity');
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('min', '1');
    quantityInput.setAttribute('placeholder', 'Quantity');

    quantityContainer.appendChild(quantityInput);

    let button = document.createElement('button');
    button.setAttribute('id', 'btn');
    button.innerHTML = "Place Order";


    button.addEventListener('click', addOrder)

    formOrder.appendChild(nameContainer);
    formOrder.appendChild(OrderContainer);
    formOrder.appendChild(SizeContainer);
    formOrder.appendChild(quantityContainer);
    formOrder.appendChild(button);

    container.appendChild(formOrder);
}


//functions to get oders from localstorage
function getOrder() {

    //I have to local storage, one is for In Progress and one is for Now serving Section
    createFormOrder();
    getCompletedOrder();

    let orders;
    if (localStorage.getItem('orders') === null) {
        orders = [];
    } else {
        orders = JSON.parse(getfromLS('orders'));
    }

    let newFood = orders;
    return newFood.map(function (order) {
        generateList(order);

    }).join('');

}


//functions to get oders from localstorage (In Progress)
function getCompletedOrder() {

    let complete;
    if (localStorage.getItem('completed') === null) {
        complete = [];
    } else {
        complete = JSON.parse(getfromLS('completed'));
    }

    let newFood = complete;
    return newFood.map(function (order) {
        nowServingList(order)

    }).join('');

}


//Create entirely the detail after the submission of form (In Progress)
function generateList(order) {
    const orderDetails = document.createElement('div');
    orderDetails.setAttribute('class', 'container')
    const created = document.createElement('p');
    const name = document.createElement('p');

    const orderDescription = document.createElement('p');
    const size = document.createElement('p');
    const quantity = document.createElement('p');
    const deletebtn = document.createElement('button');
    const complete = document.createElement('button');
    const buttonContainer = document.createElement('div');

    created.innerHTML = order.created;
    name.innerHTML = order.name;


    created.style.display = "none";
    orderDescription.style.display = "none";
    size.style.display = "none";
    quantity.style.display = "none";
    buttonContainer.style.display = "none";


    name.addEventListener('click', show);


    //Function to show and hide description for each orders
    function show(e) {

        const item = e.target;
        const div = item.parentElement;
        let x = div.children;


        if (x[0].style.display === "none") {
            x[0].style.display = "block";
            x[2].style.display = "block";
            x[3].style.display = "block";
            x[4].style.display = "block";
            x[5].style.display = "block";



        } else {
            x[0].style.display = "none";
            x[2].style.display = "none";
            x[3].style.display = "none";
            x[4].style.display = "none";
            x[5].style.display = "none";

        }
    }

    orderDescription.innerHTML = "<b>Description:</b> " + order.orderDescription;
    size.innerHTML = "<b>Size:</b> " + order.size;
    quantity.innerHTML = "<b>Quantity:</b> " + order.quantity;

    deletebtn.setAttribute('id', "delete-order");
    deletebtn.addEventListener("click", removeOrder);
    deletebtn.innerHTML = "Delete";

    complete.setAttribute('id', "complete");
    complete.addEventListener("click", cloneToNowserving);
    complete.innerHTML = "Complete";

    orderDetails.appendChild(created);
    orderDetails.appendChild(name);
    orderDetails.appendChild(orderDescription);
    orderDetails.appendChild(size);
    orderDetails.appendChild(quantity);
    buttonContainer.appendChild(deletebtn);
    buttonContainer.appendChild(complete);
    orderDetails.appendChild(buttonContainer);

    output.appendChild(orderDetails);
}


//Create entirely the detail after the submission of form (Now Serving)
function nowServingList(order) {

    const orderDetails = document.createElement('div');
    orderDetails.setAttribute('class', 'container')
    const created = document.createElement('p');
    const name = document.createElement('p');
    const orderDescription = document.createElement('p');
    const size = document.createElement('p');
    const quantity = document.createElement('p');
    const deletebtn = document.createElement('button');

    created.style.display = "none";
    orderDescription.style.display = "none";
    size.style.display = "none";
    quantity.style.display = "none";
    deletebtn.style.display = "none";

    created.innerHTML = order.created;
    name.innerHTML = order.name;
    orderDescription.innerHTML = "<b>Description:</b> " + order.orderDescription;
    size.innerHTML = "<b>Size:</b> " + order.size;
    quantity.innerHTML = "<b>Quantity:</b> " + order.quantity;

    name.addEventListener('click', show);

    //Function to show and hide description for each orders
    function show(e) {

        const item = e.target;
        const div = item.parentElement;
        let x = div.children;


        if (x[0].style.display === "none") {
            x[0].style.display = "block";
            x[2].style.display = "block";
            x[3].style.display = "block";
            x[4].style.display = "block";
            x[5].style.display = "block";




        } else {
            x[0].style.display = "none";
            x[2].style.display = "none";
            x[3].style.display = "none";
            x[4].style.display = "none";
            x[5].style.display = "none";


        }
    }

    deletebtn.setAttribute('id', "delete-order");
    deletebtn.addEventListener("click", removeOrders);
    deletebtn.innerHTML = "Delete";

    orderDetails.appendChild(created);
    orderDetails.appendChild(name);
    orderDetails.appendChild(orderDescription);
    orderDetails.appendChild(size);
    orderDetails.appendChild(quantity);
    orderDetails.appendChild(deletebtn);


    output2.appendChild(orderDetails);
}


//remove orders from (In Progress)
function removeOrder(order) {

    const item = order.target;
    const div = item.parentElement.parentElement;
    let orders;

    if (localStorage.getItem("orders") === null) {
        orders = [];
    } else {
        orders = JSON.parse(localStorage.getItem("orders"));
    }

    const Index = div.children[0].innerHTML;
    var b;
    b = orders.filter(e => e.created === Index);
    b.forEach(f => orders.splice(orders.findIndex(e => e.created === f.created), 1));
    localStorage.setItem('orders', JSON.stringify(orders))
    div.remove();
}


//remove orders from (Now Serving)
function removeOrders(order) {
    const item = order.target;
    const div = item.parentElement;
    let orders;

    if (localStorage.getItem("completed") === null) {
        orders = [];
    } else {
        orders = JSON.parse(localStorage.getItem("completed"));
    }


    var newArr = [];

    for (var i = 0; i < orders.length; i++) {
        newArr = newArr.concat(orders[i]);
    }


    const Index = div.children[0].innerHTML;
    var b;
    b = newArr.filter(e => e.created === Index);

    console.log(newArr);

    b.forEach(f => newArr.splice(newArr.findIndex(e => e.created === f.created), 1));
    localStorage.setItem('completed', JSON.stringify(newArr))
    div.remove();
}

//Move details from In Progress section to Now Serving Section
function cloneToNowserving(e) {

    const item = e.target;
    const div = item.parentElement.parentElement;

    let orders;

    if (localStorage.getItem("orders") === null) {
        orders = [];
    } else {
        orders = JSON.parse(localStorage.getItem("orders"));
    }

    const Index = div.children[0].innerHTML;
    var b;
    b = orders.filter(e => e.created === Index);
    b.forEach(f => orders.splice(orders.findIndex(e => e.created === f.created), 1));
    localStorage.setItem('orders', JSON.stringify(orders))

    var oldItems = JSON.parse(localStorage.getItem('completed')) || [];
    oldItems.push(b);
    var newArr = [];

    for (var i = 0; i < oldItems.length; i++) {
        newArr = newArr.concat(oldItems[i]);
    }

    localStorage.setItem('completed', JSON.stringify(newArr))
    location.reload();
    //getCompletedOrder();
    div.remove();
}