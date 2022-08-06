// declaration of variables
const navbar = document.getElementById("nav");
const brand = document.getElementById("brand");
const searchKey = document.getElementById("searchKey");
const searchBtn = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");
const column1 = document.getElementById("col-1");
const column2 = document.getElementById("col-2");
const column3 = document.getElementById("col-3");
const errorGrid = document.getElementById("errorGrid");
const modalBody = document.getElementById("modalBody");
const imageViewLink = document.getElementById("imageViewLink");

let orderByValue = "";
let tempUrl = "";

// APIs
const API_KEY = "J5rgIU8hqiSw3a9KypPZWuB4QT_wl2zHoDkAvRBUHs4";
const apiUrl = `https://api.unsplash.com/photos/?client_id=${API_KEY}&per_page=30&page=1&lang=ko`;

let searchUrl = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&per_page=30&page=1&lang=ko&query=`;
let imageURLS = [];

window.onload = () => {
  fetchData();
};

let handleError = (에러) => {
  console.warn(에러);
  errorGrid.innerHTML = `<h4>handleError, 데이터를 가져올 수 없습니다.</h4> ${에러}`;
};

const fetchData = async () => {
  const response = await fetch(apiUrl).catch(handleError);
  const myJson = await response.json();

  let imageArrays = myJson;

  imageArrays.forEach((image) => {
    imageURLS.push(image.urls.regular);
  });

  displayImage();
};

const fetchSearchData = async (imageSearchName) => {
  imageURLS = [];

  let orderByVar = orderByValue;
  tempUrl = searchUrl + imageSearchName;

  if (orderByVar != "") {
    tempUrl += `&order_by=${orderByVar}`;
  }

  searchQuery.innerHTML = searchKey.value;
  const response = await fetch(tempUrl).catch(handleError);
  const myJson = await response.json();

  console.log(myJson);

  let imageArrays = myJson.results;

  imageArrays.forEach((image) => {
    imageURLS.push(image.urls.regular);
  });

  displayImage();
};

const displayImage = () => {
  errorGrid.innerHTML = "";
  if (imageURLS.length == 0) {
    errorGrid.innerHTML = `<h4>이미지가 없어서 데이터를 가져올 수 없습니다.</h4>`;
  }

  column1.innerHTML = "";
  column2.innerHTML = "";
  column3.innerHTML = "";

  imageURLS.forEach((url, index) => {
    // dynamic image tag
    let image = document.createElement("img");
    image.src = url;
    image.className = "mt-3";
    image.setAttribute("width", "100%");
    image.setAttribute("onclick", "displayFullImage(this.src)");

    if ((index + 1) % 3 == 0) {
      column1.appendChild(image);
    }
    if ((index + 2) % 3 == 0) {
      column2.appendChild(image);
    }
    if ((index + 3) % 3 == 0) {
      column3.appendChild(image);
    }
  });
};

const displayFullImage = (src) => {
  // dynamic image tag
  let image = document.createElement("img");
  image.src = src;
  image.className = "mt-3";
  image.setAttribute("width", "100%");

  modalBody.innerHTML = "";
  modalBody.appendChild(image);

  imageViewLink.href = src;

  let myModal = new bootstrap.Modal(document.getElementById("modal"), {});

  myModal.show();
};

let orderBy = () => {
  orderByValue = document.getElementById("orderby").value;
  imageURLS = [];

  console.log(orderByValue);

  if (searchKey.value != "") {
    fetchSearchData(searchKey.value);
  } else {
    fetchData();
  }
};

searchBtn.addEventListener("click", () => {
  if (searchKey.value != "") {
    fetchSearchData(searchKey.value);
  } else {
    alert("검색어를 입력해주세요");
  }
});

searchKey.addEventListener("keypress", (이벤트) => {
  if (이벤트.key == "Enter") {
    if (searchKey.value != "") {
      fetchSearchData(searchKey.value);
    } else {
      alert("검색어를 입력해주세요");
    }
  }
});
