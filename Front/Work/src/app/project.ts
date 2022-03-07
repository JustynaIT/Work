import { First } from './first';
import { Second } from './second';
import { Third } from './third';

export class Project {
    name: string;
    creator: string;
    _id: string;
    __v: number;
    first: First;
    second: Second;
    third: Third;
    fourth: Array<any>;
}
