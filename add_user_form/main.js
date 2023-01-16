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

function onSubmit(e) {
  e.preventDefault();

  if (name.value === '' || email.value === '') {
    msg.style.background = 'red';
    msg.style.color = 'white';
    msg.style.padding = '8px';
    msg.style.borderRadius = '3px';
    msg.style.textAlign = 'center';
    msg.style.marginBottom = '8px';
    msg.innerHTML = '<h3>Please fill complete form<h3>';

    setTimeout(() => msg.remove(), 3000);
  } else {
    axios
      .post('http://localhost:3000/user/add-user', {
        name: name.value,
        email: email.value,
      })
      .then((res) => {
        console.log(res.data.id);
      })
      .catch((err) => {
        document.body.innerHTML =
          document.body.innerHTML + '<h4>Something went wrong</h4>';
        console.error(err);
      });

    name.value = '';
    email.value = '';
  }
}

// onClick function for onclick event

function onClickShow(e) {
  // remove any previous displays
  while (users.firstChild) {
    users.removeChild(users.firstChild);
  }

  axios
    .get('http://localhost:3000/user/users-list')
    .then((res) => {
      res.data.forEach((response) => {
        display(response);
      });
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + '<h4>Something went wrong</h4>';
      console.log(err);
    });
}

// displaying the users data

function display(item) {
  let itemName = document.createTextNode(item.name + ' - ');
  let itemDatails = document.createTextNode(item.email);
  // console.log(details);

  let li = document.createElement('li');
  let del = document.createElement('button');
  let edit = document.createElement('button');

  edit.className = 'edit-btn';
  del.className = 'del-btn';
  del.id = item.id + '';
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

function onClickHide(e) {
  while (users.firstChild) {
    users.removeChild(users.firstChild);
  }
}

// editing and deleting detail of user

function onClickEditOrDelete(e) {
  if (e.target.classList.contains('del-btn')) {
    const id = e.target.id;
    console.log(id);

    axios
      .delete(
        `http://localhost:3000/user/delete-user/${id}`
      )
      .then(() => {
        console.log('Data deleted');
      })
      .catch((err) => {
        document.body.innerHTML =
          document.body.innerHTML + '<h4>Something went wrong</h4>';
        console.log(err);
      });

    // // REMOVING FROM UI

    // if(confirm('Are you sure?'))
    // {
    const li = e.target.parentElement;
    users.removeChild(li);
    // }
  }

  if (e.target.classList.contains('edit-btn')) {
    name.value = e.target.parentElement.childNodes[0].nodeValue;
    email.value = e.target.parentElement.childNodes[1].nodeValue;

    // let liEmail = e.target.parentElement.childNodes[1].nodeValue;  // childNode[1] gives an object whereas childnode[1].nodeValue gives string
    // // console.log(typeof(liEmail));

    // localStorage.removeItem(liEmail);

    const userEmail = e.target.parentElement.childNodes[1].nodeValue;
    // console.log(userEmail);

    axios
      .get(
        'https://crudcrud.com/api/49b007203a2a4b859fb5841536d56863/appointmentData'
      )
      .then((res) => {
        res.data.forEach((user) => {
          if (user.email === userEmail) {
            axios
              .delete(
                `https://crudcrud.com/api/49b007203a2a4b859fb5841536d56863/appointmentData/${user._id}`
              )
              .then(() => {
                console.log(
                  'Data deleted, please update it with correct information'
                );
              })
              .catch((err) => {
                document.body.innerHTML =
                  document.body.innerHTML + '<h4>Something went wrong</h4>';
                console.log(err);
              });
          }
        });
      })
      .catch((err) => {
        document.body.innerHTML =
          document.body.innerHTML + '<h4>Something went wrong</h4>';
        console.log(err);
      });

    // REMOVING FROM UI

    // if(confirm('Are you sure?'))
    // {
    const li = e.target.parentElement;
    users.removeChild(li);
    // }
  }
}
