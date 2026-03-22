"use client"

import { useEffect, useState } from "react"
import BaseModal from "@/components/ui/BaseModal"
import { useFetch } from "@/hooks/useFetch"
import { createCondition, createUserCondition, updateUserCondition, getConditionCategories, getConditionsByCategory } from "@/features/conditions/services/conditionServices"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/TextArea"
import FormField from "@/components/ui/FormField"
import StatusSelector from "@/components/ui/StatusSelector"
import { conditionCategoryLabels, conditionStatusLabels } from "../utils/conditionLabels"

export default function ConditionModal({
  isOpen,
  onClose,
  onSuccess,
  mode = "create",
  condition = null,
}: any) {

  const isEdit = mode === "edit"

  const [form, setForm] = useState({
    category: "",
    condition_id: null as number | null,
    condition_name: "",
    start_date: "",
    end_date: "",
    status: "active",
    notes: "",
  })

  const [isOngoing, setIsOngoing] = useState(true)
  const [errors, setErrors] = useState<any>({})
  const [isCustom, setIsCustom] = useState(false)


  const { data: categories } = useFetch(
    getConditionCategories,
    isOpen
  )

  const { data: conditions } = useFetch(
    () => getConditionsByCategory(form.category),
    !!form.category
  )

  // 🧠 cargar datos edit
  useEffect(() => {
    if (isEdit && condition) {
      setForm({
        category: condition.condition?.category || "",
        condition_id: condition.condition?.id || null,
        condition_name: condition.condition?.name || "",
        start_date: condition.start_date || "",
        end_date: condition.end_date || "",
        status: condition.status || "active",
        notes: condition.notes || "",
      })

      setIsOngoing(!condition.end_date)
    }
  }, [condition])

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev: any) => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const newErrors: any = {}

    if (!isEdit) {
      if (!form.category) {
        newErrors.category = "Requerido"
      }

      if (isCustom) {
        if (!form.condition_name?.trim()) {
          newErrors.condition_name = "Requerido"
        }
      } else {
        if (!form.condition_id) {
          newErrors.condition_id = "Requerido"
        }
      }
    }

    if (!form.start_date) {
      newErrors.start_date = "Requerido"
    }

    if (
      !isOngoing &&
      form.end_date &&
      form.start_date &&
      form.end_date < form.start_date
    ) {
      newErrors.end_date = "Fecha inválida"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    try {
      let conditionId = form.condition_id

      // 🔥 SI ES CUSTOM → crear primero
      if (!isEdit && isCustom) {
        const newCondition = await createCondition({
          name: form.condition_name,
          category: form.category,
        })

        conditionId = newCondition.id
      }

      const payload = {
        condition_id: conditionId, // ✅ ahora sí
        start_date: form.start_date,
        end_date: isOngoing ? null : form.end_date,
        status: form.status,
        notes: form.notes,
      }

      if (isEdit) {
        await updateUserCondition(condition.id, payload)
      } else {
        await createUserCondition(payload)
      }

      onSuccess()
      onClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-4">
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title={isEdit ? "Editar Enfermedad" : "Añadir Enfermedad"}
        footer={
          <>
            <button onClick={onClose}>Cancelar</button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-[var(--dark-mint)] text-white"
            >
              Guardar
            </button>
          </>
        }
      >

        {/* CATEGORY */}
        <FormField label="Categoría" error={errors.category}>
          <Select
            value={form.category}
            disabled={isEdit}
            onChange={(e: any) => {
              handleChange("category", e.target.value)
              handleChange("condition_id", null)

              setErrors((prev: any) => ({
                ...prev,
                condition_id: null,
              }))
            }}
            options={(categories || []).map((c: any) => ({
              value: c,
              label: conditionCategoryLabels[c] || c,
            }))}
            error={errors.category}
          />
        </FormField>

        {/* CONDITION */}
        <FormField
          label="Enfermedad"
          error={isCustom ? errors.condition_name : errors.condition_id}
        >
          <div className="flex gap-2">

            {!isCustom ? (
              <Select
                value={form.condition_id ?? ""}
                disabled={isEdit || !form.category}
                onChange={(e: any) => {
                  const selected = conditions.find(
                    (c: any) => c.id === Number(e.target.value)
                  )

                  handleChange("condition_id", selected?.id)
                  handleChange("condition_name", selected?.name)
                }}
                options={conditions.map((c: any) => ({
                  value: c.id,
                  label: c.name,
                }))}
                error={errors.condition_id}
              />
            ) : (
              <Input
                type="text"
                placeholder="Nombre de la enfermedad"
                value={form.condition_name}
                onChange={(e: any) =>
                  handleChange("condition_name", e.target.value)
                }
                error={errors.condition_name}
              />
            )}

            {!isEdit && (
              <button
                type="button"
                onClick={() => {
                  setIsCustom(!isCustom)

                  handleChange("condition_id", null)
                  handleChange("condition_name", "")

                  // 🔥 limpiar errores
                  setErrors((prev: any) => ({
                    ...prev,
                    condition_id: null,
                    condition_name: null,
                  }))
                }}
                className="px-3 rounded-lg border text-sm whitespace-nowrap hover:bg-slate-50"
              >
                {isCustom ? "Usar lista" : "+ Nueva"}
              </button>
            )}
          </div>
        </FormField>

        {/* DATES */}
        
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Fecha inicio" error={errors.start_date}>
            <Input
              type="date"
              value={form.start_date}
              onChange={(e: any) =>
                handleChange("start_date", e.target.value)
              }
              error={errors.start_date}
            />
          </FormField>
          <FormField label="Fecha fin" error={errors.end_date}>
            <Input
              type="date"
              value={form.end_date}
              disabled={isOngoing}
              onChange={(e: any) =>
                handleChange("end_date", e.target.value)
              }
              error={errors.end_date}
            />
          
            </FormField>
          </div>

        {/* CHECK */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isOngoing}
            onChange={(e) => setIsOngoing(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-slate-700">
            Sigue presente
          </span>
        </div>
        
        {/* ESTADO */}
        <FormField label="Estado">
          <StatusSelector
            value={form.status}
            onChange={(val) => handleChange("status", val)}
            options={Object.entries(conditionStatusLabels).map(
              ([value, label]) => ({
                value,
                label,
              })
            )}
          />
        </FormField>

        {/* NOTES */}
        <FormField label="Notas" error={errors.notes}>
          <Textarea
            value={form.notes}
            onChange={(e: any) =>
              handleChange("notes", e.target.value)
            }
            placeholder="Agrega detalles relevantes (opcional)..."
          />
        </FormField>

      </BaseModal>
    </div>
  )
}