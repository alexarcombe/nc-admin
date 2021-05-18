import { FormField } from "."
import { CHANGE } from "../types"

export function Content({ template, state, dispatch }) {
  let content
  if (template) {
    content = template.content.map((field, fieldIndex) => {
      if (field.children === "list") {
        return (
          <FieldList
            key={field.selector}
            {...{ state, dispatch, fieldIndex }}
          />
        )
      }
      return (
        <div className="content__field" key={field.selector}>
          <FormField
            label="Selector"
            field={
              <input
                disabled
                type="text"
                name="selector"
                value={state.values.content[fieldIndex].selector}
              />
            }
          />
          {field.props.length > 0 && (
            <div>
              {field.props.map((prop, propIndex) => {
                return (
                  <FormField
                    label={propIndex === 0 && "Props"}
                    key={prop.name}
                    field={
                      <input
                        type="text"
                        name={prop.name}
                        placeholder={prop.name}
                        value={
                          state.values.content[fieldIndex].props[propIndex]
                            .value
                        }
                        onChange={(e) => {
                          const { value } = e.target
                          const newContent = JSON.parse(
                            JSON.stringify(state.values.content)
                          )
                          newContent[fieldIndex].props[propIndex].value = value
                          dispatch({
                            type: CHANGE,
                            payload: { id: "content", value: newContent },
                          })
                        }}
                      />
                    }
                  />
                )
              })}
            </div>
          )}
          {field.children === "string" && (
            <FormField
              label="Value"
              field={
                <textarea
                  type="text"
                  name="selector"
                  value={state.values.content[fieldIndex].children}
                  onChange={(e) => {
                    const { value } = e.target
                    const newContent = JSON.parse(
                      JSON.stringify(state.values.content)
                    )
                    newContent[fieldIndex].children = value
                    dispatch({
                      type: CHANGE,
                      payload: { id: "content", value: newContent },
                    })
                  }}
                />
              }
            />
          )}
        </div>
      )
    })
  } else {
    content = (
      <>
        {" "}
        {state.values.content.map((field, fieldIndex) => {
          const { selector, props, children } = field
          return (
            <div className="content__field" key={fieldIndex}>
              <img
                src="images/icons/trash-red.svg"
                width="20"
                height="20"
                className="icon--trash"
                onClick={() => {
                  const newContent = JSON.parse(
                    JSON.stringify(state.values.content)
                  )
                  newContent.splice(fieldIndex, 1)
                  dispatch({
                    type: CHANGE,
                    payload: { id: "content", value: newContent },
                  })
                }}
              />
              <FormField
                label="Selector"
                field={
                  <input
                    type="text"
                    name="selector"
                    value={selector}
                    onChange={(e) => {
                      const newContent = JSON.parse(
                        JSON.stringify(state.values.content)
                      )
                      newContent[fieldIndex].selector = e.target.value
                      dispatch({
                        type: CHANGE,
                        payload: {
                          id: "content",
                          value: newContent,
                        },
                      })
                    }}
                  />
                }
              />
              <div className="ta-c">
                <label className="form-field__label">Props</label>
                {props.map((prop, propIndex) => {
                  const { name, value } = prop
                  return (
                    <div key={propIndex} className="form-field__props">
                      <FormField
                        field={
                          <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Key"
                            onChange={(e) => {
                              const newContent = JSON.parse(
                                JSON.stringify(state.values.content)
                              )
                              newContent[fieldIndex].props[propIndex].name =
                                e.target.value
                              dispatch({
                                type: CHANGE,
                                payload: {
                                  id: "content",
                                  value: newContent,
                                },
                              })
                            }}
                          />
                        }
                      />
                      <FormField
                        field={
                          <input
                            type="text"
                            name="value"
                            value={value}
                            placeholder="Value"
                            onChange={(e) => {
                              const newContent = JSON.parse(
                                JSON.stringify(state.values.content)
                              )
                              newContent[fieldIndex].props[propIndex].value =
                                e.target.value
                              dispatch({
                                type: CHANGE,
                                payload: {
                                  id: "content",
                                  value: newContent,
                                },
                              })
                            }}
                          />
                        }
                      />
                      <img
                        src="images/icons/trash-red.svg"
                        width="20"
                        height="20"
                        className="cur-p"
                        onClick={() => {
                          const newContent = JSON.parse(
                            JSON.stringify(state.values.content)
                          )
                          newContent[fieldIndex].props.splice(propIndex, 1)
                          dispatch({
                            type: CHANGE,
                            payload: { id: "content", value: newContent },
                          })
                        }}
                      />
                    </div>
                  )
                })}
                <img
                  width="30"
                  height="30"
                  src="images/icons/plus-circle.svg"
                  alt="add"
                  onClick={() => {
                    const newContent = JSON.parse(
                      JSON.stringify(state.values.content)
                    )
                    newContent[fieldIndex].props = [
                      ...newContent[fieldIndex].props,
                      { name: "", value: "" },
                    ]
                    dispatch({
                      type: CHANGE,
                      payload: {
                        id: "content",
                        value: newContent,
                      },
                    })
                  }}
                />
              </div>
              <FormField
                label="Value"
                field={
                  <input
                    type="text"
                    name="children"
                    value={children}
                    onChange={(e) => {
                      const newContent = JSON.parse(
                        JSON.stringify(state.values.content)
                      )
                      newContent[fieldIndex].children = e.target.value
                      dispatch({
                        type: CHANGE,
                        payload: {
                          id: "content",
                          value: newContent,
                        },
                      })
                    }}
                  />
                }
              />
            </div>
          )
        })}
        <img
          width="30"
          height="30"
          src="images/icons/plus-circle.svg"
          alt="add"
          onClick={() => {
            const newContent = [
              ...JSON.parse(JSON.stringify(state.values.content)),
              { selector: "", props: [{ name: "", value: "" }], children: "" },
            ]
            dispatch({
              type: CHANGE,
              payload: {
                id: "content",
                value: newContent,
              },
            })
          }}
        />
      </>
    )
  }
  return <div className="content">{content}</div>
}

