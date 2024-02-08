/**used empty array and assigned it to employees that would appear from api website assigned to urlapi.Used fetch method to fetch resources aynchronously across the url provided.  */

let employees = []; 
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const gallery = document.querySelector('.gallery');
const modalInfoContainer = document.querySelector('.modal-info-container');

fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))


/**Created a function to display 12 users for empty employee array, along with basic object information of property and value that was already stored in api web server for each: image, first and last name, email, and city or location.Added to inner html inside div element with tags that container employees information. Accessed properties by using dot notation with variable name given to xhr object followed by a propety name. Then added html to gallery class.
 * Added an event listener to gallery class upon user clicking a card, closest card clicked with the index of that employee would be displayed in a modal.
 */

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
                <img class="card-img" src="${picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
                </div>
            </div>        
            `;
    }); 

    gallery.innerHTML = employeeHTML; 

    gallery.addEventListener('click', (e) => {
            if (e.target.closest('.card')) {
            const index = e.target.closest('.card').getAttribute('data-index'); 
            displayModal(index); 
            }
        });
}

/**created a modal window: When any part of an employee item in the directory is clicked, a modal window should pop up with more in depth details that were added to the inner html on the modal-container class and display:Image,Name,Email,City or location,Cell Number,Detailed Address, including street name and number, state or country, and postcode,Birthday
*/

function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index]; 
 
    let date = new Date(dob.date);

    const modalHTML = `
        <div class="modal-container">
            <div class="modal">
             <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${picture.large}" alt="profile picture"/>
            <h3 id="name" class="modal-name cap"> ${name.first} ${name.last}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text">${street.number} ${street.name} ${city}, ${state} ${postcode}</p>
            <p class="modal-text"> Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
          </div>
        </div>
    `; 
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modalClose = document.querySelector('.modal-close-btn'); 


    modalClose.addEventListener('click', () => {
        const modalContainer = document.querySelector('.modal-container');

        modalContainer.style.display = 'none'; 
        modalContainer.remove();

    });
}




