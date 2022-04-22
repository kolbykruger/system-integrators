const menu = document.querySelector('.menu')
const menuPanelsNodeList = document.querySelectorAll('.menu .menu-panel')
const menuPanels = Array.from(menuPanelsNodeList)
const navTriggersNodeList = document.querySelectorAll('.nav .trigger a')
const navTriggers = Array.from(navTriggersNodeList)

// Menu panels
const menuPanelLinksNodeList = document.querySelectorAll('.menu .menu-panel a')
const menuPanelLinks = Array.from(menuPanelLinksNodeList)

// Menu exit
const menuExitButton = document.querySelector('.menu .menu-exit')

navTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const id = trigger.getAttribute('data-category')
        console.log(id)
        // check if it's already open
        // if it is, close it
        if (trigger.classList.contains('open')) {
            closeMenuPanels()
        } else {
            openMenuPanels({ trigger, id })
        }
    })
})

function closeMenuPanels() {
    navTriggers.forEach(trigger => {
        trigger.classList.remove('open')
    })
    menuPanels.forEach(panel => {
        panel.classList.remove('open')
    })
    menu.classList.remove('open')
    document.body.classList.remove('menu-open')
}
function openMenuPanels(props) {
    // remove open from all triggers
    navTriggers.forEach(trigger => {
        trigger.classList.remove('open')
    })
    // remove open from all menu panels
    menuPanels.forEach(panel => {
        panel.classList.remove('open')
    })

    // add props to appropriate elements
    props.trigger.classList.add('open')
    // menuPanels[props.id] ? menuPanels[props.id].classList.add('open') : null
    const activePanel = menuPanels.filter(panel => {
        console.log(panel.dataset.category, 'vs', props.id)
        return panel.dataset.category == props.id
    })
    console.log(activePanel)
    activePanel[0].classList.add('open')
    menu.classList.add('open')
    document.body.classList.add('menu-open')
}

// Menu panel
menuPanelLinks.forEach(link => {
    const id = link.getAttribute('data-category')
    if (id) {
        link.addEventListener('mouseenter', () => {
            const menuPanelImagesNodeList = link.closest('.links').nextElementSibling.querySelectorAll('li')
            const menuPanelImages = Array.from(menuPanelImagesNodeList)

            if (menuPanelImages) {
                menuPanelImages.forEach(image => {
                    image.classList.remove('active')
                })

                const relatedImage = menuPanelImages[id]
                relatedImage.classList.add('active')
            }
        })
    }
})

// Menu exit
// menuExitButton.addEventListener('click', () => {
//     closeMenuPanels()
// })
