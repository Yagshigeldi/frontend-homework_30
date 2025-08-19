import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "..";
import type { IData } from "../../types";

export const userKey = "userKey"

export const useUser = () => {
    const client = useQueryClient()

    const getUsers = () => useQuery({
        queryKey: [userKey],
        queryFn: () => api.get("user").then(res => res.data)
    })

    const getUserById = (id: string) => useQuery({
        queryKey: [userKey],
        queryFn: () => api.get(`user/${id}`).then(res => res.data)
    })

    const createUser = useMutation({
        mutationFn: (data: IData) => api.post("user", data),
        onSuccess: () => {
            client.invalidateQueries({queryKey: [userKey]})
        }
    })

    const deleteUser = useMutation({
        mutationFn: (id: string) => api.delete(`user/${id}`),
        onSuccess: () => {
            client.invalidateQueries({queryKey: [userKey]})
        }
    })

    const updateUser = useMutation({
        mutationFn: ({id, data}:{id:string, data:IData}) => api.patch(`user/${id}`, data),
        onSuccess: () => {
            client.invalidateQueries({queryKey: [userKey]})
        }
    })

    return {getUsers, getUserById, createUser, deleteUser, updateUser}
}