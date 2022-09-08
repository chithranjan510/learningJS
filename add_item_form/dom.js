// Examining Document

//console.dir(document);

// console.log(document.domain);
// //document.title = 123;
// console.log(document.title);
// console.log(document.URL);
// console.log(document.doctype);
// console.log(document.head);
// console.log(document.body);
// console.log(document.all);
// console.log(document.all[10]);  //h1 tag which it at index 10 of document.all
// console.log(document.forms);
// console.log(document.links);
// console.log(document.images);


//getElementById

// console.log(document.getElementById('header-title'));

// let headerTitle = document.getElementById('header-title');
// let headerTitle = document.querySelector('#header-title');

// console.log(headerTitle);

// // headerTitle.textContent = 'hello';
// // headerTitle.innerText = 'bye bye';
// // headerTitle.innerHTML = '<h3>Goodbye</h3>'

// let header = document.querySelector('#main-header');

// header.style.borderBottom = '3px solid #000';

// let form = document.querySelector('.title');
// form.style.fontWeight = 'bold';
// form.style.color = 'green';


// // Get elemet by class name

// let item = document.getElementsByClassName('list-group-item');
// console.log(item);

// item[2].style.backgroundColor = 'green';

// for(let i=0;i<item.length; i++)
// {
//     item[i].style.fontWeight = 'bold';
// }


//// get element by tag name

// let li = document.getElementsByTagName('li');
// console.log(li);

// li[2].style.backgroundColor = 'green';

// for(let i=0;i<li.length; i++)
// {
//     li[i].style.fontWeight = 'bold';
// }

//// query selector

// let input = document.querySelector('input');
// let submit = document.querySelector('input[type=submit]');

// console.log(input)
// console.log(submit)
// submit.value = 'SEND'

// let li = document.querySelector('li:nth-child(2)');
// console.log(li);

// li.style.backgroundColor = 'green';

// let li3 = document.querySelector('li:nth-child(3)');
// console.log(li3);

// li3.style.visibility = 'hidden';

//// query selector all

// let li = document.querySelectorAll('li');

// console.log(li);

// li[1].style.color = 'green';

// let odd = document.querySelectorAll('li:nth-child(odd)');
// let even = document.querySelectorAll('li:nth-child(even)');
// console.log(odd);

// for(let i=0;i<odd.length;i++)
// {
//     odd[i].style.backgroundColor = 'green';
//     even[i].style.backgroundColor = 'lightblue';
// }


// // traversing the DOM

// let itemList = document.querySelector('#items');

// // //parrentNode

// // console.log(itemList.parentNode);
// // itemList.parentNode.style.backgroundColor = '#ccc';
// // console.log(itemList.parentNode.parentNode);



// // //    parentElement same as parent node

// // console.log(itemList.parentElement);
// // itemList.parentElement.style.backgroundColor = '#ccc';
// // console.log(itemList.parentElement.parentElement);


// // childNodes

// // console.log(itemList.childNodes);  // it aslo considers space after the element

// // console.log(itemList.children);                 // children is better than childNodes
// // console.log(itemList.children[1]);
// // itemList.children[1].textContent = 'Hello 2';

// // firstChild  // it also considers space just like childNodes
// // console.log(itemList.firstChild);

// // firstElementChild  // better than firstChild
// // console.log(itemList.firstElementChild);
// // itemList.firstElementChild.style.backgroundColor = 'yellow';

// // lastChild  // it also considers space just like firstChild
// // console.log(itemList.lastChild);

// // lastElementChild  // better than lastChild
// // console.log(itemList.lastElementChild);
// // itemList.lastElementChild.style.backgroundColor = 'yellow';


// // nextSibling
// // console.log(itemList.nextSibling);

// // nextElementSibling
// // console.log(itemList.nextElementSibling);


// // previousSibling
// // console.log(itemList.previousSibling);

// // // previousElementSibling
// // console.log(itemList.previousElementSibling);
// // itemList.previousElementSibling.style.color = 'red';

// // createElement

// // create a div

// let newDiv = document.createElement('div');

// // add class
// newDiv.className = 'hello';

// //add id
// newDiv.id = 'hello1';

// // add attribute
// newDiv.setAttribute('title','Hello div');

// // create text node
// let newDivText = document.createTextNode('Hello world');

// // add text to div
// newDiv.appendChild(newDivText);

// console.log(newDiv);
// newDiv.style.fontSize = '20px';

// let container = document.querySelector('header .container');
// let h1 = document.querySelector('header h1');

// container.insertBefore(newDiv,h1);



// let newDivNode = document.createElement('div');
// let newDivTextNode = document.createTextNode('Hello World');
// newDivNode.appendChild(newDivTextNode);

// console.log(newDivNode);

// let ul = document.querySelector('.list-group');
// let li = document.querySelector('.list-group-item');

// ul.insertBefore(newDivNode,li);
// ul.insertBefore(newDivNode,li);




// Event listener

let form = document.querySelector('#addForm');
let itemList = document.querySelector('#items');
let filter = document.querySelector('#filter');

// adding items event
form.addEventListener('submit', addItems);

// delete item event
itemList.addEventListener('click', removeItem);

// filtering item event
filter.addEventListener('keyup', filterItems);

// Add item
function addItems(e)
{
    e.preventDefault();

    // get input value
    let newItem = document.querySelector('#item');
    let description = document.querySelector('#description');

    // createElement
    let li = document.createElement('li');

    // add className
    li.className = 'list-group-item';

    // // append input text to new li element
    // li.appendChild(document.createTextNode(newItem.value));
    // li.appendChild(document.createTextNode(" "+description.value));

    let completeItem = newItem.value + " " + description.value;

    li.appendChild(document.createTextNode(completeItem));

    // create delete button
    let deleteBtn = document.createElement('button');
    let editBtn = document.createElement('button');

    // add className
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    editBtn.className = 'edit';

    // append text node to delete button
    deleteBtn.appendChild(document.createTextNode('X'));
    editBtn.appendChild(document.createTextNode('Edit'));
    editBtn.style.float = 'right';
    

    //append button to new li element
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    // append li to list
    itemList.appendChild(li);
    
}


// removeItem function

function removeItem(e)
{
    e.preventDefault();

    if(e.target.classList.contains('delete'))
    {
        if(confirm('Are you sure?'))
        {
            let li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}


// filterItems function

function filterItems(e)
{
    // converting the search text to lower case
    let text = e.target.value.toLowerCase();
    // console.log(text);

    let items = itemList.getElementsByTagName('li');
    // console.log(items);

    //create an array of items
    Array.from(items).forEach(function(item){
        let itemName = item.firstChild.textContent;
        // console.log(itemName);

        if(itemName.toLowerCase().indexOf(text) != -1)
        {
            item.style.display = 'block';
        }
        else
        {
            item.style.display = 'none';
        }
    });
}