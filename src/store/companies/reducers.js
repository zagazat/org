import _ from 'lodash';

const initialState = {
    companies: [],
    organization: null
};

export default function companyProcess(state=initialState, action={}) {

    switch (action.type) {

        case 'ADD_TO_LIST':
            return Object.assign({}, state, {
                companies: action.companyList
            });

        case 'EDIT_ORGANIZATION':
            const newInfo = _.set(state.companies, action.pk, action.companyData);

            return Object.assign({}, state, {
                companies: newInfo
            });

        case 'SET_ORGANIZATION_DATA':
            // console.log(action.companyData)
            return Object.assign({}, state, {
                organization: action.companyData
            });

        default:
            return state;
    }
};

export const getList = (state) => {
    return state.companyProcess.companies;
};

export const getOrganizationData = (state) => {
    return state.companyProcess.organization
}
