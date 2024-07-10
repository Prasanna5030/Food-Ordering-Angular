import { Injectable} from '@angular/core';

export interface Menu{
    state: string,
    name:string,
    type:string,
    icon:string,
    role:string,
}

const MENUITEMS=[
    {state:'dashboard' , name:'Dashboard',type:'link' ,icon:'dashboard', role:''},
    {state:'category' , name:'Manage Category',type:'link' ,icon:'category', role:'user:create,user:read,admin:read,ROLE_ADMIN,admin:create'},
    {state:'product' , name:'Manage Product',type:'link' ,icon:'inventory_2', role:'user:create,user:read,admin:read,ROLE_ADMIN,admin:create'},
    {state:'order' , name:'Manage Order',type:'link' ,icon:'shopping_cart', role:''},
    {state:'bill' , name:'View Bill',type:'link' ,icon:'backup_table', role:''},
    {state:'user' , name:'Manage Users',type:'link' ,icon:'people', role:'user:create,user:read,admin:read,ROLE_ADMIN,admin:create'}
]

@Injectable()
export class MenuItems{
    getMenuItems():Menu[]{
        return MENUITEMS;
    }
}

