import Web3 from 'web3'
import { getTestContract } from '@/utils/contractHelpers'
import { makeAutoObservable, runInAction } from 'mobx'

// 定义测试数据存储类

class TestStore {
  // 定义数据
  name = ''

  constructor () {
    makeAutoObservable(this)
  }

  // 获取名字方法
  getName = async (account: string, web3: Web3): Promise<any> => {
    // 创建连接
    const contract = getTestContract(web3)
    // 获取名字
    const name = await contract.methods.getName().call()
    // 给全局变量赋值
    runInAction(() => {
      this.name = name
    })
  }

  // 设置名字方法
  setName = async (name: string, account: string, web3: Web3): Promise<any> => {
    // 创建连接
    const contract = getTestContract(web3)
    // 设置返回状态默认值
    let status: boolean = false
    // 向合约提交数据
    await contract.methods
      // 方法名，括号内为要给合约提供的数据
      .setName(name)
      // 发送给合约，带上自己的账号哈希值
      .send({ from: account })
      // 在获取返回信息后，将状态赋给前面定义的返回状态值
      // 也可以在这里进行更多操作
      .on('receipt', function (v: any) {
        status = v?.status
      })
      // 在异常时的处理
      .catch(() => null)

    // 如果返回状态为成功，则重新获取名字
    if (status) await this.getName(account, web3)
    // 返回状态给业务代码，判断执行情况
    return status
  }
}

export default new TestStore()
