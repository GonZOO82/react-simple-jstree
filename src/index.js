import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'jstree/dist/jstree.min';
import 'jstree/dist/themes/default/style.css';

class TreeView extends Component {

  static propTypes = {
    treeData: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onRename: PropTypes.func,
    onDelete: PropTypes.func,
    onMove: PropTypes.func,
    onLoad: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => false,
    onRename: () => false,
    onDelete: () => false,
    onMove: () => false,
    onLoad: () => false,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.treeData !== this.props.treeData;
  }

  componentDidMount() {
    const { treeData } = this.props;
    if (treeData) {
      $(this.treeContainer).jstree(treeData);
      $(this.treeContainer).on('changed.jstree', (e, data) => {
        this.props.onChange(e, data);
      });
      $(this.treeContainer).on('rename_node.jstree', (e, data) => {
        this.props.onRename(e, data);
      });
      $(this.treeContainer).on('delete_node.jstree', (e, data) => {
        this.props.onDelete(e, data);
      });
      $(this.treeContainer).on('move_node.jstree', (e, data) => {
        this.props.onMove(e, data);
      });
      $(this.treeContainer).on('loaded.jstree', (e, data) => {
        this.props.onLoad(e, data);
      });
    }
  }

  refresh() {
    $(this.treeContainer).jstree('refresh');
  }

  componentDidUpdate() {
    const { treeData } = this.props;
    if (treeData) {
      $(this.treeContainer).jstree(true).settings = treeData;
      $(this.treeContainer).jstree(true).refresh();

    }
  }

  render() {
    return (
      <div ref={div => this.treeContainer = div} />
    );
  }
}

export default TreeView;
