export type ErrorProps = {
    message: string
}

function FormErrorMessage({ message }: ErrorProps) {
    return (
        <div className="bg-amber-300 text-red-500 p-2 rounded-lg text-center w-fit">
            {message}
        </div>
    )
}

export default FormErrorMessage