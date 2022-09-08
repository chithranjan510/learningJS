// console.log(document.querySelectorAll('li'));

// const ul = document.querySelector('.items');

// ul.remove();

// ul.lastElementChild.remove();
// ul.firstElementChild.textContent = 'hello';
// ul.children[1].innerText = 'brad';
// ul.lastElementChild.innerHTML = '<h1>bye<h1>'

// ul.firstElementChild.style.color = 'green'; 
// ul.children[1].style.color = 'yellow';

// const btn = document.querySelector('.btn');
// btn.style.background = 'red';

// const btn = document.querySelector('.btn');

// btn.addEventListener('mouseover', (e) => {
//     e.preventDefault();
//     console.log(e.target);
//     document.querySelector('#my-form').style.background = 'lightblue';
//     document.querySelector('body').classList.add('bg-dark');
//     document.querySelector('.items').lastElementChild.innerHTML = '<h1>Hello</h1>';
// });

// btn.addEventListener('mouseout', (e) => {
//     e.preventDefault();
//     document.querySelector('body').classList.remove('bg-dark');
//     document.querySelector('.items').lastElementChild.innerHTML = 'Item 3';
// });

const myForm = document.querySelector('#my-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const msg = document.querySelector('.msg');
const users = document.querySelector('#users');
const printDetails = document.querySelector('button');
// console.log(printDetails);


myForm.addEventListener('submit', onSubmit);
printDetails.addEventListener('click', onClick)

function onSubmit(e){
    e.preventDefault();

    if(name.value === '' || email.value ==='')
    {
        msg.style.background = 'red';
        msg.style.color = 'white';
        msg.style.padding = '8px';
        msg.style.borderRadius = '3px';
        msg.style.textAlign = 'center';
        msg.style.marginBottom = '8px';
        msg.innerHTML = '<h3>Please fill complete form<h3>';

        setTimeout(() => msg.remove(), 3000);
    }
    else
    {
        // const li = document.createElement('li');

        // li.appendChild(document.createTextNode(`${name.value} : ${email.value}`));

        // users.appendChild(li);
        
        // localStorage.setItem('name',name.value);
        // localStorage.setItem('email',email.value);

        // adding to local storage as an object

        let myObj = {                       
            name:name.value,
            email:email.value
        }

        let myObj_serielized = JSON.stringify(myObj);  // converting to string as local storage only takes string values
        localStorage.setItem(email.value,myObj_serielized);

        // console.log(localStorage);

        // let myObj_deserielized = JSON.parse(localStorage.getItem('myObj')); //parse method is used to get back the object
        // console.log(myObj_deserielized);

        //clear fields

        name.value = '';
        email.value = '';
        
    }
}




// onClick function for onclick event

function onClick(e)
{

    // fetching the user data from local storage

    Object.keys(localStorage).forEach((key) => {
        const userDetails = JSON.parse(localStorage.getItem(key));
        display(userDetails);
    })

    // console.log('its working');
}


// displaying the users data

function display(item)
{
    let details = document.createTextNode(item.name + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + item.email);
    // console.log(details);

    let li = document.createElement('li');

    li.appendChild(details);

    users.appendChild(li);

    // console.log('its working');
}