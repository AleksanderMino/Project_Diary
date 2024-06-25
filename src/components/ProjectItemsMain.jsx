import React, { useState, useEffect } from "react";
import AddButton from "./Button";
import SearchBar from "./SearchBar";
import api from "../api";
import { useNavigate } from "react-router-dom";
import MainLayout from "./Marketing";

const ItemList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newProject, setNewProject] = useState({
    name: "",
    cost: 0,
    date: "",
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await api.get("/projects/");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/projects/", newProject);
      fetchData();
      setFormVisible(false);
      setNewProject({ name: "", cost: 0, date: "" });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const showPopup = (id) => {
    navigate(`/projects/id/${id}`);
  };

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="w-full container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Projects</h1>
          <SearchBar
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            suggestions={data}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {filteredData.map((item) => (
              <div
                key={item.id}
                onClick={() => showPopup(item.id)}
                className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-600 mb-4">Cost: ${item.cost}</p>
                <p className="text-gray-500 text-sm">Date: {item.date}</p>
              </div>
            ))}
          </div>
          {formVisible && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add New Project</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newProject.name || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Cost:</label>
                  <input
                    type="number"
                    name="cost"
                    value={newProject.cost || ""}
                    placeholder="0"
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) => (e.target.placeholder = "0")}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Date:</label>
                  <input
                    type="date"
                    name="date"
                    value={newProject.date || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Create
                </button>
              </form>
            </div>
          )}
          <div className="flex justify-center">
            <AddButton onClick={toggleForm} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ItemList;
