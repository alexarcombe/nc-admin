import { useReducer } from "react"
import { CHANGE, SET_FIELDS, SET_MODE, SET_ERRORS, RESET } from "../types"

const onChange = (state, payload) => {
  const { id, value } = payload
  return {
    ...state,
    values: { ...JSON.parse(JSON.stringify(state.values)), [id]: value },
    mode: "Changed",
  }
}

const setFormFields = (state, payload) => {
  return {
    values: JSON.parse(JSON.stringify(payload.values)),
    init: payload.init
      ? JSON.parse(JSON.stringify(payload.init))
      : JSON.parse(JSON.stringify(state.init)),
    mode: payload.mode,
    errors: {},
  }
}

function reducer(state, { type, payload }) {
  switch (type) {
    case CHANGE:
      return onChange(state, payload)
    case SET_FIELDS:
      return setFormFields(state, payload)
    case SET_MODE:
      return { ...JSON.parse(JSON.stringify(state)), mode: payload }
    case SET_ERRORS:
      return { ...JSON.parse(JSON.stringify(state)), errors: payload }
    case RESET:
      return {
        ...JSON.parse(JSON.stringify(state)),
        values: JSON.parse(JSON.stringify(state.init)),
        mode: "Create",
      }
    default:
      return state
  }
}

export function useFormFields(initialFormValues) {
  const [state, dispatch] = useReducer(reducer, {
    values: JSON.parse(JSON.stringify(initialFormValues)),
    init: JSON.parse(JSON.stringify(initialFormValues)),
    mode: "Create",
    errors: {},
  })

  return [state, dispatch]
}
