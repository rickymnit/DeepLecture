import { useState } from "react"

export default function ChatInput({ send }) {

    const [text, setText] = useState("")

    const submit = () => {

        if (!text) return

        send(text)

        setText("")

    }

    return (

        <div className="border-t border-[#23232c] p-6">

            <div className="max-w-3xl mx-auto flex gap-3">

                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ask about your sources..."
                    className="flex-1 bg-[#1a1a23] p-3 rounded-md outline-none"
                />

                <button
                    onClick={submit}
                    className="bg-purple-600 px-6 rounded-md">

                    Send

                </button>

            </div>

        </div>

    )

}