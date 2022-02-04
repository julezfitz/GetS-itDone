import React from "react";
import "./SearchListItem.scss";

export default function SearchListItem(props) {
  return (
    // <li onClick={() => props.setDay(props.name)} className={searchClass} data-testid="search-item">
    //   <h2 className="text--regular">{props.name}</h2> 
    //   <h3 className="text--light">{formatSpots(props.spots)}</h3>
    // </li>
    <>
      <li className="text--regular search-list__item">
          <div className="text--regular search-list__item-details">
            <img className="text--regular search-list__item-listingImg" src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80" alt="Home" width="60" height="50"></img>
            <div className="text--regular search-list__item-description">
              <h3>Clean My Home</h3>
              <p>This listing is for you to clean my house. This is a test. Not a real listing.</p>
              <p>Date: February 3, 2022</p>
            </div>
          </div>
          <p className="text--regular search-list__item-price">$500</p>
      </li>
      <li className="text--regular search-list__item">
          <div className="text--regular search-list__item-details">
            <img className="text--regular search-list__item-listingImg" src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80" alt="Home" width="60" height="50"></img>
            <div className="text--regular search-list__item-description">
            <h3>Clean My Home</h3>
              <p>This listing is for you to clean my house. This is a test. Not a real listing.</p>
              <p>Date: February 2, 2022</p>
            </div>
          </div>
          <p className="text--regular search-list__item-price">$750</p>
      </li>
      <li className="text--regular search-list__item">
          <div className="text--regular search-list__item-details">
            <img className="text--regular search-list__item-listingImg" src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80" alt="Home" width="60" height="50"></img>
            <div className="text--regular search-list__item-description">
            <h3>Clean My Home</h3>
              <p>This listing is for you to clean my house. This is a test. Not a real listing.</p>
              <p>Date: February 1, 2022</p>
            </div>
          </div>
          <p className="text--regular search-list__item-price">$1,000</p>
      </li>
      <li className="text--regular search-list__item">
          <div className="text--regular search-list__item-details">
            <img className="text--regular search-list__item-listingImg" src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80" alt="Home" width="60" height="50"></img>
            <div className="text--regular search-list__item-description">
            <h3>Clean My Home</h3>
              <p>This listing is for you to clean my house. This is a test. Not a real listing.</p>
              <p>Date: January 31, 2022</p>
            </div>
          </div>
          <p className="text--regular search-list__item-price">$1,500</p>
      </li>
    </>
  );
}

