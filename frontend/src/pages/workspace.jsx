import Sidebar from "../components/Sidebar"
import ChatPanel from "../components/ChatPanel"
import TopBar from "../components/TopBar"

export default function Workspace() {

    return (

        <div className="h-screen flex flex-col">

            <TopBar />

            <div className="flex flex-1">

                <Sidebar />

                <ChatPanel />

            </div>

        </div>

    )

}