// 钱包连接弹框
import React, { FC } from 'react'
import C from '@/components'
import { connectorLocalStorageKey, ConnectorNames } from '@/utils/web3React'

const connectorsData = [
  {
    title: 'Metamask',
    connectorId: ConnectorNames.Injected
  },
  {
    title: 'TokenPocket',
    connectorId: ConnectorNames.Injected
  },
  {
    title: 'TrustWallet',
    connectorId: ConnectorNames.Injected
  },
  {
    title: 'WalletConnect',
    connectorId: ConnectorNames.WalletConnect
  },
  {
    title: 'MathWallet',
    connectorId: ConnectorNames.Injected
  },
  {
    title: 'Binance Chain Wallet',
    connectorId: ConnectorNames.BSC
  }
]

const Components: FC<any> = ({ show, login, onClose, className }) => {
  const connectWallet = (connectorId: any): void => {
    login(connectorId)
    window.localStorage.setItem(connectorLocalStorageKey, connectorId)
    window.location.reload()
    onClose()
  }
  return (
    <C.WebModal title="连接钱包" show={show} onClose={onClose}>
      <ul>
        {
          connectorsData.map((item, index) => {
            return (
              <li key={index} onClick={() => connectWallet(item.connectorId)}>{item.title}</li>
            )
          })
        }
      </ul>
    </C.WebModal>
  )
}

export default Components

export const auto = {
  name: 'WalletConnectModal',
  Components
}
