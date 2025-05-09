/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'
import { HiEllipsisVertical } from 'react-icons/hi2'
import styled from 'styled-components'
import { useOutsideClick } from '../hooks/useOutsideClick'

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`

const StyledList = styled.ul`
  position: absolute;
  z-index: 1000;
  right: 0;
  ${({ $direction }) =>
    $direction === 'up'
      ? 'bottom: 100%; margin-bottom: 0.4rem;'
      : 'top: 100%; margin-top: 0.4rem;'}

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
`

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;
  min-width: 16rem;
  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  span {
    flex-grow: 1;
  }
`
const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const MenusContext = createContext()

function Menus({ children }) {
  const [openId, setOpenId] = useState('')
  const [direction, setDirection] = useState('down')

  const close = () => setOpenId('')
  const open = (id) => setOpenId(id)

  return (
    <MenusContext.Provider
      value={{ openId, close, open, direction, setDirection }}
    >
      {children}
    </MenusContext.Provider>
  )
}

function Menu({ children }) {
  return <MenuWrapper>{children}</MenuWrapper>
}

function Toggle({ id }) {
  const { openId, close, open, setDirection } = useContext(MenusContext)

  function handleClick(e) {
    e.stopPropagation()
    openId === '' || openId !== id ? open(id) : close()

    const buttonRect = e.target.closest('button').getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const spaceBelow = viewportHeight - buttonRect.bottom

    // If less than 200px below, open upward
    setDirection(spaceBelow < 200 ? 'up' : 'down')
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  )
}

function List({ children, id }) {
  const { openId, close, direction } = useContext(MenusContext)
  const ref = useOutsideClick(close, false)

  if (openId !== id) return null

  return (
    <StyledList ref={ref} $direction={direction}>
      {children}
    </StyledList>
  )
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext)
  function handleClick() {
    onClick?.()
    close()
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  )
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus
