// 返回 钱包登录登出函数

import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector
} from '@web3-react/walletconnect-connector'
import { setupNetwork } from '@/utils/wallet'
import { connectorLocalStorageKey, ConnectorNames, connectorsByName } from '@/utils/web3React'

const useAuth = (): any => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID]
    if (connector != null) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup: boolean = await setupNetwork()
          if (hasSetup) {
            await activate(connector)
          }
        } else {
          window.localStorage.removeItem(connectorLocalStorageKey)
          if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector
              walletConnector.walletConnectProvider = null
            }
          } else {
          }
        }
      }).catch(() => {})
    } else {
      console.error("Can't find connector", 'The connector config is wrong')
    }
  }, [activate])

  return { login, logout: deactivate }
}

export default useAuth
