// import React, { useReducer, useEffect } from "react";
// import axios from "axios";

// export default function useAPIData(props) {

//     const SET_CATEGORIES = "SET_CATEGORIES";
//     const SET_LISTINGS = "SET_LISTINGS";
//     const SET_LISTING = "SET_LISTING";

//     function reducer(state, action) {
//         switch (action.type) {
//             case SET_CATEGORIES:
//                 return { ...state, categories: action.categories }
//             case SET_LISTINGS:
//                 return { ...state, listings: action.listings }
//             case SET_LISTING:
//                 if (action.listingAction === "create") {
//                     const newState = {
//                         categories: state.categories,
//                         listings: [ ...state.listings, action.currentListing ], 
//                         currentListing: action.currentListing,
//                         notifications: state.notifications,
//                         offers: state.offers,
//                         ratings: state.ratings
//                     }
//                     console.log(newState);
//                     return newState
//                 }
//                 if (action.listingAction === "delete") {
//                     const newState = {
//                         categories: state.categories,
//                         listings: action.listings,
//                         currentListing: action.currentListing,
//                         notifications: state.notifications,
//                         offers: state.offers,
//                         ratings: state.ratings
//                     }
//                     console.log(newState);
//                     return newState;
//                 }
//             default:
//                 throw new Error(
//                     `Tried to reduce with unsupported action type: ${action.type}`
//                 );
//         }
//     }

//     const [state, dispatch] = useReducer(reducer, {
//         categories: [],
//         listings: [],
//         currentListing: {},
//         notifications: [],
//         offers: [],
//         ratings: [],
//     });

//     useEffect(() => {
//         axios.get(`http://localhost:8001/categories`).then((result) => {
//             console.log(result);
//             dispatch({ type: "SET_CATEGORIES", categories: result.data })
//         })
//     }, []);

//     const getListings = function (params) {
//         //INPUT for function paramsStructure = {
//         //     keywords: "", 
//         //     category: "", 
//         //     creatorId: "", 
//         //     orderBy: "", 
//         //     sortOrder: "" 
//         // }
//         let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

//         return axios.get(`http://localhost:8001/listings/${queryString}`)
//             .then(result => {
//                 dispatch({ type: "SET_LISTINGS", listings: result.data })
//             })
//     }

//     const createListing = function (listing) {
//         return axios.post(`http://localhost:8001/listings/`, { listing })
//             .then(result => {
//                 dispatch({ type: "SET_LISTING", currentListing: result.data })
//             })
//     }

//     const getSingleListing = function (id) {
//         return axios.get(`http://localhost:8001/listings/${id}`)
//             .then(result => {
//                 dispatch({ type: "SET_LISTING", listingAction: "create", currentListing: result.data })
//             })
//     }

//     const deleteListing = function (id) {
//         const listings = state.listings;
//         const updateListings = listings.filter(item => item.id !== id);

//         return axios.delete(`http://localhost:8001/listings/${id}`)
//             .then(result => {
//                 dispatch({ type: "SET_LISTING", listingAction: "delete", currentListing: {}, listings: updateListings })
//             })
//     }

//     let returnedStateVals = {
//         state: state,
//         getListings: getListings,
//         createListing: createListing,
//         getSingleListing: getSingleListing,
//         deleteListing: deleteListing
//     }

//     return returnedStateVals;
// }