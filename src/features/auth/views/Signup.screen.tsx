import SignupForm from "../components/signup/SignupForm";
import SignupHero from "../components/signup/SignupHero"


export default function signupScreen() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* left side */}
          <SignupHero/>
          {/* right side */}
          <SignupForm />
        </div>
      </main>
    </>
  );
}
