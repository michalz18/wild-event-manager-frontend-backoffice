import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
	TextField,
	Button,
	Typography,
	Box,
	Snackbar,
	Alert,
} from "@mui/material"
import { resetPassword } from "../../services/EmployeeManagement"
import { useParams, useNavigate } from "react-router-dom"

const ResetPasswordForm = () => {
	const { token } = useParams()
	const navigate = useNavigate()
	const [success, setSuccess] = useState(false)

	const formik = useFormik({
		initialValues: {
			newPassword: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object({
			newPassword: Yup.string().required("Required"),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("newPassword"), null], "Passwords must match")
				.required("Required"),
		}),
		onSubmit: async values => {
			try {
				await resetPassword(token, values.newPassword)
				console.log("Password reset successful")
				setSuccess(true)
				setTimeout(() => {
					navigate("/")
				}, 4000)
			} catch (error) {
				console.error("Error during password reset:", error)
			}
		},
	})

	return (
		<Box sx={{ padding: 3, maxWidth: 400, margin: "auto" }}>
			<Typography variant='h5' gutterBottom>
				Reset Password
			</Typography>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					margin='normal'
					id='newPassword'
					name='newPassword'
					label='New Password'
					type='password'
					value={formik.values.newPassword}
					onChange={formik.handleChange}
					error={
						formik.touched.newPassword && Boolean(formik.errors.newPassword)
					}
					helperText={formik.touched.newPassword && formik.errors.newPassword}
				/>
				<TextField
					fullWidth
					margin='normal'
					id='confirmPassword'
					name='confirmPassword'
					label='Confirm Password'
					type='password'
					value={formik.values.confirmPassword}
					onChange={formik.handleChange}
					error={
						formik.touched.confirmPassword &&
						Boolean(formik.errors.confirmPassword)
					}
					helperText={
						formik.touched.confirmPassword && formik.errors.confirmPassword
					}
				/>
				<Button color='primary' variant='contained' fullWidth type='submit'>
					Reset Password
				</Button>
			</form>
			<Snackbar open={success} autoHideDuration={6000}>
				<Alert severity='success'>Password reset successful!</Alert>
			</Snackbar>
		</Box>
	)
}

export default ResetPasswordForm
