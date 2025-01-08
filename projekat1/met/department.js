let currentPage;
let ukupno;
let nazivDept = "";



function goToNext(pageNum) {
  if (pageNum < 1 || pageNum > Math.ceil(ukupno / 10)) {
    return;
  }
  window.location.href = `department.html?department=${nazivDept}&page=${pageNum}`;
}
function brojStranica(start, end,aktivno) {
  document.querySelector(".pagination").innerHTML = "";
  document.querySelector( ".pagination").innerHTML += `<li class="page-item" id="prvi">
      <button
        class="btn btn-dark"
        id="prevButton"
        onclick="goToNext(vratiCurrPage() - 1,1)"
      >
        Previous
      </button>
    </li>`;
  for (let i = start; i <= end; i += 1) {
    //document.querySelector(".pagination").innerHTML = "";
    if(i===aktivno){
      document.querySelector(
        ".pagination"
      ).innerHTML += `<li class="page-item" id="dugme">
        <button
          class="btn btn-dark active"
          id="dugme"
          onclick="goToNext(${i})"
        >
          ${i}
        </button>
      </li>`;
    }else{
      document.querySelector(
      ".pagination"
    ).innerHTML += `<li class="page-item" id="dugme">
      <button
        class="btn btn-dark"
        id="dugme"
        onclick="goToNext(${i})"
      >
        ${i}
      </button>
    </li>`;
    }
    
  }
  document.querySelector(
    ".pagination"
  ).innerHTML += `<li class="page-item" id="drugi">
      <button
        class="btn btn-dark"
        id="nextButton"
        onclick="goToNext(vratiCurrPage() + 1,2)"
      >
        Next
      </button>
    </li>`;
}

function bodyLoaded() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    document.getElementById("page-title").innerHTML = params.department;
    nazivDept = params.department;
    let start, end;
    
    if (params.page) {
      start = (params.page - 1) * 10;
      end = start + 10;
      currentPage = Number(params.page);
      //  if(currentPage===1 || currentPage===2 ||currentPage===3)
      //    brojStranica(1, 3);
    } else {
      brojStranica(1, 3,1);
      start = 0;
      end = start + 10;
      currentPage = 1;
    }
    if(currentPage%3===0){
      brojStranica(currentPage-2,currentPage,currentPage);
    }else if((currentPage+1)%3===0){
      brojStranica(currentPage-1,currentPage+1,currentPage);
    }else{
      brojStranica(currentPage,currentPage+2,currentPage);
    }

    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${params.department}`
    )
      .then((res) => res.json())
      .then((data) => {
        let kartic = "";
        ukupno = data.objectIDs.length;
        const limitedObjectIDs = data.objectIDs.slice(start, end);

        document.getElementById("prevButton").disabled =
          Number(currentPage) === 1;
        document.getElementById("nextButton").disabled =
          Number(currentPage) === Math.ceil(ukupno / 10);
        limitedObjectIDs.forEach((objId) => {
          fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objId}`
          )
            .then((res) => res.json())
            .then((d) => {
              const novi = document.createElement("a");
              novi.setAttribute(
                "href",
                `eksponat.html?id=${encodeURIComponent(objId)}`
              );

              //console.log(d);
              kartic += `<div class="col-sm-6 col-md-4 col-lg-2 mb-4 mx-3"><a href=${novi} class="btn">
                          <div class="card" style="width: 18rem;">
                            <img src="${d.primaryImage}" class="card-img-top" alt="...">
                            <div class="card-body">
                              <h5 class="card-title">${d.title}</h5>


                            </div>
                          </div>
                          </a>
                        </div>`;
              document.getElementById("kartice").innerHTML = kartic;
            });
        });
      });
  }
  function vratiCurrPage(){
    return currentPage;
  }
  function ukupnoFunk(){
    return ukupno;
  }
  function nazivDeptFink(){
    return nazivDept;
  }


