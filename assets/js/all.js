"use strict";

AOS.init();
var tickets;
var btnAddTicket = document.querySelector("#btnAddTicket");
var inputValues = document.querySelectorAll(".input"); // 新增套票 (改練習 querySelectorAll() 獲取所有 input)

btnAddTicket.addEventListener("click", addTicket);

function addTicket() {
  var ticketData = {};
  var isTicketData = false;
  inputValues.forEach(function (item) {
    isTicketData = ticketName.value !== "" && ticketImgUrl.value !== "" && scenicArea.value !== "" && ticketPrice.value !== "" && ticketNum.value !== "" && ticketRank.value !== "" && ticketDescribe.value !== "";
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
    initRequired();
  } else {
    // alert("請輸入套票完整資訊");
    checkRequired(inputValues);
  }
} // 渲染畫面(傳入的參數為 原始套票陣列 或 篩選地區後的套票陣列)


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
  getChart(ticketsArr);
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
    getChart(tickets);
  })["catch"](function (err) {
    console.log(err);
  });
}

init();
var chartData = []; // C3 圓餅圖

function getChart(tickets) {
  var areaData = {};
  tickets.forEach(function (item) {
    areaData[item.area] ? areaData[item.area]++ : areaData[item.area] = 1;
  });
  chartData = Object.entries(areaData); // [["高雄", 2], ["台北",1], ["台中", 1]]

  var chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: chartData,
      type: "donut",
      colors: {
        高雄: "#E68619",
        台北: "#26BFC7",
        台中: "#5151D3"
      }
    },
    donut: {
      title: "地區比例",
      width: 20,
      // donut 寬度
      label: {
        // 隱藏圖表直接顯示的 % 數
        show: false
      }
    },
    size: {
      // 整體寬高
      height: 200,
      width: 200
    }
  });
} // 驗證必填樣式


function checkRequired(inputValues) {
  inputValues.forEach(function (item) {
    var span = item.parentNode.previousSibling.previousSibling.lastElementChild;

    if (!item.value) {
      span.classList.remove("d-none");
    } else {
      span.classList.add("d-none");
    }
  });
} // 初始化必填樣式


function initRequired() {
  inputValues.forEach(function (item) {
    var span = item.parentNode.previousSibling.previousSibling.lastElementChild;
    span.classList.add("d-none");
  });
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
"use strict";
//# sourceMappingURL=all.js.map
