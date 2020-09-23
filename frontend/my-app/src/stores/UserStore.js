import { extendObservable } from 'mobx';

class UserStore{
    constructor(){
        extendObservable(this, {
            loading:true,
            isLoggedIn: false,
            username: 'Shaner'
        })
    }
}
export default new UserStore();