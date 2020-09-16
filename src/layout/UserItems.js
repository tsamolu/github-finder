import React from 'react';
import PropTypes from "prop-types";



const UserItems = ({user: {login, avatar_url, html_url}}) => {

        return (
            <div 
            className = "card text-center">
            <img src = {avatar_url} 
            alt ="" 
            className = "round-img" 
            style = {{width: "60px"}}/>
            
            <h3>{login}</h3>
            <div>
                <a href = {html_url} className = "btn btn-dark btn-sm my-1" style = {{borderRadius: "3px"}}>More</a>
                </div>
            </div>
        )

};

UserItems.proTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItems;
