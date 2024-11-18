import React from 'react'
import ParticipantsTable from './CurrentParticpants'
import WinnersTable from './LatestWinners'
import LotteryRolledTable from './LotteryRolledTable'

function StatsGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
    {/* Current Participants */}
    <ParticipantsTable />
    {/* Latest Winners */}
    <WinnersTable />
    {/* <LotteryRolledTable /> */}
    
  </div>
  )
}

export default StatsGrid