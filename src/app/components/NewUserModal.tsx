'use client'
import { Alert, IconButton, TextField } from "@mui/material"
import { Close } from "@mui/icons-material"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import axios from "axios"

type ModalProps = {
    closeModal: () => void
}


function NewUserModal({ closeModal }: ModalProps) {
    //react hook form setup
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const watchPassword = watch('password')
    const watchPassword2 = watch('password2')

    //password error: will toggle if password doesnt match confirm password input
    const [ passwordError, setPasswordError ] = useState<boolean>(false)
    const [ success, setSuccess ] = useState<boolean>(false)
    const [ error, setError ] = useState<string>('')
    const [ invalidUsername, setInvalidUsername ] = useState<boolean>(false)

    function createNewUser(data: object){
        //check if passwords match
        if(watchPassword !== watchPassword2){
            setPasswordError(true)
        } else {
            axios.post(`http://localhost:3000/api/auth/newUser`,
                { data }
            )
            .then(res => {
                if(res.data.message === 'success'){
                    setSuccess(true)
                } else if (res.data.message === 'duplicate'){
                    setInvalidUsername(true)
                }
            })
            .catch(err => setError(err.message))
        }
    }

    return (
        <div className="absolute top-0 left-0 bg-slate-400/60 h-screen w-screen flex items-center justify-center">
            <div className="bg-white p-5 rounded-xl font-fauna">
                {/* Heading and close button */}
                <div className="flex items-center justify-between mb-5">
                    <h1 className="text-xl">Add New User</h1>

                    {/* close modal */}
                    <IconButton onClick={closeModal}>
                        <Close />
                    </IconButton>
                </div>

                {/* error if passwords do not match */}
                {passwordError && <Alert severity="error">Please make sure your passwords match</Alert>}
                {success && <Alert severity="success">Admin account was successfully created</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
                {invalidUsername && <Alert severity="error">This username already exists. Please choose a different one.</Alert>}

                {/* form for creating new user */}
                <form 
                    className="flex flex-col items-center gap-5 mt-5"
                    onSubmit={handleSubmit(createNewUser)}
                >
                    <TextField
                        {...register('username', { required: true })}
                        variant="outlined"
                        label='Username'
                        type="text" 
                        placeholder="Choose a username"  
                    />
                    {errors.username && (
                        errors.username.type == 'required' && <Alert severity="error">Username is required</Alert>
                    )}

                    <TextField
                        {...register('password', { required: true })}
                        variant="outlined"
                        label='Password'
                        type="password" 
                        placeholder="Choose a password"
                    />
                    {errors.password && (
                        errors.password.type == 'required' && <Alert severity="error">Password is required</Alert>
                    )}

                    <TextField
                        {...register('password2', { required: true })}
                        variant="outlined"
                        label='Confirm Password'
                        type="password" 
                        placeholder="Confirm your password"
                    />
                    {errors.password2 && (
                        errors.password2.type == 'required' && <Alert severity="error">Please confirm your password</Alert>
                    )}

                    <button 
                        type="submit"
                        className="bg-orange-500 py-2 px-5 rounded-xl text-white text-xl mt-5"     
                    >
                        Create new admin
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewUserModal