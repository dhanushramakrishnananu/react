import React from 'react';
import { connect } from 'react-redux';

import { getTasksList, getTaskListDetails } from './actions.es6';

import TasklistsIcon from '../../../../assets/icons/TasklistsIcon.jsx';
import CaretIcon from '../../../../assets/icons/CaretIcon.jsx';
import DashboardTasklistsGroup from '../DashboardTasklistsGroup/DashboardTasklistsGroup';

import './DashboardTasklists.scss';

class DashboardTasklists extends React.Component {
    componentDidMount() {
        this.props.onGetTaskLists();
    }

    render() {
        const { taskLists, onGetTaskListDetails } = this.props;
        return (
            <div className="dashboard-tasklists">
                <div className="dashboard-tasklists_header">
                    <div className="dashboard-tasklists_header-left">
                        <TasklistsIcon />
                        <h3>Tasklists</h3>
                    </div>
                    <div className="dashboard-tasklists_header-right">
                        <CaretIcon />
                    </div>
                </div>
                <div className="dashboard-tasklists_tasklists">
                    {taskLists.map(taskList =>
                        <DashboardTasklistsGroup
                            key={taskList.WorkListID}
                            taskList={taskList}
                            getTaskListDetails={() => onGetTaskListDetails(taskList.WorkListID)}
                        />)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        taskLists: state.homeReducer.taskLists
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetTaskLists: () => {
            dispatch(getTasksList());
        },
        onGetTaskListDetails: (taskListId) => {
            dispatch(getTaskListDetails(taskListId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardTasklists);