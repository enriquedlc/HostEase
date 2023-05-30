import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Tag } from "../../Types/Types";

import TagCard from "../TagCard/TagCard";
import styles from "./Selector.module.css";

type MultipleSelectProps = {
  multiple: true;
  value?: Tag[];
  color?: string;
  name: string;
  onChange: (value: Tag[], name: string) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: Tag;
  name: string;
  onChange: (value: Tag | null, name: string) => void;
};

type SelectProps = {
  options: Tag[];
  isDisabled?: boolean;
} & (SingleSelectProps | MultipleSelectProps);

export default function Select({
  multiple,
  value,
  onChange,
  options,
  name,
  isDisabled,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (isOpen && !isDisabled) setHighlightedIndex(0);
  }, [isOpen]);

  const clearOptions = () => {
    if (!isDisabled) {
      if (multiple) {
        onChange([], name);
      } else {
        onChange(null, name);
      }
    }
  };

  const selectOption = (option: Tag) => {
    if (!isDisabled) {
      if (multiple) {
        if (value?.includes(option)) {
          onChange(
            value.filter((optn) => optn !== option),
            name
          );
        } else {
          value && onChange([...value, option], name);
        }
      } else {
        if (option !== value) onChange(option, name);
      }
    }
  };

  const isOptionSelected = (option: Tag) => {
    return !isDisabled && multiple ? value?.includes(option) : option === value;
  };

  const handleClick = (event: React.MouseEvent) => {
    if (!isDisabled) {
      event.stopPropagation();
      setIsOpen(true);
    }
  };

  const handleOptionClick = (option: Tag, event: React.MouseEvent) => {
    if (!isDisabled) {
      event.stopPropagation();
      selectOption(option);
      setIsOpen(false);
    }
  };

  const handleBadgeClick = (value: Tag, event: React.MouseEvent) => {
    if (!isDisabled) {
      event.stopPropagation();
      selectOption(value);
    }
  };

  const motionButtonProps = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 2 } },
  };

  return (
    <motion.div
      onClick={handleClick} // Modificar esta línea
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={styles.container}
      style={{ opacity: isDisabled ? 0.7 : 1 }}
    >
      <span className={styles.value}>
        {multiple
          ? value?.map((value) => (
              <TagCard
                style={{ cursor: "pointer" }}
                key={value.id}
                onClick={(e: any) => handleBadgeClick(value, e)}
                color={value.color}
                text={value.tag}
              />
            ))
          : value?.tag}
      </span>
      <motion.button
        {...motionButtonProps}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.2 }}
        className={styles["clear-btn"]}
      >
        &times;
      </motion.button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={`${styles.options} ${isOpen ? styles.show : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {options.map((option, index) => (
              <li
                onClick={(e) => handleOptionClick(option, e)}
                onMouseEnter={() => setHighlightedIndex(index)}
                key={option.id}
                className={`${styles.option} ${
                  isOptionSelected(option) ? styles.selected : ""
                } ${index === highlightedIndex ? styles.highlighted : ""} `}
              >
                {option.tag}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
