import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Accounts() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Viewer",
      password: "******",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Viewer",
      password: "******",
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Viewer", // Role fixed to "Viewer"
    password: "",
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.password) {
      setUsers([
        ...users,
        { id: Date.now(), ...newUser, password: "******" }, // Cache le mot de passe
      ]);
      console.log("New User Added:", newUser); // Affiche le mot de passe dans la console pour tests
      setNewUser({ name: "", email: "", role: "Viewer", password: "" });
    } else {
      alert("Please fill in all fields, including password.");
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarTrigger className="top-6 left-4 z-50 bg-transparent p-[4px] rounded-full shadow-lg" />

      <div className="flex-grow p-8 bg-gray-100 flex flex-col items-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Accounts</h1>
        <p className="text-lg mb-6 text-black">
          Share the view with specific people.
        </p>

        {/* Formulaire d'ajout d'utilisateur */}
        <div className="w-full max-w-4xl mb-8 bg-white shadow-lg p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Open an account</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </div>

        {/* Liste des utilisateurs */}
        <div className="w-full max-w-4xl bg-white shadow-lg p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">User List</h2>
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="p-4 border-t">{user.name}</td>
                  <td className="p-4 border-t">{user.email}</td>
                  <td className="p-4 border-t">{user.role}</td>
                  <td className="p-4 border-t text-center">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarProvider>
  );
}
