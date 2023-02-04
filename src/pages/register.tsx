import { Button } from "@components/common/Button"
import Image from "next/image"

export default function Register() {
    return (
        <div className="bg-vlvu-pink-100 font-display min-h-screen w-full">
            <main className="text-vlvu-pink-500 mx-auto max-w-lg">
                <div className="flex flex-col items-center justify-center h-screen gap-6">
                    <div>
                        <h1 className="font-semibold text-3xl text-center">Register</h1>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button type="primary" className="bg-white flex gap-6 px-3 items-center pr-8 content-start">
                            <Image src="/assets/google-logo.svg" alt="email icon" height="32px" width="32px" />
                            <span className="grow text-start text-gray-500 font-semibold">Sign in with Google</span>
                        </Button>
                        <Button type="primary" className="bg-white flex gap-6 px-3 items-center pr-8 content-start">
                            <Image src="/assets/email.svg" alt="email icon" height="32px" width="32px" />
                            <span className="grow text-start text-gray-500 font-semibold">Sign in with Email</span>
                        </Button>
                    </div>
                </div>
            </main>

        </div>
    );
}