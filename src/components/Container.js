import React, {useState, useEffect} from "react"
import BookItem from "./BookItem.js"
import Logo from '../assets/logo.png'

import "./Container.css"

let initBookData = [
  { name: "1984", author: "George Orwell", category: "novel", price: "£10.99" },
  { name: "The Catcher in the Rye", author: "J.D. Salinger", category: "novel", price: "£6.49" },
  { name: "To Kill a Mockingbird", author: "Harper Lee", category: "novel", price: "£7.99" },
  { name: "The Hobbit", author: "J.R.R. Tolkien", category: "fantasy", price: "£8.99" },
  { name: "Lord of the Flies", author: "William Golding", category: "novel", price: "£6.99" },
  { name: "Animal Farm", author: "George Orwell", category: "novel", price: "£5.99" },
  { name: "Brave New World", author: "Aldous Huxley", category: "novel", price: "£7.49" },
  { name: "The Lord of the Rings", author: "J.R.R. Tolkien", category: "fantasy", price: "£12.99" },
  { name: "The Chronicles of Narnia", author: "C.S. Lewis", category: "fantasy", price: "£11.49" },
  { name: "The Da Vinci Code", author: "Dan Brown", category: "thriller", price: "£9.99" },
];

function Container() {

  const [bookData, setBookData] = useState(
    initBookData
  );
  const [sortMethod, setSortMethod] = useState('none');
  const [selectedBookId, setSelectedBookId] = useState(0);

  // const [bookName, setBookName] = useState(bookData[selectedBookId]['name']);
  // const [bookAuthor, setBookAuthor] = useState(bookData[selectedBookId]['author']);
  // const [bookCategory, setBookCategory] = useState(bookData[selectedBookId]['category']);
  // const [bookPrice, setBookPrice] = useState(bookData[selectedBookId]['price']);

  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookPrice, setBookPrice] = useState("");


  const [addBookName, setAddBookName] = useState("");
  const [addBookAuthor, setAddBookAuthor] = useState("");
  const [addBookCategory, setAddBookCategory] = useState("");
  const [addBookPrice, setAddBookPrice] = useState("");

  const [searchContent, setSearchContent] = useState("");

  function handleDelete(id) {
    const newBookData = bookData.filter(item => item.id !== id);
    setBookData(newBookData);
  }

  function handleSortMethodChanged(value) {
    setSortMethod(value);
    if(value === "name") {
      const newBookData = bookData.sort((a, b) => a.name.localeCompare(b.name));
      setBookData(newBookData);
    }
    else if(value === "price") {
      const newBookData = bookData.sort((a, b) => parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1)) );
      setBookData(newBookData);
    }
    else {
      //
    }
  }

  function closeEditPopUp() {
    // const dialog = document.querySelector("dialog");
    const dialog = document.getElementById('dialog-edit');
    dialog.close();
  }

  function showEditPopUp() {
    // const dialog = document.querySelector("dialog");
    const dialog = document.getElementById('dialog-edit');
    dialog.showModal();
  }

  function closeAddPopUp() {
    const dialog = document.getElementById('dialog-add');
    dialog.close();
  }

  function showAddPopUp() {
    const dialog = document.getElementById('dialog-add');
    dialog.showModal();
  }

  function addBook() {
    let book = {
      name: addBookName,
      author: addBookAuthor,
      category: addBookCategory,
      price: "£" + addBookPrice
    };
    let bookDataCopy = [...bookData];
    bookDataCopy.push(book);
    setBookData(bookDataCopy);
  }

  function saveChanges() {
    let bookDataCopy = [...bookData];
    let newBookCopy = bookDataCopy[selectedBookId];
    newBookCopy["name"] = bookName;
    newBookCopy["author"] = bookAuthor;
    newBookCopy["category"] = bookCategory;
    newBookCopy["price"] = bookPrice;
    bookDataCopy[selectedBookId] = newBookCopy;
    setBookData(bookDataCopy);
  }

  function handleClick(id) {
    setSelectedBookId(id);
    setBookName(bookData[id]["name"]);
    setBookAuthor(bookData[id]["author"]);
    setBookCategory(bookData[id]["category"]);
    setBookPrice(bookData[id]["price"]);
  }

  // function filterBySearch() {
  //   if(searchContent.length = 0) {
  //   }
  // }

  return (
    <div className="container">
      <div className="container-top">
        <div className="container-logo">
          <img src={Logo} className="image2" alt='book logo' style={{width: "60px", height: "60px"}}/>
          <h1 style={{color: "black",  marginLeft: "10px"}}>Bookstore Demo</h1>
        </div>
        <div className="container-search">
          <form id="form" role="search">
            <input type="search" value={searchContent} onChange={e => {
              setSearchContent(e.target.value);
            }}
             placeholder="Search..." />
            <button class="search-button">Search</button>
          </form>
        </div>
        <div className="container-sorter">
            <p style={{fontSize: "18px"}}>Sort by: {"  "}</p>
            <select name="selectSortMethod"
            style={{fontSize: "16px", marginLeft: "5px"}}
            defaultValue="name"
            value={sortMethod}
            onChange={event => handleSortMethodChanged(event.target.value)}>
                <option value="name">name</option>
                <option value="price">price</option>
            </select>
        </div>
        <div>
          <button class="button-add" onClick={() => showAddPopUp()}>Add</button>
        </div>
      </div>
      <div className="container-popup-edit">
        <dialog id="dialog-edit">
          <span style={{fontSize: "20px"}} onClick={() => closeEditPopUp()}>X</span>
          <div className="popup-title">
            <h3>Book Editor</h3>
          </div>
          <div className="popup-row" style={{marginTop: "20px"}}>
            <p>Name:</p>
            <input type="name" id="name" value={bookName} onChange={e => setBookName(e.target.value)}/>
          </div>
          <div className="popup-row">
            <p>Author:</p>
            <input type="author" id="author" value={bookAuthor} onChange={e => setBookAuthor(e.target.value)}/>
          </div>
          <div className="popup-row">
            <p>Category:</p>
            <input type="category" id="category" value={bookCategory} onChange={e => setBookCategory(e.target.value)}/>
          </div>
          <div className="popup-row">
            <p>Price:</p>
            <input type="price" id="price" value={bookPrice} onChange={e => setBookPrice(e.target.value)}/>
          </div>
          <div className="popup-bottom">
            <button style={{height: "40px", borderRadius:"10px"}} autofocus onClick={() => {
              saveChanges();
              closeEditPopUp();
            }}>Save</button>
            <button style={{height: "40px", borderRadius:"10px"}} autofocus onClick={() => {
              handleDelete(selectedBookId);
              closeEditPopUp();
            }}>Delete</button>
          </div>
        </dialog>
      </div>

      <div className="container-popup-add">
        <dialog id="dialog-add">
          <span style={{fontSize: "20px"}} onClick={() => closeAddPopUp()}>X</span>
          <div className="popup-title">
            <h3>Book Adder</h3>
          </div>
          <div className="popup-row" style={{marginTop: "20px"}}>
            <p>Name:</p>
            <input type="name" id="name" value={addBookName} onChange={e => setAddBookName(e.target.value)}/>
          </div>
          <div className="popup-row">
            <p>Author:</p>
            <input type="author" id="author" value={addBookAuthor} onChange={e => setAddBookAuthor(e.target.value)}/>
          </div>
          <div className="popup-row">
            <p>Category:</p>
            <input type="category" id="category" value={addBookCategory} onChange={e => setAddBookCategory(e.target.value)}/>
          </div>
          <div className="popup-row">
            <p>Price:</p>
            <input type="price" id="price" value={addBookPrice} onChange={e => setAddBookPrice(e.target.value)}/>
          </div>
          <div className="popup-bottom-new">
            <button style={{height:"40px", width: "80%", borderRadius:"10px"}} autofocus onClick={() => {
              addBook();
              closeAddPopUp();
            }}>Add</button>
          </div>
        </dialog>
      </div>
      <div className="container-main">
      {bookData.map(function(item, id){
        item["id"] = id;
        item["handleDelete"] = handleDelete;
        item["showEditPopUp"] = showEditPopUp;
        item["handleClick"] = handleClick;
         return (
            <BookItem {...item} />
         )
      })}
      </div>
    </div>
  );
}

export default Container;
