import { useState } from "react"
import { addYoutube } from "../services/api"

export default function SourcePanel() {

    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)

    const addSource = async () => {

        if (!url) return

        setLoading(true)

        await addYoutube(url)

        setUrl("")
        setLoading(false)

    }

    return (

        <div className="w-[320px] bg-[#121218] border-r border-[#23232c] flex flex-col">

            <div className="p-6 border-b border-[#23232c]">

                <h1 className="text-lg font-semibold">
                    DeepLecture
                </h1>

            </div>

            <div className="p-6 flex flex-col gap-3">

                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste YouTube link"
                    className="bg-[#1a1a23] p-3 rounded-md outline-none"
                />

                <button
                    onClick={addSource}
                    className="bg-purple-600 rounded-md py-2">

                    {loading ? "Processing" : "Add Source"}

                </button>

            </div>

        </div>

    )

}