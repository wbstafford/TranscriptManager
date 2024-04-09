import { user } from "../entities/User";
import APIClient from "../services/api-client";
import { useQuery } from "react-query";

const apiClient = new APIClient<user>('/user');

const useUser = (email: string) => useQuery({
    queryKey: ['user', email],
    queryFn: () => apiClient.get(email)
})

export default useUser;