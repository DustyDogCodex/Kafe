import { ErrorProps } from "./FormErrorMessage"

function ServerErrorMessage({ message }: ErrorProps) {
    return (
        <div className="z-50 absolute h-screen w-screen bg-slate-500 flex items-center justify-center">
            <div className="bg-white text-center p-5 rounded-2xl">
                {message}
            </div>
        </div>
    )
}

export default ServerErrorMessage