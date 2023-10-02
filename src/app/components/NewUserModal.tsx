import { IconButton } from "@mui/material"
import { Close } from "@mui/icons-material"

type ModalProps = {
    closeModal: () => void
}

function NewUserModal({ closeModal }: ModalProps) {
    return (
        <div className="absolute top-0 left-0 bg-slate-400/60 h-screen w-screen flex items-center justify-center">
            <div className="bg-white p-5 rounded-xl">
                {/* close modal */}
                <IconButton onClick={closeModal}>
                    <Close />
                </IconButton>

                NewUserModal
            </div>
        </div>
    )
}

export default NewUserModal