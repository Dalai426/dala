"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Login() {



    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleform = async (data: any) => {
        router.push("/login")
    };


    return (
        <div className="w-screen h-screen flex bg-white">
            <div className="bg-gray-200 w-0 rounded-xl opacity-80 md:w-1/2 ml-3 mt-3 mb-3"></div>
            <div className="bg-white flex flex-col justify-center gap-8 font-semibold w-full  md:w-1/2">

                <div className="text-gray-600 mx-auto text-2xl">Сайн уу !!</div>
                <div className="text-gray-600 mx-auto">
                    Мерчант удирдлагын системд тавтай морил
                </div>

                <form
                    className="flex flex-col items-center p-5 gap-4 w-full"
                    onSubmit={handleform}
                >
                    <input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="username"
                        placeholder="Нэвтрэх нэр"
                        className="w-1/2 p-4 outline-none text-gray-500 bg-white rounded-md border hover:border-gray-300"
                    />
                    <input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Нууц үг"
                        type="password"
                        className="w-1/2 p-4 outline-none text-gray-500 bg-white rounded-md border hover:border-gray-300"
                    />
                    <input
                        type="submit"
                        className="w-1/2 bg-red-500 text-white font-semibold p-2.5 rounded-md cursor-pointer"
                        value={loading ? "..." : "Нэвтрэх"}
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    );
}
