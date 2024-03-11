// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Item from "../../components/Item/Item"; // Make sure to import the correct path

// const SearchResults = () => {
//   const [results, setResults] = useState([]);
//   const location = useLocation();
//   const query = new URLSearchParams(location.search).get("query");

//   // Fetch data based on the query (you may need to implement this)
//   useEffect(() => {
//     // Your logic to fetch data based on the query and update results state
//     // For example, you can use the same logic you used in the Header component
//   }, [query]);

//   return (
//     <div className="searchResults">
//       <section className="card-container">
//         {results.map((result) => (
//           <Item key={result.id} product={result} />
//         ))}
//       </section>
//     </div>
//   );
// };

// export default SearchResults;
