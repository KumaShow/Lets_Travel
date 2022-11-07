"use strict"; // 改用 axios 載入外部資料
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

var tickets;
var btnAddTicket = document.querySelector("#btnAddTicket"); // 新增套票 (改練習 querySelectorAll() 獲取所有 input)

btnAddTicket.addEventListener("click", addTicket);

function addTicket() {
  var inputValues = document.querySelectorAll(".input");
  var isTicketData;
  var ticketData = {};
  inputValues.forEach(function (item) {
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
    var form = document.querySelector("form");
    tickets.push(ticketData);
    form.reset(); // 新增完，清空表單

    render(tickets);
  } else {
    alert("請輸入套票資訊");
  }
} // btnAddTicket.addEventListener("click", () => {
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
  var ticketList = document.querySelector("#ticketList");
  var searchResult = document.querySelector("#searchResult");
  var emptyResult = document.querySelector("#emptyResult");
  var str = "";

  if (ticketsArr.length === 0) {
    // 沒資料則顯示查無資料
    emptyResult.classList.remove("d-none");
  } else {
    emptyResult.classList.add("d-none");
  }

  var aosDelay = 0;
  ticketsArr.forEach(function (ticket) {
    str += "\n    <li class=\"col-md-6 col-lg-4 mb-6\" data-aos=\"fade-up\" data-aos-delay=\"".concat(aosDelay += 100, "\" data-aos-duration=\"700\">\n      <div class=\"card position-relative border-0\">\n        <a href=\"#!\" class=\"overflow-hidden\">\n          <img src=\"").concat(ticket.imgUrl, "\" class=\"card-img-top ticket-img\" alt=\"\u98A8\u666F\u5716\">\n        </a>\n        <span class=\"position-absolute top-n3 start-0 bg-primary-light fs-5\n          fw-light lh-sm text-white px-6 py-2 rounded-end\">").concat(ticket.area, "</span>\n        <div class=\"card-body position-relative pt-6 pb-0\">\n          <span class=\"position-absolute top-n7 start-0 bg-primary-dark text-white px-2 py-1 rounded-end\">").concat(ticket.rate, "</span>\n          <h5 class=\"card-title text-primary fs-4 fw-light border-bottom border-2 border-primary pb-1 mb-5\"><a href=\"#!\">").concat(ticket.name, "</a></h5>\n          <p class=\"card-text lh-lg\">").concat(ticket.description, "</p>\n        </div>\n        <div class=\"card-footer border-0 bg-white pt-7\">\n          <div class=\"text-primary d-flex align-items-center\">\n            <span class=\"material-symbols-outlined fill-1 me-1\">\n              error\n            </span>\n            <p class=\"me-auto\">\u5269\u4E0B\u6700\u5F8C ").concat(ticket.group, " \u7D44</p>\n            <span class=\"me-1\">TWD</span>\n            <p class=\"fs-2 font-roboto\">$").concat(ticket.price, "</p>\n          </div>\n        </div>\n      </div>\n    </li>\n    ");
  });
  ticketList.innerHTML = str;
  searchResult.textContent = "\u672C\u6B21\u641C\u5C0B\u5171 ".concat(ticketsArr.length, " \u7B46\u8CC7\u6599");
} // 地區篩選


var searchArea = document.querySelector("#searchArea");
searchArea.addEventListener("change", function (e) {
  var area = e.target.value; // 當選擇全部地區，則顯示套票陣列

  if (area === "全部地區") {
    render(tickets);
    return;
  } // 篩選特定區域並顯示畫面


  var filterArea = tickets.filter(function (ticket) {
    return ticket.area === area;
  });
  render(filterArea);
}); // 網站初始化 使用 axios 抓取外部資料

function init() {
  var url = "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";
  axios.get(url).then(function (res) {
    tickets = res.data.data;
    render(tickets);
  })["catch"](function (err) {
    console.log(err);
  });
}

init();
//# sourceMappingURL=all.js.map
