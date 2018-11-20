import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import DashboardCardComponent from '../DashboardCardComponent/DashboardCardComponent.jsx';
import DashboardCollapsibleComponent from '../DashboardCollapsibleComponent/DashboardCollapsibleComponent.jsx';
import SearchIcon from '../../../../assets/icons/SearchIcon.jsx';
import { showSideListMenu, showEditSideListMenu, selectInsuranceItem, showDeleteSideListMenu } from './actions.es6';

import './DashboardInsurance.scss';

class DashboardInsurance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExpanded: false,
            isClose: false
        };
        this.onExpandToggle = this.onExpandToggle.bind(this);
        this.formatPhoneNumber = this.formatPhoneNumber.bind(this);
    }

    componentWillMount() {
        this.props.onPageLoad();
    }

    onExpandToggle(value) {
        this.setState({
            isExpanded: value
        });
    }

    addItem = () => {
        this.props.onShowSideListMenu('addInsuranceMenu');
        this.setState({
            isClose: false
        });
    };

    formatPhoneNumber(number) {
        if(number) {
            number = number.replace(/-/g, '');
            number = number.replace('(', '');
            number = number.replace(')', '');
            return '(' + number.substr(0, 3) + ')-' + number.substr(3, 3) + '-' + number.substr(6, 4);
        }
        return '';
    }

    render() {
        const { index, onShowSideListMenu, moveCard, insurance, onSelectInsuranceItem, onShowEditSideListMenu, selectedItemData, onShowDeleteSideListMenu } = this.props;
        const { isExpanded } = this.state;
        return (
            <DashboardCardComponent
                title="Insurance"
                count={insurance.length} flex="1"
                index={index}
                moveCard={moveCard}
                selectedItemData={selectedItemData}
                addItem={this.addItem}
                editItem={() => onShowEditSideListMenu(!_.isEmpty(selectedItemData) && 'editInsuranceMenu', selectedItemData)}
                deleteItem={() => onShowDeleteSideListMenu(!_.isEmpty(selectedItemData) && 'deleteInsuranceMenu', selectedItemData)}
                onExpandToggle={this.onExpandToggle}
                isExpanded={isExpanded}
            >
                <div className="dashboard-patients-insurance">
                    {insurance.map((insuranceItem, i) =>
                        <DashboardCollapsibleComponent title={insuranceItem.Company ? insuranceItem.Company : insuranceItem.TempInsurance }
                            id={insuranceItem.InsID}
                            selectedId={selectedItemData.InsID} key={i}
                            isClose={this.state.isClose}
                            deleteItem={() => onSelectInsuranceItem(insuranceItem)}>
                            {!isExpanded &&
                                <ul>
                                    {insuranceItem.TempInsurance && (!insuranceItem.Adjuster) &&
                                        <li title={'Temp Insurance'}>
                                            <div className="title" title={'Temp Insurance'}>Temp Insurance</div>
                                            {/* <div className="content Field--is-search" title={insuranceItem.Adjuster}>
                                                <input type="text" className="SearchBox-query" value={insuranceItem.Adjuster} disabled={true}/>
                                            </div> */}
                                            <div className="content" title={insuranceItem.TempInsurance}>{insuranceItem.TempInsurance}</div>
                                        </li>
                                    }
                                    <li title={'Adjuster'}>
                                        <div className="title" title={'Adjuster'}>Adjuster</div>
                                        {/* <div className="content Field--is-search" title={insuranceItem.Adjuster}>
                                            <input type="text" className="SearchBox-query" value={insuranceItem.Adjuster} disabled={true}/>                                          
                                        </div> */}
                                        <div className="content" title={insuranceItem.Adjuster}>{insuranceItem.Adjuster}</div>
                                    </li>
                                    <li title={'Company'}>
                                        <div className="title" title={'Company'}>Insurance Company</div>
                                        <div className="content" title={insuranceItem.Company}>{insuranceItem.Company}</div>
                                    </li>
                                    <li title={'Adjuster Phone No'}>
                                        <div className="title" title={'Adjuster Phone No'}>Adjuster Phone No.</div>
                                        <div className="content" title={this.formatPhoneNumber(insuranceItem.Phno)}>{this.formatPhoneNumber(insuranceItem.Phno)}</div>
                                    </li>
                                    <li title={'Claim No'}>
                                        <div className="title" title={'Claim No'}>Claim No.</div>
                                        <div className="content" title={insuranceItem.ClaimNo}>{insuranceItem.ClaimNo}</div>
                                    </li>
                                    {Boolean(insuranceItem.Verified) &&
                                        <li title={'Verified'}>
                                            <div className="title" title={'Verified'}>Verified</div>                                            
                                            <div className="content" title={insuranceItem.Verified}>{(insuranceItem.VerifiedDate && insuranceItem.VerifiedInitials) ? (Boolean(insuranceItem.Verified) ? 'Yes' : 'No') + ' - ' + insuranceItem.VerifiedInitials + ' - ' + moment(insuranceItem.VerifiedDate).format('MM/DD/YYYY') : insuranceItem.VerifiedInitials  ? (Boolean(insuranceItem.Verified) ? 'Yes' : 'No') + ' - ' + insuranceItem.VerifiedInitials :  insuranceItem.VerifiedDate? (Boolean(insuranceItem.Verified) ? 'Yes' : 'No') + ' - ' + moment(insuranceItem.VerifiedDate).format('MM/DD/YYYY') : (Boolean(insuranceItem.Verified) ? 'Yes' : 'No')}</div>                                                                                       
                                        </li>
                                    }
                                </ul>
                            }

                            {isExpanded &&
                                <ul>
                                    {insuranceItem.TempInsurance && ((insuranceItem.hasOwnProperty('Adjuster') && insuranceItem.Adjuster === "" ) ||(!insuranceItem.hasOwnProperty('Adjuster'))) &&
                                        <li title={'Temp Insurance'}>
                                            <div className="title" title={'Temp Insurance'}>Temp Insurance</div>
                                            {/* <div className="content Field--is-search" title={insuranceItem.Adjuster}>
                                                    <input type="text" className="SearchBox-query" value={insuranceItem.Adjuster} disabled={true}/>
                                                </div> */}
                                            <div className="content" title={insuranceItem.TempInsurance}>{insuranceItem.TempInsurance}</div>
                                        </li>
                                    }
                                    <li title={'Adjuster'}>
                                        <div className="title" title={'Adjuster'}>Adjuster</div>
                                        {/* <div className="content Field--is-search">
                                            <input type="text" value={insuranceItem.Adjuster} className="SearchBox-query" disabled={true}/>
                                            <SearchIcon/>
                                        </div> */}
                                         <div className="content">{insuranceItem.Adjuster}</div>
                                    </li>
                                    <li title={'Company'}>
                                        <div className="title" title={'Company'}>Company</div>
                                        <div className="content">{insuranceItem.Company}</div>
                                    </li>
                                    <li title={'Address'}>
                                        <div className="title" title={'Address'}>Address</div>
                                        <div className="content">{insuranceItem.Address}</div>
                                    </li>
                                    <li title={'City'}>
                                        <div className="title" title={'City'}>City</div>
                                        <div className="content">{insuranceItem.City}</div>
                                    </li>
                                    <li title={'State'}>
                                        <div className="title" title={'State'}>State</div>
                                        <div className="content">{insuranceItem.State}</div>
                                    </li>
                                    <li title={'Zip'}>
                                        <div className="title" title={'Zip'}>Zip</div>
                                        <div className="content">{insuranceItem.Zip}</div>
                                    </li>
                                    <li title={'Adjuster Phone No'}>
                                        <div className="title" title={'Adjuster Phone No'}>Adjuster Phone No.</div>
                                        <div className="content">{this.formatPhoneNumber(insuranceItem.Phno)}</div>
                                    </li>
                                    <li title={'Fax No'}>
                                        <div className="title" title={'Fax No'}>Fax No.</div>
                                        <div className="content">{this.formatPhoneNumber(insuranceItem.FaxNo)}</div>
                                    </li>
                                    <li title={'Policy Holder'}>
                                        <div className="title" title={'Policy Holder'}>Policy Holder</div>
                                        <div className="content">{insuranceItem.PolicyHolderName}</div>
                                    </li>
                                    <li title={'Policy Number'}>
                                        <div className="title" title={'Policy Number'}>Policy Number</div>
                                        {/* <div className="content Field--is-search">
                                            <input type="text" className="SearchBox-query" value={insuranceItem.PolicyNumber} disabled={true}/>
                                        </div> */}
                                        <div className="content">{insuranceItem.PolicyNumber}</div>
                                    </li>
                                    <li title={'Settlement Date'}>
                                        <div className="title" title={'Settlement Date'}>Settlement Date</div>
                                        {/* <div className="content Field--is-search">
                                            <input type="text" className="SearchBox-query" value={!insuranceItem.SettlementDate ? '' : insuranceItem.SettlementDate === '0001-01-01T00:00:00' ? '' : moment(insuranceItem.SettlementDate).format('MM-DD-YYYY') || moment(insuranceItem.SettlementDate, 'DD/MM/YYYY').format('MM-DD-YYYY') || insuranceItem.SettlementDate} disabled={true}/>
                                        </div> */}
                                        <div className="content"> {!insuranceItem.SettlementDate ? '' : insuranceItem.SettlementDate === '0001-01-01T00:00:00' ? '' : moment(insuranceItem.SettlementDate).format('MM-DD-YYYY') || moment(insuranceItem.SettlementDate, 'DD/MM/YYYY').format('MM-DD-YYYY') || insuranceItem.SettlementDate}</div>
                                    </li>
                                    <li title={'Claim No'}>
                                        <div className="title" title={'Claim No'}>Claim No.</div>
                                        {/* <div className="content Field--is-search">
                                            <input type="text" className="SearchBox-query" value={insuranceItem.ClaimNo} disabled={true}/>
                                            <SearchIcon/>
                                        </div> */}
                                         <div className="content">{insuranceItem.ClaimNo}</div>
                                        
                                    </li>
                                    <li title={'Type of Coverage'}>
                                        <div className="title" title={'Type of Coverage'}>Type of Coverage</div>
                                        <div className="content">
                                            {
                                               insuranceItem.hasOwnProperty('Adjuster') ? (_.isString(insuranceItem.TypeCoverage) ? insuranceItem.TypeCoverage : _.find(insuranceItem.TypeCoverage, { InsCoverageID: insuranceItem.prevInsCoverage }).Coverage || '') : ''
                                            }
                                        </div>
                                    </li>
                                    <li title={'Status'}>
                                        <div className="title" title={'Status'}>Status</div>
                                        <div className="content">
                                            {
                                                insuranceItem.hasOwnProperty('Adjuster') ? (_.isString(insuranceItem.Status) ? insuranceItem.Status : _.find(insuranceItem.Status, { Status: insuranceItem.prevStatus }).Status || '') : ''
                                            }
                                        </div>
                                    </li>
                                    <li title={'Policy Limits'}>
                                        <div className="title" title={'Policy Limits'}>Policy Limits</div>
                                        <div className="content">{insuranceItem.PolicyLimits}</div>
                                    </li>
                                    <li title={'Verified'}>
                                        <div className="title" title={'Verified'}>Verified</div>
                                        <div className="content">{(insuranceItem.VerifiedDate && insuranceItem.VerifiedInitials) ? (Boolean(insuranceItem.Verified) ? 'Yes' : 'No') + ' - ' + insuranceItem.VerifiedInitials + ' - ' + moment(insuranceItem.VerifiedDate).format('MM/DD/YYYY') : insuranceItem.VerifiedInitials  ? (Boolean(insuranceItem.Verified) ? 'Yes' : 'No') + ' - ' + insuranceItem.VerifiedInitials :  insuranceItem.VerifiedDate? (Boolean(insuranceItem.Verified) ? 'Yes' : 'No') + ' - ' + moment(insuranceItem.VerifiedDate).format('MM/DD/YYYY') : (Boolean(insuranceItem.Verified) ? 'Yes' : 'No')}</div>
                                    </li>
                                    <li title={'Expected Recovery'}>
                                        <div className="title" title={'Expected Recovery'}>Expected Recovery</div>
                                        <div className="content">{insuranceItem.ExpectedRecovery}</div>
                                    </li>
                                    <li title={'Adjusted Amount'}>
                                        <div className="title" title={'Adjusted Amount'}>Adjusted Amount</div>
                                        <div className="content">{insuranceItem.AdjustedAmount}</div>
                                    </li>
                                    <li title={'Implant Cost'}>
                                        <div className="title" title={'Implant Cost'}>Implant Cost</div>
                                        <div className="content">{insuranceItem.ImplantCost}</div>
                                    </li>
                                    <li title={'Billed Date'}>
                                        <div className="title" title={'Billed Date'}>Billed Date</div>
                                        <div className="content">{!insuranceItem.BilledDate ? '' : insuranceItem.BilledDate === '0001-01-01T00:00:00' ? '' : moment(insuranceItem.BilledDate).format('MM-DD-YYYY') || moment(insuranceItem.BilledDate, 'DD/MM/YYYY').format('MM-DD-YYYY') || insuranceItem.BilledDate}</div>
                                    </li>
                                    <li title={'Comment'}>
                                        <div className="title" title={'Comment'}>Comment</div>
                                        <div className="content">{insuranceItem.Comment}</div>
                                    </li>
                                </ul>
                            }
                        </DashboardCollapsibleComponent>
                    )}
                </div>
            </DashboardCardComponent>
        );
    }
}

const mapStateToProps = state => {
    return {
        insurance: state.patientDetailsReducer.patientDetails.PatientInsuranceModel.Insurance,
        editInsuranceItem: state.insuranceReducer.selectedInsuranceItem,
        selectedItemData: state.insuranceReducer.selectedInsuranceItem
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowSideListMenu: (menuName) => {
            dispatch(showSideListMenu(menuName));
            dispatch(selectInsuranceItem({}));
        },
        onShowEditSideListMenu: (menuName, data) => {
            dispatch(showEditSideListMenu(menuName, data));
        },
        onShowDeleteSideListMenu: (menuName, data) => {
            dispatch(showDeleteSideListMenu(menuName, data));
        },
        onSelectInsuranceItem: (value) => {
            dispatch(selectInsuranceItem(value));
            dispatch(showSideListMenu(null));
        },
        onPageLoad: () => {
            dispatch(selectInsuranceItem({}));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardInsurance);