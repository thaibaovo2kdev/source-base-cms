import { queryClient } from '@/Provider'
import { getCurrentUserAPI, userLoginAPI } from '@/services/apis/auth-api'
import { IPayload } from '@/services/apis/type'
import { getUserDataStorage, removeUserDataStorage, setUserDataStorage } from '@/services/storage'
import { useMutation, useQuery } from '@tanstack/react-query'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'

interface ILoginResponse {
  token: string
  user: any
}

export const useAuth = () => {
  const navigate = useNavigate()

  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isFetching: isCurrentUserFetching,
    isError: isCurrentUserError,
    isFetched: isCurrentUserFetched,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const data = await getCurrentUserAPI()
        const prevData = getUserDataStorage()
        const userData = { ...prevData, ...data.data }

        setUserDataStorage(userData)
        return userData
      } catch (error) {
        removeUserDataStorage()
        console.error('error', error)
      }
    },
    initialData: getUserDataStorage(),
  })

  const loginMutation = useMutation<ILoginResponse | any, Error, IPayload>({
    mutationFn: async (payload: IPayload) => await userLoginAPI(payload),
    onError: (error: Error) => {
      notification.error({
        message: (error as any)?.data?.error?.message || error.message,
      })
      console.error('err', error)
    },
    onSuccess: (data: ILoginResponse) => {
      setUserDataStorage(data)
      queryClient.setQueryData(['currentUser'], data)
      navigate('/')
      notification.success({
        message: 'Logged in successfully',
      })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      removeUserDataStorage()
    },
    onSuccess: () => {
      queryClient.setQueryData(['currentUser'], null)
      navigate('/auth/login')
      notification.success({
        message: 'Logged out successfully',
      })
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Logout failed',
        description: error.message,
      })
      console.error('Logout error', error)
    },
  })

  return {
    currentUser,
    isCurrentUserLoading,
    isCurrentUserFetched,
    isCurrentUserError,
    isCurrentUserFetching,
    loginMutation,
    logoutMutation,
    isLoggedIn: !!currentUser,
  }
}
