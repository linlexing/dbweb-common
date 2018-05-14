
import { Login } from './login';
import { index } from './mindex';
export { IElement } from './model/element';
export { index, Login };
export function modules(): object {
    return { Login, index };
}
