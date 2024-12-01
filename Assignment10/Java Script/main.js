var siteName = document.getElementById('siteName'); 
var siteURL = document.getElementById('siteURL');
var dataRow = document.getElementById('tablerow');
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
siteName.addEventListener('input', function () {
  validate(siteName, nameRegex);
});
siteURL.addEventListener('input', function () {
  validate(siteURL, urlRegex);
});
var websiteList = []  

  //[{}]  //new user
if (localStorage.getItem('products')) {
  websiteList = JSON.parse(localStorage.getItem('products'))  // old user
  display()
}


function addProduct() {
  if(validate(siteName,nameRegex)&&validate(siteURL,urlRegex))
  {
    var productObj = {
      id: Date.now(),
      sName: siteName.value,
      sURL: siteURL.value,
      
    }
    websiteList.push(productObj)

    localStorage.setItem('products', JSON.stringify(websiteList))
    clearForm()
    display()
  }
  

}

function display()  
{
  var box = `<tr >
        <th>index</th>
        <th>Website Name</th>
        <th>Visit</th>
        <th>Delete</th>
      </tr>`
  for (var i = 0; i < websiteList.length; i++) {
    box += `<tr>
        <td>${i+1}</td>
        <td>${websiteList[i].sName}</td>
        <td>
          <button onclick="gotoLink(this)" value="${websiteList[i].sURL}"class="visit border-0 rounded-3 text-white">
            <i class="fa-solid fa-eye"></i>
            <a href=""></a>
            Visit</button>
         
        </td>
        <td> 
          <button onclick="deleteFun(${websiteList[i].id})" class="delete border-0 rounded-3 text-white">
          <i class="fa-solid fa-trash-can"></i>
          Delete</button>
        </td>
      </tr>`
  }

  dataRow.innerHTML = box
}

function clearForm() {
  siteName.value = null;
  siteURL.value = null;
  
}


function deleteFun(id) {
  //productList.splice(index, 1) //index
  websiteList = websiteList.filter(function (ele) { return ele.id !== id })
  localStorage.setItem('products', JSON.stringify(websiteList))
  display()
}

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    element.nextElementSibling.classList.replace('d-block','d-none') 
      return true  
  } else {
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    element.nextElementSibling.classList.replace('d-none','d-block') 
      return false 
  }
}
function gotoLink(input)
{
location.href=input.value;
}
