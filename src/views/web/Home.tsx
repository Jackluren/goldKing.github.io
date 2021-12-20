import React, { FC } from 'react'
import C from '@/components'
import { useWeb3React } from '@web3-react/core'

const Home: FC = () => {
  const { account } = useWeb3React()

  return (
    <div className="home">
      <C.WalletConnectButton />
      {
        account != null
          ? <C.HomeTextName account={account} />
          : <C.WalletUnConnect />
      }
    </div>
  )
}

export default Home
