import React from 'react';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DashboardPatientsDetails from './components/DashboardPatientsDetails/DashboardPatientsDetails.jsx';
import DashboardNotes from './components/DashboardNotes/DashboardNotes.jsx';
import DashboardOpenNotes from './components/DashboardOpenNotes/DashboardOpenNotes.jsx';
import DashboardDocuments from './components/DashboardDocuments/DashboardDocuments.jsx';


import DashboardInsurance from './components/DashboardInsurance/DashboardInsurance.jsx';

import DashboardAttorney from './components/DashboardAttorney/DashboardAttorney.jsx';
import DashboardPostPayments from './components/DashboardPayments/DashboardPostPayments/DashboardPostPayments.jsx';
import DashboardPendingPayments from './components/DashboardPayments/DashboardPendingPayments/DashboardPendingPayments.jsx';
import DashboardAcct from './components/DashboardAcct/DashboardAcct.jsx';
import DashboardAtFault from './components/DashboardAtFault/DashboardAtFault.jsx';
import DashboardNotice from './components/DashboardNotice/DashboardNotice.jsx';
import DashboardLien from './components/DashboardLien/DashboardLien.jsx';
import DashboardEmployer from './components/DashboardEmployer/DashboardEmployer.jsx';
import DashboardPqiDocs from './components/DashboardPqiDocs/DashboardPqiDocs.jsx';
import DashboardIndicator from './components/DashboardIndicator/DashboardIndicator.jsx';

import './DashboardPatientsDetailsContent.scss';

class DashboardPatientsDetailsContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: [                
                'dashboardPatientsDetails', 'dashboardNotes','dashboardOpenNotes', 'dashboardDocuments', 'dashboardInsurance', 'dashboardAttorney', 'dashboardPostPayments', 'dashboardPendingPayments', 'dashboardAcct', 'dashboardAtFault', 'dashboardNotice', 'dashboardLien', 'dashboardEmployer', 'dashboardPqiDocs', 'dashboardIndicator'
            ]
        };

        this.moveCard = this.moveCard.bind(this);
    }

    moveCard(dragIndex, hoverIndex) {
        const { elements } = this.state;
        const newElements = elements.slice();

        const draggingElement = newElements[dragIndex];
        newElements.splice(dragIndex, 1);
        newElements.splice(hoverIndex, 0, draggingElement);


        this.setState({
            elements: newElements
        });
    }
    dashboardPatientsDetails(key, index) {
        return (
            <DashboardPatientsDetails
                moveCard={this.moveCard}
                key={key}
                index={index}
            />
        );
    }

    dashboardNotes(key, index) {
        return (
            <DashboardNotes
                moveCard={this.moveCard}
                key={key}
                index={index}
            />
        );
    }
    dashboardOpenNotes(key, index) {
        return (
            <DashboardOpenNotes
                moveCard={this.moveCard}
                key={key}
                index={index}
            />
        );
    }

    dashboardDocuments(key, index) {
        return (
            <DashboardDocuments
                moveCard={this.moveCard}
                key={key}
                index={index}
            />
        );
    }

    dashboardInsurance(key, index) {
        return (
            <DashboardInsurance
                key={key}
                moveCard={this.moveCard}
                index={index}
            />
        );
    }

    dashboardAttorney(key, index) {
        return (
            <DashboardAttorney
                key={key}
                moveCard={this.moveCard}
                index={index}
            />
        );
    }

    dashboardPostPayments(key, index) {
        return (
            <DashboardPostPayments
                key={key}
                moveCard={this.moveCard}
                index={index}
            />
        );
    }

    dashboardPendingPayments(key, index) {
        return (
            <DashboardPendingPayments
                key={key}
                moveCard={this.moveCard}
                index={index}
            />
        );
    }

    dashboardAcct(key, index) {
        return (
            <DashboardAcct
                key={key}
                moveCard={this.moveCard}
                index={index}
            />
        );
    }

    dashboardAtFault(key, index) {
        return (
            <DashboardAtFault
                key={key}
                moveCard={this.moveCard}
                index={index}
            />
        );
    }

    dashboardNotice(key, index) {
        return (
            <DashboardNotice
                key={key}
                moveCard={this.moveCard}
                index={index}
            />
        );
    }

    dashboardLien(key, index) {
        return (
            <DashboardLien
                key={key}
                moveCard={this.moveCard}
                index={index}
            />
        );
    }

    dashboardEmployer(key, index) {
        return (
            <DashboardEmployer
                key={key}
                moveCard={this.moveCard}
                index={index}
            />
        );
    }

    dashboardPqiDocs(key, index) {
        return (
            <DashboardPqiDocs
                key={key}
                moveCard={this.moveCard}
                index={index}
            />
        );
    }

    dashboardIndicator(key, index) {
        return (
            <DashboardIndicator
                key={key}
                moveCard={this.moveCard}
                index={index}
            />
        );
    }

    render() {
        const { elements } = this.state;
        return (
            <div className="dashboard-patients_content">
                {elements.map((element, index) => this[element](element, index))}
            </div>
        );
    }
}


export default dragDropContext(HTML5Backend)(DashboardPatientsDetailsContent);