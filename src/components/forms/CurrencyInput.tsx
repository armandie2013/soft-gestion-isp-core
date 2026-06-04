// src/components/forms/CurrencyInput.tsx

"use client";

import { useMemo, useState } from "react";

type CurrencyInputProps = {
  id: string;
  name: string;
  defaultValue?: number | string | null;
  placeholder?: string;
  className?: string;
};

function onlyDigits(value?: number | string | null) {
  if (value === null || value === undefined) return "";

  const raw = String(value).trim();

  if (!raw) return "";

  const clean = raw.replace(/\$/g, "").replace(/\s/g, "");

  if (clean.includes(",")) {
    return clean.split(",")[0].replace(/\D/g, "");
  }

  return clean.replace(/\D/g, "");
}

function formatCurrency(digits: string) {
  const cleanDigits = onlyDigits(digits);

  if (!cleanDigits) {
    return "$ ";
  }

  const formatted = cleanDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `$ ${formatted},00`;
}

export function CurrencyInput({
  id,
  name,
  defaultValue,
  placeholder = "$ ",
  className = "",
}: CurrencyInputProps) {
  const initialDigits = useMemo(() => onlyDigits(defaultValue), [defaultValue]);

  const [digitsValue, setDigitsValue] = useState(initialDigits);
  const [displayValue, setDisplayValue] = useState(
    formatCurrency(initialDigits),
  );

  function updateValue(nextDigits: string) {
    const cleanDigits = onlyDigits(nextDigits);

    setDigitsValue(cleanDigits);
    setDisplayValue(formatCurrency(cleanDigits));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const allowedControlKeys = [
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "Escape",
      "Enter",
    ];

    if (allowedControlKeys.includes(event.key)) {
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      return;
    }

    if (event.key === "Backspace") {
      event.preventDefault();
      updateValue(digitsValue.slice(0, -1));
      return;
    }

    if (event.key === "Delete") {
      event.preventDefault();
      updateValue("");
      return;
    }

    if (/^\d$/.test(event.key)) {
      event.preventDefault();

      if (digitsValue === "0") {
        updateValue(event.key);
        return;
      }

      updateValue(`${digitsValue}${event.key}`);
      return;
    }

    event.preventDefault();
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pasted = event.clipboardData.getData("text");
    const digits = onlyDigits(pasted);

    updateValue(digits);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateValue(event.target.value);
  }

  return (
    <>
      <input type="hidden" name={name} value={digitsValue || "0"} />

      <input
        id={id}
        type="text"
        inputMode="numeric"
        value={displayValue}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
      />
    </>
  );
}