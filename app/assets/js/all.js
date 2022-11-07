"use strict";

// 改用 axios 載入外部資料
// const tickets = [
//   {
//     id: 1,
//     name: "綠島自由行套裝行程",
//     imgUrl:
//       "https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_1.png?raw=true",
//     area: "台北",
//     price: 1280,
//     num: 8,
//     rank: 8.6,
//     describe:
//       "嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。",
//   },
//   {
//     id: 2,
//     name: "南庄度假村露營車二日遊",
//     imgUrl:
//       "https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_6.png?raw=true",
//     area: "台中",
//     price: 2480,
//     num: 2,
//     rank: 9.2,
//     describe:
//       "南庄雲水豪華露營車，快來擁有最愜意的露營體驗吧！ 一泊一食，輕鬆享受露營車樂趣。 獨立衛浴與私人戶外露臺。 入住豪華露營車還能使用戶外SPA大眾湯，感受美人湯魅力。",
//   },
//   {
//     id: 3,
//     name: "漁樂碼頭釣魚體驗套票",
//     imgUrl:
//       "https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/travel_2.png?raw=true",
//     area: "台中",
//     price: 1280,
//     num: 5,
//     rank: 9.2,
//     describe:
//       "台中全新親子景點寶熊漁樂碼頭，為知名釣具公司「OKUMA」所創立的觀光工廠。一樓藍白希臘漁村風商店街免費參觀。二樓釣魚故事館則設立全台唯一虛擬釣場，透過導覽讓你知道如何釣魚、魚餌怎麼區分，寓教於樂的台中景點！",
//   },
// ];
let tickets;
const btnAddTicket = document.querySelector("#btnAddTicket");

// 新增套票 (改練習 querySelectorAll() 獲取所有 input)
btnAddTicket.addEventListener("click", addTicket);
function addTicket() {
  const inputValues = document.querySelectorAll(".input");
  let isTicketData;
  const ticketData = {};
  inputValues.forEach((item) => {
    isTicketData = item.value !== "" ? true : false;
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
  } else {
    alert("請輸入套票資訊");
  }
}

// btnAddTicket.addEventListener("click", () => {
//   const ticketName = document.querySelector("#ticketName");
//   const ticketImgUrl = document.querySelector("#ticketImgUrl");
//   const scenicArea = document.querySelector("#scenicArea");
//   const ticketPrice = document.querySelector("#ticketPrice");
//   const ticketNum = document.querySelector("#ticketNum");
//   const ticketRank = document.querySelector("#ticketRank");
//   const ticketDescribe = document.querySelector("#ticketDescribe");

//   const ticketData = {
//     id: tickets.length + 1,
//     name: ticketName.value,
//     imgUrl: ticketImgUrl.value,
//     area: scenicArea.value,
//     price: Number(ticketPrice.value),
//     group: Number(ticketNum.value),
//     rate: Number(ticketRank.value),
//     description: ticketDescribe.value,
//   };

//   const isTicketData =
//     ticketName.value !== "" &&
//     ticketImgUrl.value !== "" &&
//     scenicArea.value !== "" &&
//     ticketPrice.value !== "" &&
//     ticketNum.value !== "" &&
//     ticketRank.value !== "" &&
//     ticketDescribe.value !== "";

//   // 有輸入套票訊息才能新增
//   if (isTicketData) {
//     const form = document.querySelector("form");
//     tickets.push(ticketData);
//     form.reset(); // 新增完，清空表單
//     render(tickets);
//   } else {
//     alert("請輸入套票資訊");
//   }
// });

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
    })
    .catch(function (err) {
      console.log(err);
    });
}
init();
