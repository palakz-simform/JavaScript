//validate forminputs before loading
function validateForm() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var image = document.getElementById("image").value;
  var price = document.getElementById("price").value;
  var description = document.getElementById("description").value;

  if (id == "") {
    document.getElementById("disp-id").innerHTML = "**Enter Product ID**";
    return false;
  }
  if (name == "") {
    document.getElementById("disp-name").innerHTML = "**Enter Product name**";
    return false;
  }
  if (image == "") {
    document.getElementById("disp-image").innerHTML =
      "**Upload Product Image**";
    return false;
  }
  if (price == "") {
    document.getElementById("disp-price").innerHTML =
      "**Upload Product Price**";
    return false;
  } else if (price < 0) {
    document.getElementById("disp-price").innerHTML =
      "**Product Price should be greater than zero**";
    return false;
  }
  if (description == "") {
    document.getElementById("disp-description").innerHTML =
      "**Enter Product description**";
    return false;
  }

  return true;
}


// document.onload = showData();
//function to show data
function disp(data){
  filterprodlist = data
  var html = "";
  filterprodlist.forEach(function (element, index) {   
    html += "<tr>";
    html += "<td>" + element.id + "</td>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.image + "</td>";
    html += "<td>" + element.price + "</td>";
    html += "<td>" + element.description + "</td>";
    html +=
      `<td><button onclick = "deleteData(` +
      index +
      `)" class="btn btn-danger">Delete</button>&emsp;&emsp;<a href="#"><button onclick = "updateData(` +
      index +
      `)" class="btn btn-warning">Edit</button></a></td>`;
    html += "</tr>";
  });

  document.getElementById("crudTable").innerHTML = html;
}

function showData() {

  setTimeout(() => {
    var productList;    
    let sortitem = document.querySelector(".sortitem");   
    let arrow = document.querySelector(".arrow")
    let searchprod = document.querySelector(".search-prod");

    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }   
    let filterprodlist = productList; 
   
      //Code for searching item

      searchprod.addEventListener("keyup",(e)=>{
        let searchproduct = [...productList]
        
        searchproduct = searchproduct.filter(product  => product.id==e.target.value)
        if(e.target.value==""){
          searchproduct=productList;
        }
        disp(searchproduct)         
      })
 

//For sorting Products
sortitem.addEventListener("click",(e)=>{
  let sorybyvalue = e.target.value;
  sortval(sorybyvalue)
})
//sorttype = id,name sortval = asc desc
function sortval(val){
  let sorttype = val
  arrow.addEventListener("click",(e)=>{
   
    if(sorttype=="productId" && e.target.value=="ascending"){      
      filterprodlist = productList.sort((a, b) => a.id - b.id);       
      disp(filterprodlist)      
    }
    else if(sorttype=="productId"  && e.target.value=="descending"){ 
       
      filterprodlist = productList.sort((a, b) => b.id - a.id);            
      disp(filterprodlist)    
    }
    else if (sorttype === "productName" && e.target.value=="ascending") {
      filterprodlist = productList.sort((a, b) =>
        a.name.localeCompare(b.name)
    );
    }
    else if (sorttype === "productName" && e.target.value=="descending") {
      filterprodlist = productList.sort((a, b) =>
        b.name.localeCompare(a.name)
    );
      disp(filterprodlist)
    }
     else if (e.target.value === "price" && e.target.value=="ascending" ) {
      filterprodlist = productList.sort((a, b) => a.price - b.price);
      disp(filterprodlist)
    }    
    else if (e.target.value === "price" && e.target.value=="descending" ) {
      filterprodlist = productList.sort((a, b) => b.price - a.price);
      disp(filterprodlist)
    }    

  })
}



disp(filterprodlist)
    
  }, 0);
}

// Loads all the data when document or page loaded
// function to add data

function AddData() {
  if (validateForm() == true) {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var image = document.getElementById("image").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;

    var productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }
 
    let products = [...productList]
    products = products.filter(product  => product.id==id)
    console.log(products)
   if(products.length>0){
          alert("Id exists")
    }
    else{
      productList.push({
        id: id,
        name: name,
        image: image,
        price: price,
        description: description,
      });
      localStorage.setItem("productList", JSON.stringify(productList));

      // showData();
      document.getElementById("id").value = "";
      document.getElementById("name").value = "";
      document.getElementById("image").value = "";
      document.getElementById("price").value = "";
      document.getElementById("description").value = "";
  
      window.alert("Data Added successfully");
    }
   

  
  }
}

//Function to delete data
function deleteData(index) {
  var productList;
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }

  productList.splice(index, 1);

  localStorage.setItem("productList", JSON.stringify(productList));
  showData();
}

//Edit data from local storage
function updateData(index) {
  setTimeout(() => {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }
    document.getElementById("id").value = productList[index].id;
    document.getElementById("name").value = productList[index].name;
    document.getElementById("image").value = productList[index].image;
    document.getElementById("price").value = productList[index].price;
    document.getElementById("description").value =
      productList[index].description;

    document.querySelector("#Update").onclick = function () {
      if (validateForm() == true) {
        productList[index].id = document.getElementById("id").value;
        productList[index].name = document.getElementById("name").value;
        productList[index].image = document.getElementById("image").value;
        productList[index].price = document.getElementById("price").value;
        productList[index].description =
          document.getElementById("description").value;

        localStorage.setItem("productList", JSON.stringify(productList));
        showData();
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("image").value = "";
        document.getElementById("price").value = "";
        document.getElementById("description").value = "";

        document.getElementById("Submit").style.display = "block";
        document.getElementById("Update").style.display = "none";
      }
    };
  }, 50);
}
//Routing

const routes = {
  404: {
    template: "./pages/404.html",
    title: "404",
  },
  "/": {
    template: "./pages/form.html",
    title: "Form",
  },
  display: {
    template: "./pages/display.html",
    title: "Products",
  },
};

const locationHandler = async () => {
  var location = window.location.hash.replace("#", "");

  if (location.length == 0 || location == "#") {
    location = "/";
  }

  const route = routes[location] || routes[404];
  const html = await fetch(route.template).then((response) => response.text());

  if (window.location.hash == "#display") {
    showData();
  }
  document.getElementById("content").innerHTML = html;
  document.title = route.title;
};

window.addEventListener("hashchange", locationHandler);
locationHandler();

/*
async function fetchData() {
  let response = await JSON.parse(localStorage.getItem("productList"));
   
  return response;
}
function updateData(index) {
  let fetch = fetchData();

  fetch.then((data) => {
    
    var productList;
    productList = data;

    document.getElementById("id").value = productList[index].id;
    document.getElementById("name").value = productList[index].name;
    document.getElementById("image").value = productList[index].image;
    document.getElementById("price").value = productList[index].price;
    document.getElementById("description").value =
      productList[index].description;
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    document.querySelector("#Update").onclick = function () {
      if (validateForm() == true) {
        productList[index].id = document.getElementById("id").value;
        productList[index].name = document.getElementById("name").value;
        productList[index].image = document.getElementById("image").value;
        productList[index].price = document.getElementById("price").value;
        productList[index].description =
        document.getElementById("description").value;

        localStorage.setItem("productList", JSON.stringify(productList));

        showData();
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("image").value = "";
        document.getElementById("price").value = "";
        document.getElementById("description").value = "";
      }
    };
  });
}
*/
