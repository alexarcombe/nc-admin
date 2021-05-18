import { Divider } from "."

export function Sidebar({ pages, setPages, activePage, setActivePage }) {
  const newIndex = pages.length
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h3>Pages</h3>
        <img
          width="20"
          height="20"
          src="images/icons/plus-circle.svg"
          alt="add"
          className="sidebar__header__add"
          onClick={() => {
            const newPage = {
              id: `new${newIndex}`,
              title: `New Page`,
              index: newIndex,
              content: [
                {
                  selector: "",
                  props: [{ name: "", value: "" }],
                  children: "",
                },
              ],
            }
            setPages([...pages, newPage])
            setActivePage(newPage)
          }}
        />
      </div>
      <Divider />
      {pages.map((page) => {
        let className = "sidebar__item"
        if (activePage && activePage.id === page.id) {
          className = "sidebar__item sidebar__item--active"
        }
        return (
          <div
            className={className}
            key={page.id}
            onClick={() => {
              setActivePage(page)
            }}
          >
            {page.title}
          </div>
        )
      })}
    </div>
  )
}
