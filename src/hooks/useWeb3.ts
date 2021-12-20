import { useEffect, useState, useRef } from 'react'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { getWeb3NoAccount } from '@/utils/web3'

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
const useWeb3 = (): any => {
  const { library } = useWeb3React()
  const refEth = useRef(library)
  const [web3, setweb3] = useState(library != null ? new Web3(library) : getWeb3NoAccount())

  useEffect(() => {
    if (library !== refEth.current) {
      setweb3(library != null ? new Web3(library) : getWeb3NoAccount())
      refEth.current = library
    }
  }, [library])

  return web3
}

export default useWeb3
