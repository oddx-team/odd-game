import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ModalContext } from 'contexts/ModalContext'
import { useGameActionsContext } from 'contexts/GameContext'
import classNames from 'classnames'
import styles from './styles.module.scss'
import Api from 'services'

export const HeaderMenu = () => {
  const history = useHistory()
  const { logoutGame } = useGameActionsContext()
  const { setError, setMenu, state } = useContext(ModalContext)
  const { openMenu } = state

  const menuClass = openMenu
    ? classNames(styles.menu, styles.open)
    : classNames(styles.menu)

  const logout = async () => {
    try {
      await Api.logout()
      history.push('/')
      logoutGame()
    } catch (err) {
      console.log(err)
      setError('Something went terribly wrong!')
    }
  }

  const openProfile = () => {
    setMenu(false)
  }

  return (
    <div
      className={menuClass}
      onMouseEnter={() => setMenu(true)}
      onMouseLeave={() => setMenu(false)}
    >
      <button className={styles.menuBtn} />
      <div className={styles.dropdown}>
        <div className={styles.profile} onClick={() => openProfile()}>My Profile</div>
        <div className={styles.logout} onClick={() => logout()}>Logout</div>
      </div>
    </div>
  )
}

export default HeaderMenu
