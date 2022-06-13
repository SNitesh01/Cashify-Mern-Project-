import React from "react";
import { Route, Redirect } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import CategoryIcon from '@material-ui/icons/Category';
import LayersIcon from '@material-ui/icons/Layers';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ROLE from "../../constants/role";
import Users from "../../screens/user/Users";
import FormUser from "../../screens/user/FormUser";
import Dashboard from "../../screens/Dashboard";
import Category from "../../screens/category/Category";
import Products from "../../screens/product/Products";
import FormProduct from "../../screens/product/FormProduct";
import NewTransaction from "../../screens/transaction/Transaction";
import Report from "../../screens/report/Report";
import FormCategory from "../../screens/category/FormCategory";
import Account from "../../screens/Account";
import Setting from "../../screens/Setting";

export const routes = [
    {
        name: 'Dashboard',
        path: '/admin',
        component: Dashboard,
        icon: HomeIcon,
    },
    {
        name: 'User',
        path: '/admin/user',
        children: ['/admin/user/create', '/admin/user/update'],
        component: Users,
        icon: GroupIcon,
        role: ROLE.Admin
    },
    {
        name: 'Create User',
        child: true,
        path: '/admin/user/create',
        component: FormUser,
    },
    {
        name: 'Update User',
        child: true,
        path: '/admin/user/update/:id',
        component: FormUser,
    },
    {
        name: 'Category',
        path: '/admin/category',
        children: ['/admin/category/create', '/admin/category/update'],
        component: Category,
        icon: CategoryIcon,
        role: ROLE.Admin
    },
    {
        name: 'Create Category',
        child: true,
        path: '/admin/category/create',
        component: FormCategory,
    },
    {
        name: 'Update Category',
        child: true,
        path: '/admin/category/update/:id',
        component: FormCategory,
    },
    {
        name: 'Product',
        path: '/admin/product',
        children: ['/admin/product/create', '/admin/product/update'],
        component: Products,
        icon: LayersIcon,
    },
    {
        name: 'Create Product',
        child: true,
        path: '/admin/product/create',
        component: FormProduct,
    },
    {
        name: 'Update Product',
        child: true,
        path: '/admin/product/update/:id',
        component: FormProduct,
    },
    {
        name: 'Transaction',
        path: '/admin/transaction/create',
        component: NewTransaction,
        icon: ReceiptIcon,
    },
    {
        name: 'Report',
        path: '/admin/report',
        component: Report,
        icon: AssessmentIcon,
        role: ROLE.Admin
    },
    {
        name: 'Account',
        child: true,
        path: '/admin/account',
        component: Account,
    },
    {
        name: 'Setting',
        child: true,
        path: '/admin/setting',
        component: Setting,
    },
]

const currentUser = JSON.parse(localStorage.getItem('user'))

function PrivateRoute({ component: Component, ...props} ) {
    return (
        <Route
            {...props}
            render={props => {
                if (currentUser && ROLE[currentUser.user.role] !== undefined) {
                    return <Component exact {...props}/>
                } else {
                    return <Redirect to="/login"/>
                }
            }}
        />
    )
}

export const PrivateComponent = routes.map(({name, path, component}, key) => {
    return <PrivateRoute exact key={key} component={component} path={path} name={name}/>
})

export default PrivateRoute