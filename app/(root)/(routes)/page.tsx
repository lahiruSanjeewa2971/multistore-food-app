'use client'

import { Modal } from '@/components/modal'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

const SetupPage = () => {
  return (
    <div>
      hiii
      <Modal
        title='Create your store'
        description='This is the store modal' 
        isOpen
        onClose={() => { }}
      >
        This is the store modal
      </Modal>
    </div>
  )
}

export default SetupPage