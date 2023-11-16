import React, {Fragment, useState, useEffect, useContext} from 'react'
import { getAllOrders } from './FetchApi'
import { OrderContext } from './index'

const AllOrders = () => {
  const { data, dispatch } = useContext(OrderContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  // Fetch all orders on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getAllOrders()
        setOrders(responseData)
        console.log(responseData)
        setLoading(false)
      } catch (err) {
        setError(true)
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="#fff"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12z"
          ></path>
        </svg>
      </div>
    )
  }
  if (error) {
    return (
      <div>ERROR...</div>
    )
  }
  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div className="bg-white shadow-lg rounded-lg px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-gray-700">Order ID: </span>
                <span className="text-gray-700">{order._id}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Status: </span>
                <span className="text-gray-700">{order.status}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-gray-700">User ID: </span>
                <span className="text-gray-700">{order.user_id}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Total: </span>
                <span className="text-gray-700">{order.total}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-gray-700">
                  Created At:{' '}
                </span>
                <span className="text-gray-700">{order.createdAt}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">
                  Updated At:{' '}
                </span>
                <span className="text-gray-700">{order.updatedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default AllOrders