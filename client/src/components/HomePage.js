import React, { useEffect, useState } from "react";
import { PerfumeCardCategory } from "./PerfumeCard";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  // this is the part that needs the DB so we call it right here
  // set states for incoming data
  const [categories, setCategories] = useState([]); // initial is an array that receives the objects

  // use effect runs functions that are kind of diconnected from the DOM
  useEffect(function () {
    // our disconnected function here is fetching data from the database
    async function fetchCategories() {
      // try catch to connect to DB
      try {
        // ask the server for data and wait
        const serverResponse = await axios.get(
          "http://localhost:5555/categories"
        );

        // console.log(serverResponse);// the whole response is weird

        // log only the data and see your things
        // console.log(serverResponse.data);

        // log the array we need
        // console.log(serverResponse.data.products); // this is the array we need

        // set that array to the perfumes
        setCategories(serverResponse.data.data);
      } catch (error) {
        console.log("error");
      }
    }
    // after creating the fetchdata func USE IT to call the items
    fetchCategories();
  }, []);

  return (
    <section className="categories">
      <div id="categories-start" className="categories-title">
        Top Categories
      </div>
      <div className="category-products">
        {categories.map(function (category) {
          return (


          <Link
            to = "/perfumes"
            key = {category._id}
            state={{
              category: category.category,
            }}
          > 





            <PerfumeCardCategory
              key={category._id}
              title={category.categoryName}
              description={category.categoryDescription}
              category={category.category}
              fileName={category.localFileName}
            />


          </Link> 
          





          );
        })}
      </div>
    </section>
  );
}

export default HomePage;
