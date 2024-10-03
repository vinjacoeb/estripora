import React from "react";
import { useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ContactThumb from "../../assets/images/contact/contact-thumb.png";
import Star2Img from "../../assets/images/v1/star2.png";
import Field from "../common/Field";
import emailjs from "emailjs-com"; // Import EmailJS

function ContactForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Submit form function with EmailJS integration
	const submitForm = (formData) => {
		// Mengirim email menggunakan EmailJS
		emailjs
			.send(
				"service_xlzed88", // Ganti dengan service ID dari EmailJS
				"template_rdv12z4", // Ganti dengan template ID dari EmailJS
				{
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					message: formData.message,
				},
				"H44wfmh5-pXPg2RKA" // Ganti dengan user ID dari EmailJS
			)
			.then(
				(result) => {
					console.log("Email berhasil dikirim: ", result.text);
					alert("Pesan berhasil dikirim!");
				},
				(error) => {
					console.log("Gagal mengirim email: ", error.text);
					alert("Terjadi kesalahan. Coba lagi.");
				}
			);
	};

	return (
		<div className="section aximo-section-padding">
			<div className="container">
				<div className="row">
					<div className="col-lg-8">
	

					</div>
				</div>

				<div className="row">
					<div className="col-lg-5 order-lg-2">
						<div className="aximo-contact-thumb ">
							<LazyLoadImage
								src={ContactThumb}
								width={475}
								height={635}
								alt="Contact Thumb"
								effect="blur"
							/>
						</div>
					</div>
					<div className="col-lg-7">
						<div className="aximo-main-form">
							<form onSubmit={handleSubmit(submitForm)}>
								<div className="aximo-main-field">
									<Field label="Your Name" error={errors.name}>
										<input
											{...register("name", { required: "Name is required." })}
											type="name"
											name="name"
											id="name"
										/>
									</Field>
								</div>
								<div className="aximo-main-field">
									<Field label="Enter email address" error={errors.email}>
										<input
											{...register("email", { required: "Email is required." })}
											type="email"
											name="email"
											id="email"
										/>
									</Field>
								</div>
								<div className="aximo-main-field">
									<Field label="Enter Phone Number" error={errors.phone}>
										<input
											{...register("phone", { required: "Phone is required." })}
											type="phone"
											name="phone"
											id="phone"
										/>
									</Field>
								</div>
								<div className="aximo-main-field">
									<label>Write your message here...</label>
									<textarea
										{...register("message", { required: "Message is required." })}
										name="message"
										id="message"
									></textarea>
								</div>
								<button id="aximo-main-btn" type="submit">
									Send Message
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContactForm;
