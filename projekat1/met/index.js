
function addDep(){
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments')
    .then((res)=>res.json())
    .then((data)=>{
        let ul = document.querySelector('.dropdown-menu');
        data.departments.forEach(function(ime){
        let li = document.createElement("li");
        const novi = document.createElement("a");
        novi.textContent=`${ime.displayName}`;
        novi.setAttribute('href', `department.html?department=${encodeURIComponent(ime.displayName)}&page=1`);
        novi.classList.add('dropdown-item');
        novi.id="tabId";
        // novi.addEventListener('click', function (event) {
        //     window.location.href='department.html?title=' + `${ime.displayName}`;
        //     const param= new Proxy(new URLSearchParams(window.location.search),{
        //         get: (searchParam, prop) => searchParam.get(prop)
        //     })
        //     console.log(param)
            
        // });
        
        li.appendChild(novi);
       
        ul.appendChild(li);
     });
    })
}


  function bodyLoadedEx() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    //document.getElementById("page-title").innerHTML = params.department;
    let objekatId = params.Id;
    console.log(params.id);
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${params.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        let kartic = "";
        document.getElementById("page-title").innerHTML = data.title;
        document.querySelector(
          ".slika"
        ).innerHTML = `<img id= 'slikaE' src="${data.primaryImage}" alt="">`;
        document.querySelector(
          ".prvi"
        ).innerHTML = `Object name: ${data.objectName}`;
        document.querySelector(
          ".drugi"
        ).innerHTML = `Culture: ${data.culture}`;
        document.querySelector(
          ".treci"
        ).innerHTML = `Date: ${data.objectDate}`;
        document.querySelector(
          ".sesti"
        ).innerHTML = `More on: <a href="${data.objectURL}" class="btn" style="background-color: lightgrey" target="_blank">Go to</button> `;
        document.querySelector(
          ".peti"
        ).innerHTML = `Nationality: ${data.artistNationality}`;
        document.querySelector(
          ".cetvrti"
        ).innerHTML = `Maker : ${data.artistDisplayName}`;
      });
  }




