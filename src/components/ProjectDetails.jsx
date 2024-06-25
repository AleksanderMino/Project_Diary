import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import MainLayout from "./Marketing";

const fetchProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/by_id/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Project not found");
    } else {
      throw new Error("An error occurred");
    }
  }
};

const updateProjectById = async (id, project) => {
  try {
    const response = await api.patch(`/projects/by_id/${id}`, project);
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while updating the project");
  }
};

const deleteProjectById = async (id) => {
  try {
    const response = await api.delete(`/projects/by_id/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while deleting the project");
  }
};

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedProject, setUpdatedProject] = useState({
    name: "",
    cost: "",
    date: "",
  });

  useEffect(() => {
    const getProject = async () => {
      try {
        const projectData = await fetchProjectById(id);
        setProject(projectData);
        setUpdatedProject({
          name: projectData.name,
          cost: projectData.cost,
          date: projectData.date,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [id]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProjectById(id, updatedProject);
      setProject(updatedProject);
      setEditMode(false);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${project.name}?`
    );
    if (confirmed) {
      setLoading(true);
      try {
        await deleteProjectById(id);
        navigate("/"); // Navigate to the projects list or another appropriate page
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
            <div className="text-blue-500 text-lg">Loading...</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="text-red-500">Error: {error}</div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <div>No project found.</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
          {editMode ? (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={updatedProject.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Cost:</label>
                <input
                  type="text"
                  name="cost"
                  value={updatedProject.cost}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={updatedProject.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </form>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
              <p className="text-gray-700 mb-4">{project.cost}</p>
              <p className="text-gray-500 text-sm">{project.date}</p>
              <button
                onClick={handleEditClick}
                className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default ProjectDetails;
