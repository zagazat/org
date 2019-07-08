import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {delay} from "q";

class Provider {

    constructor () {
        this.mock = new MockAdapter(axios);
    }


    /**
     * Возвращает список организаций
     * @returns {Promise<AxiosResponse<T>>}
     */
    getCompanyList = () => {
        console.warn('[BD Request]: getCompanyList()');
        return axios.get('/companies');
    };


    /**
     * Данные об организации
     * @param pk: int
     * @returns {Promise<AxiosResponse<T>>}
     */
    getCompany = (pk) => {
        console.warn('[BD Request]: getCompany(pk)');
        return axios.get(`/companies/${pk}`)
    };


    /**
     * Изменение данных организации
     * @param pk: int
     * @param formData: object
     * @returns {Promise<AxiosResponse<T>>}
     */
    setCompanyInfo = (pk, formData) => {
        console.warn('[BD Request]: setCompanyInfo(pk, formData)');
        return axios.put(`/companies/edit/${pk}`, formData);
    };

}

const api = new Provider();

api.mock.onGet('/companies').reply(200, {
    result: [
        {
            pk: 1,
            name: 'Батарейка',
            reg_number: '0000000000000',
            type: {
                pk: 2,
                title: 'ООО'
            },
            is_active: false,
            created: '2019-06-25T12:15:37.105801+05:00'
        },
        {
            pk: 2,
            name: 'Фотошопов А. Д.',
            reg_number: '0000000000000',
            type: {
                pk: 1,
                title: 'ИП'
            },
            is_active: true,
            created: '2019-06-25T12:15:37.105801+05:00'
        },
        {
            pk: 3,
            name: 'Брусбокс',
            reg_number: '0000000000000',
            type: {
                pk: 2,
                title: 'ООО'
            },
            is_active: false,
            created: '2019-06-25T12:15:37.105801+05:00'
        },
        {
            pk: 4,
            name: 'Ангуляр Ж. С.',
            reg_number: '0000000000000',
            type: {
                pk: 1,
                title: 'ИП'
            },
            is_active: true,
            created: '2019-06-25T12:15:37.105801+05:00'
        },
        {
            pk: 5,
            name: 'Кожаные мешки оптом',
            reg_number: '0000000000000',
            type: {
                pk: 2,
                title: 'ООО'
            },
            is_active: true,
            created: '2019-06-25T12:15:37.105801+05:00'
        },
    ]
});


api.mock.onPut('/companies/edit/1').reply(200, {
    error: null,
    result: {
        pk: 1
    }
});

api.mock.onPut('/companies/edit/2').reply(502, {
    error: {
        message: 'Bag gateway'
    },
    result: null
}, delay(1000));

api.mock.onPut('/companies/edit/3').reply(200, {
    pk: 3
});

api.mock.onPut('/companies/edit/4').reply(200, {
    pk: 4
});

api.mock.onPut('/companies/edit/5').reply(200, {
    pk: 5
});


api.mock.onGet('/companies/1').reply(200, {
    result: {
        pk: 1,
        name: 'Батарейка',
        reg_number: '0000000000000',
        type: {
            pk: 2,
            title: 'ООО'
        },
        is_active: false,
        created: '2019-06-25T12:15:37.105801+05:00'
    }
});

api.mock.onGet('/companies/2').reply(200, {
    result: {
        pk: 2,
        name: 'Фотошопов А. Д.',
        reg_number: '0000000000000',
        type: {
            pk: 1,
            title: 'ИП'
        },
        is_active: true,
        created: '2019-06-25T12:15:37.105801+05:00'
    }
});

api.mock.onGet('/companies/3').reply(200, {
    result: {
        pk: 3,
        name: 'Брусбокс',
        reg_number: '0000000000000',
        type: {
            pk: 2,
            title: 'ООО'
        },
        is_active: false,
        created: '2019-06-25T12:15:37.105801+05:00'
    }
});

api.mock.onGet('/companies/4').reply(200, {
    result: {
        pk: 4,
        name: 'Ангуляр Ж. С.',
        reg_number: '0000000000000',
        type: {
            pk: 1,
            title: 'ИП'
        },
        is_active: true,
        created: '2019-06-25T12:15:37.105801+05:00'
    }
});

api.mock.onGet('/companies/5').reply(200, {
    result: {
        pk: 5,
        name: 'Кожаные мешки оптом',
        reg_number: '0000000000000',
        type: {
            pk: 2,
            title: 'ООО'
        },
        is_active: true,
        created: '2019-06-25T12:15:37.105801+05:00'
    }
});

export default api;
