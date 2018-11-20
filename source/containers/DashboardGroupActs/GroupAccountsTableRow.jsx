import React from 'react';
import Checkbox from '../../components/Checkbox/Checkbox.jsx';
import { connect } from 'react-redux';

class GroupAccountsTableRow extends React.Component {
    render() {
        const { AccountID, item, selectedGroupedPatientInsuranceCoList,selectedMainGroupedPatientInsurance } = this.props;
        return (
            <tr className='dashboard-group-acts_table-row'>
                <td title='Account#' className='dashboard-group-acts_table-cell'>{AccountID}</td>
                {selectedGroupedPatientInsuranceCoList.map((obj,i) =>

                    <td key={i} className='dashboard-group-acts_table-cell'>
                        <div>
                            <div className='dashboard-group-acts_table-value'>                        
                                <Checkbox
                                    input={{
                                        name: 'MP',
                                        value: (item[obj.InsuranceCo] ? item[obj.InsuranceCo].includes('1'): false)
                                    }}
                                />
                            </div>
                             <div className='dashboard-group-acts_table-value'>
                                <Checkbox
                                    input={{
                                        name: 'LI',
                                        value: (item[obj.InsuranceCo] ? item[obj.InsuranceCo].includes('2'):false)
                                    }}
                                />
                            </div>
                            <div className='dashboard-group-acts_table-value'>
                                <Checkbox
                                    input={{
                                        name: 'UM',
                                        value: (item[obj.InsuranceCo] ? item[obj.InsuranceCo].includes('3'):false)
                                    }}
                                />
                            </div>
                        </div>
                    </td>
                )}                
            </tr>
        );
    }
}
const mapStateToProps = state => {
    return {
        selectedGroupedPatientInsuranceCoList: state.patientDetailsReducer.selectedGroupedPatientInsuranceCoList,
        selectedMainGroupedPatientInsurance: state.patientDetailsReducer.selectedMainGroupedPatientInsurance
    };
};


const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupAccountsTableRow); 
