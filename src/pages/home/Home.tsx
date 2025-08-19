import { memo } from 'react';
import { useUser } from '../../api/hooks/useUser';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../lib';
import { useNavigate } from 'react-router-dom';
import { udpatingValues } from '../../lib/features/userControl';
import type { IFormData } from '../../types';
import { Pencil, Trash2 } from 'lucide-react';

const Home = () => {
  const {deleteUser, getUsers} = useUser()
  const {data} = getUsers()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.value)
  const navigate = useNavigate()

  const handleDelete = (id: string) => {
        if (user?.id == id) {
            dispatch(udpatingValues(null))
        } deleteUser.mutate(id)
      }

    const handleUpdate = (user: IFormData) => {
        dispatch(udpatingValues(user))
        navigate('/user')
    }

  return (
    <div className="min-h-screen bg-[#D3D6F9] flex items-center justify-center p-6 dark:bg-slate-800">
      <table className="table-auto rounded-md overflow-hidden shadow-lg">
        <thead className="bg-[#6D7AE0] text-white">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Username</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Password</th>
            <th className="px-6 py-4">Phone number</th>
            <th className="px-6 py-4">Gender</th>
            <th className="px-6 py-4">Update</th>
            <th className="px-6 py-4">Delete</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {
            data?.map((user: IFormData, index: number) => (
          <tr key={index} className="bg-white">
            <td className="py-4">{index + 1}</td>
            <td className="py-4">{user.fullName}</td>
            <td className="py-4">{user.username}</td>
            <td className="py-4">{user.email}</td>
            <td className="py-4">{user.password}</td>
            <td className="py-4">{user.phoneNumber}</td>
            <td className="py-4">{user.gender}</td>
            <td className="py-4"><button onClick={() => handleUpdate(user)}><Pencil /></button></td>
            <td className="py-4"><button onClick={() => handleDelete(user.id || '')}><Trash2 /></button></td>
          </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(Home);
