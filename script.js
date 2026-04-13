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
const loadAllCardData = async () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayAllCard(data.data));
};
function manageBadge(arr) {
  if (!arr) return "";
  return arr
    .map((label) => {
      return `<span class="badge badge-outline badge-secondary">${label}</span>`;
    })
    .join(" ");
}
const displayAllCard = (items) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Clear container before loading

  items.forEach((item) => {
    // 1. Create a NEW div element for every item
    const newDiv = document.createElement("div");

    // 2. Add classes for styling (Uncommented and fixed)
    newDiv.className = "bg-white rounded-md shadow-md mb-4";

    // 3. Map your API data to the HTML (e.g., item.title, item.author)
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
            <p>#${item.id || "0"} by ${item.user || "anonymous"}</p>
            <p>${item.date || "N/A"}</p>
          </div>
        `;

    // 4. Append the newly created div to the container
    cardContainer.appendChild(newDiv);
  });
};

loadAllCardData();
