import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import '../../DashboardAddAttorneyMenu.scss';
import FormBuilder from '../../../../../../components/FormBuilder/FormBuilder.jsx';
import { formStep3Config } from './formStep3Config.es6';
import { combineArrayAndObjectValues } from '../../../../../../components/FormBuilder/FormBuilderHelpers.es6'
import SearchIcon from '../../../../../../assets/icons/SearchIcon.jsx';

class DashboardAddAttorneyStep3 extends React.Component {
    getFormData = () => {
        let form3state = this.form3.state;
        form3state.AttorneyID = this.props.selectedAttorney.AttorneyID;
        if(form3state.Attention !== undefined) {
            form3state.Attention=form3state.Attention
        }
        else {
            form3state.Attention=this.props.selectedAttorney.Attention
        }
        if(form3state.LOP !== undefined) {
            form3state.LOP=form3state.LOP
        }
        else {
            form3state.LOP=this.props.selectedAttorney.LOP
        }
        if(form3state.IsVerified !== undefined) {
            form3state.IsVerified=form3state.IsVerified
        }
        else {
            form3state.IsVerified=this.props.selectedAttorney.IsVerified
        }
        if(form3state.Correspondance !== undefined) {
            form3state.Correspondance=form3state.Correspondance
        }
        else {
            form3state.Correspondance=this.props.selectedAttorney.Correspondance
        }
        return form3state;
    }

    render() {
        const { selectedAttorney, isEdit } = this.props;

        if(selectedAttorney)
        {
            const len= selectedAttorney.AttName?selectedAttorney.AttName.trim().length:0;
            if(len===0)
            {
                selectedAttorney.AttName=selectedAttorney.AttFirstName+ ' '+selectedAttorney.AttLastName;
            }
          
        }
        let configList = combineArrayAndObjectValues({
            configArr: formStep3Config,
            valuesObj: selectedAttorney,
            configField: 'name',
            valuesField: 'name'
        });
        
        return (
            <div >
                {isEdit &&
                    <ul>
                        <li>
                            
                            <button  className="change-adjuster" onClick={this.props.onChangeAdjuster}>Change Attorney</button>
                        </li>
                        
                    </ul>
                }
                <FormBuilder
                    ref={ ( form3 ) => this.form3 = form3 }
                    config={configList}
                />
             </div>
        );
    }
}

/*
const mapStateToProps = state => {
    return {
        selectedAttorney: state.attorneyReducer.selectedAttorney
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchAttorneyDetails: (data) => {
            dispatch(searchAttorneyDetails(data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardAddAttorneyStep3);
   */

export default DashboardAddAttorneyStep3;
