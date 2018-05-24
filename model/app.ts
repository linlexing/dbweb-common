import { IElement } from './element';
export interface IApp {
    elements: IElement[]
    index: IElement
    modules: object
}