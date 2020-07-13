const realVh = () => {
    let vh = window.innerHeight * 0.01;
    //console.log('[vh]', vh)
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    })
}

export default realVh
