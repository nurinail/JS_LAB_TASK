let input = document.querySelector(".input");
let select = document.querySelector(".select");
let main = document.querySelector(".main");
let apiKey = "1b826b3f3b1f48cd8ed45bf474a62b66";

async function fetchNews() {
  const searchTerm = input.value;
  const category = select.value;
  const url = ` https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&q=${searchTerm}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.articles);
    getNews(data.articles);
  } catch (error) {
    console.log("Xəta verdi");
  }
}

function getNews(data) {
  // console.log(data);
  main.innerHTML = "";
  if (data.lenght === 0) {
    main.innerHTML = "Nəticə tapılmadı";
  }
  main.innerHTML = data
    .map(
      (news) =>
        `
        <div class="newsItem">
            <img class="newsItemImg" src="${news.urlToImage}" alt="newsImg">
            <a class="newsItemLink" href="#">${news.url}</a>
            <p class="newsItemAbout">${news.content}</p>
            <span class="newsItemDate">01.03.2025</span>
        </div>
        `
    )
    .join("");
}
input.addEventListener("input", fetchNews);
select.addEventListener("change", fetchNews);

fetchNews();
