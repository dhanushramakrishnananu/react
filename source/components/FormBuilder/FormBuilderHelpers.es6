import _ from 'lodash';


export const combineArraysValues = ({ configArr, configField, valuesArr, valuesField }) => {
    const list = configArr.map( item => {
        const i = _.findIndex(valuesArr, { [configField]: item[valuesField]});
        item.value = valuesArr[i] ? valuesArr[i].val : '';
        return item;
    } );

    return list;
};

export const combineArrayAndObjectValues = ({ configArr, configField, valuesObj, valuesField }) => {
    if(_.isArray(configArr)) {
        let index = 0;
        const keys = _.keys(valuesObj);
        let configArrCopy = _.map(configArr, _.clone);

        for(let item of keys) {
            index = _.findIndex(configArrCopy, {[configField]: item});
            if (index !== -1) {
                configArrCopy[index].value = valuesObj[item];
            }
        }
        return configArrCopy;
    }

    return configArr;
};

