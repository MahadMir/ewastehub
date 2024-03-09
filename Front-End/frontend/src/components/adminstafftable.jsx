import React from "react";
import axios from "axios";

const AdminStaffTable = ({ staffList }) => {
  const handleRoleChange = (id) => {
    
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => {
            const orderRoles = (role) => {
                const roleList = ["admin", "customer", "staff"];
                const currentStaffRole = roleList.filter((roleMem)=>{
                    if (role === roleMem){
                        return false
                    }
                    else{
                        return true
                    }
                })

                return currentStaffRole
                
            };

            let roles = [staff.role, ...orderRoles(staff.role)]

            return (
              <tr>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>
                  <select className="select w-full max-w-xs">
                    {
                        roles.map((role)=>{
                            return(<option>{role}</option>)
                        })
                    }
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStaffTable;
