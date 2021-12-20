// 导入地址文件，以及 TS 类型
import addresses from '@/config/constants/contract'
import { Address } from '@/config/constants/types'

// 获取地址公共函数
export const getAddress = (address: Address): string => {
  const mainNetChainId = 56
  const chainId = process.env.REACT_APP_CHAIN_ID ?? '97'
  return address[chainId] != null ? address[chainId] : address[mainNetChainId]
}

// 获取地址演示函数
export const getTestAddress = (): string => {
  return getAddress(addresses.test)
}

// ...
