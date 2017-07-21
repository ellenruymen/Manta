// Libs
import React, {Component} from 'react';
import sounds from '../../../libs/sounds.js';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../actions/form.jsx';

// Custom Component
import ItemRow from './ItemRow.jsx';

// Component
class ItemsList extends Component {
  // Before mounting
  componentWillMount = () => {
    const {rows} = this.props.currentReceipt;
    if (rows.length === 0) {
      this.addRow('muted');
    }
  };

  // Add A Row
  addRow = muted => {
    const {dispatch} = this.props;
    const addRow = bindActionCreators(ActionCreators.addItem, dispatch);
    addRow();
    // Play a sound
    if (muted !== 'muted') {
      sounds.play('ADD');
    }
  };

  // Remove A Row
  removeRow = rowId => {
    const {dispatch} = this.props;
    const removeRow = bindActionCreators(ActionCreators.removeItem, dispatch);
    removeRow(rowId);
    // Play a sound
    sounds.play('REMOVE');
  };

  // Update Row Data
  updateRow = childComponentState => {
    const {dispatch} = this.props;
    const updateRow = bindActionCreators(ActionCreators.updateItem, dispatch);
    updateRow(childComponentState);
  };

  // Clear everything
  clearCurrentItems = () => {
    const {dispatch} = this.props;
    const clearCurrentItems = bindActionCreators(
      ActionCreators.clearItems,
      dispatch,
    );
    clearCurrentItems();
    this.addRow();
  };

  // Save Receipt
  saveReceipt = () => {
    const saveData = this.props.saveData;
    const currentReceiptData = this.props.currentReceipt;
    saveData(currentReceiptData);
  };

  render = () => {
    const {rows} = this.props.currentReceipt;
    const rowsComponent = rows.map((item, index) => {
      return (
        <ItemRow
          key={item.id}
          item={item}
          actions={index === 0 ? false : true}
          updateRow={this.updateRow}
          removeRow={this.removeRow}
        />
      );
    });
    return (
      <div className="itemsListWrapper">
        <div className="itemsListHeader">
          <div className="itemLabelDescription">
            <label className="itemLabel">Description *</label>
          </div>
          <div className="itemLabelPrice">
            <label className="itemLabel">Price *</label>
          </div>
          <div className="itemLabelQuantity">
            <label className="itemLabel ">Quantity *</label>
          </div>
          <div className="itemLabelSubtotal">
            <label className="itemLabel ">Subtotal</label>
          </div>
        </div>
        <div className="itemsListDiv">
          {rowsComponent}
        </div>
        <div className="itemsListActions">
          <a href="#" className="btn btn-primary" onClick={() => this.addRow()}>
            Add A Row
          </a>
        </div>
      </div>
    );
  };
}

export default connect(state => ({
  currentReceipt: state.FormReducer,
}))(ItemsList);
