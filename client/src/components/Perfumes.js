/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PerfumeCard from "./PerfumeCard";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Perfumes() {

  const location = useLocation()
  // console.log("heyy");
  
  // console.log(location);
  




  // this is the part that needs the DB so we call it right here
  // set states for incoming data
  // eslint-disable-next-line no-unused-vars
  const [perfumes, setPerfumes] = useState([]); // initial is an array that receives the objects

  

  // i shall filter perfumes by category here depending on the link that brought me here
  const [filteredPerfumes, setFilteredPerfumes] = useState([]);




  // use effect runs functions that are kind of diconnected from the DOM
  useEffect(
    function () {
      // our disconnected function here is fetching data from the database
      async function fetchData() {
        // try catch to connect to DB
        try {
          // ask the server for data and wait
          const serverResponse = await axios.get(
            "http://localhost:5555/products"
          );

          // console.log(serverResponse);// the whole response is weird

          // log only the data and see your things
          // console.log(serverResponse.data);

          // log the array we need
          // console.log(serverResponse.data.products); // this is the array we need

          // set that array to the perfumes
          setPerfumes(serverResponse.data.products);



















          // Filter perfumes based on location.state.category
        if (location.state && location.state.category) {
          const filtered = serverResponse.data.products.filter(
            (perfume) => perfume.category === location.state.category
          );
          setFilteredPerfumes(filtered);
        } else {
          setFilteredPerfumes(serverResponse.data.products); // if no category filter is specified, show all perfumes
        }





































        } catch (error) {
          console.log("error");
        }
      }
      // after creating the fetchdata func USE IT to call the items
      fetchData();
    },
    [] // dependency array that tracks changes
  );

  // seeing whether the perfumes has changes
  // console.log("all perfumes");
  // console.log(perfumes);

  // sample object structure
  /*
   
  {
    _id: new ObjectId('66be9940fae11cde6065efde'),
    name: 'Chanel Bleu de Chanel',
    description: 'A woody aromatic fragrance for the man who defies convention.',
    category: 'men_category',
    localFileName: 'men7.jpg',
    gender: 'male',
    price: 85.99
  }
  
  */


  function cleanAndCapitalize(text) {
    // Remove '_category' from the text
    let cleanedText = text.replace('_category', '');
    // Capitalize the first letter
    cleanedText = cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1);
    return cleanedText;
}


  return (
    <div>
      <section className="categories men">
        <div className="categories-title">Top Selling for {cleanAndCapitalize(location.state.category)} </div>

        <div className="category-products">
          {filteredPerfumes.map(function (DBperfumeObject) {
            return (


              <Link
                key={DBperfumeObject._id}
                to="/single-product"
                state={{
                  id: DBperfumeObject._id,
                  name: DBperfumeObject.name,
                  description: DBperfumeObject.description,
                  price: DBperfumeObject.price,
                  category: DBperfumeObject.category,
                  localFileName: DBperfumeObject.localFileName,
                }}
              >




                <PerfumeCard
                  key={DBperfumeObject._id}
                  title={DBperfumeObject.name}
                  description={DBperfumeObject.description}
                  price={DBperfumeObject.price}
                  category={DBperfumeObject.category}
                  fileName={DBperfumeObject.localFileName}
                />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Perfumes;
