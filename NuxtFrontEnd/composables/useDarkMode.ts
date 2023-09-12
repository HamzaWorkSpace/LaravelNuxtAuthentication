const useDarkMode = ()=>{

    const isDarkMode = useState('darkMode',()=><boolean>false);

    const toggleDarkMode = ()=>{
        isDarkMode.value = <boolean>!isDarkMode.value;
        return isDarkMode.value;
    }

    return {
        isDarkMode,
        toggleDarkMode
    }

}

export default useDarkMode;