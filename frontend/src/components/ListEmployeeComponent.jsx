import React, { useEffect, useState } from "react";
import { DeleteEmployee, ListEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    setIsLoading(true);
    ListEmployees()
      .then((response) => {
        setEmployees(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setIsLoading(false);
      });
  }

  function addNewEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function handleDeleteClick(id) {
    setDeleteId(id);
    setShowDeleteModal(true);
  }

  function confirmDelete() {
    DeleteEmployee(deleteId)
      .then((response) => {
        getAllEmployees();
        setShowDeleteModal(false);
        setDeleteId(null);
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        setShowDeleteModal(false);
      });
  }

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* THIS IS THE MISSING SECTION - Employee Directory Header */}
        <div className="page-header">
          <div className="header-left">
            <h2 className="page-title">Employee Directory</h2>
            <p className="page-subtitle">
              Manage your team members ({employees.length} total)
            </p>
          </div>
          <button className="btn btn-primary" onClick={addNewEmployee}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Employee
          </button>
        </div>

        <div className="search-bar">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="empty-state">
            <div className="spinner-large"></div>
            <h3>Loading employees...</h3>
          </div>
        ) : (
          <>
            <div className="employee-grid">
              {filteredEmployees.map((employee, index) => (
                <div
                  key={employee.id}
                  className="employee-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="employee-avatar">
                    {employee.firstName[0]}
                    {employee.lastName[0]}
                  </div>
                  <div className="employee-info">
                    <h3>
                      {employee.firstName} {employee.lastName}
                    </h3>
                    <p>{employee.email}</p>
                  </div>
                  <div className="employee-actions">
                    <button
                      className="btn-icon btn-edit"
                      title="Edit"
                      onClick={() => updateEmployee(employee.id)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      title="Delete"
                      onClick={() => handleDeleteClick(employee.id)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredEmployees.length === 0 && !isLoading && (
              <div className="empty-state">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <h3>No employees found</h3>
                <p>
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Get started by adding your first employee"}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button
                className="modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete this employee? This action
                cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEmployeeComponent;