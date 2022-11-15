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
