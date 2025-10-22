// 程式碼寫這裡
const searchKeyword = document.querySelector("#searchKeyword");
const btn = document.querySelector("#btn");
const siteList = document.querySelector(".siteList");

// 清空列表，初始化
siteList.innerHTML = "";

btn.addEventListener("click", (e) => {
  e.preventDefault(); //讓按按鈕時不會重整網頁
  const Keyword = searchKeyword.value;
  siteList.innerHTML = ""; // 清空列表，讓新的搜尋結果不會跟舊的衝突

  if (Keyword != "") {
    const url =
      "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";
    //按下按鈕才取資料
    fetch(url)
      .then((resp) => {
        return resp.json();
      })

      .then((station) => {
        const list = station

          .filter((station) => {
            return station.ar.includes(Keyword);
          })

          .forEach((station) => {
            const stationName = station.sna.replace("YouBike2.0_", "");
            const address = station.ar;
            const bikes = station.available_rent_bikes;

            const li = document.createElement("li");
            li.className = "list-group-item fs-5";
            li.innerHTML = `
          <i class="fas fa-bicycle"></i>
          ${stationName} (${bikes})<br />
          <small class="text-muted">${address}</small>
        `;
            siteList.appendChild(li);
          });
      });
  }
});
