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
let id = 0;

const addProduct = () => {
  const item = {};

  id++;
  item.id = String(id);
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

    const imgEdit = document.createElement("img");
    imgEdit.classList.add("imageEdit");
    imgEdit.src = "./img/edit.png";

    const imgDel = document.createElement("img");
    imgDel.classList.add("imageDel");
    imgDel.src = "./img/delete.png";

    td_action.classList.add('center')
    td_action.appendChild(imgEdit);
    td_action.appendChild(imgDel);
  }
};

//add product on click
add.addEventListener("click", () => {
  allItens.push(addProduct());

  addProductTable();
  console.log(allItens);
});

calc.addEventListener("click", () => {
  const map = allItens.map((item) => item.amount * item.price); // multiplicar amount pelo preço

  const reduce = map.reduce((accumulator, item) => accumulator + item); // somar todos os preços

  balance.innerHTML = `Total: R$ <strong>${reduce.toFixed(2)}</strong>`;
});
