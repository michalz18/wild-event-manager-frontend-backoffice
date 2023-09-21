import React, { useState } from "react"
import {
	Button,
	TextField,
	Typography,
	Box,
	Snackbar,
	DialogContentText,
} from "@mui/material"
import Alert from "@mui/material/Alert"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { generateResetLink } from "../../services/LoginService"

const validationSchema = Yup.object({
	email: Yup.string().email("Invalid email format").required("Required"),
})

const ResetPasswordRequestByEmail = () => {
	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema,
		onSubmit: async values => {
			try {
				const responseMessage = await generateResetLink(values.email)
				setSnackbarOpen(true)
				setTimeout(() => {
					navigate("/")
				}, 3000)
			} catch (error) {
				console.error(error)
			}
		},
	})

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false)
	}

	return (
		<Box
			component='form'
			onSubmit={formik.handleSubmit}
			sx={{
				padding: 3,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
			<Typography variant='h5' gutterBottom>
				Reset Password
			</Typography>
			<DialogContentText>
				Please enter your email address. If the email exists in our database, a
				reset link will be sent.
			</DialogContentText>
			<TextField
				fullWidth
				margin='normal'
				label='Email Address'
				name='email'
				type='email'
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.email}
				error={formik.touched.email && Boolean(formik.errors.email)}
				helperText={formik.touched.email && formik.errors.email}
			/>
			<Button
				type='submit'
				fullWidth
				variant='contained'
				color='primary'
				sx={{ mt: 2 }}>
				Send Reset Link
			</Button>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={5000}
				onClose={handleCloseSnackbar}>
				<Alert
					onClose={handleCloseSnackbar}
					severity='success'
					sx={{ width: "100%" }}>
					Reset link has been sent. Please check your email.
				</Alert>
			</Snackbar>
		</Box>
	)
}

export default ResetPasswordRequestByEmail
