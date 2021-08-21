import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Overlay from './Overlay'
import isEqual from './utils'

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
    children: PropTypes.element,
    getPopupContainer: PropTypes.func,
    trigger: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ])
  }

  constructor(props){
    super(props)
    this.state = {
      triggerRect: {},
      exist: false,
      overlayStyle: {},
    }
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
    let triggerProps = {}
    
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
    return triggerProps
  }

  open = () => {
    this.setState(preState => {
      if(!isEqual(preState.triggerRect,this.getTriggerRect())) {
        return {
          triggerRect: this.getTriggerRect(),
          exist: true,
          overlayStyle: { ...this.setOverlayStyle(this.getTriggerRect()), opacity:1}
        }
      }
      return { overlayStyle: {...this.setOverlayStyle(preState.triggerRect),opacity:1 } }
    })
  }

  close = () => {
    this.setState(preState => {
      return {
        exist: !this.props.destroyTooltipOnHide,
        overlayStyle: {...this.setOverlayStyle(preState.triggerRect),opacity:0 } 

      }
    })
  }

  componentDidMount = () => {
    this.setState({
      triggerRect: this.getTriggerRect()
    })
  }

  handleMouseEnter = () => {
    this.open()
  }

  handleMouseLeave = () => {
    this.close()
  }

  setOverlayStyle = triggerRect => {
    const { placement } = this.props
    switch (placement) {
      case 'top' :
        return {
          ...this.state.overlayStyle,
          left: triggerRect.left + triggerRect.width / 2,
          top : triggerRect.top - triggerRect.height - 10,
          transform: 'translateX(-50%)',
        }
      case 'left' :
        return {
          ...this.state.overlayStyle,
          left: triggerRect.left,
          top : triggerRect.top + triggerRect.height / 2,
          transform: 'translate(-100%,-50%)',
        }
      case 'right' :
        return {
          ...this.state.overlayStyle,
          left: triggerRect.left + triggerRect.width,
          top : triggerRect.top + triggerRect.height / 2,
          transform: 'translateY(-50%)',
        }
      default :
        return {
          ...this.state.overlayStyle,
          left: triggerRect.left + triggerRect.width / 2,
          top : triggerRect.top + triggerRect.height,
          transform: 'translateX(-50%)',
        }
    }
  }

  getTriggerRect = () => {
    if(this.getRef().current) {
      return ReactDOM.findDOMNode(this.getRef().current).getBoundingClientRect()
    }
  }

  getRef = () => {
    if(this.props.children.ref) {
      return this.props.children.ref
    }
    return this.triggerRef
  }

  render() {
    const {title, children, getPopupContainer, overlayClassName } = this.props
    const triggerProps = this.getTriggerProps()
    return React.cloneElement(children, {ref: this.getRef(), ...triggerProps},
    [
      children.props.children,
      <Overlay
        exist={this.state.exist}
        key={title}
        placement={this.props.placement}
        title={title}
        overlayStyle={this.state.overlayStyle}
        getPopupContainer={getPopupContainer}
        overlayClassName={overlayClassName}
      >
      </Overlay>,
      ]
    )
  }











}