function FieldList({ state, dispatch, fieldIndex }) {
  return (
    <div className="content__field">
      <FormField
        label="Selector"
        field={
          <input
            disabled
            type="text"
            name="selector"
            value={state.values.content[fieldIndex].selector}
          />
        }
      />
      {state.values.content[fieldIndex].children.map((child, childIndex) => {
        return (
          <div className="content__field" key={childIndex}>
            <img
              src="images/icons/trash-red.svg"
              width="20"
              height="20"
              className="icon--trash"
              onClick={() => {
                const newContent = JSON.parse(
                  JSON.stringify(state.values.content)
                )
                newContent[fieldIndex].children.splice(childIndex, 1)
                dispatch({
                  type: CHANGE,
                  payload: { id: "content", value: newContent },
                })
              }}
            />
            {child.map((prop, propIndex) => {
              return (
                <FormField
                  key={prop.name}
                  field={
                    <input
                      type="text"
                      name={prop.name}
                      placeholder={prop.name}
                      value={prop.value}
                      onChange={(e) => {
                        const { value } = e.target
                        const newContent = JSON.parse(
                          JSON.stringify(state.values.content)
                        )
                        newContent[fieldIndex].children[childIndex][
                          propIndex
                        ].value = value
                        dispatch({
                          type: CHANGE,
                          payload: { id: "content", value: newContent },
                        })
                      }}
                    />
                  }
                />
              )
            })}
          </div>
        )
      })}
      <img
        width="30"
        height="30"
        src="images/icons/plus-circle.svg"
        alt="add"
        className="m-a"
        onClick={() => {
          const newContent = JSON.parse(JSON.stringify(state.values.content))
          newContent[fieldIndex].children = [
            ...newContent[fieldIndex].children,
            [...newContent[fieldIndex].props],
          ]
          dispatch({
            type: CHANGE,
            payload: {
              id: "content",
              value: newContent,
            },
          })
        }}
      />
    </div>
  )
}
