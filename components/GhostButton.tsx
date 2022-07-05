import { MouseEventHandler } from 'react'
import styles from './GhostButton.module.scss'
import IconChevron from './IconChevron'
type GhostButtonProps ={isCollapsed:boolean,handleClick:MouseEventHandler<HTMLButtonElement>,disabled?:boolean }

const GhostButton = ({isCollapsed,handleClick,disabled=false}:GhostButtonProps)=>{
    return  <button className={isCollapsed? styles.toggle_button_collapsed:styles.toggle_button} onClick={handleClick} disabled={disabled}>
    <p className={styles.toggle_button_text}>modify</p>
    <IconChevron className={styles.toggle_button_icon}/>
    </button>
}

export default GhostButton