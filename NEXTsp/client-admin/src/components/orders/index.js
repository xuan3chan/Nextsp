import React, { useReducer, Fragment, createContext } from 'react'
import AdminLayout from '../layout/AdminLayout'
import AllOrders from './AllOrders'
import OrdersMenu from './OrdersMenu'
import { orderReducer, orderState } from './OrdersContext'

export const OrderContext = createContext();

const OrdersComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <OrdersMenu />
      <AllOrders />
    </div>
  )
}

const Orders = (props) => {
  const [data, dispatch] = useReducer(orderReducer, orderState)
  return (
    <Fragment>
      <OrderContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<OrdersComponent />} />
      </OrderContext.Provider>
    </Fragment>
  )
}

export default Orders