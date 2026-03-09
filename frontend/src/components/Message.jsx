export default function Message({ role, text }) {

    return (

        <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-4`}>

            <div className={`max-w-xl p-3 rounded-lg text-sm leading-relaxed
${role === "user" ? "bg-purple-600" : "bg-[#1b1b2b]"}`}>

                {text}

            </div>

        </div>

    )

}