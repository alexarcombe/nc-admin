export function FormField({ label, field }) {
  return (
    <div className="form-field">
      {label && <label className="form-field__label">{label}</label>}
      {field}
    </div>
  )
}
