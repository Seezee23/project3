import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function NewOrderPage(props){
  const { coffees } = props
  return(
    <main>
      <h1>Coffees</h1>
        <a href="https://www.starbucks.com/menu/product/409/hot" target="_blank"><img class="starbucks-link" src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Cappuccino_at_Sightglass_Coffee.jpg"></img></a>
        <a href="https://www.starbucks.com/menu/product/410/hot" target="_blank"><img class="starbucks-link" src="https://globalassets.starbucks.com/assets/ec519dd5642c41629194192cce582135.jpg?impolicy=1by1_wide_topcrop_630s"></img></a>
        <div class="flex-container">
              {
                        coffees.map((coffee) => {
                          const { name, color, _id, Image } = coffee
                          return (
                            <div key={_id}>
                              <a href={`/coffees/${_id}`}>
                              </a> 
                              <p>{name}</p>
                              <br />
                            </div>
                          )
                        })
                    } 
              </div>    
    </main>
)
}