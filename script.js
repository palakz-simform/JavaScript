// localStorage.clear()
//validate form inputs before loading
function validateForm() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var image = document.getElementById("prodimage").value;
  var price = document.getElementById("price").value;
  var description = document.getElementById("description").value;

  //clear errors
  document.getElementById("disp-id").innerHTML = "";
  document.getElementById("disp-name").innerHTML = "";
  document.getElementById("disp-image").innerHTML = "";
  document.getElementById("disp-price").innerHTML = "";
  document.getElementById("disp-description").innerHTML = "";

  if (id == "") {
    document.getElementById("disp-id").innerHTML =
      "**Enter correct product ID**";
    return false;
  } else if (id != "") {
    if (id < 0) {
      document.getElementById("disp-id").innerHTML =
        "**ID should be possitive**";
      return false;
    }
    if (id.includes(".")) {
      document.getElementById("disp-id").innerHTML =
        "**ID should'nt be decimal**";
      return false;
    }
    if (isNaN(id)) {
      document.getElementById("disp-id").innerHTML = "**ID should be number**";
      return false;
    }
  }
  if (name == "") {
    document.getElementById("disp-name").innerHTML = "**Enter Product name**";
    return false;
  }

  if (!window.location.href.includes("#")) {
    if (image == "") {
      document.getElementById("disp-image").innerHTML =
        "**Upload Product Image**";
      return false;
    }
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

//function to Display Data
function displayData(data) {
  filterprodlist = data;
  var html = "";

  data.length == 0
    ? (html = `<tr><td colspan="6"><h4 id="no-product">No Data Available! <br><br><button class="btn btn-success"><a href="/">Add Data</a></button></h4></td></tr>`)
    : filterprodlist.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.name + "</td>";
        html +=
          `<td> <img src=` +
          localStorage.getItem(element.id) +
          ` style="width:100px;height:100px"> </td>`;
        html += "<td>" + element.price + "</td>";
        html += "<td>" + element.description + "</td>";
        html +=
          `<td><button onclick = "deleteData(` +
          element.id +
          `)" class="btn btn-danger">Delete <i class="fa-solid fa-trash"></i></button><a href="#"><button onclick = "updateData(` +
          index +
          `)" class="btn btn-warning">Edit<i class="fa-solid fa-pen"></i></button></a></td>`;
        html += "</tr>";
      });
  document.getElementById("crudTable").innerHTML = html;
}

//Function to get data from local storage
function getProductData() {
  if (localStorage.getItem("productList") == null) {
    productList = [];
  } else {
    productList = JSON.parse(localStorage.getItem("productList"));
  }
  return productList;
}

function showData() {
  setTimeout(() => {
    var productList;
    let sortitem = document.querySelector(".sortitem");
    let arrow = document.querySelector(".arrow");
    let searchprod = document.querySelector(".search-prod");

    productList = getProductData();

    //Code for searching item
    searchprod.addEventListener("keyup", (e) => {
      let searchproduct = [...productList];

      searchproduct = searchproduct.filter(
        (product) => product.id == e.target.value
      );
      if (e.target.value == "") {
        searchproduct = productList;
      }
      displayData(searchproduct);
    });

    //For sorting Products
    sortitem.addEventListener("click", (e) => {
      let sorybyvalue = e.target.value;
      sortval(sorybyvalue);
    });

    //sorttype = id,name,price sortval = asc desc
    let filterprodlist = [...productList];
    function sortval(val) {
      let sorttype = val;
      arrow.addEventListener("click", (e) => {
        if (sorttype == "productId" && e.target.value == "ascending") {
          filterprodlist = filterprodlist.sort((a, b) => a.id - b.id);
          displayData(filterprodlist);
        }
        if (sorttype == "productId" && e.target.value == "descending") {
          filterprodlist = filterprodlist.sort((a, b) => b.id - a.id);
          displayData(filterprodlist);
        }
        if (sorttype == "productName" && e.target.value == "ascending") {
          filterprodlist = filterprodlist.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          displayData(filterprodlist);
        }
        if (sorttype == "productName" && e.target.value == "descending") {
          filterprodlist = filterprodlist.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          displayData(filterprodlist);
        }
        if (sorttype === "price" && e.target.value == "ascending") {
          filterprodlist = filterprodlist.sort((a, b) => a.price - b.price);
          displayData(filterprodlist);
        }
        if (sorttype === "price" && e.target.value == "descending") {
          filterprodlist = filterprodlist.sort((a, b) => b.price - a.price);
          displayData(filterprodlist);
        }
      });
    }
    displayData(filterprodlist);
  }, 100);
}

setTimeout(() => {
  const submit = document.getElementById("Submit");
  if (submit) {
    submit.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }
}, 100);

// function to add data
function AddData() {
  if (validateForm() == true) {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;
    var img = document.getElementById("prodimage").value;
    var productList = getProductData();
    storeImage(id);
    let products = [...productList];
    products = products.filter((product) => product.id == id);
    if (products.length > 0) {
      alert("Id exists");
    } else {
      productList.push({
        id: id,
        name: name,
        price: price,
        description: description,
      });
      localStorage.setItem("productList", JSON.stringify(productList));
      clearFormData();
      window.alert("Data Added successfully");
    }
  }
}

//Function to delete data
function deleteData(id) {
  if (confirm("Delete Product with Id " + id)) {
    var productList = getProductData();
    let copyprod = [...productList];
    copyprod = copyprod.filter((prod) => prod.id != id);
    productList = copyprod;
    localStorage.setItem("productList", JSON.stringify(productList));
    localStorage.removeItem(id);
  }
  showData();
}

//Edit data from local storage
function updateData(index) {
  setTimeout(() => {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";
    var productList = getProductData();
    document.getElementById("id").disabled = "true";
    var productId = (document.getElementById("id").value =
      productList[index].id);
    document.getElementById("name").value = productList[index].name;
    document.getElementById("price").value = productList[index].price;
    document.getElementById("description").value =
      productList[index].description;

    const recentImgUrl = localStorage.getItem(productId);
    if (recentImgUrl) {
      document.querySelector(".imgurl").setAttribute("src", recentImgUrl);
      document.querySelector(".imgurl").setAttribute("style", "height:50px");
    }
    document.querySelector("#prodimage").addEventListener("change", (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        document.querySelector(".imgurl").setAttribute("src", reader.result);
        document.querySelector(".imgurl").setAttribute("style", "height:50px");
      };
    });

    document.querySelector("#Update").onclick = function (e) {
      e.preventDefault();
      let id = document.getElementById("id").value;
      productList[index].name = document.getElementById("name").value;
      productList[index].price = document.getElementById("price").value;
      productList[index].description =
        document.getElementById("description").value;
      let image = document.getElementById("prodimage").value;
      localStorage.setItem("productList", JSON.stringify(productList));
      let newid = productList[index].id;
      if (image) {
        localStorage.removeItem(id);
        storeImage(newid);
      }
      if (validateForm() == true) {
        window.alert("Data Updated Successfully");
        window.location.href = "#display";
      }
    };
  }, 100);
}

function clearFormData() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("prodimage").value = "";
  document.getElementById("price").value = "";
  document.getElementById("description").value = "";
}
function storeImage(id) {
  const input_img = document.getElementById("prodimage");
  const image1 = input_img.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image1);
  reader.addEventListener("load", () => {
    localStorage.setItem(id, reader.result);
  });
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
