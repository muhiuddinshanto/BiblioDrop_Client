"use client";

import React, { useState } from "react";

import { userDelete, userRoleUpdate } from "@/lib/actions/users";
import UserManagementTable from "./UserManagementTable";
import toast from "react-hot-toast";

export default function UserClientWrapper({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = async (id, newRole) => {
    try {
      const updatedUser = await userRoleUpdate(id, newRole);
      if (updatedUser?.modifiedCount > 0) { 
        toast.success("User role updated successfully!");
      }
      
      setUsers(prev => prev.map(user => 
        (user._id || user.id) === id ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const handleUserDelete = async (id) => {
    if (confirm("Are you absolutely sure you want to permanently delete this account? This action cannot be undone.")) {
      try {
        const userDeleted = await userDelete(id, { status: "Rejected" });
        if (userDeleted?.deletedCount > 0) { 
          toast.success("User account deleted successfully!");
        }
        
        setUsers(prev => prev.filter(user => (user._id || user.id) !== id));
      } catch (error) {
        console.error("Failed to delete user account:", error);
      }
    }
  };

  return (
    <UserManagementTable 
      users={users} 
      isLoading={loading} 
      onChangeRole={handleRoleChange} 
      onDelete={handleUserDelete} 
    />
  );
}
