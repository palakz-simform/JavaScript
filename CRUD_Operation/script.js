
//validate forminputs before loading
function validateForm(){
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var image = document.getElementById("image").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;

    if(id == ""){
        document.getElementById("disp-id").innerHTML = "**Enter Product ID**"
        return false;
    }
    if(name == ""){
        document.getElementById("disp-name").innerHTML = "**Enter Product name**"
        return false;
    }
    if(image == ""){
        document.getElementById("disp-image").innerHTML = "**Upload Product Image**"
        return false;
    }
    if(price == ""){
        document.getElementById("disp-price").innerHTML = "**Upload Product Price**"
        return false;
    }
    else if(price<0){
        document.getElementById("disp-price").innerHTML = "**Product Price should be greater than zero**"
        return false;
    }
    if(description==""){
        document.getElementById("disp-description").innerHTML = "**Enter Product description**"
        return false;
    }

    return true;

}

document.onload = showData();
//function to show data
function showData(){
    
    var productList;
    if(localStorage.getItem("productList")==null){
        productList = [];
    }
    else{
        productList = JSON.parse(localStorage.getItem("productList"))
    }

    var html = "";
   
    productList.forEach(function(element,index){
        
        html += "<tr>"
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.image + "</td>";
        html += "<td>" + element.price + "</td>";
        html += "<td>" + element.description + "</td>";
        html += `<td><button onclick = "deleteData(`+index+`)" class="btn btn-danger">Delete</button>&emsp;&emsp;<button onclick = "updateData(`+index+`)" class="btn btn-warning">Edit</button></td>`;
        html += "</tr>"  
        
    });
    
    document.getElementById("crudTable").innerHTML = html;
    
    
}

// Loads all the data when document or page loaded
// function to add data 

function AddData(){
    if(validateForm()==true){
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var image = document.getElementById("image").value;
        var price = document.getElementById("price").value;
        var description = document.getElementById("description").value;

        var productList;
        if(localStorage.getItem("productList")==null){
            productList = [];
        }
        else{
            productList = JSON.parse(localStorage.getItem("productList"))
        }
        productList.push({
            id:id,
            name:name,
            image:image,
            price:price,
            description:description
        });

        localStorage.setItem("productList",JSON.stringify(productList));
        
        showData();
        document.getElementById("id").value="";
        document.getElementById("name").value="";
        document.getElementById("image").value="";
        document.getElementById("price").value="";
        document.getElementById("description").value="";

    }
}

//Function to delete data
function deleteData(index){
    var productList;
    if(localStorage.getItem("productList")==null){
        productList = [];
    }
    else{
        productList = JSON.parse(localStorage.getItem("productList"))
    }

    productList.splice(index,1)

    localStorage.setItem("productList",JSON.stringify(productList));
    showData();
}

//Edit data from local storage
function updateData(index){
    document.getElementById("Submit").style.display  = "none";
    document.getElementById("Update").style.display  = "block";

    var productList;
    if(localStorage.getItem("productList")==null){
        productList = [];
    }
    else{
        productList = JSON.parse(localStorage.getItem("productList"))
    }
    document.getElementById("id").value= productList[index].id;
    document.getElementById("name").value= productList[index].name;
    document.getElementById("image").value= productList[index].image;
    document.getElementById("price").value= productList[index].price;
    document.getElementById("description").value= productList[index].description;

    document.querySelector('#Update').onclick = function(){
        if(validateForm()==true){
            
            productList[index].id = document.getElementById("id").value;
            productList[index].name = document.getElementById("name").value;
            productList[index].image = document.getElementById("image").value;
            productList[index].price = document.getElementById("price").value;
            productList[index].description = document.getElementById("description").value;
            
            localStorage.setItem("productList", JSON.stringify(productList))

            showData();
            document.getElementById("id").value="";
            document.getElementById("name").value="";
            document.getElementById("image").value="";
            document.getElementById("price").value="";
            document.getElementById("description").value="";

            document.getElementById("Submit").style.display  = "block";
            document.getElementById("Update").style.display  = "none";
        }
    }

}
