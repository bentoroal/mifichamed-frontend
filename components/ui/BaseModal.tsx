"use client"

import { useRef } from "react"
import { X } from "lucide-react"

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: any) {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onMouseDown={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-lg rounded-xl shadow-xl flex flex-col max-h-[90vh]"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="font-semibold text-lg">{title}</h2>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {children}
        </div>

        {/* FOOTER */}
        {footer && (
          <div className="px-6 py-4 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}