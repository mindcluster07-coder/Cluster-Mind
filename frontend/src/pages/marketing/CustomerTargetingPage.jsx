import { useState } from 'react'
import { Crosshair, Megaphone } from 'lucide-react'
import SegmentCard from '../../components/marketing/SegmentCard'
import ChartCard from '../../components/marketing/ChartCard'
import Button from '../../components/marketing/Button'
import { useToast } from '../../components/marketing/Toast'
import { TARGETING_SEGMENTS } from '../../data/marketingMockData'

export default function CustomerTargetingPage() {
  const { show } = useToast()
  const [selected, setSelected] = useState(TARGETING_SEGMENTS[0])

  const handleSelect = () => {
    show(`Segment "${selected.name}" selected for targeting.`, 'success')
  }

  const handleCreate = () => {
    show('Campaign creation from this segment is coming soon.', 'info')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Customer Targeting</h2>
        <p className="text-sm text-slate-500">Choose a customer segment to receive your next campaign</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {TARGETING_SEGMENTS.map((segment) => (
          <SegmentCard
            key={segment.id}
            segment={segment}
            selected={selected.id === segment.id}
            onSelect={() => setSelected(segment)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartCard title="Selected Segment" subtitle={`${selected.name} — ${selected.customers.toLocaleString()} customers`} className="xl:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-violet-50 p-4">
              <p className="text-xs text-slate-500">Number of Customers</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{selected.customers.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs text-slate-500">Average Spending</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{selected.avgSpending}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-xs text-slate-500">Favourite Category</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{selected.favouriteCategory}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-xs text-slate-500">Purchase Frequency</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{selected.frequency}</p>
            </div>
          </div>
        </ChartCard>

        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Crosshair className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">Ready to target?</h3>
            <p className="mt-1 text-sm text-slate-500">
              Launch a campaign to the <span className="font-semibold text-slate-800">{selected.name}</span> segment and let the AI
              personalize the messaging.
            </p>
          </div>
          <div className="space-y-2.5">
            <Button className="w-full" icon={Crosshair} onClick={handleSelect}>
              Select Segment
            </Button>
            <Button className="w-full" variant="secondary" icon={Megaphone} onClick={handleCreate}>
              Create Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
