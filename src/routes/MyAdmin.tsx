import { useState } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/MyAdmin')({
  component: MyAdmin,
})

interface User {
  id: number
  name: string
  email: string
  clubname: string
  active: boolean
}

function MyAdmin() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      clubname: 'EHB Club',
      active: true,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      clubname: 'XYZ Club',
      active: false,
    },
  ])

  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    clubname: '',
    active: true,
  })

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.clubname) {
      setUsers([
        ...users,
        {
          id: Date.now(),
          name: newUser.name,
          email: newUser.email,
          clubname: newUser.clubname,
          active: newUser.active,
        },
      ])
      setNewUser({ name: '', email: '', clubname: '', active: true })
      alert('Utilisateur ajouté avec succès !')
    } else {
      alert('Veuillez remplir tous les champs.')
    }
  }

  const toggleUserStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    )
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarTrigger className="top-6 left-4 z-50 bg-transparent p-[4px] rounded-full shadow-lg" />

      <div className="w-screen flex flex-col min-h-screen bg-gray-900 text-sidebar-foreground">
        {/* Barre de navigation */}
        <nav className="bg-black text-white py-4 px-6 shadow-md">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold tracking-wide">MyAdmin</h1>
            <button className="px-4 py-2 bg-gray-900 hover:bg-red-600 text-white font-semibold rounded shadow">
              Déconnexion
            </button>
          </div>
        </nav>

        {/* Contenu principal */}
        <main className="flex-grow max-w-7xl mx-auto px-6 py-8">
          {/* Formulaire d'ajout d'utilisateur */}
          <section className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Ajouter un nouvel utilisateur
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
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
                placeholder="Nom du club"
                value={newUser.clubname}
                onChange={(e) =>
                  setNewUser({ ...newUser, clubname: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-white">Actif</label>
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
                className="px-4 py-2 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600"
              >
                Ajouter un utilisateur
              </button>
            </div>
          </section>

          {/* Liste des utilisateurs */}
          <section className="bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Liste des utilisateurs
            </h2>
            <table className="w-full border-collapse">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 text-left text-white">Nom</th>
                  <th className="p-4 text-left text-white">Email</th>
                  <th className="p-4 text-left text-white">Club</th>
                  <th className="p-4 text-center text-white">Statut</th>
                  <th className="p-4 text-center text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="p-4 border-t text-white">{user.name}</td>
                    <td className="p-4 border-t text-white">{user.email}</td>
                    <td className="p-4 border-t text-white">{user.clubname}</td>
                    <td className="p-4 border-t text-center">
                      <span
                        className={`px-3 py-1 rounded ${user.active
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                          }`}
                      >
                        {user.active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="p-4 border-t text-center">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-4 py-2 font-semibold rounded ${user.active
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                      >
                        {user.active ? 'Désactiver' : 'Activer'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </SidebarProvider>
  )
}
