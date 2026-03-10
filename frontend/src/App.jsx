import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatInterface from './components/ChatInterface'
import AddSourceModal from './components/AddSourceModal'

export default function App() {
  const [sources, setSources] = useState([])
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false)

  const handleSourceAdded = (source) => {
    setSources((prev) => [...prev, source])
  }

  return (
    <div className="flex h-screen w-full bg-[#fdfdfc] dark:bg-[#0a0f0d] font-sans overflow-hidden text-emerald-950 dark:text-emerald-50 selection:bg-emerald-200 dark:selection:bg-emerald-900/50">
      <Sidebar
        sources={sources}
        onAddSource={() => setIsAddSourceOpen(true)}
      />

      <ChatInterface
        hasSources={sources.length > 0}
      />

      <AddSourceModal
        open={isAddSourceOpen}
        onOpenChange={setIsAddSourceOpen}
        onSourceAdded={handleSourceAdded}
      />
    </div>
  )
}
