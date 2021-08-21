import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Overlay from './Overlay'
import {isEqual, assert} from './utils'

export default class Tooltip extends React.Component{
  static defaultProps = {
    overlayClassName: '',
    trigger: 'hover',
    placement: 'bottom',
    title: '',
    destroyTooltipOnHide: false,
    getPopupContainer: () => document.body,
  }

  static propTypes = {
    destroyTooltipOnHide: PropTypes.bool,
    overlayClassName: PropTypes.string,
    title:PropTypes.string,
    placement: PropTypes.string,
    visible: PropTypes.bool,
    children: PropTypes.element,
    getPopupContainer: PropTypes.func,
    trigger: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ])
  }

  triggerRef = React.createRef()

  getChildProps() {
    return this.props.children.props
  }

  handleMouseEnter = e => {
    this.getChildProps().onMouseEnter?.(e)
    this.open()
  }

  handleMouseLeave = e => {
    this.getChildProps().onMouseLeave?.(e)
    this.close()
  }

  handleClick = e => {
    this.getChildProps().onClick?.(e)
    if(this.state.overlayStyle.opacity ===1){
      this.close()
    }else{
      this.open()
    } 
  }

  handleFocus = e => {
    this.getChildProps().onFocus?.(e)
    this.open()
  }

  handleBlur = e => {
    this.getChildProps().onBlur?.(e)
    this.close()
  }

  getTriggerProps = () => {
    const trigger  = this.props.trigger
    let triggerProps
    
    if(this.getRef().current) {
      if(trigger.indexOf('hover') !== -1){
        triggerProps = Object.assign(triggerProps, {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onClick: this.handleClick,
        })
      }
      if(trigger.indexOf('click') !== -1){
        triggerProps = Object.assign(triggerProps, {
          onMouseLeave: this.handleMouseLeave,
          onClick: this.handleClick,
          onBlur: this.handleBlur,
        })
      }
      if(trigger.indexOf('focus') !== -1){
        triggerProps = Object.assign(triggerProps, {
          onFocus: this.handleFocus,
          onBlur:this.handleBlur,
        })
      }
    }
  }
}