import { useForm } from "react-hook-form";
import StarImg from "../../assets/images/v1/star2.png";
import Field from "../common/Field";
import { useState } from "react";

function ResetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk menangani submit form
  const submitForm = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Password reset successful.");
      } else {
        alert(data.error || "Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mengambil nilai dari password baru dan konfirmasi password
  const newPassword = watch("newPassword");

  return (
    <div className="section aximo-section-padding">
      <div className="container">
        <div className="aximo-account-title">
          <h2>
            <span className="aximo-title-animation">
              Reset Password
              <span className="aximo-title-icon">
                <img src={StarImg} alt="star" />
              </span>
            </span>
          </h2>
        </div>
        <div className="aximo-account-wrap">
          <form onSubmit={handleSubmit(submitForm)}>
            {/* Email */}
            <div className="aximo-account-field">
              <Field label="Enter email address" error={errors.email}>
                <input
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address.",
                    },
                  })}
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                />
              </Field>
            </div>

            {/* Password Lama */}
            <div className="aximo-account-field">
              <Field label="Enter old password" error={errors.oldPassword}>
                <input
                  {...register("oldPassword", {
                    required: "Old password is required.",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters.",
                    },
                  })}
                  type="password"
                  id="oldPassword"
                  placeholder="Enter old password"
                />
              </Field>
            </div>

            {/* Password Baru */}
            <div className="aximo-account-field">
              <Field label="Enter new password" error={errors.newPassword}>
                <input
                  {...register("newPassword", {
                    required: "New password is required.",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters.",
                    },
                  })}
                  type="password"
                  id="newPassword"
                  placeholder="Enter new password"
                />
              </Field>
            </div>

            {/* Konfirmasi Password Baru */}
            <div className="aximo-account-field">
              <Field label="Confirm new password" error={errors.confirmPassword}>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your new password.",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match.",
                  })}
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                />
              </Field>
            </div>

            {/* Tombol Reset */}
            <button id="aximo-account-btn" type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Reset Password"}
            </button>

            {/* Pesan Tambahan */}
            <div className="aximo-account-bottom m-0">
              <p>If you didn’t request a password recovery link, please ignore this.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetForm;
