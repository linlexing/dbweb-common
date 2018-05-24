// tslint:disable:no-console
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';

import Main from './main';

interface ILoaderProps {
    modules: object
    apiRootPath: string
}
const store = createStore((state: any, action: any) => state);
export const Loader = (props: ILoaderProps) => (
    <Provider store={store} >
        <Router>
            <Main {...props} />
        </Router>
    </Provider>
);
