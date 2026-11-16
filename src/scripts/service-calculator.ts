const units = {
  hours: { singular: "engine hour", plural: "engine hours", short: "h" },
  miles: { singular: "mile", plural: "miles", short: "mi" },
  kilometers: { singular: "kilometer", plural: "kilometers", short: "km" },
} as const;

function toHundredths(raw: string): number | undefined {
  const reading = raw.trim();
  if (!/^(?:\d{1,9}(?:[.,]\d{1,2})?|[.,]\d{1,2})$/.test(reading)) return;
  return Math.round(Number(reading.replace(",", ".")) * 100);
}

export function initializeServiceCalculator(form: HTMLFormElement) {
  const currentReading = form.querySelector<HTMLInputElement>("#current-reading")!;
  const lastService = form.querySelector<HTMLInputElement>("#last-service")!;
  const serviceInterval = form.querySelector<HTMLInputElement>("#service-interval")!;
  const fields = [currentReading, lastService, serviceInterval];
  const unit = form.querySelector("select")!;
  const status = document.querySelector<HTMLParagraphElement>("#service-status")!;
  const result = document.querySelector<HTMLElement>("#service-result")!;
  const nextReading = document.querySelector<HTMLElement>("#next-service-reading")!;
  const prompt = status.textContent;
  const number = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
  const format = (hundredths: number) => number.format(hundredths / 100);

  function showError(field: HTMLInputElement, message = "") {
    const error = document.getElementById(`${field.id}-error`)!;
    error.textContent = message;
    error.hidden = !message;
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }

  function resetFeedback() {
    for (const field of fields) {
      if (field.hasAttribute("aria-invalid")) showError(field);
    }
    result.hidden = true;
    delete status.dataset.state;
    if (status.textContent !== prompt) status.textContent = prompt;
  }

  form.addEventListener("input", resetFeedback);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    resetFeedback();
    let firstInvalid: HTMLInputElement | undefined;

    const [current, last, interval] = fields.map((field) => {
      const amount = toHundredths(field.value);
      if (amount !== undefined && (field !== serviceInterval || amount > 0)) return amount;

      let message = "Enter a number from 0 to 999,999,999.99 with up to two decimal places.";
      if (!field.value.trim()) {
        message = field === serviceInterval ? "Enter a service interval." : "Enter a meter reading.";
      } else if (amount === 0) {
        message = "Enter a service interval greater than zero.";
      }
      showError(field, message);
      firstInvalid ??= field;
      return undefined;
    });

    if (current === undefined || last === undefined || interval === undefined) {
      status.textContent = "Check the highlighted fields and calculate again.";
      firstInvalid?.focus();
      return;
    }

    if (current < last) {
      status.textContent = "Check the meter readings and calculate again.";
      showError(currentReading, "The current reading must be at least the reading at your last service.");
      currentReading.focus();
      return;
    }

    const next = last + interval;
    const remaining = next - current;
    const selected = units[unit.value as keyof typeof units];
    const amount = Math.abs(remaining);
    const unitLabel = amount === 100 ? selected.singular : selected.plural;
    nextReading.textContent = `${format(next)} ${selected.short}`;

    if (remaining === 0) {
      status.textContent = "Service is due now.";
      status.dataset.state = "due";
    } else {
      status.textContent = `${format(amount)} ${unitLabel} ${remaining > 0 ? "remaining" : "overdue"}.`;
      status.dataset.state = remaining > 0 ? "remaining" : "due";
    }

    result.hidden = false;
    status.parentElement?.scrollIntoView({ block: "nearest" });
  });

  document.getElementById("calculator-fallback")!.hidden = true;
  form.hidden = false;
  document.getElementById("calculator-summary")!.hidden = false;
}
