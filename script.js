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

    imgEdit.addEventListener("click", () => {
      product.value = allItens[i].name;
      amount.value = allItens[i].amount;
      price.value = allItens[i].price;
      add.value = "Editar";
    });
    console.log(i);

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

const deleteItem = (id) => {
  for (let i = 0; i < allItens.length; i++) {
    if (allItens[i].id == id) {
      allItens.splice(i, 1);
      tbody.deleteRow(i);
    }
  }
  console.log(allItens);
};

//add product on click
add.addEventListener("click", () => {
  add.value = "Adicionar";

  allItens.push(addProduct());

  addProductTable();
  console.log(allItens);

  //reset values after you add a new product
  product.value = "";
  amount.value = "";
  price.value = "";
});

calc.addEventListener("click", () => {
  //multiplies amount to price
  const map = allItens.map((item) => item.amount * item.price);

  //sum all values
  const reduce = map.reduce((accumulator, item) => accumulator + item);

  balance.innerHTML = `Total: R$ <strong>${reduce.toFixed(2)}</strong>`;
});
