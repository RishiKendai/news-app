let editBtn;
let deleteBtn;

function resetModal() {
  document.querySelector('[name="title"]').textContent = "";
  document.querySelector('[name="description"]').textContent = "";
  document.querySelector('[name="publishedAt"]').textContent = "";
  document.querySelector(".modal").removeAttribute("data-modal_id");
  document.querySelector(".modal").classList.remove("active");
}

function updateNews() {
  
  const id = document.querySelector(".modal").dataset.modal_id;

  let modal_title = document.querySelector('[name="title"]').textContent;
  let modal_desc = document.querySelector('[name="description"]').textContent;
  let modal_publishedAt = document.querySelector(
    '[name="publishedAt"]'
  ).textContent;

  const parent = document.querySelector(`[data-id="${id}"]`);
  parent.querySelector(`.c1`).textContent = modal_title;
  parent.querySelector(".c2").textContent = modal_desc;
  parent.querySelector(".c3").textContent = modal_publishedAt;

  const newsData = {
    id: id,
    title: modal_title,
    description: modal_desc,
    publishedAt: modal_publishedAt,
  };

  $.ajax({
    method: "post",
    url: "/api/news/update",
    data: newsData,
    dataType: "json",
    async: true,
    success: function (response) {
      if (response.status === true) {
        resetModal();
        alert(response.res);
      } else {
        alert(response.res);
      }
    },
  });
}

function handleEdit(e) {
  const parent = e.target.parentElement.parentElement;
  const title = parent.querySelector(`.c1`).textContent;
  const description = parent.querySelector(".c2").textContent;
  const publishedAt = parent.querySelector(".c3").textContent;

  let modal_title = document.querySelector('[name="title"]');
  let modal_desc = document.querySelector('[name="description"]');
  let modal_publishedAt = document.querySelector('[name="publishedAt"]');

  modal_title.textContent = title;
  modal_desc.textContent = description;
  modal_publishedAt.textContent = publishedAt;

  document.querySelector(".modal").classList.add("active");
  document
    .querySelector(".modal")
    .setAttribute("data-modal_id", parent.dataset.id);
}

function fetchData() {
  $.ajax({
    method: "get",
    url: "/api/news/fetch",
    async: true,
    success: function (response) {
      if (response.status === true) {
        displayData(response.res);
      } else {
        window.alert(response.res);
      }
    },
  });
}

function displayData(records) {
  const table = document.querySelector(".table");
  records.map((record) => {
    // Row
    const row = customElement("div", ["row"]);
    row.setAttribute("data-id", record._id);
    // col1
    const c1 = customElement("div", ["c1", "record"]);
    c1.textContent = record.title;
    row.appendChild(c1);
    // col2
    const c2 = customElement("div", ["c2", "record"]);
    c2.textContent = record.description;
    row.appendChild(c2);
    // col3
    const c3 = customElement("div", ["c3", "record"]);
    c3.textContent = record.publishedAt;
    row.appendChild(c3);
    // col4
    const c4 = customElement("div", ["c4", "btn_wrapper"]);
    // edit btn
    const edit = customElement("button", ["btn", "edit"]);
    edit.textContent = "Edit";
    c4.appendChild(edit);
    // delete btn
    const deleteBtn = customElement("button", ["btn", "delete"]);
    deleteBtn.textContent = "Delete";
    c4.appendChild(deleteBtn);
    row.appendChild(c4);
    table.appendChild(row);
  });
  editBtn = document.querySelector(".edit");
  deleteBtn = document.querySelector(".delete");
  editBtn.addEventListener("click", (e) => {
    handleEdit(e);
  });
}

function customElement(ele, className) {
  const element = document.createElement(ele);
  if (className) element.classList.add(...className);
  return element;
}

function handleLogout() {
  localStorage.removeItem("token");

  $.ajax({
    method: "get",
    url: "/logout",
    async: true,
    success: function (response) {
      if (response.status === true) {
        window.location.href = "/login";
      }
    },
  });
}
