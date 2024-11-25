import SignInForm from "../../components/auth/SignInForm";
import Preloader from "../../components/common/Preloader";
function SignIn() {
	return (
		<>
			<Preloader />
			<SignInForm />
		</>
	);
}

export default SignIn;
