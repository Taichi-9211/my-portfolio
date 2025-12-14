// Smooth scroll functionality
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip if it's just '#'
      if (href === "#") return

      const target = document.querySelector(href)

      if (target) {
        e.preventDefault()

        // Calculate offset for fixed header
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Update active nav
        updateActiveNav(href)
      }
    })
  })
})

function updateActiveNav(currentSection) {
  const navLinks = document.querySelectorAll("header nav a")
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === currentSection) {
      link.classList.add("active")
    }
  })
}
