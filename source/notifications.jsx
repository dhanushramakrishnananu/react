import React from 'react';
import { toast } from 'react-toastify';

import SuccessIcon from './assets/icons/Notifications/SuccessIcon.jsx';
import WarningIcon from './assets/icons/Notifications/WarningIcon.jsx';
import ErrorIcon from './assets/icons/Notifications/ErrorIcon.jsx';

import 'react-toastify/dist/ReactToastify.min.css';

class Notifications {
    showSuccess(message, title = 'Success') {
        toast.success(
            <div className="dashboard-notification">
                <SuccessIcon />
                <div className="dashboard-notification_info">
                    <div className="dashboard-notification_title">{title}</div>
                    <div className="dashboard-notification_message">{message}</div>
                </div>
            </div>
        );
    }

    showWarning(message, title = 'Warning') {
        toast.warn(
            <div className="dashboard-notification">
                <WarningIcon />
                <div className="dashboard-notification_info">
                    <div className="dashboard-notification_title">{title}</div>
                    <div className="dashboard-notification_message">{message}</div>
                </div>
            </div>
        );
    }

    showError(message, title = 'Error') {
        toast.error(
            <div className="dashboard-notification">
                <ErrorIcon />
                <div className="dashboard-notification_info">
                    <div className="dashboard-notification_title">{title}</div>
                    <div className="dashboard-notification_message">{message}</div>
                </div>
            </div>
        );
    }
}

export default new Notifications();