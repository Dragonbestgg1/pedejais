import React from "react";
import style from "../src/styles/home.module.css"

function Home(){
    return(
        <div className={`${style.main}`}>
            <div className={`${style.display}`}>
                <div className={`${style.events}`}>{/*current first 5 events */}

                </div>
            </div>
        </div>
    )
}

export default Home;