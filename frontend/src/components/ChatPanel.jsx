import { useState } from "react"
import { chat } from "../services/api"
import Message from "./Message"

export default function ChatPanel() {

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const send = async () => {

        if (!input) return

        const userMsg = { role: "user", text: input }

        setMessages(prev => [...prev, userMsg])
        setInput("")
        setLoading(true)

        try {

            const res = await chat(input)

            const aiMsg = {
                role: "ai",
                text: res.data.answer
            }

            setMessages(prev => [...prev, aiMsg])

        } catch {

            setMessages(prev => [...prev, {
                role: "ai",
                text: "Error generating response."
            }])

        }

        setLoading(false)

    }

    return (

        <div className="flex flex-col flex-1">

            <div className="flex-1 overflow-y-auto scrollbar p-8">

                {messages.length === 0 && (

                    <div className="text-center mt-32 text-gray-500">

                        Ask questions about your sources

                    </div>

                )}

                {messages.map((m, i) =>

                    <Message key={i} role={m.role} text={m.text} />

                )}

                {loading && (

                    <div className="text-gray-400 text-sm">
                        Thinking...
                    </div>

                )}

            </div>

            <div className="border-t border-gray-800 p-4 flex gap-3">

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 bg-[#1b1b2b] p-3 rounded"
                />

                <button
                    onClick={send}
                    className="bg-purple-600 px-6 rounded hover:bg-purple-700"
                >

                    Send

                </button>

            </div>

        </div>

    )

}