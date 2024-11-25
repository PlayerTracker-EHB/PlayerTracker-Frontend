import React, { useState } from "react";

export default function MyAdmin() {
  // États pour gérer les utilisateurs
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      clubname: "EHB Club", // Champ clubname
      active: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      clubname: "XYZ Club", // Champ clubname
      active: false,
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    clubname: "", // Ajout du champ clubname
    active: true,
  });

  // Fonction pour ajouter un utilisateur
  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.clubname) {
      setUsers([
        ...users,
        {
          id: Date.now(),
          name: newUser.name,
          email: newUser.email,
          clubname: newUser.clubname, // Ajouter le clubname
          active: newUser.active,
        },
      ]);
      setNewUser({ name: "", email: "", clubname: "", active: true });
      alert("User added successfully!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Fonction pour activer/désactiver un utilisateur
  const toggleUserStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  // Rendu principal du composant
  return (
    <div className="w-screen flex flex-col min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 text-sidebar-foreground">
      {/* Barre de navigation */}
      <nav className="bg-blue-800 text-white py-4 px-6 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold tracking-wide">
            MyAdmin Dashboard
          </h1>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow">
            Logout
          </button>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-8">
        {/* Formulaire d'ajout d'utilisateur */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            Add New User
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Club Name"
              value={newUser.clubname}
              onChange={(e) =>
                setNewUser({ ...newUser, clubname: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Active</label>
              <input
                type="checkbox"
                checked={newUser.active}
                onChange={(e) =>
                  setNewUser({ ...newUser, active: e.target.checked })
                }
                className="w-5 h-5"
              />
            </div>
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
              Add User
            </button>
          </div>
        </section>

        {/* Liste des utilisateurs */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">User List</h2>
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Club</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="p-4 border-t">{user.name}</td>
                  <td className="p-4 border-t">{user.email}</td>
                  <td className="p-4 border-t">{user.clubname}</td>
                  <td className="p-4 border-t text-center">
                    <span
                      className={`px-3 py-1 rounded ${
                        user.active
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 border-t text-center">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-4 py-2 font-semibold rounded ${
                        user.active
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {user.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
