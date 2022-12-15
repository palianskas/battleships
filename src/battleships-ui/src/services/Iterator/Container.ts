import { Iterator } from './Iterator';

export interface Container {
    getIterator(value?: Iterator): Iterator;
}