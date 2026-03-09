import { useState } from "react"
import { addYoutube } from "../services/api"
import SourceCard from "./SourceCard"

export default function Sidebar() {

    const [url, setUrl] = useState("")
    const [sources, setSources] = useState([])
    const [loading, setLoading] = useState(false)

    const addSource = async () => {

        if (!url) return

        setLoading(true)

        try {

            await addYoutube(url)

            const title = url.split("v=")[1]

            setSources(prev => [...prev, title])

            setUrl("")

        } catch {

            alert("Error adding source")

        }

        setLoading(false)

    }

    return (

        <div className="w-80 bg-[#0f0f1a] border-r border-gray-800 flex flex-col">

            <div className="p-4 border-b border-gray-800">

                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Add YouTube source..."
                    className="w-full bg-[#1b1b2b] p-2 rounded text-sm"
                />

                <button
                    onClick={addSource}
                    className="mt-2 w-full bg-purple-600 p-2 rounded text-sm hover:bg-purple-700"
                >

                    {loading ? "Processing..." : "Add Source"}

                </button>

            </div>

            <div className="p-4 flex flex-col gap-2 overflow-y-auto scrollbar">

                {sources.map((s, i) =>

                    <SourceCard key={i} title={s} />

                )}

            </div>

        </div>

    )

}