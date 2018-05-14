
import axios,{ AxiosPromise } from 'axios';
import { APIGet } from '../../dbweb-core';
import { IElement } from './model/element';

export class Login {
    public static login(userName: string, pwd: string, cb: (ok: boolean, err: string) => void): void {
        axios.get("/login?_api=login").then((value) => {
            return ;
        }).catch( (error) =>{
            // tslint:disable-next-line:no-console
            console.log(error);
        });
    }
    public static getPublicElement(): AxiosPromise<IElement[]> {
        return APIGet<IElement[]>("login", "getPublicElement", null, null);
    }
}