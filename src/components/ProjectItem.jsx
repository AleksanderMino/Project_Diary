import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api";

// Example data structure for table entries
// const exampleData = [
//   {
//     id: 1,
//     name: "Item One",
//     description: "This is the first item",
//     date: "2024-05-25",
//   },
//   {
//     id: 2,
//     name: "Item Two",
//     description: "This is the second item",
//     date: "2024-05-26",
//   },
//   // Add more entries as needed
// ];

const ItemList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating data fetch
    const fetchData = async () => {
      const response = await api.get("/projects/");
      console.log(response);
      console.log(response.data);
      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-700 mb-4">{item.description}</p>
            <p className="text-gray-500 text-sm">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
