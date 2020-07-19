import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useModalActionsContext } from 'contexts/ModalContext'
import { useGameActionsContext, useGameContext } from 'contexts/GameContext'
import Api from 'services'
import './style.scss'

export const ModalCreateRoom = () => {
  const [roomName, setRoomName] = useState('')
  const [roomSize, setRoomSize] = useState(5)
  const [lang, setLang] = useState('en')
  const history = useHistory()

  const { activeRoom } = useGameContext()
  const { closeModal, setError } = useModalActionsContext()
  const { createRoom } = useGameActionsContext()

  useEffect(() => {
    if (activeRoom) {
      closeModal('create')
      history.push(`/rooms/${activeRoom.Id}`)
    }
  }, [history, activeRoom, closeModal])

  const confirmRoom = async () => {
    try {
      const newRoom = await Api.createRoom({ name: roomName, size: roomSize }, lang)
      createRoom(newRoom.Id, roomName, roomSize, lang)
    } catch (err) {
      setError('Cannot create room!!')
    }
  }

  return (
    <div className='modal-create'>
      <div className='dialog'>
        <div className='header'>
          <div>Create room</div>
          <button className='btn-close' onClick={() => closeModal('create')} />
        </div>
        <div className='body'>
          <div className='content'>
            <div className='room-name'>
              <div className='text'>Room name:</div>
              <div className='panel wrapper block'>
                <input
                  type='text'
                  value={roomName}
                  placeholder='Room 123'
                  onChange={e => setRoomName(e.target.value)}
                />
              </div>
            </div>

            <div className='room-size'>
              <div className='text'>Max Size:</div>
              <div className='panel wrapper block'>
                <input
                  type='number'
                  placeholder='0'
                  value={roomSize}
                  onChange={e => setRoomSize(e.target.value)}
                />
              </div>
            </div>

            <div className='room-lang'>
              <div className='text'>Language:</div>
              <div className='panel'>
                <label>
                  <input
                    type='radio' value='en'
                    name='lang' checked={lang === 'en'}
                    onChange={(e) => setLang(e.target.value)}
                  />
                  <i />
                  <span>Global</span>
                </label>
                <label>
                  <input
                    type='radio' value='vi'
                    name='lang' checked={lang === 'vi'}
                    onChange={(e) => setLang(e.target.value)}
                  />
                  <i />
                  <span>Vietnam</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='footer'>
          <button className='btn-confirm block dark-blue' onClick={() => confirmRoom()}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
