import { useCallback, useState } from 'react'
import { UploadCloud, FileSpreadsheet, Trash2, Eye, Upload } from 'lucide-react'
import Button from '../../components/marketing/Button'
import ChartCard from '../../components/marketing/ChartCard'
import DataTable from '../../components/marketing/DataTable'
import StatusBadge from '../../components/marketing/StatusBadge'
import Modal from '../../components/marketing/Modal'
import { useToast } from '../../components/marketing/Toast'
import { DATASET } from '../../data/marketingMockData'

const COLUMNS = [
  { key: 'customer_id', label: 'Customer ID' },
  { key: 'gender', label: 'Gender' },
  { key: 'age', label: 'Age' },
  { key: 'city', label: 'City' },
  { key: 'spend', label: 'Total Spend (₹)' },
  { key: 'orders', label: 'Orders' },
  { key: 'category', label: 'Top Category' },
  { key: 'device', label: 'Device' },
]

export default function DatasetManagementPage() {
  const { show } = useToast()
  const [dragging, setDragging] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [datasets, setDatasets] = useState([DATASET])

  const handleDrop = useCallback(() => {
    setDragging(false)
    show('File upload will be connected to the backend later.', 'info')
  }, [show])

  const handleDelete = (name) => {
    setDatasets((d) => d.filter((x) => x.name !== name))
    show(`Dataset "${name}" deleted (frontend demo).`, 'success')
  }

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          handleDrop()
        }}
        className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-14 text-center transition ${
          dragging ? 'border-violet-500 bg-violet-50' : 'border-slate-300 bg-white'
        }`}
      >
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl transition ${
            dragging ? 'bg-violet-600 text-white' : 'bg-violet-100 text-violet-600'
          }`}
        >
          <UploadCloud className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">Drag & drop your dataset</h3>
        <p className="mt-1 text-sm text-slate-500">CSV files up to 50 MB (customer_behavior.csv expected)</p>
        <label className="mt-5 cursor-pointer">
          <Button type="button" icon={Upload} onClick={() => show('File picker will be connected later.', 'info')}>
            Upload CSV
          </Button>
        </label>
      </div>

      <ChartCard title="Datasets" subtitle="Uploaded customer behaviour datasets">
        <div className="space-y-3">
          {datasets.map((ds) => (
            <div
              key={ds.name}
              className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-violet-300 sm:flex-row sm:items-center"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-slate-900">{ds.name}</p>
                  <StatusBadge status={ds.status} />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {ds.records.toLocaleString()} records · {ds.columns} columns · Uploaded {ds.uploadDate}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" icon={Eye} onClick={() => setPreviewOpen(true)}>
                  View Dataset
                </Button>
                <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleDelete(ds.name)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>

      <Modal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title="Dataset Preview"
        subtitle={`${DATASET.name} · first 8 rows of ${DATASET.records.toLocaleString()} records`}
        size="lg"
      >
        <DataTable columns={COLUMNS} rows={DATASET.preview} />
      </Modal>
    </div>
  )
}
