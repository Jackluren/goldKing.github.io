// 钱包连接按钮
import React, { FC, useState } from 'react'
import classNames from 'classnames'
import C from '@/components'
import { useWeb3React } from '@web3-react/core'
import useAuth from '@/hooks/useAuth'

const Components: FC<any> = ({ className }) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const accountEllipsis = account != null ? `${String(account).substring(0, 4)}...${String(account).substring(account.length - 4)}` : ''
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  return (
    <>
      {account != null ? (
        <button
          className={classNames(className)}
          onClick={() => {
            setShowAccountModal(true)
          }}
        >
          {accountEllipsis}
        </button>
      ) : (
        <button
          className={classNames(className)}
          onClick={() => {
            setShowConnectModal(true)
          }}
        >
          Connect
        </button>
      )}
      <C.WalletConnectModal show={showConnectModal} login={login} onClose={() => setShowConnectModal(false)} />
      <C.WalletAccountModal show={showAccountModal} logout={logout} onClose={() => setShowAccountModal(false)} account={account} />
    </>
  )
}

export default Components

export const auto = {
  name: 'WalletConnectButton',
  Components
}
