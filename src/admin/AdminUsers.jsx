import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminUsers = () => {
  return (
    <div style={{ paddingBottom: "70px", paddingTop: "20px", fontFamily: "'Gendy', cursive" }} className="container">
      <h3 className="mb-4">Manage Users</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ali Ahmad</td>
            <td>ali@example.com</td>
            <td>User</td>
            <td>
              <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
              <button className="btn btn-sm btn-outline-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <AdminNavbar />
    </div>
  );
};

export default AdminUsers;
