import React from "react";
import style from "../styles/activities.module.css";

function Activities(){
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
                <div>{/*activity display */}

                </div>
            </div>
        </div>
    )
}

export default Activities;