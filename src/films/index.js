import React from "react";
import style from "../styles/films.module.css";

function Films(){
    return(
        <div className={`${style.main}`}>
            <div className={`${style.options}`}>{/*options */}
                <div>{/*date search */}
                    <h1>h</h1>
                </div>
                <div>{/* genre search*/}

                </div>
                <div>{/*  sort by  */}

                </div>
            </div>
            <div className={`${style.display}`}>{/*dispaly */}
                <div>{/*film display */}
                    <div className={`${style.container1}`}>{/*container */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Films;