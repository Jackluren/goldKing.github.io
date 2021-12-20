import React, { FC, useEffect } from 'react'
import TestStore from '@/stores/testStore'
import useWeb3 from '@/hooks/useWeb3'
import { observer } from 'mobx-react-lite'

interface Props {
  account: string
}

const Components: FC<Props> = ({ account }) => {
  // 从 TestStore 中获取值和方法
  const { name, getName, setName } = TestStore
  const web3 = useWeb3()

  // 组件创建时，执行获取名字方法
  useEffect(() => {
    const getFetchData = async (): Promise<any> => {
      await getName(account, web3)
    }

    void getFetchData()
  }, [account, getName, name, web3])

  // 修改名字函数，可以在执行链上数据前，和执行后的不同结果，赋予不同的状态
  const doSetName = async (): Promise<any> => {
    console.log('loading')
    const status: boolean = await setName(`FungLeo${+new Date()}`, account, web3)
    if (status) {
      console.log('success')
    } else {
      console.log('error')
    }
  }

  return (
    <div className="home-test-name">
      用户昵称：{name}
      <br/>
      <br/>
      <button onClick={doSetName}>修改名称</button>
    </div>
  )
}

// 要监控数据变化，加上 observer 函数包裹
export default observer(Components)

export const auto = {
  name: 'HomeTextName',
  Components: observer(Components)
}
