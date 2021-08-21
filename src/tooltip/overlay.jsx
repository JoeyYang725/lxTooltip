import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './overlay.css'

export default class Overlay extends React.Component {
  static defaultProps = {
    overlayClassName: '',
    trigger: 'hover',
    placement: 'bottom',
    title: '',
    overlayStyle: '',
    exist: false,
  }

  
  static propTypes = {
    overlayClassName: PropTypes.string,
    title: PropTypes.string,
    placement:PropTypes.string,
    getPopupContainer: PropTypes.func,
    overlayStyle: PropTypes.object,
    exist: PropTypes.bool,
    getPlacement:PropTypes.func,
  }

  constructor(props){
    super(props)
    this.state = {
      overlayStyle: {
        position: 'absolute',
        margin: 0,
      }
    }
  }

  
  render() {
    return (
      this.props.exist && ReactDOM.createPortal(
        (
          <div
          className={`lx-tooltip lx-tooltip-placement-${this.props.placement || 'bottom'} ${this.props.overlayClassName}`}
          style={{ ...this.state.overlayStyle, ...this.props.overlayStyle }}
          >
            <div className='lx-tooltip-content'>
              <div className='lx-tooltip-arrow'>
                <span className='lx-tooltip-arrow-content'></span>
              </div>
              <div className='lx-tooltip-inner' role='tooltip'>{this.props.title}</div>
            </div>
          </div>
          ),
          this.props.getPopupContainer()
      )
    )
  }



  
}