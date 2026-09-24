import { Palette } from "lucide-react";

import { useState } from "react";

import { useTheme } from "../../../context/ThemeContext";

import "./ThemePicker.css";

const themeColors = {

    white:"#ffffff",

    blue:"#2563EB",

    green:"#16A34A",

    orange:"#EA580C",

    red:"#DC2626",

    purple:"#9333EA",

    slate:"#64748B",

    dark:"#111827"

};

function ThemePicker(){

    const{

        theme,

        setTheme,

        themes

    }=useTheme();

    const[open,setOpen]=useState(false);

    return(

        <div className="theme-picker">

            <button

                className="theme-button"

                onClick={()=>setOpen(!open)}

            >

                <Palette size={20}/>

            </button>

            {

                open&&

                <div className="theme-popup">

                    <h4>

                        Choose Theme

                    </h4>

                    <div className="theme-grid">

                        {

                            themes.map((item)=>(

                                <button

                                    key={item}

                                    className={

                                        theme===item

                                        ?

                                        "theme-circle active"

                                        :

                                        "theme-circle"

                                    }

                                    style={{

                                        background:

                                        themeColors[item]

                                    }}

                                    onClick={()=>{

                                        setTheme(item);

                                        setOpen(false);

                                    }}

                                    title={item}

                                />

                            ))

                        }

                    </div>

                </div>

            }

        </div>

    )

}

export default ThemePicker;