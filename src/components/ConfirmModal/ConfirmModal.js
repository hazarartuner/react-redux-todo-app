import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './ConfirmModal.scss';

const modalRoot = document.getElementById('modal-root');

class ConfirmModal extends PureComponent {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  render() {
    const { title, message, onAccept, onReject } = this.props;

    return ReactDOM.createPortal(
      <div className="confirm-modal__component">
        <div className="modal-contents">
          <div className="modal-title">{title}</div>
          <p className="modal-message">{message}</p>
          <div className="modal-buttons">
            <button type="button" className="accept" onClick={onAccept}>
              Confirm
            </button>
            <button type="button" className="reject" onClick={onReject}>
              Cancel
            </button>
          </div>
        </div>
      </div>,
      this.el,
    );
  }
}

ConfirmModal.propTypes = {
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

ConfirmModal.defaultProps = {
  onAccept: null,
  onReject: null,
};

export default ConfirmModal;
