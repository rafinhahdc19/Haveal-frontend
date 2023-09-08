import React from 'react'
import { useRef } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Copylink = ({textToCopy}) => {
  return (
    <>
        <div className='bg-gray-100 flex border rounded p-2'>
            <div>
                <CopyToClipboard text={textToCopy}>
                    <Button  
                        padding={1} colorScheme='blue'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                    </Button>
                </CopyToClipboard>
            </div>
            <div className=' mt-auto mb-auto ml-2 overflow-hidden'>
                <h3 className='text-xl' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{textToCopy}</h3>
            </div>
        </div>
    </>
  )
}

export default Copylink