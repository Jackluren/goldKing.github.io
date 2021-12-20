import React, { FC } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { TouchScrollable } from 'react-scrolllock'

interface Props {
  show: boolean
  clickMaskClose?: boolean
  title?: string
  className?: string
  onClose: () => void
}

const WebModal: FC<Props> = ({ clickMaskClose = true, show = false, onClose, children, title = '标题', className }) => {
  const handleMaskClose = (): void => {
    if (clickMaskClose) {
      onClose()
    }
  }
  if (!show) return null
  return createPortal(
    <TouchScrollable>
      <div className={classNames('web-modal', className)}>
        <div className='web-modal-mask' onClick={handleMaskClose} aria-hidden="true"/>
        <div className='web-modal-body'>
          <header className='web-modal-body-header'>
            <span className="web-modal-body-header-close" onClick={() => onClose()}>关闭</span>
            <strong>{title}</strong>
          </header>
          <section className="web-modal-body-cont">
            {children}
          </section>
        </div>
      </div>
    </TouchScrollable>
    , document.body)
}

export default WebModal

export const auto = {
  name: 'WebModal',
  Components: WebModal
}
