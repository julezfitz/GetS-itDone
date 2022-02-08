import React, { useReducer, useEffect } from "react";
import axios from "axios";

export default function useAPIData(props) {

    const SET_CATEGORIES = "SET_CATEGORIES";
    const SET_LISTINGS = "SET_LISTINGS";

    function reducer(state, action) {
        switch (action.type) {
            case SET_CATEGORIES:
                return { ...state, categories: action.categories }
            case SET_LISTINGS:
                return { ...state, listings: action.listings }


            //   if (action.listingsAction === "book") {
            //     const newState = { days: [], day: state.day, interviewers: {...state.interviewers}, appointments: action.appointmentsList };
            //     for (const day in state.days) {
            //       newState.days[day] = {...state.days[day]};
            //     }
            //     newState.days[action.dayId].spots = state.days[action.dayId].spots - 1;
            //     console.log(newState);
            //     return newState
            //   }
            //   else if (action.interviewAction === "cancel") {
            //     const newState = { days: [], day: state.day, interviewers: {...state.interviewers}, appointments: action.appointmentsList };
            //     for (const day in state.days) {
            //       newState.days[day] = {...state.days[day]};
            //     }
            //     newState.days[action.dayId].spots = state.days[action.dayId].spots + 1;
            //     return newState
            //   }
            //   return state
            // }
            default:
                throw new Error(
                    `Tried to reduce with unsupported action type: ${action.type}`
                );
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        categories: [],
        listings: [],
        currentListing: {},
        notifications: [],
        offers: [],
        ratings: [],
    });

    useEffect(() => {
        axios.get(`http://localhost:8001/categories`).then((result) => {
            console.log(result);
            dispatch({ type: "SET_CATEGORIES", categories: result.data })
        })
    }, []);

    const getListings = function (params) {
        //INPUT for function paramsStructure = {
        //     keywords: "", 
        //     category: "", 
        //     creatorId: "", 
        //     orderBy: "", 
        //     sortOrder: "" 
        // }
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

        return axios.get(`http://localhost:8001/listings/${queryString}`)
            .then(result => {
                dispatch({ type: "SET_LISTINGS", listings: result.data })
            })
    }

    const createListing = function (listing) {
        return axios.post(`http://localhost:8001/listings/`, { listing })
          .then(result => {
            dispatch({ type: "SET_LISTING", currentListing: result.data })
          })
      }


    let returnedStateVals = {
        state: state,
        getListings: getListings,
        createListing: createListing
      }
    
      return returnedStateVals;

    // const [categories, setCategories] = useState({
    //     categories: [],
    // });

    // useEffect(() => {
    //     axios.get(`http://localhost:8001/categories`).then(res => {
    //         console.log(res.data);
    //         const categories = res.data.map(obj => {
    //             return obj.category;
    //         });
    //         setCategories({ categories });
    //     });
    // }, []);

}