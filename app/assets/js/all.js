"use strict";

AOS.init();

let tickets;
const btnAddTicket = document.querySelector("#btnAddTicket");
const inputValues = document.querySelectorAll(".input");

// 新增套票 (改練習 querySelectorAll() 獲取所有 input)
btnAddTicket.addEventListener("click", addTicket);
function addTicket() {
  const ticketData = {};
  let isTicketData = false;

  inputValues.forEach((item) => {
    isTicketData =
      ticketName.value !== "" &&
      ticketImgUrl.value !== "" &&
      scenicArea.value !== "" &&
      ticketPrice.value !== "" &&
      ticketNum.value !== "" &&
      ticketRank.value !== "" &&
      ticketDescribe.value !== "";

    ticketData.id = tickets.length + 1;
    if (item.getAttribute("id") === "ticketName") {
      ticketData.name = item.value;
    } else if (item.getAttribute("id") === "ticketImgUrl") {
      ticketData.imgUrl = item.value;
    } else if (item.getAttribute("id") === "scenicArea") {
      ticketData.area = item.value;
    } else if (item.getAttribute("id") === "ticketPrice") {
      ticketData.price = item.value;
    } else if (item.getAttribute("id") === "ticketNum") {
      ticketData.group = item.value;
    } else if (item.getAttribute("id") === "ticketRank") {
      ticketData.rate = item.value;
    } else if (item.getAttribute("id") === "ticketDescribe") {
      ticketData.description = item.value;
    }
  });
  if (isTicketData) {
    const form = document.querySelector("form");
    tickets.push(ticketData);
    form.reset(); // 新增完，清空表單
    render(tickets);
    initRequired();
  } else {
    // alert("請輸入套票完整資訊");
    checkRequired(inputValues);
  }
}

// 渲染畫面(傳入的參數為 原始套票陣列 或 篩選地區後的套票陣列)
function render(ticketsArr) {
  const ticketList = document.querySelector("#ticketList");
  const searchResult = document.querySelector("#searchResult");
  const emptyResult = document.querySelector("#emptyResult");
  let str = "";

  if (ticketsArr.length === 0) {
    // 沒資料則顯示查無資料
    emptyResult.classList.remove("d-none");
  } else {
    emptyResult.classList.add("d-none");
  }

  let aosDelay = 0;
  ticketsArr.forEach((ticket) => {
    str += `
    <li class="col-md-6 col-lg-4 mb-6" data-aos="fade-up" data-aos-delay="${(aosDelay += 100)}" data-aos-duration="700">
      <div class="card position-relative border-0">
        <a href="#!" class="overflow-hidden">
          <img src="${
            ticket.imgUrl
          }" class="card-img-top ticket-img" alt="風景圖">
        </a>
        <span class="position-absolute top-n3 start-0 bg-primary-light fs-5
          fw-light lh-sm text-white px-6 py-2 rounded-end">${ticket.area}</span>
        <div class="card-body position-relative pt-6 pb-0">
          <span class="position-absolute top-n7 start-0 bg-primary-dark text-white px-2 py-1 rounded-end">${
            ticket.rate
          }</span>
          <h5 class="card-title text-primary fs-4 fw-light border-bottom border-2 border-primary pb-1 mb-5"><a href="#!">${
            ticket.name
          }</a></h5>
          <p class="card-text lh-lg">${ticket.description}</p>
        </div>
        <div class="card-footer border-0 bg-white pt-7">
          <div class="text-primary d-flex align-items-center">
            <span class="material-symbols-outlined fill-1 me-1">
              error
            </span>
            <p class="me-auto">剩下最後 ${ticket.group} 組</p>
            <span class="me-1">TWD</span>
            <p class="fs-2 font-roboto">$${ticket.price}</p>
          </div>
        </div>
      </div>
    </li>
    `;
  });
  ticketList.innerHTML = str;
  searchResult.textContent = `本次搜尋共 ${ticketsArr.length} 筆資料`;
  getChart(ticketsArr);
}

// 地區篩選
const searchArea = document.querySelector("#searchArea");

searchArea.addEventListener("change", (e) => {
  const area = e.target.value;
  // 當選擇全部地區，則顯示套票陣列
  if (area === "全部地區") {
    render(tickets);
    return;
  }
  // 篩選特定區域並顯示畫面
  const filterArea = tickets.filter((ticket) => {
    return ticket.area === area;
  });
  render(filterArea);
});

// 網站初始化 使用 axios 抓取外部資料
function init() {
  const url =
    "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";
  axios
    .get(url)
    .then(function (res) {
      tickets = res.data.data;
      render(tickets);
      getChart(tickets);
    })
    .catch(function (err) {
      console.log(err);
    });
}
init();

let chartData = [];

// C3 圓餅圖
function getChart(tickets) {
  const areaData = {};
  tickets.forEach((item) => {
    areaData[item.area] ? areaData[item.area]++ : (areaData[item.area] = 1);
  });
  chartData = Object.entries(areaData);
  // [["高雄", 2], ["台北",1], ["台中", 1]]

  const chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: chartData,
      type: "donut",
      colors: {
        高雄: "#E68619",
        台北: "#26BFC7",
        台中: "#5151D3",
      },
    },
    donut: {
      title: "地區比例",
      width: 20, // donut 寬度
      label: {
        // 隱藏圖表直接顯示的 % 數
        show: false,
      },
    },
    size: {
      // 整體寬高
      height: 200,
      width: 200,
    },
  });
}

// 驗證必填樣式
function checkRequired(inputValues) {
  inputValues.forEach((item) => {
    const span =
      item.parentNode.previousSibling.previousSibling.lastElementChild;
    if (!item.value) {
      span.classList.remove("d-none");
    } else {
      span.classList.add("d-none");
    }
  });
}
// 初始化必填樣式
function initRequired() {
  inputValues.forEach((item) => {
    const span =
      item.parentNode.previousSibling.previousSibling.lastElementChild;
    span.classList.add("d-none");
  });
}
