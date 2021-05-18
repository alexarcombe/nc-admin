import { useEffect } from "react"
import { useFormFields } from "../hooks"
import { CHANGE, RESET, SET_FIELDS, SET_MODE } from "../types"
import { FormField, Content } from "."
import { createPage, updatePage, deletePage } from "../api/pages"

const onChange = (e, dispatch) => {
  const { name, value } = e.target
  dispatch({ type: CHANGE, payload: { id: name, value } })
}

const onTemplateChange = (e, dispatch, templates) => {
  const { name, value } = e.target
  const template = templates.find((template) => template._id === value)
  let content = []
  if (template) {
    content = template.content.map((field) => {
      const contentField = {}
      contentField.selector = field.selector
      if (field.props) {
        contentField.props = field.props.map((prop) => {
          return { name: prop.name, value: "" }
        })
      }
      if (field.children === "string") {
        contentField.children = ""
      } else if (field.children === "list") {
        contentField.children = [[...contentField.props]]
      }
      return contentField
    })
  }

  dispatch({ type: CHANGE, payload: { id: "content", value: content } })
  dispatch({ type: CHANGE, payload: { id: name, value } })
}

const onSubmit = (values, setPages, setActivePage, dispatch) => {
  let onSuccess = () => dispatch({ type: SET_MODE, payload: "Create" })
  if (values._id) {
    updatePage(values, setPages, onSuccess)
  } else {
    createPage(values, setPages, setActivePage, onSuccess)
  }
}

export function Page({ activePage, setActivePage, templates, setPages }) {
  const [state, dispatch] = useFormFields({
    id: "",
    title: "",
    index: "",
    templateId: "",
    content: [],
  })

  useEffect(() => {
    dispatch({
      type: SET_FIELDS,
      payload: { values: activePage, init: activePage, mode: "Create" },
    })
  }, [activePage, dispatch])

  const { _id } = activePage
  let saveButtonClassName =
    !_id || state.mode === "Changed"
      ? "button mr-1"
      : "button mr-1 button--disabled"
  return (
    <div className="page">
      <div className="page__header">
        <h3 className="mr-a">Page Details</h3>
        <button
          onClick={() =>
            onSubmit(state.values, setPages, setActivePage, dispatch)
          }
          className={saveButtonClassName}
        >
          Save
        </button>
        <button
          onClick={() => dispatch({ type: RESET })}
          className={`button mr-1 ${
            state.mode === "Create" ? "button--disabled" : "button--reset"
          }`}
        >
          Reset
        </button>
        <button
          onClick={() => deletePage(_id, setPages, () => setActivePage(""))}
          className={`button ${_id ? "button--delete" : "button--disabled"}`}
        >
          Delete
        </button>
      </div>
      <div className="page__details">
        <FormField
          label="id"
          field={
            <input
              name="id"
              value={state.values.id}
              onChange={(e) => onChange(e, dispatch)}
            />
          }
        />
        <FormField
          label="Title"
          field={
            <input
              name="title"
              value={state.values.title}
              onChange={(e) => onChange(e, dispatch)}
            />
          }
        />
        <FormField
          label="Index"
          field={
            <input
              name="index"
              value={state.values.index}
              onChange={(e) => onChange(e, dispatch)}
            />
          }
        />
        <FormField
          label="Template"
          field={
            <select
              name="templateId"
              value={state.values.templateId || ""}
              onChange={(e) => onTemplateChange(e, dispatch, templates)}
            >
              <option value="">Custom Page</option>
              {templates.map((template) => {
                return (
                  <option value={template._id} key={template._id}>
                    {template.name}
                  </option>
                )
              })}
            </select>
          }
        />
      </div>
      <div className="page__content">
        <h3>Content</h3>
        <Content
          template={templates.find(
            (template) => template._id === state.values.templateId
          )}
          {...{ state, dispatch }}
        />
      </div>
    </div>
  )
}
