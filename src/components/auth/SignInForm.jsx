import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import StarImg from "../../assets/images/v1/star2.png";
import Field from "../common/Field";
import { useState } from "react";
import Swal from "sweetalert2";

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loading state for button

  const submitForm = async (formData) => {
    console.log("Submitted Form Data = ", formData);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan token, nama pengguna, dan peran di localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("id", data.id);
        localStorage.setItem("role", data.role);

        Swal.fire({
          title: "Success!",
          text: "You have successfully logged in.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Arahkan berdasarkan peran pengguna
          if (data.role === "User") {
            navigate("/"); // Redirect ke home jika peran adalah User
          } else if (data.role === "Admin") {
            navigate("/dashboard"); // Redirect ke dashboard jika peran adalah Admin
          }
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.error || "Login failed. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section aximo-section-padding">
      <div className="container">
        <div className="aximo-account-title">
          <h2>
            <span className="aximo-title-animation">
              Welcome back
              <span className="aximo-title-icon">
                <img src={StarImg} alt="Star" />
              </span>
            </span>
          </h2>
        </div>
        <div className="aximo-account-wrap">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="aximo-account-field">
              <Field label="Enter email address" error={errors.email}>
                <input
                  {...register("email", { required: "Email is required." })}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
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
                />
              </Field>
            </div>
            <div className="aximo-account-checkbox-wrap">
              <Link className="forgot-password" to="/reset-password">
                Forgot password?
              </Link>
            </div>

            <button
              id="aximo-account-btn"
              type="submit"
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
            <div className="aximo-or">
              <p>or</p>
            </div>

            <div className="aximo-account-bottom">
              <p>
                Not a member yet? <Link to="/sign-up">Sign up here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
