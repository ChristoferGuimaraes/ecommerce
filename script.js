const form = document.querySelector("form");
const product = document.querySelector("#product");
const amount = document.querySelector("#amount");
const price = document.querySelector("#price");
const add = document.querySelector("#add");
const calc = document.querySelector("#calc");
const cart = document.querySelector("#cart");
const tbody = document.querySelector("tbody");
const balance = document.querySelector("#total");
const allItens = [];
let editId = null;

const addProduct = () => {
  const item = {};

  item.id = allItens.length + 1;
  item.name = product.value;
  item.price = price.value;
  item.amount = amount.value;

  return item;
};

const addProductTable = () => {
  tbody.innerText = "";

  for (let i = 0; i < allItens.length; i++) {
    let tr = tbody.insertRow();

    let td_id = tr.insertCell();
    let td_product = tr.insertCell();
    let td_price = tr.insertCell();
    let td_amount = tr.insertCell();
    let td_action = tr.insertCell();

    td_id.innerText = allItens[i].id;
    td_product.innerText = allItens[i].name;
    td_price.innerText = allItens[i].price;
    td_amount.innerText = allItens[i].amount;

    td_id.classList.add("center");
    td_amount.classList.add("center");

    //create edit icon
    const imgEdit = document.createElement("img");
    imgEdit.classList.add("imageEdit");
    imgEdit.src = "./img/edit.png";

    //set click attribute to the imgEdit and dynamically put the 'id' to the attribute function
    imgEdit.setAttribute(
      "onclick",
      `editField(${JSON.stringify(allItens[i])})`
    );

    //create delete icon
    const imgDel = document.createElement("img");
    imgDel.classList.add("imageDel");
    imgDel.src = "./img/delete.png";

    //set click attribute to the imgDel and dynamically put the 'id' to the attribute function
    imgDel.setAttribute("onclick", `deleteItem(${allItens[i].id})`);

    td_action.classList.add("center");
    td_action.appendChild(imgEdit);
    td_action.appendChild(imgDel);
  }
};

const editField = (data) => {
  product.value = data.name;
  amount.value = data.amount;
  price.value = data.price;
  editId = data.id;
  add.value = "Editar";
};

const editArray = (id, data) => {
  for (let i = 0; i < allItens.length; i++) {
    if (allItens[i].id == id) {
      allItens[i].name = data.name;
      allItens[i].amount = data.amount;
      allItens[i].price = data.price;
    }
  }
};

const deleteItem = (id) => {
  for (let i = 0; i < allItens.length; i++) {
    if (allItens[i].id == id) {
      allItens.splice(i, 1);
      tbody.deleteRow(i);
    }
  }
  console.log(allItens);
};

//reset input values
const resetValues = () => {
  product.value = "";
  amount.value = "";
  price.value = "";
};

//add product on click
add.addEventListener("click", () => {
  //verify if it's a edit or a new obj
  if (add.value == "Editar") {
    editArray(editId, addProduct());
    add.value = "Adicionar";
  }

  //add a new obj to the array
  else allItens.push(addProduct());

  addProductTable();

  //reset values after you add a new product
  resetValues();
});

calc.addEventListener("click", () => {
  //multiplies amount to price
  const map = allItens.map((item) => item.amount * item.price);

  //sum all values
  const reduce = map.reduce((accumulator, item) => accumulator + item);

  //show the final price
  balance.innerHTML = `Total: R$ <strong>${reduce.toFixed(2)}</strong>`;
});
