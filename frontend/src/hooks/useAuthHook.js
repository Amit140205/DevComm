import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/api.js"

const useAuthHook = () => {
  const authUser = useQuery({
    queryKey:["authUser"],
    queryFn: getAuthUser,
    retry:false
  })

  return {isLoading : authUser.isLoading, authUser : authUser.data?.user}
}

export default useAuthHook