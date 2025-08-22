"use client"

export default function LoginButton() {
    const handleLogin = async () => {
        const response = await fetch("http://localhost:8080/auth/signin-with-google")
    }
    return (
        <>
            <a href="http://localhost:8080/signin-with-google">
  Sign in with Google
</a>
        </>
    )
}