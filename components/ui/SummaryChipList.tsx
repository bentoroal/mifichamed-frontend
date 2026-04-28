type SummaryChipItem = {
  id: number | string
  label: string
}

type SummaryChipListProps<T extends SummaryChipItem> = {
  items: T[]
  emptyMessage: string
  getItemClassName?: (item: T) => string
  onItemClick?: (item: T) => void
}

const defaultItemClassName =
  "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"

export default function SummaryChipList<T extends SummaryChipItem>({
  items,
  emptyMessage,
  getItemClassName,
  onItemClick,
}: SummaryChipListProps<T>) {
  if (items.length === 0) {
    return <p className="text-gray-500">{emptyMessage}</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onItemClick?.(item)}
          className={[
            "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
            onItemClick ? "cursor-pointer" : "cursor-default",
            getItemClassName?.(item) ?? defaultItemClassName,
          ].join(" ")}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
