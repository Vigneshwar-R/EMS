import React, { useEffect, useState } from "react";
import {
  CreateEmployees,
  getEmployee,
  UpdateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const navigator = useNavigate();
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    if (errors.firstName) {
      setErrors((prev) => ({ ...prev, firstName: "" }));
    }
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    if (errors.lastName) {
      setErrors((prev) => ({ ...prev, lastName: "" }));
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        errorsCopy.email = "";
      } else {
        errorsCopy.email = "Please enter a valid email address";
        valid = false;
      }
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const SaveOrUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      setIsSubmitting(true);

      if (id) {
        UpdateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            setIsSubmitting(false);
            navigator("/employees");
          })
          .catch((error) => {
            console.error("Error updating employee:", error);
            setIsSubmitting(false);
          });
      } else {
        CreateEmployees(employee)
          .then((response) => {
            console.log(response.data);
            setIsSubmitting(false);
            navigator("/employees");
          })
          .catch((error) => {
            console.error("Error adding employee:", error);
            setIsSubmitting(false);
          });
      }
    }
  };

  const pageTitle = () => {
    if (id) {
      return "Update Employee";
    } else {
      return "Add New Employee";
    }
  };

  const pageSubtitle = () => {
    if (id) {
      return "Update the employee information below";
    } else {
      return "Fill in the details below to add a new team member";
    }
  };

  return (
    <div className="page-container">
      <div className="form-wrapper">
        <div className="form-container">
          <div className="form-header">
            <h2>{pageTitle()}</h2>
            <p>{pageSubtitle()}</p>
          </div>

          <form className="employee-form" onSubmit={SaveOrUpdateEmployee}>
            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleFirstName}
                className={errors.firstName ? "error" : ""}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleLastName}
                className={errors.lastName ? "error" : ""}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmail}
                className={errors.email ? "error" : ""}
                placeholder="Enter email address"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigator("/employees")}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    {id ? "Update Employee" : "Save Employee"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;