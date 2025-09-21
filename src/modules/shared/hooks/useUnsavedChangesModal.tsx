import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface UseUnsavedChangesModalOptions {
  hasDifferences: boolean
}

export function useUnsavedChangesModal({ hasDifferences }: UseUnsavedChangesModalOptions) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const [refreshAction, setRefreshAction] = useState<boolean>(true)

  const checkUnsavedChanges = useCallback((nextUrl: string) => {
    if (hasDifferences) {
      setShowModal(true)
      setPendingUrl(nextUrl)
      return false
    } else {
      router.push(nextUrl)
      return true
    }
  }, [hasDifferences, router])

  const handleModalConfirm = useCallback(() => {
    setShowModal(false)
    if (pendingUrl) {
      router.push(pendingUrl)
      setPendingUrl(null)
      setRefreshAction(false)
    }
  }, [pendingUrl, router])

  const handleModalCancel = useCallback(() => {
    setShowModal(false)
    setPendingUrl(null)
  }, [])

  return {
    showModal,
    checkUnsavedChanges,
    handleModalConfirm,
    handleModalCancel,
    refreshAction
  }
}
