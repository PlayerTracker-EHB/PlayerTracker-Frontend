import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Trash } from 'lucide-react';
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import useAuthStore from '@/store/authStore';
import { createUser, deleteUser, getUsersByTeamId } from '@/lib/api/team';
import { toast } from '@/hooks/use-toast';

export const Route = createFileRoute('/_auth/_admin/admin/Accounts')({
  component: Accounts,
});

function Accounts() {
  const { user } = useAuthStore();
  const teamId = user?.teamId as number;
  const queryClient = useQueryClient();

  const { data: users } = useQuery(getUsersByTeamId(teamId));

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
    teamId: teamId,
  });

  const createUserMutation = useMutation({
    mutationFn: createUser.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })

      toast({
        title: "User Successfully Created",
        description: "You have just created the User: " + newUser.fullName,
      })
      setNewUser({ fullName: "", email: "", password: "", teamId: teamId });

    },
    onError: (error) => {
      console.error("Failed to create player:", error)
      toast({
        variant: "destructive",
        title: "Error While Creating Player",
        description: "There was an error while creating the player, Please try again later",
      })
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser.mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })

      toast({
        title: "User Deleted Successfully",
        description: "You have just deleted a user",
      })

    },
    onError: (error) => {
      console.error("Failed to delete user:", error)
      toast({
        title: "Error While Deleting User",
        description: "There was an error while deleting the user, Please try again later",
      })

    },
  })



  function handleAddUser() {
    createUserMutation.mutate(newUser);

  }

  const handleDeleteUser = (userId: number) => {
    deleteUserMutation.mutate(userId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Account</h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Formulaire d'ajout */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-8 border border-gray-200 mt-60"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold flex items-center mb-4">
              <User className="h-6 w-6 text-gray-600 mr-2" /> Add New User
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  value={newUser.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-gray-600 focus:ring-gray-600"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-gray-600 focus:ring-gray-600"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:border-gray-600 focus:ring-gray-600"
                />
              </div>

              <motion.button
                onClick={handleAddUser}
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-lg transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add User
              </motion.button>
            </div>
          </motion.div>

          {/* Liste des utilisateurs sous forme de cartes */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-8 border border-gray-200 mt-60"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4">User List</h2>
            <div className="space-y-4">
              {users && users.map((user, index) => (
                <motion.div
                  key={user.id}
                  className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border border-gray-300 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{user.fullName}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <motion.button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 rounded-lg bg-gray-200 hover:bg-red-500 text-gray-600 hover:text-white transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash className="h-5 w-5" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Accounts;

