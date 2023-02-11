const h1=document.querySelector("h1"),city=document.getElementById("city"),search=document.getElementById("search"),results=document.getElementById("results");function searchCity(){try{if(!city.value)return results.innerHTML='<p class="fw-bold">Enter a city</p>',void localStorage.clear();const e=city.value.trim().toLowerCase().replace(/[.,]/g,"").replace(/ /g,"-");localStorage.setItem("searchedCity",e),results.innerHTML='\n      <div class="spinner-border text-dark" role="status">\n        <span class="visually-hidden">Loading...</span>\n      </div>\n    ',axios.get(`https://api.teleport.org/api/urban_areas/slug:${e}/scores/`).then((s=>{const t=_.get(s.data,"categories",[]),r=_.get(s.data,"summary",""),a=_.get(s.data,"teleport_city_score",0);results.innerHTML=`\n          <h2 class="my-3">${e.replace(/-/g," ")}</h2>\n          <p>${r}</p>\n          <hr class="my-4">\n          <h2 class="my-3">City Score</h2>\n          <p class="display-4">${a.toFixed(2)}</p>\n          <hr class="my-4">\n          <h2 class="my-3">Categories</h2>\n          <ul class="row">\n            ${t.map((e=>`\n              <li class="col-md-6 col-lg-4">\n                <div class="category">\n                  <p class="mb-3">\n                    ${e.name}:\n                    <strong>${e.score_out_of_10.toFixed(2)}</strong>\n                  </p>\n                  <div class="progress-bar" style="background-color: ${e.color}; width: ${10*e.score_out_of_10}%;">\n                  </div>\n                </div>\n              </li>\n            `)).join("")}\n          </ul>\n          <small class="d-block mt-5">\n            Made with <a href="https://developers.teleport.org/api/" target="_blank">Teleport public APIs</a>\n          </small>\n        `})).catch((e=>{"Request failed with status code 404"===e.message?results.innerHTML='<p class="fw-bold">City not found</p>':results.innerHTML=`<p class="fw-bold">An error occurred: ${e.message}</p>`}))}catch(e){results.innerHTML=`<p class="fw-bold">An error occurred: ${e.message}</p>`}}h1.addEventListener("click",(()=>{localStorage.clear(),city.value="",results.innerHTML=""})),window.addEventListener("load",(()=>{const e=localStorage.getItem("searchedCity");e&&(city.value=e.replace(/-/g," "),searchCity())})),search.addEventListener("click",searchCity),city.addEventListener("keypress",(e=>{"Enter"===e.key&&searchCity()}));