'use client'
import { Provider } from 'react-redux'
import { store } from '@/state/store'

/* this provider sets the layout, redux state and Toaster component (for react hot toast notifications) for customer facing store */
function LayoutAndStateProvider({ children }: any) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default LayoutAndStateProvider