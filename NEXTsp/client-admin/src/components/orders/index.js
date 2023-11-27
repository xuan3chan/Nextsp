import React, { useReducer, Fragment, createContext, useContext } from 'react'
import AdminLayout from '../layout/AdminLayout'
import { ThemeContext } from "../theme/ThemeContext";
import AllOrders from './AllOrders'
import { orderReducer, orderState } from './OrdersContext'

export const OrderContext = createContext();

const OrdersComponent = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext)
  const darkBg = darkMode ? 'bg-gray-800' : ''

  return (
    <div className= {`grid grid-cols-1 space-y-4 p-4 ${darkBg}`}>
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