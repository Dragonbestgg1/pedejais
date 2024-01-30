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
            <div className={`${style.display}`}>{/*display */}
                <div>{/*film display */}
                    <div className={`${style.container1}`}>{/*container */}
                        <div className={`${style.contain}`}>{/*img */}
                            <img className={`${style.img}`} src="https://www.greenlawnfertilizing.com/hubfs/Imported_Blog_Media/lawn-540x540_jpg-Dec-06-2023-05-34-10-0199-PM.webp"></img>
                        </div>
                        <div className={`${style.content}`}>{/*rest */}
                            <div className={`${style.title}`}>{/*title */}
                                <h1 className={`${style.h1}`}>Zale</h1>
                            </div>
                            <div>{/*airing info */}

                            </div>
                            <div>{/*rest */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Films;