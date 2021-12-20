import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from '@/utils/web3'
// 导入地址
import { getTestAddress } from '@/utils/addressHelpers'
// 导入 ABI
import testAbi from '@/config/abi/testAbi.json'

// 创建连接公共函数
const getContract = (abi: any, address: string, web3?: Web3): any => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

// 导出测试合约连接
// 只要复制这个函数，修改一下参数，即可创建一个新的连接函数了。
export const getTestContract = (web3?: Web3): any => {
  return getContract(testAbi, getTestAddress(), web3)
}

// ...
