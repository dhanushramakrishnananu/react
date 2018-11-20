import React from 'react';

import './DashboardPatientsPrintLetter.scss';
import { Link } from 'react-router';

import PdfTypeIcon from '../../assets/icons/DocTypes/PdfTypeIcon.jsx';

class DashboardPatientsPrintLetter extends React.Component {
    render() {
        return (
            <div className="dashboard-patients-print-letter">
                <div className="dashboard-patients-print-letter_title">
                    Print Letter
                </div>
                <div className="dashboard-patients-print-letter_options">
                    <div className="dashboard-patients-print-letter_option">
                        <label htmlFor="dashboard-patients-print-letter_select">Letter Type</label>
                        <select name="dashboard-patients-print-letter_select" id="dashboard-patients-print-letter_select">
                            <option value="1">Example</option>
                            <option value="1">Example</option>
                            <option value="1">Example</option>
                            <option value="1">Example</option>
                            <option value="1">Example</option>
                        </select>
                    </div>
                    <div className="dashboard-patients-print-letter_option">
                        <label htmlFor="dashboard-patients-print-letter_select">Letter Type</label>
                        <select name="dashboard-patients-print-letter_select" id="dashboard-patients-print-letter_select">
                            <option value="1">Example</option>
                            <option value="1">Example</option>
                            <option value="1">Example</option>
                            <option value="1">Example</option>
                            <option value="1">Example</option>
                        </select>
                    </div>
                </div>
                <table className="dashboard-group-acts_table">
                    <thead>
                        <tr className="dashboard-patients-print-letter_table-head-row">
                            <th className="dashboard-patients-print-letter_table-head"><input type="checkbox"/></th>
                            <th className="dashboard-patients-print-letter_table-head">Patient ID</th>
                            <th className="dashboard-patients-print-letter_table-head">Name</th>
                            <th className="dashboard-patients-print-letter_table-head">Status</th>
                            <th className="dashboard-patients-print-letter_table-head">PDF</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="dashboard-patients-print-letter_table-row">
                            <td className="dashboard-patients-print-letter_table-cell"><input type="checkbox"/></td>
                            <td className="dashboard-patients-print-letter_table-cell"><Link className="dashboard-patients-print-letter_table-link" to="/">59788</Link></td>
                            <td className="dashboard-patients-print-letter_table-cell">Nancy Mills</td>
                            <td className="dashboard-patients-print-letter_table-cell">3.1 Lien Field</td>
                            <td className="dashboard-patients-print-letter_table-cell">
                                <PdfTypeIcon />
                                <Link className="dashboard-patients-print-letter_table-link" to="/">Download </Link>
                            </td>
                        </tr>
                        <tr className="dashboard-patients-print-letter_table-row">
                            <td className="dashboard-patients-print-letter_table-cell"><input type="checkbox"/></td>
                            <td className="dashboard-patients-print-letter_table-cell"><Link className="dashboard-patients-print-letter_table-link" to="/">59788</Link></td>
                            <td className="dashboard-patients-print-letter_table-cell">Nancy Mills</td>
                            <td className="dashboard-patients-print-letter_table-cell">3.1 Lien Field</td>
                            <td className="dashboard-patients-print-letter_table-cell">
                                <PdfTypeIcon />
                                <Link className="dashboard-patients-print-letter_table-link" to="/">Download </Link>
                            </td>
                        </tr>
                        <tr className="dashboard-patients-print-letter_table-row">
                            <td className="dashboard-patients-print-letter_table-cell"><input type="checkbox"/></td>
                            <td className="dashboard-patients-print-letter_table-cell"><Link className="dashboard-patients-print-letter_table-link" to="/">59788</Link></td>
                            <td className="dashboard-patients-print-letter_table-cell">Nancy Mills</td>
                            <td className="dashboard-patients-print-letter_table-cell">3.1 Lien Field</td>
                            <td className="dashboard-patients-print-letter_table-cell">
                                <PdfTypeIcon />
                                <Link className="dashboard-patients-print-letter_table-link" to="/">Download </Link>
                            </td>
                        </tr>
                        <tr className="dashboard-patients-print-letter_table-row">
                            <td className="dashboard-patients-print-letter_table-cell"><input type="checkbox"/></td>
                            <td className="dashboard-patients-print-letter_table-cell"><Link className="dashboard-patients-print-letter_table-link" to="/">59788</Link></td>
                            <td className="dashboard-patients-print-letter_table-cell">Nancy Mills</td>
                            <td className="dashboard-patients-print-letter_table-cell">3.1 Lien Field</td>
                            <td className="dashboard-patients-print-letter_table-cell">
                                <PdfTypeIcon />
                                <Link className="dashboard-patients-print-letter_table-link" to="/">Download </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default DashboardPatientsPrintLetter;
