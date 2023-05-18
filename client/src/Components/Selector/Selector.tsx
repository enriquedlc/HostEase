import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Tag } from "../../Types/Types"

import styles from "./Selector.module.css"

type MultipleSelectProps = {
    multiple: true
    value?: Tag[]
    color?: string
    name: string;
    onChange: (value: Tag[], name: string) => void
}

type SingleSelectProps = {
    multiple?: false
    value?: Tag
    name: string;
    onChange: (value: Tag | undefined, name: string) => void
}

type SelectProps = {
    options: Tag[]
} & (SingleSelectProps | MultipleSelectProps)

export default function Select({ multiple, value, onChange, options, name }: SelectProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [highlightedIndex, setHighlightedIndex] = useState(0)

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    const clearOptions = () => {
        multiple ? onChange([], name) : onChange(undefined, name)
    }

    const selectOption = (option: Tag) => {
        if (multiple) {
            if (value?.includes(option)) {
                onChange(value.filter(optn => optn !== option), name)
            } else {
                value && onChange([...value, option], name)
            }
        } else {
            if (option !== value) onChange(option, name)
        }
    }

    const isOptionSelected = (option: Tag) => {
        return multiple ? value?.includes(option) : option === value
    }

    const motionButtonProps = {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9 },
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 2 } }
    };

    return (
        <motion.div onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(prev => !prev)} tabIndex={0} className={styles.container}>
            <span className={styles.value}>{multiple ? value?.map(value => (
                <motion.button key={value.id}
                    onClick={e => {
                        e.stopPropagation(); selectOption(value)
                    }} className={styles["option-badge"]}
                    {...motionButtonProps}>
                    <span className={styles["tag-color"]} style={{ backgroundColor: value.color }} />
                    {value.tag}
                    <motion.span
                        className={styles["remove-btn"]}
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 1.7 }}>
                        &times;
                    </motion.span>
                </motion.button>
            )) : value?.tag}</span>
            <motion.button
                onClick={e => { e.stopPropagation(); clearOptions() }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.2 }}
                className={styles["clear-btn"]}>
                &times;
            </motion.button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <AnimatePresence>
                {isOpen && <motion.ul
                    className={`${styles.options} ${isOpen ? styles.show : ""}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {options.map((option, index) => (
                        <li
                            onClick={e => {
                                e.stopPropagation()
                                selectOption(option)
                                setIsOpen(false)
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            key={option.id}
                            className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""
                                } ${index === highlightedIndex ? styles.highlighted : ""
                                } `}
                        >
                            {option.tag}
                        </li>
                    ))}
                </motion.ul>}
            </AnimatePresence>
        </motion.div>
    )
}


