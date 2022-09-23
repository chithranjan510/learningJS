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
const showDetails = document.querySelector('.show-btn');
const hideDetails = document.querySelector('.hide-btn');



myForm.addEventListener('submit', onSubmit);
showDetails.addEventListener('click', onClickShow);
hideDetails.addEventListener('click', onClickHide);
users.addEventListener('click', onClickEditOrDelete);


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

        // let myObj = {                       
        //     name:name.value,
        //     email:email.value
        // }

        // let myObj_serielized = JSON.stringify(myObj);  // converting to string as local storage only takes string values
        // localStorage.setItem(email.value,myObj_serielized);

        // console.log(localStorage);

        // let myObj_deserielized = JSON.parse(localStorage.getItem('myObj')); //parse method is used to get back the object
        // console.log(myObj_deserielized);

        //clear fields

        axios
        .post('https://crudcrud.com/api/49b007203a2a4b859fb5841536d56863/appointmentData',{                       
            name:name.value,
            email:email.value
        })
        .then((res) => {console.log(res)})
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML +'<h4>Something went wrong</h4>';
            console.error(err)
        })

        name.value = '';
        email.value = '';
        
    }
}




// onClick function for onclick event

function onClickShow(e)
{
    // remove any previous displays
    while(users.firstChild)
    {
        users.removeChild(users.firstChild);
    }


    // fetching the user data from local storage

    // Object.keys(localStorage).forEach((key) => {
    //     const userDetails = JSON.parse(localStorage.getItem(key));
    //     display(userDetails);
    // })

    axios
    .get('https://crudcrud.com/api/49b007203a2a4b859fb5841536d56863/appointmentData')
    .then((res) => {
        res.data.forEach((response) => {
            display(response);
        });
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML +'<h4>Something went wrong</h4>';
        console.log(err);
    })

    // console.log('its working');
}


// displaying the users data

function display(item)
{
    let itemName = document.createTextNode(item.name + ' - ');
    let itemDatails = document.createTextNode(item.email);
    // console.log(details);

    let li = document.createElement('li');
    let del = document.createElement('button');
    let edit = document.createElement('button');

    edit.className = 'edit-btn';
    del.className = 'del-btn';
    // console.log(edit);

    edit.appendChild(document.createTextNode('Edit'));
    del.appendChild(document.createTextNode('Delete'));
    
    del.style.float = 'right';
    edit.style.marginLeft = '5px';

    li.appendChild(itemName);
    li.appendChild(itemDatails);
    li.appendChild(edit);
    li.appendChild(del);

    users.appendChild(li);

    // console.log('its working');
}


// hiding the user data

function onClickHide(e)
{
    while(users.firstChild)
    {
        users.removeChild(users.firstChild);
    }
}


// editing and deleting detail of user

function onClickEditOrDelete(e)
{
    if(e.target.classList.contains('del-btn'))
    {

        // REMOVING FROM LOCAL STORAGE

        // https://www.w3schools.com/jsref/prop_node_childnodes.asp
    
        // let liEmail = e.target.parentElement.childNodes[1].nodeValue;  // childNode[1] gives an object whereas childnode[1].nodeValue gives string
        // // console.log(typeof(liEmail));

        // localStorage.removeItem(liEmail);

        const userEmail = e.target.parentElement.childNodes[1].nodeValue;
        // console.log(userEmail);

        axios.get('https://crudcrud.com/api/49b007203a2a4b859fb5841536d56863/appointmentData')
        .then((res) => {
            res.data.forEach((user) => {
                if(user.email === userEmail) {
                    axios.delete(`https://crudcrud.com/api/49b007203a2a4b859fb5841536d56863/appointmentData/${user._id}`)
                    .then(() => {console.log('Data deleted')})
                    .catch((err) => {
                        document.body.innerHTML = document.body.innerHTML +'<h4>Something went wrong</h4>';
                        console.log(err);
                    })
                }
            })
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML +'<h4>Something went wrong</h4>';
            console.log(err);
        })


        // // REMOVING FROM UI

        // if(confirm('Are you sure?'))
        // {
            const li = e.target.parentElement;
            users.removeChild(li);
        // }
    }

    if(e.target.classList.contains('edit-btn'))
    {
        // name.value = e.target.parentElement.childNodes[0].nodeValue;
        // email.value = e.target.parentElement.childNodes[1].nodeValue;

        // let liEmail = e.target.parentElement.childNodes[1].nodeValue;  // childNode[1] gives an object whereas childnode[1].nodeValue gives string
        // // console.log(typeof(liEmail));

        // localStorage.removeItem(liEmail);




        // REMOVING FROM UI

        // if(confirm('Are you sure?'))
        // {
            const li = e.target.parentElement;
            users.removeChild(li);
        // }
    }
}
