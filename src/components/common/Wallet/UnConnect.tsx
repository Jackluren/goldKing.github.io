import React, { FC } from 'react'

const Components: FC = () => {
  return (
    <div className="wallet-un-connect">
      钱包未连接， 请先连接钱包。
    </div>
  )
}

export default Components

export const auto = {
  name: 'WalletUnConnect',
  Components
}
