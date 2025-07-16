import React, { useEffect, useState } from "react";
import PerfumeCard from "./PerfumeCard";
import { Link } from "react-router-dom";
import axios from "axios";

function Perfumes() {
  const [perfumes, setPerfumes] = useState([]); // All perfumes
  const [filteredPerfumes, setFilteredPerfumes] = useState([]); // Filtered perfumes
  const [category, setCategory] = useState("men_category"); // Default category

  useEffect(() => {
    async function fetchData() {
      try {
        const serverResponse = await axios.get(
          "http://localhost:5555/products"
        );
        const allPerfumes = serverResponse.data.products;
        setPerfumes(allPerfumes);
        filterByCategory(allPerfumes, category); // Filter perfumes by initial category
      } catch (error) {
        console.log("error");
      }
    }
    fetchData();
  }, []); // Fetch data only once on component mount




  // Function to filter perfumes by selected category
  function filterByCategory(perfumes, selectedCategory) {
    const filtered = perfumes.filter(
      (perfume) => perfume.category === selectedCategory
    );
    setFilteredPerfumes(filtered);
  }

  // Handler for category change
  function handleCategoryChange(newCategory) {
    setCategory(newCategory);
    filterByCategory(perfumes, newCategory); // Filter based on new category
  }

  return (
    <div>
      <section className="categories">
        <div className="categories-title">Top Selling Perfumes</div>

        <div className="category-products">
          {filteredPerfumes.map((DBperfumeObject) => (
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
                title={DBperfumeObject.name}
                description={DBperfumeObject.description}
                price={DBperfumeObject.price}
                category={DBperfumeObject.category}
                fileName={DBperfumeObject.localFileName}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Perfumes;
