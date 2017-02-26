import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => ({
  actionToDispatch: (payload, action) => dispatch(action(payload)),
});

const mapStateToProps = state => ({

});

class Modal extends Component {

  constructor(props) {
    super(props);
    this.handleAction = this.handleAction.bind(this);
  }

  handleAction(e) {
    // e.preventDefault();
    console.log(this.props.id);
    console.log(this.props.action);
    this.props.actionToDispatch(this.props.id, this.props.action);
  }

  render() {
    return (
      <div className="modal" id={'modal' + this.props.id} tabIndex="-1" role="dialog" aria-labelledby={'label' + this.props.id}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header danger">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id={'label' + this.props.id}>Delete question</h4>
            </div>
            <div className="modal-body">
              <p>{this.props.id}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this.handleAction} data-dismiss="modal">Continue</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
