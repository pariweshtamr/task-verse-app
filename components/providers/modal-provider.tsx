"use client"

import { useEffect, useState } from "react"
import { FormModal } from "../modals/form-modal"

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <FormModal />
}
