import axios from "axios"

export const getPages = (setPages) => {
  axios
    .get("https://next-chapter.herokuapp.com/api/pages/")
    .then((res) => {
      setPages(res.data.sort((a, b) => a.index - b.index))
    })
    .catch((errors) => {
      console.error(errors)
      setPages({
        errors: "Failed to load content.",
      })
    })
}

export const createPage = (page, setPages, setActivePage, onSuccess) => {
  axios
    .post("https://next-chapter.herokuapp.com/api/pages", page)
    .then((res) => {
      const { pages, id } = res.data
      setPages(pages.sort((a, b) => a.index - b.index))
      setActivePage(pages.find((page) => page._id === id))
      onSuccess(id)
    })
    .catch((errors) => {
      console.error(errors)
    })
}

export const updatePage = (page, setPages, onSuccess) => {
  const { _id, ...rest } = page
  axios
    .patch(`https://next-chapter.herokuapp.com/api/pages/${_id}`, rest)
    .then((res) => {
      setPages(res.data.sort((a, b) => a.index - b.index))
      onSuccess()
    })
    .catch((errors) => {
      console.error(errors)
    })
}

export const deletePage = (id, setPages, onSuccess) => {
  axios
    .delete(`https://next-chapter.herokuapp.com/api/pages/${id}`)
    .then((res) => {
      setPages(res.data.sort((a, b) => a.index - b.index))
      onSuccess()
    })
    .catch((errors) => {
      console.error(errors)
    })
}
