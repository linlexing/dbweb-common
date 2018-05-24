
import { Login } from './login';
import Index from './m-index';
export { IElement } from './model/element';
export { Login, Index };
export function modules(): object {
    return { login: Login, index: Index };
}
