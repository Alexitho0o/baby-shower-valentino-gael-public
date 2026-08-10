const MESSAGE_STATE = Object.freeze({
  idle: Object.freeze({
    className: "message message--success field--full",
    text: "Tu confirmación se enviará de forma segura cuando presiones Confirmar asistencia.",
  }),
  preview: Object.freeze({
    className: "message message--warning field--full",
    text: "Vista previa: la confirmación en línea se habilitará en la próxima etapa.",
  }),
  invalid: Object.freeze({
    className: "message message--error field--full",
    text: "Revisa los campos marcados antes de continuar.",
  }),
  sending: Object.freeze({
    className: "message message--warning field--full",
    text: "Enviando tu confirmación...",
  }),
  success: Object.freeze({
    className: "message message--success field--full",
    text: "Confirmación recibida. Gracias por responder.",
  }),
  error: Object.freeze({
    className: "message message--error field--full",
    text: "No pudimos completar el envío. Inténtalo nuevamente en unos minutos.",
  }),
  rateLimited: Object.freeze({
    className: "message message--warning field--full",
    text: "Has realizado varios intentos. Espera unos minutos antes de volver a confirmar.",
  }),
  submissionsDisabled: Object.freeze({
    className: "message message--warning field--full",
    text: "Las confirmaciones están temporalmente cerradas. Intenta nuevamente más tarde.",
  }),
  disabled: Object.freeze({
    className: "message message--warning field--full",
    text: "La confirmación en línea está deshabilitada hasta definir la persistencia.",
  }),
});

export const resolveMessageStateForCode = (
  code,
) => {
  if (code === "RSVP_RATE_LIMITED") {
    return "rateLimited";
  }

  if (code === "RSVP_SUBMISSIONS_DISABLED") {
    return "submissionsDisabled";
  }

  return "error";
};

export const createMessageController = ({ statusElement, persistenceEnabled }) => {
  const setState = (state) => {
    const safeState = persistenceEnabled
      ? (
          state === "preview"
            ? "idle"
            : state
        )
      : (
          state === "idle"
            ? "preview"
            : state
        );
    const message = MESSAGE_STATE[safeState] || MESSAGE_STATE.preview;
    statusElement.className = message.className;
    statusElement.textContent = message.text;
    statusElement.dataset.state = safeState;
  };

  setState(persistenceEnabled ? "idle" : "preview");

  return Object.freeze({
    setState,
  });
};
