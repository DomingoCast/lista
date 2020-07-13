const realVh = () => {
    let totalVh = window.innerHeight
    document.documentElement.style.setProperty('--totalVh', totalVh+'px')
    window.addEventListener ('resize', () => {
        let totalVh = window.innerHeight
        document.documentElement.style.setProperty('--totalVh', totalVh+'px')
    })
}

export default realVh
