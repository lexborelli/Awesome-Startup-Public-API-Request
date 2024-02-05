let employees = []; 
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const gallery = document.querySelector('.gallery'); 

fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))


/**Created a function to display 12 users, along with basic information for each: image, first and last name, email, and city or location. */

function displayEmployees(employeeData) {
    employees = employeeData; 

    let employeeHTML = ''; 
    
    employees.forEach((employee, index) => {
        let name = employee.name; 
        let email = employee.email; 
        let city = employee.location.city; 
        let state = employee.location.state;
        let picture = employee.picture;
        
 employeeHTML += `
            <div class="card" data-index="${index}">
            <div class="card-img-container">
            <img class="card-img" src="${picture.large}" />
            </div>
            <div class="card-info-container">
            <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${city}, ${state}</p>
            </div>
            </div>        
            `
    }); 

    gallery.innerHTML = employeeHTML; 

};