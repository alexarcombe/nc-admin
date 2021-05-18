import axios from "axios"

export const getTemplates = (setTemplates) => {
  axios
    .get("https://next-chapter.herokuapp.com/api/templates")
    .then((res) => {
      setTemplates(res.data)
    })
    .catch((errors) => {
      console.error(errors)
      setTemplates({
        errors: "Failed to load templates.",
      })
    })
}
