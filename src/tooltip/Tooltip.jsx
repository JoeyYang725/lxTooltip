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

}