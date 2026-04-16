// document.getElementById("sign-in").addEventListener("click", () => {
//   const userName = document.getElementById("username");
//   const passWord = document.getElementById("password");
//   const userNameValue = userName.value;
//   const passWordValue = passWord.value;
//   console.log(typeof passWordValue);
//   if (userNameValue == "admin" && passWordValue == "admin123") {
//     document.getElementById("login-form").classList.add("hidden");
//     document.getElementById("main-page").classList.remove("hidden");
//   } else {
//     alert("please enter a correct 'username' and 'password'");
//     document.getElementById("login-form").classList.remove("hidden");
//     document.getElementById("main-page").classList.add("hidden");
//     userName.value = "";
//     passWord.value = "";
//   }
// });
const loadAllCardData = () => {
  mannageSpinner(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayAllCard(data.data));
};
const cardCounter = () => {
  const cardContainer = document.getElementsByClassName("count");
  const cardCount = document.getElementById("card-counter");
  cardCount.innerText = cardContainer.length;
};
const mannageSpinner = (input) => {
  if (input) {
    document.getElementById("loading-spiner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("loading-spiner").classList.add("hidden");
    document.getElementById("card-container").classList.remove("hidden");
  }
};
const manageActiveBtn = () => {
  const AllBtn = document.querySelectorAll(".common-class");
  for (const btn of AllBtn) {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  }
};
const manageBadge = (arr) => {
  if (!arr) return;
  const newArr = arr.map(
    (label) =>
      `<span class="badge badge-outline badge-success">${label}</span>`,
  );
  return newArr.join(" ");
};
const showModal = (id) => {
  const getModal = document.getElementById("my_modal_1");
  getModal.showModal();
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((data) => displayModal(data.data));
};
const displayModal = (item) => {
  const modalContant = document.getElementById("modal-contant");
  modalContant.innerHTML = `
   <div class="space-y-4">
    <h1 class="text-2xl font-bold"> ${item.title}</h1>
    <div><span class="badge badge-success">${item.status}</span>&nbsp; <span class="text-gray-200"><img src="#" class="inline-block w-1 h-1 rounded-full bg-gray-600"></span><span class="text-gray-500 font-medium"> Opened by ${item.author}&nbsp; <img src="#" class="inline-block w-1 h-1 rounded-full bg-gray-600"> ${item.createdAt} </span></div>
    <div>${manageBadge(item.labels)}</div>
    <div class="font-medium text-lg text-gray-400 line-clamp-2">${item.description}</div>
    <div class="flex justify-between bg-gray-50 p-5 rounded-lg">
      <div><p class="text-gray-500 text-lg">Assignee:</p><h2 class="text-xl font-bold">${item.author}</h2></div>
      <div><p class="text-gray-500 text-lg">Priority:</p><p class="badge badge-error">${item.priority}</p></div>
    </div>
   </div>
  `;
};
const displayAllCard = (items) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear container before loading

  items.forEach((item) => {
    const newDiv = document.createElement("div");

    if (item.status === "open") {
      newDiv.className =
        "bg-white rounded-md shadow-md count hover:scale-101 hover:bg-green-50 hover:cursor-pointer border-t-4 border-green-400";
    } else {
      newDiv.className =
        "bg-white rounded-md shadow-md count hover:scale-101 hover:bg-purple-50 hover:cursor-pointer border-t-4 border-purple-400";
    }
    newDiv.onclick = () => showModal(item.id);
    // newDiv.onclick = showModal;

    newDiv.innerHTML = `
    
          <div class="flex justify-between my-3 px-2.5">
            <div><img src="./assets/Open-Status.png" alt="" /></div>
            <div class="badge badge-soft badge-warning">${item.priority || "High"}</div>
          </div>
          <h2 class="font-bold line-clamp-2 px-2.5">${item.title}</h2>
          <p class="text-gray-600 line-clamp-2 px-2.5 my-1">
            ${item.description || "No description available"}
          </p>
          <div id="badge-container" class="border-b border-gray-200 p-2.5">
            ${manageBadge(item.labels)}
          </div>
          <div class="text-gray-400 my-2.5 px-2.5">
            <p>#${item.id || "0"} by ${item.author || "anonymous"}</p>
            <p>${item.createdAt}</p>
          </div>
        `;

    // 4. Append the newly created div to the container
    cardContainer.appendChild(newDiv);
  });
  cardCounter();
  mannageSpinner(false);
};
const displayOpenBtnData = (items) => {
  const newItems = items.filter((item) => item.status == "open");
  displayAllCard(newItems);
  cardCounter();
};
const loadOpenBtnData = () => {
  mannageSpinner(true);
  manageActiveBtn();
  document.getElementById("open-btn").classList.remove("btn-outline");
  document.getElementById("open-btn").classList.add("btn-primary");
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      const allData = data.data;
      displayOpenBtnData(allData);
    });
};
const displayCloseBtnData = (items) => {
  const newItems = items.filter((item) => item.status == "closed");
  displayAllCard(newItems);
  cardCounter();
};
const closeBtnData = () => {
  mannageSpinner(true);
  manageActiveBtn();
  document.getElementById("closed-btn").classList.remove("btn-outline");
  document.getElementById("closed-btn").classList.add("btn-primary");
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      const allData = data.data;
      displayCloseBtnData(allData);
    });
};
const showAllBtn = () => {
  manageActiveBtn();
  document.getElementById("all-btn").classList.remove("btn-outline");
  document.getElementById("all-btn").classList.add("btn-primary");
  loadAllCardData();
};
document.getElementById("new-issue-btn").addEventListener("click", () => {
  const inputField = document.getElementById("input-field");
  const inputValue = inputField.value;

  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`,
  )
    .then((res) => res.json())
    .then((data) => {
      manageActiveBtn();
      displayAllCard(data.data);
    });
});

loadAllCardData();
