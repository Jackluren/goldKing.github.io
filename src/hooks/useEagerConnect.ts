import { useEffect } from 'react'
import useAuth from './useAuth'
import { connectorLocalStorageKey, ConnectorNames } from '@/utils/web3React'

// 保持链接状态方法

const useEagerConnect = (): any => {
  const { login } = useAuth()
  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

    if (connectorId != null && connectorId !== ConnectorNames.BSC) {
      login(connectorId)
    }
  }, [login])
}

export default useEagerConnect
