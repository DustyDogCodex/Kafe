function OrdersPage() {
  return (
    <div className="flex min-h-screen h-full flex-col items-center justify-between">
        {/* {error && <ServerErrorMessage message={error} />} */}
        <div className="container pt-20 font-fauna">
            <h1 className="text-4xl mt-5 font-cinzel font-bold">Orders</h1>
            <span className="text-xl">Manage orders for your store</span>
        </div>
    </div>
  )
}

export default OrdersPage