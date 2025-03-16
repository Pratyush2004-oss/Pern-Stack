import { PaletteIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { THEMES } from '../constants'

const ThemeSelector = () => {
    const [selectedTheme, setSelected] = useState(localStorage.getItem('theme') || 'forest');

    useEffect(() => {
        localStorage.getItem('theme', selectedTheme);
        const localTheme = localStorage.getItem('preferred-theme') || '';
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [selectedTheme])
    const handleTheme = (theme) => {
        setSelected(theme);
        localStorage.setItem('preferred-theme', theme);
    }
    return (
        <div className='dropdown dropdown-end'>
            <button tabIndex={0} className='btn btn-circle btn-ghost '>
                <PaletteIcon className='size-5' />
            </button>
            <div tabIndex={0} className='dropdown-content mt-2 p-2 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10 overflow-auto max-h-[85vh]'>
                {THEMES.map((theme, idx) => (
                    <button key={idx} data-theme={theme.name} className={`flex items-center rounded-lg my-1 py-3 px-4 hover:bg-base-300 transition-colors cursor-pointer justify-between w-full ${theme.name === selectedTheme ? 'border-primary border-2' : ''}`} onClick={() => handleTheme(theme.name)}>
                        <div className='flex items-center gap-2'>
                            <PaletteIcon className='size-4' />
                            <span>{theme.label}</span>
                        </div>
                        <div className='flex gap-1'>
                            {theme.colors.map((color, idx) => (
                                <div key={idx} className='h-7 w-3 rounded-full' style={{ backgroundColor: color }}></div>
                            ))}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ThemeSelector