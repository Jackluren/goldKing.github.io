import Web3 from 'web3'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { IRPCMap } from '@walletconnect/types'
import getNodeUrl from './getRpcUrl'

export const connectorLocalStorageKey = 'connectorId'

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  BSC = 'bsc',
}

const rpcUrl = getNodeUrl()

const chainId: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '56')

export const injected = new InjectedConnector({
  supportedChainIds: [56, 97]
})

export const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl } as IRPCMap,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
})

export const bscConnector = new BscConnector({ supportedChainIds: [56] })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector
}

export const getLibrary = (provider: any): Web3 => {
  return provider
}
