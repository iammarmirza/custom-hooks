import { useState, useEffect } from "react"
import ReactDOM from "react-dom"

type ToastProps = {
    title: string
    description?: string
    style?: React.CSSProperties
    classList?: string
    id?:  number
}

export const useToast = () => {
    const [toastData, setToastData] = useState<ToastProps[]>([])
    let toastContainer = document.getElementById('toast-container')

    useEffect(() => {
        if (!toastContainer) {
          toastContainer = document.createElement('div');
          toastContainer.id = 'toast-container';
          document.body.appendChild(toastContainer);
        }
      }, []);

    const show = (value: ToastProps, timeLimit = 5000) => {
        const id = Date.now()
        setToastData(prev => [...prev, {...value, id}])

        setTimeout(() => {
            hide(id)
        }, timeLimit)
    }

    const hide = (id: number) => {
        setToastData(data => data.filter((toast) => toast.id !== id))
    }

    const toastElement = toastContainer && toastData.length > 0 ? ReactDOM.createPortal(
        <div className="toast">
            {
                toastData?.map((toast) => (
                    <div key={toast.id} style={toast.style} className={toast.classList}>{toast.title}</div>
                ))
            }
        </div>,
        toastContainer
    ) : null;

    return {show, toastElement}

}