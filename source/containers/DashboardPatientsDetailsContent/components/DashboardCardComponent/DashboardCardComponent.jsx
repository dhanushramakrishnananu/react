import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import classNames from 'classnames';

import ExpandIcon from '../../../../assets/icons/ExpandIcon.jsx';
import NarrowIcon from '../../../../assets/icons/NarrowIcon.jsx';
import AddIcon from '../../../../assets/icons/AddIcon.jsx';
import DeleteIcon from '../../../../assets/icons/DeleteIcon.jsx';
import EditIcon from '../../../../assets/icons/EditIcon.jsx';
import ThreeDotIcon from '../../../../assets/icons/ThreeDotIcon.jsx';

import './DashboardCardComponent.scss';

const cardSource = {
    beginDrag(props) {
        return {
            props: props,
            index: props.index
        };
    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Get horizontal middle
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Get pixels to the left
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        const upwards = dragIndex > hoverIndex && hoverClientY > hoverMiddleY;
        const downwards = dragIndex < hoverIndex && hoverClientY < hoverMiddleY;
        const leftwards = dragIndex > hoverIndex && hoverClientX > hoverMiddleX;
        const rightwards = dragIndex < hoverIndex && hoverClientX < hoverMiddleX;

        if (upwards && (leftwards || rightwards)) {
            return;
        }

        if (downwards && (leftwards || rightwards)) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

class DashboardCardComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
            isEditing: false,
            displayMoreIcon: false
        };

        this.toggleExpand = this.toggleExpand.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.isExpanded !== this.state.isExpanded) {
            this.toggleExpand(newProps.isExpanded);
        }

        if (newProps.isEditing !== this.state.isEditing) {
            this.setState({
                isEditing: newProps.isEditing
            });
        }
    }

    toggleExpand(value) {
        const { onExpandToggle } = this.props;

        if (onExpandToggle) {
            onExpandToggle(value);
        }

        this.setState({
            isExpanded: value
        });
    }

    onEditClick(value) {
        if(this.props.title === 'Patient details' ) {
            this.setState({
                isEditing: value
            });

            this.props.onEditClick(value);

            if (value) {
                this.toggleExpand(true);
            }
        } else {
            this.props.editItem();
        }
    }

    displayMoreIcon = () => {
        this.setState({
            displayMoreIcon: !this.state.displayMoreIcon
        });
    };

    render() {
        const { flex, isDragging, connectDragSource,
            connectDropTarget, title,
            count, noadded, onSaveClick,
            addItem, editItem, deleted, noEditing,
            deleteItem, customEdit, deleteItemId, 
            openDeletePopUp, selectedItemData,
            addNewItem, editNewItem, voidTransaction } = this.props;
            
        const { isExpanded, isEditing, displayMoreIcon } = this.state;

        const cardClasses = classNames({
            [`dashboard-card-component dashboard-card-component_flex-${flex}`]: true,
            expanded: isExpanded
        });

        return connectDropTarget(
            <div className={cardClasses} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'arrow' }}>
                {connectDragSource(
                    <div className="dashboard-card-component_header">
                        <div className="dashboard-card-component_header-title">
                            {title}
                            {Boolean(count) &&
                            <div className="dashboard-card-component_header-title_counter">{count}</div>
                            }
                        </div>
                        <div className="dashboard-card-component_header-tools">
                            {!noadded &&
                            <button className="dashboard-card-component_header-tools-add icon-button" onClick={addItem}>
                                <AddIcon />
                            </button>
                            }
                            {!noadded && title === 'Post Payment' && displayMoreIcon &&
                            <button className="dashboard-card-component_header-tools-add icon-button" title={'Add Invoice'} onClick={addNewItem}>
                                <AddIcon />
                            </button>
                            }
                            {!noadded && title === 'Post Payment' && displayMoreIcon &&
                            <button className="dashboard-card-component_header-tools-add icon-button" title={'Void Transaction'} onClick={voidTransaction}>
                                <AddIcon />
                            </button>
                            }
                            {isEditing &&
                            <div className="dashboard-card-component_header-tools-container">
                                <button onClick={() => this.onEditClick(false)} className="cancel">Cancel</button>
                                <button onClick={onSaveClick} className="save">Save</button>
                            </div> ||
                            <div className="dashboard-card-component_header-tools-container">
                                { !noEditing && (
                                    customEdit &&
                                    <button onClick={editItem} className="icon-button">
                                        <EditIcon />
                                    </button>
                                    ||
                                    <button onClick={this.onEditClick} className="icon-button">
                                        <EditIcon/>
                                    </button>)
                                }
                                { !noEditing && title === 'Post Payment' && displayMoreIcon &&
                                <button onClick={editNewItem} title={'Edit Invoice'} className="icon-button">
                                    <EditIcon/>
                                </button>
                                }
                                { title === 'Post Payment' &&
                                    <button title={displayMoreIcon ? 'Display less icon':'Display more icon' } className="icon-button" onClick={this.displayMoreIcon}>
                                        <span>...</span>
                                    </button>
                                }
                                {deleted &&
                                    <button onClick={deleteItem} className="icon-button">
                                        <DeleteIcon />
                                    </button>
                                }
                                {deleteItemId &&
                                    <button className="icon-button" onClick={openDeletePopUp}>
                                        <DeleteIcon />
                                    </button>
                                }
                                <button onClick={() => this.toggleExpand(!isExpanded)} className={`${isExpanded ? 'dashboard-card-component_header_expanded' : 'dashboard-card-component_header_short'} icon-button`}>
                                    <ExpandIcon />
                                    <NarrowIcon />
                                </button>
                            </div>
                            }
                            {selectedItemData && title!=='Pending Payment' &&
                                <button onClick={deleteItem} className="icon-button" title={'selectedItemData'} >
                                    <DeleteIcon/>
                                </button>
                            }                           
                        </div>
                    </div>
                )}
                <div className="dashboard-card-component_content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

DashboardCardComponent = dropTarget('Card', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))(DashboardCardComponent);

export default dragSource('Card', cardSource, collect)(DashboardCardComponent);