import React, {useState, useEffect} from "react"
import "./BookItem.css"
import Image from '../assets/book-example.png'

function BookItem(props) {

  const widthPercentage = 0;
  const heightPercentage = 0;

  // height={"10vh"} width={'15vw'}

  function handleClick() {
    // props.setSelectedBookId(props.id);
    props.handleClick(props.id);
    props.showEditPopUp();
  }

  // <span class="tooltiptext">Click to edit the book</span>

  return (
    <div className="book">
      <div className="book-main" onClick={() => handleClick()}>
        <div className="book-image">
          <img src={Image} className="image" alt='book image placeholder' />
        </div>
        <div className="book-info">
          <div className="book-info-name">
            <h4 style={{fontSize: "18px"}}>{props.name}</h4>
            <p style={{fontSize: "14px", color: "grey", margin:"5px 0px"}}>{props.author}</p>
            <p style={{fontSize: "14px"}} >Category: {props.category}</p>
          </div>
          <div className="book-info-price">
            <h3 style={{fontSize: "20px"}} >{props.price}</h3>
          </div>
        </div>
      </div>
      <div className="book-button">
        <button type="button" class="book-button-delete"  onClick={() => props.handleDelete(props.id)}>Delete</button>
      </div>
    </div>
  );
}

export default BookItem;
