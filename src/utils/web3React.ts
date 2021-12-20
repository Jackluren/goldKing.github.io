import Web3 from 'web3'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { IRPCMap } from '@walletconnect/types'
import { AbiItem } from 'web3-utils'

import { Address } from '@/config/types'

import getNodeUrl from '@/utils/getRpcUrl'
import web3NoAccount from '@/utils/web3'

export const connectorLocalStorageKey = 'connectorId'

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  BSC = 'bsc',
}

const rpcUrl = getNodeUrl()

const chainId: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '66')

export const injected = new InjectedConnector({
  supportedChainIds: [66, 97]
})

export const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl } as IRPCMap,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
})

export const bscConnector = new BscConnector({ supportedChainIds: [66] })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector
}

export const getLibrary = (provider: any): Web3 => {
  return provider
}

// 获取地址公共函数
export const getAddress = (address: Address): string => {
  const mainNetChainId = 66
  const chainId = process.env.REACT_APP_CHAIN_ID ?? '66'
  return address[chainId] != null ? address[chainId] : address[mainNetChainId]
}

// 创建连接公共函数
export const getContract = (abi: any, address: string, web3?: Web3): any => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}
