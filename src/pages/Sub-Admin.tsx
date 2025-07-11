import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


interface AdminDeatils {
    name: string
    email: string
    phoneNumber: string
    role: string
    password: string
    confirmPassword: string
}


const AddSubAdmin = () => {
    const [adminDeatils, setAdminDeatils] = useState<AdminDeatils>({
        name: '', email: '', phoneNumber: '', role: '', password: '', confirmPassword: ''
    })

    const navigate = useNavigate()

    // input error
    const [error, setError] = useState<AdminDeatils>({
        name: '', email: '', phoneNumber: '', role: '', password: '', confirmPassword: ''
    })

    // destructure  adminDeatils
    const { name, email, phoneNumber, role, password, confirmPassword } = adminDeatils

    // input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setAdminDeatils((prev) => ({ ...prev, [name]: value }))
    }



    // form submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newError: AdminDeatils = {
            name: '', email: '', phoneNumber: '', role: '', password: '', confirmPassword: ''
        }
        if (!name) {
            newError.name = 'Name is required'

        }
        if (!email) {
            newError.email = 'email is required'

        }
        if (!/^\d{10}$/.test(phoneNumber)) {
            newError.phoneNumber = 'phoneNumber is must be 10'

        }
        if (!role) {
            newError.role = 'role is required'

        }
        if (password.length < 6) {
            newError.password = 'Password must be 6'

        }

        if (password !== confirmPassword) {
            newError.confirmPassword = 'Passsword Incorrect'

        }

        if (Object.keys(newError).length > 0) {
            setError(newError)
            return
        }


        try {
            // api call
            const res = await axios.post('url', { name, email, phoneNumber, role, password })
            if (res.status === 200) {
                navigate('/sub-admin-list')
            } else {
                console.error('failed add submission');
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className=" p-8 max-w-[1000px] m-auto">
            <div className="mb-10">
                <Link to={''}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.82509 8.9998L8.72509 13.8998C8.92509 14.0998 9.02109 14.3331 9.01309 14.5998C9.00509 14.8665 8.90075 15.0998 8.70009 15.2998C8.50009 15.4831 8.26675 15.5791 8.00009 15.5878C7.73342 15.5965 7.50009 15.5005 7.30009 15.2998L0.700087 8.6998C0.600087 8.5998 0.529087 8.49147 0.487087 8.3748C0.445087 8.25814 0.424754 8.13314 0.426087 7.9998C0.42742 7.86647 0.44842 7.74147 0.489087 7.6248C0.529753 7.50814 0.60042 7.3998 0.701087 7.2998L7.30109 0.699804C7.48442 0.516471 7.71375 0.424805 7.98909 0.424805C8.26442 0.424805 8.50175 0.516471 8.70109 0.699804C8.90109 0.899804 9.00109 1.13747 9.00109 1.4128C9.00109 1.68814 8.90109 1.92547 8.70109 2.1248L3.82509 6.9998H15.0001C15.2834 6.9998 15.5211 7.0958 15.7131 7.2878C15.9051 7.4798 16.0008 7.71714 16.0001 7.9998C15.9994 8.28247 15.9034 8.52014 15.7121 8.7128C15.5208 8.90547 15.2834 9.00114 15.0001 8.9998H3.82509Z" fill="black" />
                    </svg>
                </Link>
            </div>

            <div>
                <h2 className="text-2xl mb-4 pl-4">Add Sub-Admin</h2>
                <p className="text-black pl-4">Sub-Admin details</p>
                <p className="font-semibold">Enter the details of new Sub-Admin</p>
            </div>

            <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
                <div>
                    <label className="text-[20px] ">FullName</label> <br />
                    <input type="text" name="name" id="name" value={name || ''} onChange={handleChange} placeholder="Enter full name" className="border py-2 px-4 rounded-xl w-full mt-2" />
                    {error.name && <div className="text-sm text-red-600">{error.name} </div>}

                </div>
                <div>
                    <label className="text-[20px]">Email Address</label> <br />
                    <input type="email" name="email" id="email" value={email || ''} onChange={handleChange} placeholder="Enter email address" className="mt-2 border py-2 px-4  rounded-xl w-full" />
                    {error.email && <div className="text-sm text-red-600">{error.email} </div>}

                </div>
                <div>
                    <label className="text-[20px]">Phone Number</label><br />
                    <input type="number" name="phoneNumber" id="phoneNumber" value={phoneNumber || ''} onChange={handleChange} placeholder="Enter phone number" maxLength={10} className="mt-2 border py-2 px-4  rounded-xl w-full" />
                    {error.phoneNumber && <div className="text-sm text-red-600">{error.phoneNumber} </div>}

                </div>
                <div>
                    <label className="text-[20px]">Role</label><br />
                    <input type="text" name="role" id="role" value={role || ''} onChange={handleChange} placeholder="Enter role" className="mt-2 border py-2 px-4  rounded-xl w-full" />
                    {error.role && <div className="text-sm text-red-600">{error.role} </div>}

                </div>
                <div>
                    <label className="text-[20px]">Set password</label><br />
                    <input type="password" name="password" id="password" value={password || ''} onChange={handleChange} placeholder="Enter password" className="mt-2 border py-2 px-4  rounded-xl w-full" />
                    {error.password && <div className="text-sm text-red-600">{error.password} </div>}

                </div>
                <div>
                    <label className="text-[20px]">Confirm password</label><br />
                    <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword || ''} onChange={handleChange} placeholder="Confirm password" className="mt-2 border py-2 px-4  rounded-xl w-full" />
                    {error.confirmPassword && <div className="text-sm text-red-600">{error.confirmPassword} </div>}

                </div>

                <div className="text-center">
                    <button type="submit" className="bg-blue-600 rounded-xl text-white px-4 py-2">Add Sub-Admin</button>
                </div>
            </form>
        </div>

    )
}

export default AddSubAdmin