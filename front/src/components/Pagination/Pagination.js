import './Pagination.scss'
import {useState, useMemo, useEffect} from "react";
import pagination from '../../images/pagination.svg'
import { Ring } from 'react-spinners-css';
export default function Pagination({totalPages, loading, className, callPage, currentPage}) {


  let draftButtons = []

  if (totalPages > 4) {
    if (currentPage > 5) {
      for (let i = 4; i >= 0; --i) {
        draftButtons.push({
          number: currentPage - i,
          active: false
        })
      }
    } else {
      draftButtons = [
        {number: 1, active: false},
        {number: 2, active: false},
        {number: 3, active: false},
        {number: 4, active: false},
        {number: 5, active: false},
      ]
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      draftButtons.push({
        number: i,
        active: i === 1
      })
    }
  }

  const [buttons, setButtons] = useState(draftButtons)

  useEffect(() => {
    setButtons(draftButtons)
  }, [totalPages])


  useEffect(() => {
    if (currentPage) {
      btnClick(currentPage, false)
    }
  }, [currentPage])


  let activeNumber = null
  buttons.forEach(button => {
    if (button.active) {
      activeNumber = button.number
    }
  })

  function goNext() {
      if ((activeNumber >= 3) && ((totalPages - activeNumber) >= 3)) {
        setButtons(buttons.map((button, index) => {
          button.active = index === 2;
          button.number += 1
          return button
        }))
      } else {
        setButtons(buttons.map(button => {
          if (button.number === activeNumber) {
            return {
              ...button,
              active: false
            }
          } else if (button.number === activeNumber + 1) {
            return {
              ...button,
              active: true
            }
          } else {
            return button
          }
        }))
      }
      callPage(activeNumber + 1)
  }

  function goPrev() {
    if (totalPages > 5 && activeNumber > 3 && ((totalPages - activeNumber) > 1)) {
      setButtons(buttons.map((button, index) => {
        button.active = index === 2;
        button.number -= 1
        return button
      }))
    } else {
      setButtons(buttons.map(button => {
        if (button.number === activeNumber) {
          return {
            ...button,
            active: false
          }
        } else if (button.number === activeNumber - 1) {
          return {
            ...button,
            active: true
          }
        } else {
          return button
        }
      }))
    }
    callPage(activeNumber - 1)
  }


  function btnClick(buttonNumber, loadData = true) {
    if ((totalPages > 5 && buttonNumber > 3 && ((totalPages - buttonNumber) > 1)) || ((buttonNumber >= 3) && ((totalPages - buttonNumber) >= 3))) {
      setButtons(buttons.map((button, index) => {
        button.active = index === 2;
        if (index === 0) {
          button.number = buttonNumber - 2
        } else if (index === 1) {
          button.number = buttonNumber - 1
        } else if (index === 2) {
          button.number = buttonNumber
        } else if (index === 3) {
          button.number = buttonNumber + 1
        } else if (index === 4) {
          button.number = buttonNumber + 2
        }
        return button
      }))
    } else  {
      if (buttonNumber === 2) {
        setButtons(buttons.map((button, index) => {
          button.active = index === 1;
          if (index === 0) {
            button.number = buttonNumber - 1
          } else if (index === 1) {
            button.number = buttonNumber
          } else if (index === 2) {
            button.number = buttonNumber + 1
          } else if (index === 3) {
            button.number = buttonNumber + 2
          } else if (index === 4) {
            button.number = buttonNumber + 3
          }
          return button
        }))
      } else if (buttonNumber + 1 === totalPages && totalPages > 5) {
        setButtons(buttons.map((button, index) => {
          button.active = index === 3;
          if (index === 0) {
            button.number = buttonNumber - 3
          } else if (index === 1) {
            button.number = buttonNumber - 2
          } else if (index === 2) {
            button.number = buttonNumber - 1
          } else if (index === 3) {
            button.number = buttonNumber
          } else if (index === 4) {
            button.number = buttonNumber + 1
          }
          return button
        }))
      } else {
        setButtons(buttons.map((button, index) => {
          button.active = button.number === buttonNumber;
          return button
        }))
      }
    }
    if (loadData) {
      callPage(buttonNumber)
    }
  }


  function clickNextDots() {
    const nextNumber = activeNumber + 3
    if (totalPages - nextNumber >= 2) {
        setButtons(buttons.map((button, index) => {
          button.active = index === 2;
          if (index === 0) {
            button.number = nextNumber - 2
          } else if (index === 1) {
            button.number = nextNumber - 1
          } else if (index === 2) {
            button.number = nextNumber
          } else if (index === 3) {
            button.number = nextNumber + 1
          } else if (index === 4) {
            button.number = nextNumber + 2
          }
          return button
        }))
    } else if (totalPages - nextNumber === 1) {
      setButtons(buttons.map((button, index) => {
        button.active = index === 3;
        if (index === 0) {
          button.number = nextNumber - 3
        } else if (index === 1) {
          button.number = nextNumber - 2
        } else if (index === 2) {
          button.number = nextNumber - 1
        } else if (index === 3) {
          button.number = nextNumber
        } else if (index === 4) {
          button.number = nextNumber + 1
        }
        return button
      }))
    } else if (totalPages - nextNumber <= 0) {
      setButtons(buttons.map((button, index) => {
        button.active = index === 4;
        if (index === 0) {
          button.number = totalPages - 4
        } else if (index === 1) {
          button.number = totalPages - 3
        } else if (index === 2) {
          button.number = totalPages - 2
        } else if (index === 3) {
          button.number = totalPages - 1
        } else if (index === 4) {
          button.number = totalPages
        }
        return button
      }))
    }
    callPage(nextNumber)
  }
  function clickPrevDots() {
    const nextNumber = activeNumber - 3
    if (nextNumber >= 3) {
      setButtons(buttons.map((button, index) => {
        button.active = index === 2;
        if (index === 0) {
          button.number = nextNumber - 2
        } else if (index === 1) {
          button.number = nextNumber - 1
        } else if (index === 2) {
          button.number = nextNumber
        } else if (index === 3) {
          button.number = nextNumber + 1
        } else if (index === 4) {
          button.number = nextNumber + 2
        }
        return button
      }))
    } else if (nextNumber === 2) {
      setButtons(buttons.map((button, index) => {
        button.active = index === 1;
        if (index === 0) {
          button.number = nextNumber - 1
        } else if (index === 1) {
          button.number = nextNumber
        } else if (index === 2) {
          button.number = nextNumber + 1
        } else if (index === 3) {
          button.number = nextNumber + 2
        } else if (index === 4) {
          button.number = nextNumber + 3
        }
        return button
      }))
    } else if (nextNumber <= 1) {
      setButtons(buttons.map((button, index) => {
        button.active = index === 0;
        if (index === 0) {
          button.number = nextNumber
        } else if (index === 1) {
          button.number = nextNumber + 1
        } else if (index === 2) {
          button.number = nextNumber + 2
        } else if (index === 3) {
          button.number = nextNumber + 3
        } else if (index === 4) {
          button.number = nextNumber + 4
        }
        return button
      }))
    }
    callPage(nextNumber)
  }


  const disabledPrevBtn = useMemo(() => {
    return buttons[0].active && buttons[0].number === 1
  }, [buttons])

  const disabledNextBtn = useMemo(() => {
    return buttons[buttons.length - 1].active && buttons[buttons.length - 1].number === totalPages
  }, [buttons, totalPages])



  return (
    <div className={`pagination ${className}`}>
      <button disabled={disabledPrevBtn} className={`pagination__arrow-left ${disabledPrevBtn ? 'opacity-3' : ''}`} onClick={() => goPrev()}>
        <img src={pagination} alt="arrow-right" style={{transform: 'rotate(180deg)'}}/>
      </button>
      {!(totalPages <= 5 ||  buttons[0].number === 1) && <button onClick={() => clickPrevDots()}>...</button>}
      {buttons.map(({number, active}, index) =>
        <button onClick={() => btnClick(number)} className={`pagination__button ${active ? 'active' : ''}`} key={index}>
          { active && loading ? <Ring size={30} color="#fff"/> : number}
        </button>
      )}
      {!(totalPages <= 5 || buttons[buttons.length - 1].number === totalPages) && <button onClick={() => clickNextDots()}>...</button>}
      <button disabled={disabledNextBtn} className={`pagination__arrow-right ${disabledNextBtn ? 'opacity-3' : ''}`} onClick={() => goNext()}>
        <img src={pagination} alt="arrow-right"/>
      </button>
    </div>
  )
}