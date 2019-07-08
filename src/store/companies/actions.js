export const EDIT_ORGANIZATION = 'EDIT_ORGANIZATION';
export const ADD_TO_LIST = 'ADD_TO_LIST';
export const SET_ORGANIZATION_DATA = 'SET_ORGANIZATION_DATA';


export const addOrganizations = (companyList) => {
    return {
        type: ADD_TO_LIST,
        companyList
    }
};


export const setOrganizationData = (companyData) => {
    return {
        type: SET_ORGANIZATION_DATA,
        companyData
    }
}


export const editOrganization = (pk, companyData) => {
    return {
        type: EDIT_ORGANIZATION,
        pk,
        companyData
    }
};
