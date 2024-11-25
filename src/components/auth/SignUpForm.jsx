import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StarImg from "../../assets/images/v1/star2.png";
import Field from "../common/Field";

function SignUpForm() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();

	const submitForm = async (formData) => {
		try {
		  // Call API to register user
		  const response = await axios.post("http://localhost:3001/api/auth/sign-up", formData);
		  alert(response.data.message); // Show success message
		  navigate("/sign-in"); // Redirect to login page
		} catch (err) {
		  // Handle API errors
		  if (err.response && err.response.data.message) {
			// Display the specific error message returned from the backend
			alert(err.response.data.message);
		  } else if (err.request) {
			// If no response is received (e.g., network error)
			alert("Network error: Unable to reach the server.");
		  } else {
			// Catch any other unexpected errors
			alert("An unexpected error occurred. Please try again.");
		  }
		}
	  };
	  

	return (
		<div className="section aximo-section-padding">
			<div className="container">
				<div className="aximo-account-title">
					<h2>
						<span className="aximo-title-animation">
							Create Account
							<span className="aximo-title-icon">
								<img src={StarImg} alt="Star" />
							</span>
						</span>
					</h2>
				</div>
				<div className="aximo-account-wrap">
					<form onSubmit={handleSubmit(submitForm)}>
						<div className="aximo-account-field">
							<Field label="Enter your full name" error={errors.user}>
								<input
									{...register("user", { required: "Nama User is required." })}
									type="text"
									name="user"
									id="user"
									placeholder="Adam Smith"
									aria-invalid={errors.name ? "true" : "false"}
								/>
							</Field>
						</div>

						<div className="aximo-account-field">
							<Field label="Enter email address" error={errors.email}>
								<input
									{...register("email", {
										required: "Email is required.",
										pattern: {
											value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
											message: "Invalid email address.",
										},
									})}
									type="email"
									name="email"
									id="email"
									placeholder="example@gmail.com"
									aria-invalid={errors.email ? "true" : "false"}
								/>
							</Field>
						</div>

						<div className="aximo-account-field">
							<Field label="Enter Password" error={errors.password}>
								<input
									{...register("password", {
										required: "Password is required.",
										minLength: {
											value: 8,
											message: "Your password must be at least 8 characters.",
										},
									})}
									type="password"
									name="password"
									id="password"
									placeholder="Enter password"
									aria-invalid={errors.password ? "true" : "false"}
								/>
							</Field>
						</div>

						<button id="aximo-account-btn" type="submit">
							Create account
						</button>

						<div className="aximo-or">
							<p>or</p>
						</div>

						<div className="aximo-account-bottom">
							<p>
								Already have an account? <Link to="/sign-in">Log in here</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SignUpForm;
